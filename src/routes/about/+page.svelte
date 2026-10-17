<script>
	import Media from '$lib/components/Media.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import { t, ui, site } from '$lib/i18n.svelte.js';
	import { splitLines, reveal, clipReveal, parallax, magnetic } from '$lib/motion.svelte.js';

	const experience = [
		{
			when: { en: 'Now', it: 'Oggi' },
			what: {
				en: 'Art Director & Creative Technologist',
				it: 'Art Director & Creative Technologist'
			},
			where: site.agency.name,
			url: site.agency.url,
			note: {
				en: 'Creative direction, VFX and AI film direction',
				it: 'Direzione creativa, regia VFX e AI'
			}
		},
		{
			when: { en: 'Now', it: 'Oggi' },
			what: { en: 'Immersive & VR experiences', it: 'Esperienze immersive e VR' },
			where: { en: 'Museum · Eni', it: 'Museo · Eni' },
			note: {
				en: 'An immersive film on four LED walls for a museum room; an immersive VR film for Eni',
				it: 'Un video immersivo su quattro ledwall per la sala di un museo; un video immersivo in VR per Eni'
			}
		},
		{
			when: { en: 'Now', it: 'Oggi' },
			what: { en: 'Custom tools & AI tutoring', it: 'Tool su misura e tutoring AI' },
			where: { en: 'Large companies', it: 'Grandi aziende' },
			note: {
				en: 'Bespoke software for enterprise teams; coaching people to bring AI into their workflows',
				it: 'Software su misura per team aziendali; tutoring per integrare l’AI nei flussi di lavoro'
			}
		},
		{
			when: { en: '2025', it: '2025' },
			what: {
				en: 'Live performance curation — Érotiq',
				it: 'Cura della performance live — Érotiq'
			},
			where: 'Romaeuropa Festival',
			url: 'https://romaeuropa.net/en/festival-2025/mariaarnal/',
			note: {
				en: 'ULTRA CLUB night at Mattatoio, Rome, 26 September 2025',
				it: 'Serata ULTRA CLUB al Mattatoio di Roma, 26 settembre 2025'
			}
		},
		{
			when: { en: 'Internship', it: 'Stage' },
			what: { en: 'Art Director — 6 months', it: 'Art Director — 6 mesi' },
			where: 'Intertouch',
			note: { en: 'Digital retail', it: 'Digital retail' }
		},
		{
			when: { en: '2024', it: '2024' },
			what: { en: 'Live AV performance — Symbioglitch', it: 'Performance AV live — Symbioglitch' },
			where: 'Videocittà, Rome',
			note: {
				en: 'With Alice Felloni, on a 25 m projection wall',
				it: 'Con Alice Felloni, su una parete di proiezione di 25 m'
			}
		},
		{
			when: { en: 'Live', it: 'Live' },
			what: { en: 'Audio-reactive visuals', it: 'Visual audio-reattivi' },
			where: 'Spazio900, Rome',
			note: {
				en: 'Real-time visuals for club nights and events',
				it: 'Visual in tempo reale per serate ed eventi'
			}
		},
		{
			when: { en: 'Education', it: 'Formazione' },
			what: {
				en: 'Media Design & New Technologies for Art — 110/110',
				it: "Media Design e Nuove Tecnologie per l'Arte — 110/110"
			},
			where: 'IED Rome',
			note: {
				en: 'Video, motion, VFX, web, installations',
				it: 'Video, motion, VFX, web, installazioni'
			}
		}
	];

	const toolkit = [
		{
			group: { en: 'Film & VFX', it: 'Film & VFX' },
			items: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Blender']
		},
		{
			group: { en: 'AI & Generative', it: 'AI & Generativo' },
			items: ['Generative video', 'Generative image', 'AI-assisted workflows']
		},
		{
			group: { en: 'Real-time', it: 'Real-time' },
			items: ['TouchDesigner', 'Resolume Arena', 'Ableton Live', 'Arduino', 'DMX / MIDI']
		},
		{
			group: { en: 'Code', it: 'Codice' },
			items: ['Svelte', 'React', 'Three.js', 'WebGL / GLSL', 'Web Audio']
		},
		{
			group: { en: 'Design', it: 'Design' },
			items: ['Figma', 'Illustrator', 'Photoshop', 'InDesign']
		}
	];
</script>

<svelte:head>
	<title>About — Riccardo Pichi | RXINK</title>
	<meta
		name="description"
		content="Riccardo Pichi is an Art Director and Creative Technologist at Arsenale 23 in Rome, specialising in VFX direction and AI filmmaking."
	/>
</svelte:head>

