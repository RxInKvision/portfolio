<script>
	import { onMount } from 'svelte';
	import Logotype from './Logotype.svelte';
	import { t, ui, site, href } from '$lib/i18n.svelte.js';
	import {
		gsap,
		ScrollTrigger,
		magnetic,
		splitLines,
		scrollTo,
		reducedMotion
	} from '$lib/motion.svelte.js';

	let footer, logo;

	onMount(() => {
		if (reducedMotion()) return;
		const glyphs = logo.querySelectorAll('.g');
		const tween = gsap.fromTo(
			glyphs,
			{ yPercent: 70, opacity: 0 },
			{
				yPercent: 0,
				opacity: 1,
				ease: 'expo.out',
				stagger: 0.07,
				duration: 1.4,
				scrollTrigger: { trigger: logo, start: 'top 95%', once: true }
			}
		);
		return () => tween.scrollTrigger?.kill();
	});
</script>

<footer class="footer" bind:this={footer}>
	<div class="wrap cta">
		<p class="mono muted">— {t(ui.footer.based)}</p>
		{#key t(ui.cta.title)}
			<h2 class="display title" use:splitLines>{t(ui.cta.title)}</h2>
		{/key}
		<a
			class="mail"
			href="mailto:{site.email}"
			use:magnetic={{ strength: 0.15 }}
			data-cursor={t(ui.cta.button)}
		>
			<span>{site.email}</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"
				><path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" stroke-width="1.5" /></svg
			>
		</a>
	</div>

	<div class="wrap grid mono">
		<div>
			<span class="muted">{site.name}</span>
			<span>{t(ui.hero.role)}</span>
			<a class="link" href={site.agency.url} target="_blank" rel="noopener">@ {site.agency.name}</a>
		</div>
		<div>
			<span class="muted">{t(ui.contact.social)}</span>
			{#each site.socials as s}<a class="link" href={s.url} target="_blank" rel="noopener"
					>{s.label}</a
				>{/each}
		</div>
		<div>
			<span class="muted">Menu</span>
			<a class="link" href={href('/works')}>{t(ui.nav.works)}</a>
			<a class="link" href={href('/about')}>{t(ui.nav.about)}</a>
			<a class="link" href={href('/contact')}>{t(ui.nav.contact)}</a>
		</div>
		<div class="right">
			<button class="link" onclick={() => scrollTo(0)}>{t(ui.footer.top)} ↑</button>
		</div>
	</div>

	<div class="wrap logo-wrap">
		<Logotype bind:el={logo} class="big-logo" />
	</div>

	<div class="wrap legal mono muted">
		<span>© {new Date().getFullYear()} Riccardo Pichi — RXINK</span>
		<span>Think in ink</span>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		background: var(--ink);
		border-top: 1px solid var(--line);
		padding-top: clamp(80px, 14vw, 200px);
		overflow: hidden;
	}
	.cta {
		display: grid;
		gap: clamp(24px, 3vw, 40px);
		margin-bottom: clamp(80px, 12vw, 180px);
	}
	.title {
		font-size: var(--fs-h2);
		max-width: 14ch;
	}
	.mail {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		justify-self: start;
		font-size: clamp(22px, 3.6vw, 56px);
		letter-spacing: -0.03em;
		color: var(--yellow);
		border-bottom: 1px solid currentColor;
		padding-bottom: 6px;
		word-break: break-all;
	}
	.mail svg {
		width: 0.8em;
		height: 0.8em;
		flex: none;
		transition: transform 0.6s var(--ease-out);
	}
	.mail:hover svg {
		transform: rotate(45deg);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		padding-block: 32px;
		border-top: 1px solid var(--line);
	}
	.grid div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}
	.grid .right {
		align-items: flex-end;
	}
	.logo-wrap {
		padding-block: clamp(24px, 4vw, 56px);
		color: var(--yellow);
	}
	.logo-wrap :global(.big-logo) {
		width: 100%;
		height: auto;
	}
	.legal {
		display: flex;
		justify-content: space-between;
		padding-block: 20px calc(20px + env(safe-area-inset-bottom));
		border-top: 1px solid var(--line);
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr 1fr;
			row-gap: 32px;
		}
		.grid .right {
			align-items: flex-start;
		}
	}
</style>
