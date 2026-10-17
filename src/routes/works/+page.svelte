<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects, disciplines } from '$lib/data/projects.js';
	import { t, ui } from '$lib/i18n.svelte.js';
	import { gsap, splitLines, reveal, finePointer } from '$lib/motion.svelte.js';

	let filter = $state('all');
	let view = $state('grid');
	let hovered = $state(null);
	let floater;

	const used = Object.keys(disciplines).filter((d) =>
		projects.some((p) => p.disciplines.includes(d))
	);
	const filtered = $derived(
		filter === 'all' ? projects : projects.filter((p) => p.disciplines.includes(filter))
	);
	const count = (d) => projects.filter((p) => p.disciplines.includes(d)).length;

	onMount(() => {
		if (finePointer()) view = 'list';
		if (!floater) return;
		gsap.set(floater, { xPercent: -50, yPercent: -50 });
		const xTo = gsap.quickTo(floater, 'x', { duration: 0.7, ease: 'power3' });
		const yTo = gsap.quickTo(floater, 'y', { duration: 0.7, ease: 'power3' });
		const move = (e) => (xTo(e.clientX), yTo(e.clientY));
		window.addEventListener('pointermove', move);
		return () => window.removeEventListener('pointermove', move);
	});
</script>

<svelte:head>
	<title>Work — Riccardo Pichi | RXINK</title>
	<meta
		name="description"
		content="Selected work by Riccardo Pichi: films, VFX, AI filmmaking, installations, campaigns and brand identities."
	/>
</svelte:head>

