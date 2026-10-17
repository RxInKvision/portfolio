<script>
	// Infinite yellow band; speeds up and reverses with scroll direction.
	import { onMount } from 'svelte';
	import Pictogram from './Pictogram.svelte';
	import { gsap, ScrollTrigger, reducedMotion } from '$lib/motion.svelte.js';

	let { items = [] } = $props();
	let track;

	onMount(() => {
		if (reducedMotion()) return;
		const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
		const st = ScrollTrigger.create({
			onUpdate: (self) => {
				const v = self.getVelocity() / 300;
				gsap.to(loop, {
					timeScale: gsap.utils.clamp(-6, 6, v || self.direction),
					duration: 0.4,
					overwrite: true,
					onComplete: () => gsap.to(loop, { timeScale: self.direction, duration: 1.2 })
				});
			}
		});
		return () => (loop.kill(), st.kill());
	});
</script>

<div class="clip" aria-hidden="true">
	<div class="marquee">
		<div class="track" bind:this={track}>
			{#each [0, 1] as _}
				<div class="group">
					{#each items as item}
						<span>{item}</span>
						<Pictogram class="mq-picto" />
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.clip {
		overflow: hidden;
		padding-block: clamp(24px, 4vw, 64px);
	}
	.marquee {
		background: var(--yellow);
		color: var(--ink);
		overflow: hidden;
		padding-block: clamp(14px, 2vw, 28px);
		transform: rotate(-2deg) scale(1.04);
	}
	.track {
		display: flex;
		width: max-content;
	}
	.group {
		display: flex;
		align-items: center;
	}
	span {
		font-size: clamp(36px, 6vw, 104px);
		letter-spacing: -0.045em;
		line-height: 1;
		white-space: nowrap;
		padding-inline: 0.35em;
	}
	.group :global(.mq-picto) {
		height: clamp(28px, 4vw, 64px);
		width: auto;
	}
</style>
