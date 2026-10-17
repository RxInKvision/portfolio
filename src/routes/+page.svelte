<script>
	import { onMount } from 'svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Logotype from '$lib/components/Logotype.svelte';
	import { LOGO_W, LOGO_H, LOGO_PATHS } from '$lib/brand.js';
	import { projects } from '$lib/data/projects.js';
	import { t, ui, site } from '$lib/i18n.svelte.js';
	import {
		app,
		gsap,
		ScrollTrigger,
		splitLines,
		reveal,
		magnetic,
		reducedMotion,
		scrollTo
	} from '$lib/motion.svelte.js';

	const featured = projects.filter((p) => p.featured);

	let hero, sticky, stage, clip, heroLine, heroMeta, intro;

	// Logo width in vw. The reel is clipped by a vector copy of the wordmark (SVG clipPath),
	// scaled around the centre so the video bursts through the "I". Vector clipping has no
	// texture-size limit, unlike a CSS mask-image, which glitched in Chrome at large sizes.
	const logo = { ms: 72 };
	function applyLogo() {
		if (!stage || !clip) return;
		const w = stage.clientWidth;
		const h = stage.clientHeight;
		const lw = (logo.ms / 100) * window.innerWidth;
		const s = lw / LOGO_W;
		clip.setAttribute(
			'transform',
			`translate(${(w - lw) / 2} ${(h - LOGO_H * s) / 2}) scale(${s})`
		);
		sticky.style.setProperty('--ms', logo.ms);
	}

	onMount(() => {
		logo.ms = window.matchMedia('(max-width: 760px)').matches ? 88 : 72;
		applyLogo();
		window.addEventListener('resize', applyLogo);

		const ctx = gsap.context(() => {
			if (reducedMotion()) return;

			gsap
				.timeline({
					scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.6 }
				})
				.to(heroMeta, { autoAlpha: 0, y: -30, duration: 0.15 }, 0)
				.to(sticky.querySelector('.ghost'), { autoAlpha: 0, duration: 0.12 }, 0)
				.to(logo, { ms: 2600, duration: 0.7, ease: 'power3.in', onUpdate: applyLogo }, 0)
				.fromTo(
					stage.querySelector('.shade'),
					{ opacity: 0 },
					{ opacity: 0.55, duration: 0.2 },
					0.6
				)
				.fromTo(heroLine, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.65)
				.to({}, { duration: 0.15 });

			// Intro: words light up as you read.
			const words = intro.querySelectorAll('.w');
			gsap.fromTo(
				words,
				{ opacity: 0.16 },
				{
					opacity: 1,
					stagger: 0.05,
					ease: 'none',
					scrollTrigger: { trigger: intro, start: 'top 75%', end: 'bottom 55%', scrub: true }
				}
			);
		});
		return () => {
			window.removeEventListener('resize', applyLogo);
			ctx.revert();
		};
	});

	// Hero entrance once the preloader is gone.
	$effect(() => {
		if (!app.ready || !stage || reducedMotion()) return;
		gsap.fromTo(
			stage,
			{ scale: 1.12, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 2, ease: 'expo.out' }
		);
		gsap.fromTo(
			heroMeta.children,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1.4, stagger: 0.08, delay: 0.3, ease: 'expo.out' }
		);
	});

	const words = (text) => text.split(' ');
</script>

<svelte:head>
	<title>Riccardo Pichi — Art Director & Creative Technologist | RXINK</title>
	<meta
		name="description"
		content="Riccardo Pichi (RXINK) — Art Director & Creative Technologist at Arsenale 23, Rome. VFX direction, AI filmmaking, installations and interactive experiences."
	/>
	<meta property="og:title" content="Riccardo Pichi — Art Director & Creative Technologist" />
	<meta
		property="og:description"
		content="VFX direction, AI filmmaking and creative technology. Rome."
	/>
	<link rel="preload" as="video" href="/media/reel/reel.mp4" />
</svelte:head>

