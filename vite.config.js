import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// Add this line to fix the GSAP SSR error
		noExternal: ['gsap']
	}
});
