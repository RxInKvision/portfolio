// Converts the heavy originals in /media-src into web-ready assets in /static/media.
// Images -> WebP (1600w + 800w). Videos (mp4/mov) -> H.264 MP4 (max 1280w, faststart, muted) + WebP poster.
// Run with: npm run media   (skips files that are already up to date)
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, extname, basename, relative } from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = 'media-src/images';
const OUT = 'static/media';
// Videos that keep their soundtrack (everything else is encoded muted for autoplay loops).
const KEEP_AUDIO = new Set([
	'cards/MAIN_16-9.mp4',
	'projects/china/fiume-giallo.mov',
	'projects/china/mercato.mov',
	'projects/china/piazza-chong.mov',
	'projects/china/fiume.mov',
	'projects/china/bamboo.mov'
]);
// Whole folders whose videos keep audio (finished films and spots).
const AUDIO_DIRS = ['projects/ai-studies/', 'projects/unicum/'];

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))
	);
	return files.flat();
}

async function isFresh(src, out) {
	if (!existsSync(out)) return false;
	return (await stat(out)).mtimeMs > (await stat(src)).mtimeMs;
}

function run(args) {
	return new Promise((resolve, reject) => {
		const p = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
		let err = '';
		p.stderr.on('data', (d) => (err += d));
		p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err))));
	});
}

async function image(src, outBase) {
	if (await isFresh(src, `${outBase}.webp`)) return;
	const img = sharp(src, { limitInputPixels: false }).rotate();
	await img
		.clone()
		.resize({ width: 1600, withoutEnlargement: true })
		.webp({ quality: 80 })
		.toFile(`${outBase}.webp`);
	await img
		.clone()
		.resize({ width: 800, withoutEnlargement: true })
		.webp({ quality: 76 })
		.toFile(`${outBase}-sm.webp`);
}

async function video(src, outBase, rel) {
	if (await isFresh(src, `${outBase}.mp4`)) return;
	const audio =
		KEEP_AUDIO.has(rel) || AUDIO_DIRS.some((d) => rel.startsWith(d))
			? ['-c:a', 'aac', '-b:a', '128k']
			: ['-an'];
	await run([
		'-i',
		src,
		'-vf',
		"scale='min(1280,iw)':-2:flags=lanczos,fps=30",
		'-c:v',
		'libx264',
		'-preset',
		'slow',
		'-crf',
		'27',
		'-pix_fmt',
		'yuv420p',
		'-profile:v',
		'high',
		'-movflags',
		'+faststart',
		...audio,
		`${outBase}.mp4`
	]);
	await run([
		'-ss',
		'0.6',
		'-i',
		`${outBase}.mp4`,
		'-frames:v',
		'1',
		'-vf',
		"scale='min(1280,iw)':-2",
		`${outBase}-poster.png`
	]);
	await sharp(`${outBase}-poster.png`).webp({ quality: 78 }).toFile(`${outBase}-poster.webp`);
	const { unlink } = await import('node:fs/promises');
	await unlink(`${outBase}-poster.png`);
}

const files = (await walk(SRC)).filter((f) => /\.(png|jpe?g|mp4|mov)$/i.test(f));
const queue = [...files];
const workers = Array.from({ length: 3 }, async () => {
	while (queue.length) {
		const src = queue.shift();
		const rel = relative(SRC, src).replaceAll('\\', '/');
		const outBase = join(OUT, rel.slice(0, -extname(rel).length));
		await mkdir(dirname(outBase), { recursive: true });
		try {
			if (/\.(mp4|mov)$/i.test(src)) await video(src, outBase, rel);
			else await image(src, outBase);
			console.log('✓', rel);
		} catch (e) {
			console.error('✗', rel, e.message);
		}
	}
});
await Promise.all(workers);

// Width/height of every asset, so the site can reserve space and avoid layout shift.
const manifest = {};
for (const f of await walk(OUT)) {
	if (!/\.webp$/.test(f) || /-sm\.webp$/.test(f)) continue;
	const { width, height } = await sharp(f).metadata();
	const key = relative(OUT, f)
		.replaceAll('\\', '/')
		.replace(/(-poster)?\.webp$/, '');
	manifest[key] = [width, height];
}
await writeFile('src/lib/data/media-manifest.json', JSON.stringify(manifest, null, '\t'));
console.log(`Done: ${files.length} files -> ${OUT}`);
