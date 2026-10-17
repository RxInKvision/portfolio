<script>
	import { page } from '$app/state';
	import Media from '$lib/components/Media.svelte';
	import VideoEmbed from '$lib/components/VideoEmbed.svelte';
	import Film from '$lib/components/Film.svelte';
	import { disciplines } from '$lib/data/projects.js';
	import { t, ui } from '$lib/i18n.svelte.js';
	import { splitLines, reveal, clipReveal, parallax, magnetic } from '$lib/motion.svelte.js';

	let { data } = $props();
	const p = $derived(data.project);
	const next = $derived(data.next);

	let figmaLoaded = $state(false);
</script>

<svelte:head>
	<title>{p.title} — {t(p.client)} | Riccardo Pichi</title>
	<meta name="description" content={p.summary.en} />
	<meta property="og:title" content="{p.title} — Riccardo Pichi" />
	<meta property="og:description" content={p.summary.en} />
	<meta property="og:image" content="{page.url.origin}/media/{p.cover}.webp" />
</svelte:head>

{#key p.slug + t(p.summary)}
	<article>
		<header class="head wrap">
			<p class="mono muted" use:reveal={{ y: 16 }}>
				<a href="/works" class="link">{t(ui.nav.works)}</a> / {t(p.client)}
			</p>
			<h1 class="display" use:splitLines={{ immediate: true, delay: 0.1 }}>{p.title}</h1>
			<p class="lead summary" use:splitLines={{ immediate: true, delay: 0.3 }}>{t(p.summary)}</p>

			<dl class="facts mono" use:reveal={{ delay: 0.4, y: 20 }}>
				<div>
					<dt class="muted">{t(ui.works.client)}</dt>
					<dd>{t(p.client)}</dd>
				</div>
				<div>
					<dt class="muted">{t(ui.works.year)}</dt>
					<dd>{p.year}</dd>
				</div>
				<div>
					<dt class="muted">{t(ui.project.role)}</dt>
					<dd>{t(p.role)}</dd>
				</div>
				<div>
					<dt class="muted">{t(ui.works.discipline)}</dt>
					<dd>{p.disciplines.map((d) => t(disciplines[d])).join(', ')}</dd>
				</div>
			</dl>
		</header>

		<section class="hero wrap" use:clipReveal>
			{#if p.hero.type === 'youtube' || p.hero.type === 'vimeo'}
				<VideoEmbed type={p.hero.type} id={p.hero.id} poster={p.hero.poster} title={p.title} />
			{:else if p.hero.type === 'video' && p.hero.sound}
				<Film
					src={p.hero.src}
					poster={p.hero.poster}
					index={p.hero.index ?? null}
					title={t(p.hero.title) ?? ''}
					eager
					alt={p.title}
				/>
			{:else if p.hero.type === 'video'}
				<Media type="video" src={p.hero.src} eager alt={p.title} />
			{:else}
				<div class="hero-img" use:parallax={{ amount: 8 }}>
					<Media src={p.hero.src} eager sizes="100vw" alt={p.title} />
				</div>
			{/if}
		</section>

		<section class="block wrap">
			<p class="mono muted">(01) — {t(ui.project.overview)}</p>
			<p class="lead text" use:splitLines>{t(p.description)}</p>
		</section>

		<section class="duo wrap">
			<div use:reveal>
				<p class="mono yellow">(02) — {t(ui.project.challenge)}</p>
				<p>{t(p.challenge)}</p>
			</div>
			<div use:reveal={{ delay: 0.1 }}>
				<p class="mono yellow">(03) — {t(ui.project.approach)}</p>
				<p>{t(p.solution)}</p>
			</div>
		</section>

		<section class="duo wrap">
			<div use:reveal>
				<p class="mono muted">{t(ui.project.highlights)}</p>
				<ul class="highlights">
					{#each t(p.highlights) as h, i}
						<li><span class="mono yellow">{String(i + 1).padStart(2, '0')}</span>{h}</li>
					{/each}
				</ul>
			</div>
			<div use:reveal={{ delay: 0.1 }}>
				<p class="mono muted">{t(ui.project.tools)}</p>
				<ul class="tools">
					{#each p.tools as tool}<li class="mono">{tool}</li>{/each}
				</ul>
			</div>
		</section>

		{#if p.gallery?.length}
			<section class="gallery wrap" aria-label={t(ui.project.gallery)}>
				{#each p.gallery as item}
					<figure class:full={item.span === 'full'} use:reveal={{ y: 60 }}>
						{#if item.type === 'video' && (item.sound !== undefined || item.title)}
							<Film
								src={item.src}
								poster={item.poster}
								sound={!!item.sound}
								index={item.index ?? null}
								title={t(item.title) ?? ''}
								place={t(item.place) ?? ''}
								alt={t(item.title) || p.title}
							/>
						{:else}
							<Media
								type={item.type}
								src={item.src}
								alt={p.title}
								sizes={item.span === 'full' ? '100vw' : '(max-width: 760px) 100vw, 50vw'}
							/>
						{/if}
					</figure>
				{/each}
			</section>
		{/if}

		{#if p.figma}
			<section class="figma wrap" use:reveal>
				<p class="mono muted">{t(ui.project.prototype)} — Figma</p>
				<div class="figma-frame">
					{#if figmaLoaded}
						<iframe src={p.figma} title="{p.title} — Figma prototype" allowfullscreen></iframe>
					{:else}
						<button class="figma-btn" onclick={() => (figmaLoaded = true)} use:magnetic>
							<span class="mono">{t(ui.project.loadPrototype)} ↗</span>
						</button>
					{/if}
				</div>
			</section>
		{/if}

		<a href="/works/{next.slug}" class="next" data-cursor={t(ui.view)}>
			<div class="next-bg"><Media src={next.cover} fill sizes="100vw" alt="" /></div>
			<div class="wrap next-inner">
				<p class="mono">{t(ui.project.next)} →</p>
				<h2 class="display">{next.title}</h2>
				<p class="mono muted">{t(next.client)} — {next.year}</p>
			</div>
		</a>
	</article>
{/key}

<style>
	.head {
		padding-top: calc(var(--header-h) + clamp(56px, 9vw, 140px));
		padding-bottom: clamp(40px, 5vw, 72px);
	}
	.head h1 {
		font-size: clamp(56px, 12vw, 220px);
		margin: 20px 0 28px -0.04em;
		max-width: 12ch;
	}
	.summary {
		max-width: 30ch;
		color: var(--muted);
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		margin-top: clamp(40px, 6vw, 96px);
		padding-top: 20px;
		border-top: 1px solid var(--line);
	}
	.facts dt {
		margin-bottom: 6px;
	}
	.hero {
		margin-bottom: clamp(80px, 12vw, 200px);
	}
	.hero-img {
		position: relative;
		overflow: hidden;
	}
	.block {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--gutter);
		margin-bottom: clamp(80px, 10vw, 160px);
	}
	.text {
		font-size: clamp(22px, 2.4vw, 40px);
	}
	.duo {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gutter);
		margin-bottom: clamp(64px, 8vw, 140px);
	}
	.duo > div {
		display: grid;
		align-content: start;
		gap: 20px;
		padding-top: 20px;
		border-top: 1px solid var(--line);
	}
	.duo p:not(.mono) {
		max-width: 52ch;
		color: rgba(241, 239, 231, 0.82);
	}
	.highlights li {
		display: grid;
		grid-template-columns: 40px 1fr;
		padding-block: 12px;
		border-bottom: 1px solid var(--line);
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tools li {
		padding: 8px 14px;
		border: 1px solid var(--line);
		border-radius: 999px;
	}
	.gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(12px, 1.6vw, 24px);
		align-items: start;
		margin-bottom: clamp(80px, 10vw, 160px);
	}
	.gallery figure {
		position: relative;
	}
	.gallery .full {
		grid-column: 1 / -1;
	}
	.figma {
		margin-bottom: clamp(80px, 10vw, 160px);
	}
	.figma-frame {
		position: relative;
		margin-top: 20px;
		aspect-ratio: 16 / 10;
		border: 1px solid var(--line);
		background: var(--ink-2);
	}
	.figma-frame iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.figma-btn {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		padding: 20px 32px;
		border-radius: 999px;
		border: 1px solid var(--line);
		transition:
			background 0.4s,
			color 0.4s;
	}
	.figma-btn:hover {
		background: var(--yellow);
		color: var(--ink);
	}
	.next {
		position: relative;
		display: block;
		overflow: hidden;
		padding-block: clamp(100px, 16vw, 260px);
		border-top: 1px solid var(--line);
	}
	.next-bg {
		position: absolute;
		inset: 0;
		opacity: 0.25;
		transform: scale(1.1);
		transition:
			opacity 0.8s var(--ease-out),
			transform 1.4s var(--ease-out);
	}
	.next:hover .next-bg {
		opacity: 0.6;
		transform: scale(1);
	}
	.next-inner {
		position: relative;
	}
	.next h2 {
		font-size: clamp(48px, 10vw, 180px);
		margin: 20px 0;
	}

	@media (max-width: 760px) {
		.facts {
			grid-template-columns: 1fr 1fr;
		}
		.block,
		.duo,
		.gallery {
			grid-template-columns: 1fr;
		}
		.duo {
			gap: 48px;
		}
	}
</style>
