<script>
	// Click-to-load YouTube/Vimeo player: shows a poster until played (fast and privacy friendly).
	import Media from './Media.svelte';
	import { t, ui } from '$lib/i18n.svelte.js';

	let { type, id, poster, title = '' } = $props();
	let playing = $state(false);

	const src = $derived(
		type === 'youtube'
			? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
			: `https://player.vimeo.com/video/${id}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`
	);
</script>

<div class="embed">
	{#if playing}
		<iframe
			{src}
			{title}
			allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
			allowfullscreen
		></iframe>
	{:else}
		<button
			class="poster"
			onclick={() => (playing = true)}
			data-cursor={t(ui.play)}
			aria-label="{t(ui.play)} — {title}"
		>
			{#if poster}<Media src={poster} fill eager sizes="100vw" alt={title} />{/if}
			<span class="play">
				<svg viewBox="0 0 24 24" aria-hidden="true"
					><path d="M7 4.5v15l13-7.5z" fill="currentColor" /></svg
				>
				<span class="mono">{t(ui.play)}</span>
			</span>
		</button>
	{/if}
</div>

<style>
	.embed {
		position: relative;
		aspect-ratio: 16 / 9;
		background: #000;
		overflow: hidden;
	}
	iframe,
	.poster {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.poster::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.25);
		transition: background 0.5s;
	}
	.poster:hover::after {
		background: rgba(0, 0, 0, 0.05);
	}
	.play {
		position: absolute;
		z-index: 2;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 18px 28px 18px 22px;
		border-radius: 999px;
		background: var(--yellow);
		color: var(--ink);
		transition: transform 0.6s var(--ease-out);
	}
	.poster:hover .play {
		transform: scale(1.08);
	}
	.play svg {
		width: 20px;
		height: 20px;
	}
</style>
