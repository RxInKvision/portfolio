// sitemap.xml with every page in both languages (hreflang alternates included).
import { projects } from '$lib/data/projects.js';
import { site, pathFor } from '$lib/i18n.svelte.js';

export const prerender = true;

export function GET() {
	const today = new Date().toISOString().slice(0, 10);
	const paths = ['/', '/works', '/about', '/contact', ...projects.map((p) => `/works/${p.slug}`)];
	const url = (path) => {
		const en = site.url + pathFor(path, 'en');
		const it = site.url + pathFor(path, 'it');
		const alt = `<xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="it" href="${it}"/><xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`;
		const priority = path === '/' ? '1.0' : path.split('/').length > 2 ? '0.7' : '0.8';
		return [en, it]
			.map(
				(loc) =>
					`<url><loc>${loc}</loc>${alt}<lastmod>${today}</lastmod><priority>${priority}</priority></url>`
			)
			.join('');
	};
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${paths.map(url).join('')}</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