<!-- HERO -->
<section class="hero" bind:this={hero}>
	<div class="sticky" bind:this={sticky}>
		<svg class="clip-def" width="0" height="0" aria-hidden="true">
			<defs>
				<!-- clipPath can't contain <g>, so the transform lives on the clipPath itself -->
				<clipPath id="hero-logo-clip" clipPathUnits="userSpaceOnUse" bind:this={clip}>
					{#each LOGO_PATHS as d}<path {d} />{/each}
				</clipPath>
			</defs>
		</svg>
		<div class="ghost" aria-hidden="true"><Logotype /></div>
		<div class="stage" bind:this={stage}>
			<video
				src="/media/reel/reel.mp4"
				poster="/media/reel/reel-poster.jpg"
				autoplay
				muted
				loop
				playsinline
			></video>
			<div class="shade"></div>
		</div>

		<div class="hero-meta wrap" bind:this={heroMeta}>
			<p class="mono">Riccardo Pichi</p>
			<p class="mono">{t(ui.hero.role)}</p>
			<p class="mono">
				{t(ui.hero.at)}
				<a class="link yellow" href={site.agency.url} target="_blank" rel="noopener"
					>{site.agency.name}</a
				>
			</p>
			<button class="mono scroll-cue" onclick={() => scrollTo(window.innerHeight * 2)}>
				<span>{t(ui.hero.scroll)}</span><i></i>
			</button>
		</div>

		<div class="hero-line wrap" bind:this={heroLine}>
			<p class="mono yellow">VFX · AI Film · Art Direction · Creative Technology</p>
			<h1 class="display">{t(ui.hero.line)}</h1>
		</div>
	</div>
</section>

<!-- INTRO -->
<section class="intro wrap">
	<p class="mono muted label">(01) — Intro</p>
	{#key t(ui.intro)}
		<p class="intro-text" bind:this={intro}>
			{#each words(t(ui.intro)) as w}<span class="w">{w}</span>{' '}{/each}
		</p>
	{/key}
	<div class="intro-foot" use:reveal>
		<a href="/about" class="pill" use:magnetic>{t(ui.nav.about)} →</a>
		<div class="now mono">
			<span class="muted">{t(ui.hero.at)}</span>
			<span>{site.agency.name} — {t(ui.hero.role)}</span>
		</div>
	</div>
</section>

<!-- SELECTED WORK -->
<section class="work wrap">
	<div class="work-head">
		<p class="mono muted">(02) — {t(ui.selected)} <sup>{featured.length}</sup></p>
		{#key t(ui.selected)}
			<h2 class="display" use:splitLines>{t(ui.selected)}</h2>
		{/key}
		<a href="/works" class="mono link">{t(ui.allWork)} ({projects.length}) →</a>
	</div>

	<div class="work-grid">
		{#each featured as project, i}
			<div class="cell c{i % 3}">
				<ProjectCard
					{project}
					index={i}
					ratio={i % 3 === 0 ? '16 / 9' : i % 3 === 1 ? '4 / 3' : '4 / 5'}
				/>
			</div>
		{/each}
	</div>

	<div class="work-more" use:reveal>
		<a href="/works" class="pill big" use:magnetic>{t(ui.allWork)} <sup>{projects.length}</sup></a>
	</div>
</section>

<Marquee
	items={[
		'VFX Direction',
		'AI Filmmaking',
		'Art Direction',
		'Creative Technology',
		'Installations',
		'Live Visuals'
	]}
/>

<!-- CAPABILITIES -->
<section class="caps wrap">
	<p class="mono muted label">(03) — {t(ui.capabilities)}</p>
	<ol>
		{#each ui.services as s, i}
			<li class="cap" use:reveal={{ y: 30 }}>
				<span class="mono yellow">0{i + 1}</span>
				<h3>{t(s.title)}</h3>
				<p class="muted">{t(s.text)}</p>
			</li>
		{/each}
	</ol>
</section>

<style>
	/* HERO */
	.hero {
		position: relative;
		height: 320vh;
	}
	.sticky {
		--ms: 72;
		position: sticky;
		top: 0;
		height: 100vh;
		height: 100svh;
		overflow: hidden;
	}
	.clip-def {
		position: absolute;
		width: 0;
		height: 0;
	}
	.ghost {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(var(--ms) * 1vw);
		translate: -50% -50%;
		color: var(--yellow);
		opacity: 0.1;
	}
	.ghost :global(svg) {
		width: 100%;
		height: auto;
	}
	.stage {
		position: absolute;
		inset: 0;
		-webkit-clip-path: url(#hero-logo-clip);
		clip-path: url(#hero-logo-clip);
	}
	.stage video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: var(--ink);
		opacity: 0;
	}
	.hero-meta {
		position: absolute;
		inset: auto 0 0 0;
		padding-bottom: calc(28px + env(safe-area-inset-bottom));
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		align-items: end;
		gap: 16px;
	}
	.scroll-cue {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.scroll-cue i {
		width: 1px;
		height: 40px;
		background: linear-gradient(var(--paper) 50%, transparent 50%);
		background-size: 100% 200%;
		animation: cue 1.8s var(--ease-inout) infinite;
	}
	@keyframes cue {
		from {
			background-position: 0 100%;
		}
		to {
			background-position: 0 -100%;
		}
	}
	.hero-line {
		position: absolute;
		inset: auto 0 0 0;
		padding-bottom: clamp(32px, 7vh, 80px);
		visibility: hidden;
	}
	.hero-line h1 {
		font-size: clamp(40px, 7vw, 128px);
		max-width: 15ch;
		margin-top: 20px;
	}

	/* INTRO */
	.label {
		margin-bottom: clamp(24px, 3vw, 48px);
	}
	.intro {
		padding-block: clamp(120px, 18vw, 260px) clamp(80px, 10vw, 160px);
	}
	.intro-text {
		font-size: clamp(30px, 4.6vw, 80px);
		line-height: 1.04;
		letter-spacing: -0.035em;
		max-width: 22ch;
	}
	.intro-foot {
		margin-top: clamp(40px, 6vw, 96px);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}
	.now {
		display: grid;
		gap: 4px;
		text-align: right;
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 16px 28px;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 15px;
		transition:
			background 0.5s var(--ease-out),
			color 0.5s var(--ease-out),
			border-color 0.5s;
	}
	.pill:hover {
		background: var(--yellow);
		color: var(--ink);
		border-color: var(--yellow);
	}
	.pill.big {
		font-size: clamp(18px, 1.6vw, 24px);
		padding: 24px 44px;
	}

	/* WORK */
	.work {
		padding-bottom: clamp(100px, 12vw, 200px);
	}
	.work-head {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: 16px 24px;
		padding-bottom: clamp(40px, 5vw, 80px);
		border-bottom: 1px solid var(--line);
		margin-bottom: clamp(40px, 5vw, 80px);
	}
	.work-head p {
		grid-column: 1 / -1;
	}
	.work-head h2 {
		font-size: var(--fs-h1);
	}
	.work-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		column-gap: var(--gutter);
		row-gap: clamp(64px, 9vw, 160px);
	}
	.c0 {
		grid-column: 1 / -1;
	}
	.c1 {
		grid-column: 1 / span 7;
	}
	.c2 {
		grid-column: 9 / -1;
		margin-top: clamp(80px, 16vw, 280px);
	}
	.work-more {
		display: flex;
		justify-content: center;
		margin-top: clamp(80px, 10vw, 160px);
	}

	/* CAPS */
	.caps {
		padding-block: clamp(100px, 12vw, 200px);
	}
	.cap {
		display: grid;
		grid-template-columns: 80px 1fr 1fr;
		gap: 24px;
		align-items: baseline;
		padding-block: clamp(24px, 3vw, 44px);
		border-top: 1px solid var(--line);
		transition: color 0.4s;
	}
	.cap:last-child {
		border-bottom: 1px solid var(--line);
	}
	.cap h3 {
		font-size: clamp(32px, 4.6vw, 80px);
		font-weight: 400;
		letter-spacing: -0.04em;
		line-height: 1;
		transition:
			transform 0.6s var(--ease-out),
			color 0.4s;
	}
	.cap:hover h3 {
		color: var(--yellow);
		transform: translateX(12px);
	}
	.cap p {
		max-width: 42ch;
	}

	@media (max-width: 760px) {
		.hero {
			height: 240vh;
		}
		.sticky {
			--ms: 88;
		}
		.hero-meta {
			grid-template-columns: 1fr 1fr;
		}
		.hero-meta p:nth-child(2) {
			text-align: right;
		}
		.scroll-cue {
			display: none;
		}
		.now {
			text-align: left;
		}
		.work-head {
			grid-template-columns: 1fr;
		}
		.c0,
		.c1,
		.c2 {
			grid-column: 1 / -1;
			margin-top: 0;
		}
		.cap {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero {
			height: 100vh;
		}
	}
</style>
