// Builds the silent homepage reel (static/media/reel/reel.mp4) from short segments of
// the optimized project videos. Each segment is nudged so it never contains a cut that
// exists in its source clip: a source cut inside a 1.5 s segment would flash for a frame.
// Run with: npm run reel
import { spawnSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const MEDIA = 'static/media';
const SEARCH = 2.5; // how far (s) around a segment to look for source cuts

// [source, requested start (s), duration (s), extra filter before scaling]
const KOLLATERAL_CROP = 'crop=iw*0.68:ih*0.68:iw*0.32:0,'; // hides the title overlay
const SEGMENTS = [
	['projects/china/fiume-giallo', 20.5, 1.8],
	['cards/MAIN_16-9', 9.0, 1.6, KOLLATERAL_CROP],
	['projects/china/mercato', 16.6, 1.6],
	['projects/ai-studies/notte', 17.1, 1.5],
	['projects/videocitta/video6', 2.2, 1.8],
	['projects/china/fiume-giallo', 14.4, 1.8],
	['projects/ai-studies/bar', 8.0, 1.5],
	['projects/forum/video3', 2.0, 1.5],
	['projects/china/piazza-chong', 13, 1.8],
	['projects/ai-studies/ring', 17.2, 1.4],
	['projects/unicum/non-avanza', 20.8, 1.8],
	['projects/china/argilla', 33, 1.8],
	['projects/forum/video1', 2.8, 1.4],
	['cards/MAIN_16-9', 14.2, 1.5, KOLLATERAL_CROP],
	['projects/ai-studies/duello', 1.4, 1.8],
	['projects/ai-studies/ring', 24.5, 1.8],
	['projects/videocitta/video6', 14.8, 1.4],
	['projects/china/bamboo', 1.2, 1.5]
];

function run(args) {
	const r = spawnSync(ffmpeg, ['-hide_banner', '-nostdin', ...args], {
		encoding: 'utf8',
		maxBuffer: 1 << 26
	});
	return r.stderr;
}

function duration(file) {
	const m = run(['-i', file]).match(/Duration: (\d+):(\d+):([\d.]+)/);
	return +m[1] * 3600 + +m[2] * 60 + +m[3];
}

// Times (s) of shot changes in [from, to] of a clip.
function cuts(file, from, to) {
	const out = run([
		'-ss',
		String(from),
		'-t',
		String(to - from),
		'-i',
		file,
		'-vf',
		"select='gt(scene,0.22)',showinfo",
		'-an',
		'-f',
		'null',
		'-'
	]);
	return [...out.matchAll(/pts_time:([\d.]+)/g)].map((m) => from + +m[1]);
}

// A source cut right at a segment's edge leaves a 1-frame sliver of the neighbouring shot
// (the glitch). Cuts inside a segment are fine: they belong to the original edit. So each
// segment's start and end must sit at least EDGE seconds away from any source cut; we look
// for the smallest shift (then the smallest trim) of the requested window that satisfies it.
const EDGE = 0.35;
function fitSegment(file, want, dur) {
	const total = duration(file);
	const list = cuts(file, Math.max(0, want - SEARCH), Math.min(total, want + dur + SEARCH));
	const ok = (s, d) => s >= 0 && s + d <= total - 0.05 && clearStart(s) && clearEnd(s + d);
	const clearStart = (t) => list.every((c) => c <= t - 0.04 || c >= t + EDGE);
	const clearEnd = (t) => list.every((c) => c >= t + 0.04 || c <= t - EDGE);
	const step = 1 / 30;
	for (let trim = 0; trim <= dur - 0.6; trim += step) {
		const d = dur - trim;
		for (let shift = 0; shift <= 1.2; shift += step) {
			for (const s of [want - shift, want + shift])
				if (ok(s, d)) return { start: +s.toFixed(3), dur: +d.toFixed(3), list };
		}
	}
	throw new Error(
		`No clean window near ${want}s in ${file} (cuts: ${list.map((c) => c.toFixed(2)).join(', ')})`
	);
}

const inputs = [];
const filters = [];
const durs = [];
SEGMENTS.forEach(([src, want, wantDur, pre = ''], i) => {
	const file = `${MEDIA}/${src}.mp4`;
	const { start, dur } = fitSegment(file, want, wantDur);
	durs.push(dur);
	const note =
		Math.abs(start - want) > 0.01 || dur !== wantDur ? `  (was ${want}s / ${wantDur}s)` : '';
	console.log(`${String(i + 1).padStart(2)}  ${src}  @ ${start}s  ${dur}s${note}`);
	inputs.push('-ss', String(start), '-t', String(dur), '-i', file);
	filters.push(
		`[${i}:v]${pre}scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30,setsar=1,format=yuv420p[v${i}]`
	);
});

const concat =
	SEGMENTS.map((_, i) => `[v${i}]`).join('') + `concat=n=${SEGMENTS.length}:v=1:a=0[out]`;
run([
	'-y',
	...inputs,
	'-filter_complex',
	`${filters.join(';')};${concat}`,
	'-map',
	'[out]',
	'-c:v',
	'libx264',
	'-preset',
	'slow',
	'-crf',
	'29',
	'-movflags',
	'+faststart',
	'-an',
	`${MEDIA}/reel/reel.mp4`
]);
run([
	'-y',
	'-ss',
	'0.5',
	'-i',
	`${MEDIA}/reel/reel.mp4`,
	'-frames:v',
	'1',
	`${MEDIA}/reel/reel-poster.jpg`
]);

console.log('Reel OK: every segment starts and ends at least ' + EDGE + 's away from a source cut');
