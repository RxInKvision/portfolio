import adapter from '@sveltejs/adapter-auto';

// Public URL of the site (used for canonical links and social previews).
// Change it here if you connect a custom domain on Vercel.
export const SITE_URL = 'https://portfolio-riccardos-projects-a23c40a0.vercel.app';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: { origin: SITE_URL }
	}
};

export default config;
