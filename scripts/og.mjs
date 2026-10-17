// Generates social preview + touch icon from the brand SVGs.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const logo = readFileSync('static/brand/logotype.svg', 'utf8').replace(
	'fill="currentColor"',
	'fill="#ffe964"'
);
const logoPng = await sharp(Buffer.from(logo)).resize({ width: 470 }).png().toBuffer();
const text = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><style>t{font-family:Helvetica,Arial,sans-serif;fill:#f1efe7}</style><text x="64" y="560" font-size="30" style="font-family:Helvetica,Arial;fill:#f1efe7">Riccardo Pichi — Art Director &amp; Creative Technologist</text><text x="64" y="80" font-size="22" style="font-family:monospace;fill:#ffe964;letter-spacing:2px">VFX · AI FILM DIRECTION · CREATIVE TECHNOLOGY</text></svg>`
);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0b0b0b' } })
	.composite([
		{ input: logoPng, left: 365, top: 140 },
		{ input: text, left: 0, top: 0 }
	])
	.jpeg({ quality: 88 })
	.toFile('static/og.jpg');
await sharp(Buffer.from(readFileSync('static/favicon.svg')))
	.resize(180, 180)
	.png()
	.toFile('static/apple-touch-icon.png');
console.log('ok');
