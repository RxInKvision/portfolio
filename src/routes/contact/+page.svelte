<script>
	import { t, ui, site } from '$lib/i18n.svelte.js';
	import { splitLines, reveal, magnetic } from '$lib/motion.svelte.js';

	let copied = $state(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {}
	}
</script>

<svelte:head>
	<title>Contact — Riccardo Pichi | RXINK</title>
	<meta
		name="description"
		content="Get in touch with Riccardo Pichi for VFX direction, AI filmmaking, art direction and creative technology projects."
	/>
</svelte:head>

<section class="contact wrap">
	<p class="mono muted">{t(ui.nav.contact)}</p>
	{#key t(ui.contact.title)}
		<h1 class="display" use:splitLines={{ immediate: true, delay: 0.15 }}>{t(ui.contact.title)}</h1>
	{/key}

	<div class="grid">
		<div class="main" use:reveal={{ delay: 0.3 }}>
			<p class="lead muted">{t(ui.contact.text)}</p>
			<a class="mail" href="mailto:{site.email}" use:magnetic={{ strength: 0.12 }}>{site.email}</a>
			<button class="copy mono" onclick={copy}
				>{copied ? `✓ ${t(ui.contact.copied)}` : t(ui.contact.copy)}</button
			>
		</div>

		<dl class="side mono" use:reveal={{ delay: 0.4 }}>
			<div>
				<dt class="muted">{t(ui.contact.social)}</dt>
				{#each site.socials as s}
					<dd><a class="link" href={s.url} target="_blank" rel="noopener">{s.label} ↗</a></dd>
				{/each}
			</div>
			<div>
				<dt class="muted">{t(ui.contact.location)}</dt>
				<dd>{site.city}</dd>
				<dd>
					<a class="link" href={site.agency.url} target="_blank" rel="noopener"
						>{site.agency.name} ↗</a
					>
				</dd>
			</div>
			<div>
				<dt class="muted">Status</dt>
				<dd class="status"><i></i>{t(ui.contact.available)}</dd>
			</div>
		</dl>
	</div>
</section>

<style>
	.contact {
		padding-top: calc(var(--header-h) + clamp(60px, 10vw, 160px));
		padding-bottom: clamp(100px, 12vw, 200px);
		min-height: 100vh;
	}
	h1 {
		font-size: clamp(56px, 11vw, 200px);
		max-width: 11ch;
		margin: 24px 0 clamp(48px, 7vw, 120px) -0.04em;
	}
	.grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: var(--gutter);
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	.main {
		display: grid;
		gap: 28px;
		justify-items: start;
	}
	.main .lead {
		max-width: 28ch;
	}
	.mail {
		font-size: clamp(26px, 4.4vw, 80px);
		letter-spacing: -0.04em;
		color: var(--yellow);
		border-bottom: 1px solid currentColor;
		word-break: break-all;
	}
	.copy {
		padding: 10px 18px;
		border: 1px solid var(--line);
		border-radius: 999px;
		transition: border-color 0.3s;
	}
	.copy:hover {
		border-color: var(--paper);
	}
	.side {
		display: grid;
		gap: 32px;
		align-content: start;
	}
	.side dt {
		margin-bottom: 8px;
	}
	.side dd {
		padding-block: 3px;
	}
	.status {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.status i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #6fd394;
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 56px;
		}
	}
</style>
