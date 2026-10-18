<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { t, ui, href } from '$lib/i18n.svelte.js';
	import { setReady } from '$lib/motion.svelte.js';

	onMount(() => setReady(true));
</script>

<svelte:head><title>{page.status} — RXINK</title></svelte:head>

<section class="err wrap">
	<p class="mono yellow">Error {page.status}</p>
	<h1 class="display">{t(ui.notFound.title)}</h1>
	<a href={href('/')} class="mono link">← {t(ui.notFound.back)}</a>
</section>

<style>
	.err {
		min-height: 100vh;
		display: grid;
		align-content: center;
		gap: 32px;
	}
	h1 {
		font-size: clamp(56px, 12vw, 220px);
		max-width: 10ch;
	}
</style>
