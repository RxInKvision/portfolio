import adapter from '@sveltejs/adapter-auto';

// Public URL of the site (used for canonical links and social previews).
// Change it here if you connect a custom domain on Vercel.
export const SITE_URL = 'https://portfolio-liard-delta-52.vercel.app';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: { origin: SITE_URL, entries: ['*', '/it', '/sitemap.xml'] }
	}
};

export default config;
