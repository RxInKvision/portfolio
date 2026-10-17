<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Pictogram from '$lib/components/Pictogram.svelte';
	import { setLang } from '$lib/i18n.svelte.js';
	import {
		app,
		setReady,
		gsap,
		ScrollTrigger,
		initScroll,
		getLenis,
		reducedMotion
	} from '$lib/motion.svelte.js';

	let { children } = $props();
	let curtain;

	onMount(() => {
		setLang(document.documentElement.dataset.lang === 'it' ? 'it' : 'en');
		initScroll();
		const refresh = () => ScrollTrigger.refresh();
		document.fonts.ready.then(refresh);
		window.addEventListener('load', refresh);
		return () => window.removeEventListener('load', refresh);
	});

	// Page transition: a yellow curtain rises, the route swaps underneath, then it leaves.
	onNavigate((nav) => {
		if (!nav.from || nav.from.url.pathname === nav.to?.url.pathname || reducedMotion()) return;
		setReady(false);
		return new Promise((resolve) => {
			gsap
				.timeline()
				.set(curtain, { visibility: 'visible', yPercent: 100 })
				.to(curtain, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' })
				.add(resolve);
		});
	});

	afterNavigate((nav) => {
		if (nav.type === 'enter') return;
		getLenis()?.scrollTo(0, { immediate: true, force: true });
		if (!getLenis()) window.scrollTo(0, 0);
		if (reducedMotion() || nav.from?.url.pathname === nav.to?.url.pathname) {
			setReady(true);
			return;
		}
		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			gsap.to(curtain, {
				yPercent: -100,
				duration: 0.85,
				delay: 0.1,
				ease: 'expo.inOut',
				onStart: () => setTimeout(() => setReady(true), 250),
				onComplete: () => gsap.set(curtain, { visibility: 'hidden' })
			});
		});
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="RXINK — Riccardo Pichi" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{page.url.origin}/og.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="{page.url.origin}{page.url.pathname}" />
</svelte:head>

<Preloader />
<Cursor />
<Header />

<div class="curtain" bind:this={curtain} aria-hidden="true">
	<Pictogram class="curtain-picto" />
</div>

<main>
	{@render children()}
</main>

<Footer />
<div class="grain" aria-hidden="true"></div>

<style>
	.curtain {
		position: fixed;
		inset: 0;
		z-index: 120;
		background: var(--yellow);
		color: var(--ink);
		visibility: hidden;
		display: grid;
		place-items: center;
	}
	.curtain :global(.curtain-picto) {
		width: 44px;
		height: auto;
	}
	main {
		position: relative;
		min-height: 100vh;
	}
	:global(html.has-cursor),
	:global(html.has-cursor a),
	:global(html.has-cursor button) {
		cursor: none;
	}
</style>
