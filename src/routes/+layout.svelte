<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Pictogram from '$lib/components/Pictogram.svelte';
	import { i18n, setLang, basePath, pathFor, site } from '$lib/i18n.svelte.js';
	import { personJsonLd } from '$lib/seo.js';
	import {
		app,
		setReady,
		gsap,
		ScrollTrigger,
		initScroll,
		getLenis,
		reducedMotion
	} from '$lib/motion.svelte.js';

	let { children, data } = $props();
	let curtain;

	// The language comes from the URL (/it/... = Italian), so it is right on the server too.
	i18n.lang = data.lang;
	$effect.pre(() => setLang(data.lang));

	const base = $derived(basePath(page.url.pathname));
	const canonical = $derived(site.url + pathFor(base, data.lang));

	onMount(() => {
		// Send visitors to their language: their last explicit choice, otherwise the browser's.
		try {
			const saved = localStorage.getItem('rxink-lang');
			const wanted = saved || ((navigator.language || '').slice(0, 2) === 'it' ? 'it' : 'en');
			// Only ever EN -> IT: pages under /it are never redirected (search engines render them in English).
			if (wanted === 'it' && data.lang === 'en' && page.status === 200)
				goto(pathFor(page.url.pathname, wanted) + page.url.search, {
					replaceState: true,
					noScroll: true
				});
		} catch {}
		initScroll();
		const refresh = () => ScrollTrigger.refresh();
		document.fonts.ready.then(refresh);
		window.addEventListener('load', refresh);
		return () => window.removeEventListener('load', refresh);
	});

	// Page transition: a yellow curtain rises, the route swaps underneath, then it leaves.
	onNavigate((nav) => {
		if (!nav.from || !nav.to || reducedMotion()) return;
		// Same page in the other language: swap without the curtain.
		if (basePath(nav.from.url.pathname) === basePath(nav.to.url.pathname)) return;
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
		const sameBase =
			nav.from && nav.to && basePath(nav.from.url.pathname) === basePath(nav.to.url.pathname);
		if (reducedMotion() || sameBase) {
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
	<meta name="author" content="Riccardo Pichi" />
	<meta property="og:site_name" content="RXINK — Riccardo Pichi" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={data.lang === 'it' ? 'it_IT' : 'en_GB'} />
	<meta property="og:locale:alternate" content={data.lang === 'it' ? 'en_GB' : 'it_IT'} />
	<meta property="og:image" content="{site.url}/og.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="en" href="{site.url}{pathFor(base, 'en')}" />
	<link rel="alternate" hreflang="it" href="{site.url}{pathFor(base, 'it')}" />
	<link rel="alternate" hreflang="x-default" href="{site.url}{pathFor(base, 'en')}" />
	{@html personJsonLd()}
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
