<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import Pictogram from './Pictogram.svelte';
	import { t, ui, i18n, site, href, pathFor, basePath } from '$lib/i18n.svelte.js';
	import { app, gsap, lockScroll, magnetic } from '$lib/motion.svelte.js';

	const links = [
		{ href: '/works', label: ui.nav.works },
		{ href: '/about', label: ui.nav.about },
		{ href: '/contact', label: ui.nav.contact }
	];

	let time = $state('');
	let hidden = $state(false);
	let overlay;

	const isActive = (path) => basePath(page.url.pathname).startsWith(path);
	// Remember an explicit language choice (so Italian browsers aren't redirected again).
	const remember = (lang) => {
		try {
			localStorage.setItem('rxink-lang', lang);
		} catch {}
	};
	const langHref = (lang) => pathFor(page.url.pathname, lang);

	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Rome'
		});
		const tick = () => (time = fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 15000);

		// Hide on scroll down, show on scroll up.
		let last = 0;
		const onScroll = () => {
			const y = window.scrollY;
			hidden = y > 160 && y > last && !app.menuOpen;
			last = y;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			clearInterval(id);
			window.removeEventListener('scroll', onScroll);
		};
	});

	function toggleMenu(open = !app.menuOpen) {
		app.menuOpen = open;
		lockScroll(open);
		const items = overlay.querySelectorAll('.m-item');
		gsap.killTweensOf([overlay, items]);
		if (open) {
			gsap.set(overlay, { visibility: 'visible' });
			gsap.fromTo(
				overlay,
				{ clipPath: 'inset(0 0 100% 0)' },
				{ clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' }
			);
			gsap.fromTo(
				items,
				{ yPercent: 110 },
				{ yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.35 }
			);
		} else {
			gsap.to(overlay, {
				clipPath: 'inset(0 0 100% 0)',
				duration: 0.8,
				ease: 'expo.inOut',
				onComplete: () => gsap.set(overlay, { visibility: 'hidden' })
			});
		}
	}

	// Close the menu whenever the route changes.
	beforeNavigate(() => {
		if (app.menuOpen) toggleMenu(false);
	});
</script>

<header class="header" class:hidden class:open={app.menuOpen}>
	<a href={href('/')} class="brand" aria-label="RXINK — home">
		<Pictogram class="picto" />
		<span class="mono">Riccardo Pichi</span>
	</a>

	<div class="meta mono">
		<span>Rome {time}</span>
		<span class="dot"></span>
		<span>{t(ui.contact.available)}</span>
	</div>

	<nav class="nav" aria-label="Main">
		{#each links as l}
			<a href={href(l.href)} class="mono link" class:active={isActive(l.href)}>{t(l.label)}</a>
		{/each}
		<div class="lang mono" role="group" aria-label="Language">
			<a
				href={langHref('en')}
				hreflang="en"
				class:on={i18n.lang === 'en'}
				onclick={() => remember('en')}>EN</a
			>
			<span>/</span>
			<a
				href={langHref('it')}
				hreflang="it"
				class:on={i18n.lang === 'it'}
				onclick={() => remember('it')}>IT</a
			>
		</div>
	</nav>

	<button
		class="menu-btn mono"
		onclick={() => toggleMenu()}
		aria-expanded={app.menuOpen}
		use:magnetic
	>
		<span>{app.menuOpen ? t(ui.nav.close) : t(ui.nav.menu)}</span>
		<i class="burger" aria-hidden="true"><b></b><b></b></i>
	</button>
</header>

<div class="overlay" bind:this={overlay} aria-hidden={!app.menuOpen}>
	<nav class="m-nav">
		<a href={href('/')} class="m-link"><span class="m-item">Home</span></a>
		{#each links as l, i}
			<a href={href(l.href)} class="m-link" class:active={isActive(l.href)}>
				<span class="m-item"><sup class="mono">0{i + 1}</sup>{t(l.label)}</span>
			</a>
		{/each}
	</nav>
	<div class="m-foot">
		<div class="m-item-wrap">
			<a class="m-item mono" href="mailto:{site.email}">{site.email}</a>
		</div>
		<div class="m-row">
			<div class="lang mono">
				<a
					href={langHref('en')}
					hreflang="en"
					class:on={i18n.lang === 'en'}
					onclick={() => remember('en')}>EN</a
				>
				<span>/</span>
				<a
					href={langHref('it')}
					hreflang="it"
					class:on={i18n.lang === 'it'}
					onclick={() => remember('it')}>IT</a
				>
			</div>
			<div class="m-social mono">
				{#each site.socials as s}<a href={s.url} target="_blank" rel="noopener">{s.label}</a>{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		height: var(--header-h);
		padding-inline: var(--gutter);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		color: var(--paper);
		mix-blend-mode: difference;
		transition: transform 0.7s var(--ease-out);
	}
	.header.hidden {
		transform: translateY(-100%);
	}
	.header.open {
		mix-blend-mode: normal;
		color: var(--ink);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		justify-self: start;
	}
	.brand :global(.picto) {
		height: 28px;
		width: auto;
		transition: transform 0.6s var(--ease-out);
	}
	.brand:hover :global(.picto) {
		transform: skewY(-8deg) scaleY(1.1);
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #6fd394;
		box-shadow: 0 0 0 0 rgba(111, 211, 148, 0.6);
		animation: pulse 2.4s infinite;
	}
	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px rgba(111, 211, 148, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(111, 211, 148, 0);
		}
	}
	.nav {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: clamp(16px, 2.2vw, 36px);
	}
	.nav a.active::after {
		transform: scaleX(1);
	}
	.lang {
		display: flex;
		gap: 6px;
		opacity: 0.9;
	}
	.lang a {
		opacity: 0.4;
		transition: opacity 0.3s;
	}
	.lang a.on,
	.lang a:hover {
		opacity: 1;
	}
	.menu-btn {
		display: none;
		justify-self: end;
		align-items: center;
		gap: 10px;
	}
	.burger {
		display: grid;
		gap: 5px;
		width: 22px;
	}
	.burger b {
		height: 1.5px;
		background: currentColor;
		transition: transform 0.5s var(--ease-out);
	}
	.open .burger b:first-child {
		transform: translateY(3.25px) rotate(45deg);
	}
	.open .burger b:last-child {
		transform: translateY(-3.25px) rotate(-45deg);
	}

	/* Mobile overlay */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: var(--yellow);
		color: var(--ink);
		visibility: hidden;
		clip-path: inset(0 0 100% 0);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: calc(var(--header-h) + 4vh) var(--gutter) calc(24px + env(safe-area-inset-bottom));
	}
	.m-nav {
		display: flex;
		flex-direction: column;
	}
	.m-link {
		display: block;
		overflow: hidden;
		font-size: clamp(56px, 16vw, 120px);
		line-height: 0.95;
		letter-spacing: -0.05em;
	}
	.m-item {
		display: inline-block;
	}
	.m-link sup {
		font-size: 11px;
		vertical-align: top;
		margin-right: 8px;
		position: relative;
		top: 1.2em;
	}
	.m-link.active {
		font-style: italic;
	}
	.m-foot {
		display: grid;
		gap: 20px;
		border-top: 1px solid rgba(11, 11, 11, 0.2);
		padding-top: 20px;
	}
	.m-item-wrap {
		overflow: hidden;
	}
	.m-row {
		display: flex;
		justify-content: space-between;
	}
	.m-social {
		display: flex;
		gap: 16px;
	}

	@media (max-width: 900px) {
		.header {
			grid-template-columns: 1fr auto;
		}
		.meta,
		.nav {
			display: none;
		}
		.menu-btn {
			display: flex;
		}
	}
</style>
