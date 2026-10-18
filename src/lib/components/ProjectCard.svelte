<script>
	import Media from './Media.svelte';
	import { t, ui, href } from '$lib/i18n.svelte.js';
	import { disciplines } from '$lib/data/projects.js';
	import { clipReveal, parallax, finePointer, reveal, autoplay } from '$lib/motion.svelte.js';
	import { onMount } from 'svelte';

	let {
		project,
		index = 0,
		ratio = '16 / 10',
		sizes = '(max-width: 760px) 100vw, 70vw',
		eager = false
	} = $props();

	let preview = $state();
	let hoverMode = $state(false);
	let playing = $state(false);
	onMount(() => {
		hoverMode = finePointer();
		// Touch devices: play the preview while the card is on screen.
		if (!hoverMode && preview) return autoplay(preview).destroy;
	});

	const enter = () => hoverMode && preview?.play().catch(() => {});
	const leave = () => hoverMode && preview?.pause();
</script>

<a
	href={href(`/works/${project.slug}`)}
	class="card"
	onpointerenter={enter}
	onpointerleave={leave}
	data-cursor={t(ui.view)}
>
	<div class="frame" style:aspect-ratio={ratio} use:clipReveal>
		<div class="inner" use:parallax={{ amount: 10 }}>
			<div class="layer">
				<Media
					src={project.cover}
					fill
					{sizes}
					{eager}
					alt="{project.title} — {t(project.client)} — Riccardo Pichi"
				/>
				{#if project.preview}
					<video
						bind:this={preview}
						class="preview"
						class:playing
						onplaying={() => (playing = true)}
						onpause={() => (playing = false)}
						src="/media/{project.preview}.mp4"
						muted
						loop
						playsinline
						preload="none"
					></video>
				{/if}
			</div>
		</div>
	</div>
	<div class="meta" use:reveal={{ y: 20 }}>
		<span class="mono idx">{String(index + 1).padStart(2, '0')}</span>
		<h3 class="title">{project.title}</h3>
		<span class="mono muted client">{t(project.client)}</span>
		<span class="mono muted tags"
			>{project.disciplines.map((d) => t(disciplines[d])).join(' / ')}</span
		>
		<span class="mono muted year">{project.year}</span>
	</div>
</a>

<style>
	.card {
		display: block;
	}
	.frame {
		position: relative;
		overflow: hidden;
		background: var(--ink-2);
	}
	.inner,
	.layer {
		position: absolute;
		inset: 0;
	}
	.layer {
		transition: transform 1.2s var(--ease-out);
	}
	.card:hover .layer {
		transform: scale(1.04);
	}
	.preview {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.preview {
		opacity: 0;
		transition: opacity 0.6s var(--ease-out);
	}
	.preview.playing {
		opacity: 1;
	}
	.meta {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: baseline;
		column-gap: 16px;
		row-gap: 4px;
		padding-top: 16px;
	}
	.idx {
		color: var(--yellow);
	}
	.title {
		font-size: var(--fs-h3);
		font-weight: 400;
		letter-spacing: -0.035em;
		line-height: 1;
		transition: transform 0.6s var(--ease-out);
	}
	.card:hover .title {
		transform: translateX(8px);
	}
	.client {
		grid-column: 2;
	}
	.tags {
		grid-column: 2;
	}
	.year {
		grid-row: 1;
		grid-column: 3;
	}
</style>
