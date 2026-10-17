<script>
	import { onMount } from 'svelte';
	import Pictogram from './Pictogram.svelte';
	import { setReady, gsap, reducedMotion } from '$lib/motion.svelte.js';

	let root, picto, count;
	let done = $state(false);

	onMount(() => {
		let seen = false;
		try {
			seen = sessionStorage.getItem('rxink-seen') === '1';
			sessionStorage.setItem('rxink-seen', '1');
		} catch {}

		const finish = () => {
			setReady(true);
			done = true;
		};
		// Safety net: never keep the site covered if an animation can't run.
		const fallback = setTimeout(finish, 5000);

		if (reducedMotion() || seen) {
			gsap.to(root, {
				autoAlpha: 0,
				duration: 0.5,
				delay: 0.15,
				onStart: () => setReady(true),
				onComplete: finish
			});
			return () => clearTimeout(fallback);
		}

		const bars = picto.querySelectorAll('.bar');
		const counter = { v: 0 };
		const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
		tl.from(bars, { scaleY: 0, transformOrigin: '50% 100%', duration: 1.1, stagger: 0.12 })
			.to(
				counter,
				{
					v: 100,
					duration: 1.6,
					ease: 'power2.inOut',
					onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, '0'))
				},
				0
			)
			.to(bars, { yPercent: -140, duration: 0.9, stagger: 0.06, ease: 'expo.in' }, 1.6)
			.to(root.querySelectorAll('.pl-meta'), { autoAlpha: 0, duration: 0.4 }, 1.7)
			.to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1, onStart: () => setReady(true) }, 2.15)
			.add(finish);
		return () => clearTimeout(fallback);
	});
</script>

{#if !done}
	<div class="preloader" bind:this={root} aria-hidden="true">
		<div class="pl-meta pl-top mono">
			<span>RXINK</span>
			<span>Portfolio — {new Date().getFullYear()}</span>
		</div>
		<div class="pl-picto"><Pictogram bind:el={picto} /></div>
		<div class="pl-meta pl-bottom mono">
			<span>Art Direction · VFX · AI Film</span>
			<span bind:this={count}>000</span>
		</div>
	</div>
{/if}

<style>
	.preloader {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--ink);
		color: var(--yellow);
		display: grid;
		place-items: center;
		clip-path: inset(0 0 0% 0);
	}
	.pl-picto {
		width: clamp(56px, 7vw, 96px);
		overflow: hidden;
		padding-block: 6px;
	}
	.pl-picto :global(svg) {
		width: 100%;
		height: auto;
		overflow: visible;
	}
	.pl-meta {
		position: absolute;
		left: var(--gutter);
		right: var(--gutter);
		display: flex;
		justify-content: space-between;
		color: var(--paper);
	}
	.pl-top {
		top: 26px;
	}
	.pl-bottom {
		bottom: calc(26px + env(safe-area-inset-bottom));
	}
	.pl-bottom span:last-child {
		color: var(--yellow);
		font-size: clamp(28px, 4vw, 56px);
		font-family: var(--sans);
		letter-spacing: -0.04em;
		line-height: 0.8;
	}
</style>
