<script module>
	// Only one film plays with sound at a time.
	let current = null;
</script>

<script>
	// Looping muted film with a sound toggle and an optional chapter caption.
	import Media from './Media.svelte';
	import { t, ui } from '$lib/i18n.svelte.js';

	let {
		src,
		poster = null,
		alt = '',
		index = null,
		title = '',
		place = '',
		eager = false,
		sound = true
	} = $props();

	let video = $state();
	let soundOn = $state(false);

	const mute = () => {
		if (video) video.muted = true;
		soundOn = false;
	};

	function toggle() {
		if (!video) return;
		if (soundOn) return mute();
		if (current && current !== mute) current();
		current = mute;
		video.muted = false;
		soundOn = true;
		video.play().catch(() => {});
	}
</script>

<div class="film">
	{#if sound}
		<button
			class="surface"
			onclick={toggle}
			data-cursor={soundOn ? t(ui.project.mute) : t(ui.project.sound)}
			aria-label={alt}
		>
			<Media type="video" {src} {poster} {eager} {alt} bind:videoEl={video} />
		</button>
	{:else}
		<Media type="video" {src} {poster} {eager} {alt} />
	{/if}
	{#if title}
		<div class="caption">
			{#if index !== null}<span class="mono yellow">{String(index).padStart(2, '0')}</span>{/if}
			<span class="title">{title}</span>
			{#if place}<span class="mono place">{place}</span>{/if}
		</div>
	{/if}
	{#if sound}
		<button class="sound mono" onclick={toggle} aria-pressed={soundOn}>
			<i class:on={soundOn}><b></b><b></b><b></b></i>
			{soundOn ? t(ui.project.mute) : t(ui.project.sound)}
		</button>
	{/if}
</div>

<style>
	.film {
		position: relative;
	}
	.surface {
		display: block;
		width: 100%;
	}
	.caption {
		position: absolute;
		left: clamp(12px, 2vw, 28px);
		bottom: clamp(12px, 2vw, 28px);
		display: flex;
		align-items: baseline;
		gap: 12px;
		pointer-events: none;
		text-shadow: 0 1px 18px rgba(0, 0, 0, 0.5);
	}
	.title {
		font-size: clamp(20px, 2.6vw, 44px);
		letter-spacing: -0.03em;
		line-height: 1;
	}
	.place {
		opacity: 0.8;
	}
	.sound {
		position: absolute;
		right: clamp(12px, 2vw, 28px);
		bottom: clamp(12px, 2vw, 28px);
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 16px;
		border-radius: 999px;
		background: rgba(11, 11, 11, 0.7);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.sound i {
		display: flex;
		align-items: end;
		gap: 2px;
		height: 12px;
	}
	.sound b {
		width: 2px;
		height: 30%;
		background: var(--yellow);
	}
	.sound i.on b {
		animation: eq 0.9s ease-in-out infinite alternate;
	}
	.sound i.on b:nth-child(2) {
		animation-delay: -0.3s;
	}
	.sound i.on b:nth-child(3) {
		animation-delay: -0.6s;
	}
	@keyframes eq {
		to {
			height: 100%;
		}
	}
	@media (max-width: 760px) {
		.caption {
			bottom: auto;
			top: 12px;
		}
		.place {
			display: none;
		}
	}
</style>