<section class="head wrap">
	<p class="mono muted">Index — {projects.length} {t(ui.works.project).toLowerCase()}s</p>
	{#key t(ui.works.title)}
		<h1 class="display" use:splitLines={{ immediate: true, delay: 0.2 }}>
			{t(ui.works.title)}<sup class="mono">{projects.length}</sup>
		</h1>
	{/key}
	{#key t(ui.works.intro)}
		<p class="lead intro" use:splitLines={{ immediate: true, delay: 0.35 }}>{t(ui.works.intro)}</p>
	{/key}
</section>

<div class="bar wrap" use:reveal={{ y: 20 }}>
	<div class="filters" role="tablist">
		<button class="chip mono" class:on={filter === 'all'} onclick={() => (filter = 'all')}>
			{t(ui.works.all)} <sup>{projects.length}</sup>
		</button>
		{#each used as d}
			<button class="chip mono" class:on={filter === d} onclick={() => (filter = d)}>
				{t(disciplines[d])} <sup>{count(d)}</sup>
			</button>
		{/each}
	</div>
	<div class="views mono">
		<button class:on={view === 'list'} onclick={() => (view = 'list')}>{t(ui.works.list)}</button>
		<button class:on={view === 'grid'} onclick={() => (view = 'grid')}>{t(ui.works.grid)}</button>
	</div>
</div>

{#if view === 'list'}
	<section class="list wrap" onpointerleave={() => (hovered = null)}>
		<div class="row legend mono muted">
			<span>#</span><span>{t(ui.works.project)}</span><span>{t(ui.works.client)}</span><span
				>{t(ui.works.discipline)}</span
			><span>{t(ui.works.year)}</span>
		</div>
		{#each filtered as p, i (p.slug)}
			<a
				href="/works/{p.slug}"
				class="row item"
				class:dim={hovered && hovered !== p.slug}
				onpointerenter={() => (hovered = p.slug)}
				animate:flip={{ duration: 600 }}
				in:fade={{ duration: 400 }}
				data-cursor={t(ui.view)}
			>
				<span class="mono yellow">{String(i + 1).padStart(2, '0')}</span>
				<span class="title">{p.title}</span>
				<span class="mono muted">{p.client}</span>
				<span class="mono muted">{p.disciplines.map((d) => t(disciplines[d])).join(' / ')}</span>
				<span class="mono muted">{p.year}</span>
			</a>
		{/each}
	</section>
{:else}
	<section class="grid wrap">
		{#each filtered as p, i (p.slug)}
			<div class="cell" animate:flip={{ duration: 700 }} in:fade={{ duration: 400 }}>
				<ProjectCard project={p} index={i} ratio="4 / 3" sizes="(max-width: 760px) 100vw, 50vw" />
			</div>
		{/each}
	</section>
{/if}

<div class="floater" class:show={view === 'list' && hovered} bind:this={floater} aria-hidden="true">
	{#each projects as p}
		<img class:on={hovered === p.slug} src="/media/{p.cover}-sm.webp" alt="" decoding="async" />
	{/each}
</div>

<style>
	.head {
		padding-top: calc(var(--header-h) + clamp(60px, 10vw, 160px));
		padding-bottom: clamp(40px, 5vw, 80px);
	}
	.head h1 {
		font-size: clamp(80px, 22vw, 380px);
		margin: 16px 0 24px -0.04em;
	}
	.head sup {
		font-size: 14px;
		vertical-align: top;
		letter-spacing: 0;
		margin-left: 8px;
		position: relative;
		top: 1.5em;
	}
	.intro {
		max-width: 30ch;
		color: var(--muted);
	}
	.bar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		padding-block: 20px;
		border-block: 1px solid var(--line);
		position: sticky;
		top: 0;
		z-index: 5;
		background: rgba(11, 11, 11, 0.82);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		padding: 9px 14px;
		border: 1px solid var(--line);
		border-radius: 999px;
		transition: all 0.4s var(--ease-out);
	}
	.chip:hover {
		border-color: var(--paper);
	}
	.chip.on {
		background: var(--yellow);
		border-color: var(--yellow);
		color: var(--ink);
	}
	.views {
		display: flex;
		gap: 16px;
	}
	.views button {
		opacity: 0.4;
		transition: opacity 0.3s;
	}
	.views button.on {
		opacity: 1;
	}

	/* List */
	.list {
		padding-block: 24px clamp(100px, 12vw, 200px);
	}
	.row {
		display: grid;
		grid-template-columns: 60px 2.2fr 1.2fr 1.4fr 60px;
		gap: 16px;
		align-items: baseline;
		padding-block: clamp(16px, 2vw, 28px);
		border-bottom: 1px solid var(--line);
	}
	.legend {
		padding-block: 12px;
	}
	.item {
		transition: opacity 0.4s;
	}
	.item.dim {
		opacity: 0.3;
	}
	.item .title {
		font-size: clamp(28px, 3.8vw, 64px);
		letter-spacing: -0.04em;
		line-height: 1;
		transition:
			transform 0.6s var(--ease-out),
			color 0.3s;
	}
	.item:hover .title {
		transform: translateX(14px);
		color: var(--yellow);
	}
	.row span:last-child {
		text-align: right;
	}

	/* Grid */
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(56px, 6vw, 112px) var(--gutter);
		padding-block: clamp(48px, 5vw, 80px) clamp(100px, 12vw, 200px);
	}
	.grid .cell:nth-child(even) {
		margin-top: clamp(0px, 10vw, 180px);
	}

	/* Floating preview */
	.floater {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 40;
		width: clamp(240px, 22vw, 380px);
		aspect-ratio: 4 / 3;
		pointer-events: none;
		overflow: hidden;
		clip-path: inset(50% 50% 50% 50%);
		transition: clip-path 0.7s var(--ease-out);
	}
	.floater.show {
		clip-path: inset(0 0 0 0);
	}
	.floater img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.15);
		transition:
			opacity 0.4s,
			transform 0.8s var(--ease-out);
	}
	.floater img.on {
		opacity: 1;
		transform: none;
	}

	@media (max-width: 900px) {
		.row {
			grid-template-columns: 40px 1fr auto;
		}
		.row span:nth-child(3),
		.row span:nth-child(4) {
			display: none;
		}
		.floater {
			display: none;
		}
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.grid .cell:nth-child(even) {
			margin-top: 0;
		}
		.bar {
			top: 0;
		}
		.filters {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			width: calc(100% + var(--gutter) * 2);
		}
	}
</style>