<section class="head wrap">
	<p class="mono muted">{t(ui.about.title)} — Riccardo Pichi</p>
	{#key t(ui.about.statement)}
		<h1 class="statement" use:splitLines={{ immediate: true, delay: 0.15, stagger: 0.06 }}>
			{t(ui.about.statement)}
		</h1>
	{/key}
</section>

<section class="bio wrap">
	<div class="portrait-col">
		<div class="portrait" use:clipReveal>
			<div class="pinner" use:parallax={{ amount: 10 }}>
				<Media
					src="profile/riccardo-pichi-portrait"
					fill
					eager
					sizes="(max-width: 760px) 100vw, 40vw"
					alt="Riccardo Pichi"
				/>
			</div>
		</div>
		<div class="now mono" use:reveal>
			<span class="muted">{t(ui.about.now)}</span>
			<span>{t(ui.hero.role)}</span>
			<a class="link yellow" href={site.agency.url} target="_blank" rel="noopener"
				>@ {site.agency.name} ↗</a
			>
		</div>
	</div>

	<div class="bio-text">
		{#each ui.about.bio as para, i}
			{#key t(para)}
				<p class:lead={i === 0} use:splitLines>{t(para)}</p>
			{/key}
		{/each}
		<div class="focus" use:reveal>
			<span class="mono muted">{t(ui.about.focus)}</span>
			<div class="tags">
				<span>VFX Direction</span><span>AI Filmmaking</span><span>Art Direction</span><span
					>Creative Technology</span
				><span>Immersive & VR</span><span>AI Tutoring</span>
			</div>
		</div>
		<a href="/contact" class="pill" use:magnetic use:reveal>{t(ui.cta.button)} →</a>
	</div>
</section>

<Marquee items={['Think in ink', 'Rome', 'Arsenale 23', 'VFX', 'AI Film']} />

<section class="exp wrap">
	<p class="mono muted label">{t(ui.about.experience)}</p>
	<ol>
		{#each experience as e}
			<li use:reveal={{ y: 30 }}>
				<span class="mono yellow">{t(e.when)}</span>
				<div>
					<h3>{t(e.what)}</h3>
					<p class="muted">{t(e.note)}</p>
				</div>
				{#if e.url}
					<a class="mono link where" href={e.url} target="_blank" rel="noopener">{t(e.where)} ↗</a>
				{:else}
					<span class="mono where">{t(e.where)}</span>
				{/if}
			</li>
		{/each}
	</ol>
</section>

<section class="kit wrap">
	<p class="mono muted label">{t(ui.about.toolkit)}</p>
	<div class="kit-grid">
		{#each toolkit as g, i}
			<div use:reveal={{ delay: i * 0.06 }}>
				<h4 class="mono yellow">{t(g.group)}</h4>
				<ul>
					{#each g.items as item}<li>{item}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.head {
		padding-top: calc(var(--header-h) + clamp(60px, 10vw, 160px));
		padding-bottom: clamp(60px, 8vw, 140px);
	}
	.statement {
		font-weight: 400;
		font-size: clamp(36px, 6.2vw, 112px);
		line-height: 0.98;
		letter-spacing: -0.045em;
		max-width: 18ch;
		margin-top: 24px;
	}
	.bio {
		display: grid;
		grid-template-columns: 5fr 7fr;
		gap: clamp(32px, 6vw, 120px);
		padding-bottom: clamp(80px, 10vw, 160px);
	}
	.portrait-col {
		position: sticky;
		top: calc(var(--header-h) + 24px);
		align-self: start;
		display: grid;
		gap: 24px;
	}
	.portrait {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		filter: grayscale(1) contrast(1.05);
		transition: filter 1s var(--ease-out);
	}
	.portrait:hover {
		filter: none;
	}
	.pinner {
		position: absolute;
		inset: 0;
	}
	.now {
		display: grid;
		gap: 4px;
	}
	.bio-text {
		display: grid;
		align-content: start;
		gap: 28px;
	}
	.bio-text p {
		max-width: 46ch;
		color: rgba(241, 239, 231, 0.82);
	}
	.bio-text p.lead {
		color: var(--paper);
		max-width: 28ch;
	}
	.focus {
		display: grid;
		gap: 12px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tags span {
		padding: 10px 16px;
		border: 1px solid var(--line);
		border-radius: 999px;
	}
	.pill {
		justify-self: start;
		padding: 16px 28px;
		border-radius: 999px;
		background: var(--yellow);
		color: var(--ink);
	}
	.label {
		margin-bottom: 32px;
	}
	.exp {
		padding-block: clamp(80px, 10vw, 160px);
	}
	.exp li {
		display: grid;
		grid-template-columns: 160px 1fr auto;
		gap: 24px;
		align-items: baseline;
		padding-block: clamp(20px, 2.6vw, 36px);
		border-top: 1px solid var(--line);
	}
	.exp li:last-child {
		border-bottom: 1px solid var(--line);
	}
	.exp h3 {
		font-weight: 400;
		font-size: clamp(22px, 2.6vw, 40px);
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin-bottom: 6px;
	}
	.where {
		text-align: right;
	}
	.kit {
		padding-bottom: clamp(100px, 12vw, 200px);
	}
	.kit-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--gutter);
	}
	.kit-grid div {
		padding-top: 16px;
		border-top: 1px solid var(--line);
	}
	.kit-grid h4 {
		font-weight: 400;
		margin-bottom: 16px;
	}
	.kit-grid li {
		padding-block: 4px;
		color: rgba(241, 239, 231, 0.82);
	}

	@media (max-width: 900px) {
		.bio {
			grid-template-columns: 1fr;
		}
		.portrait-col {
			position: static;
		}
		.kit-grid {
			grid-template-columns: 1fr 1fr;
			row-gap: 40px;
		}
		.exp li {
			grid-template-columns: 1fr;
			gap: 8px;
		}
		.where {
			text-align: left;
		}
	}
</style>
