<script>
	// Custom cursor for fine pointers. Elements with data-cursor="Label" expand it into a label.
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { gsap, finePointer, reducedMotion } from '$lib/motion.svelte.js';

	let dot,
		label = $state(''),
		active = $state(false),
		enabled = $state(false);

	afterNavigate(() => {
		label = '';
		active = false;
	});

	onMount(() => {
		if (!finePointer() || reducedMotion()) return;
		enabled = true;
		gsap.set(dot, { autoAlpha: 0 });
		let shown = false;
		document.documentElement.classList.add('has-cursor');
		const xTo = gsap.quickTo(dot, 'x', { duration: 0.45, ease: 'power3' });
		const yTo = gsap.quickTo(dot, 'y', { duration: 0.45, ease: 'power3' });
		const move = (e) => {
			if (!shown) {
				shown = true;
				gsap.set(dot, { x: e.clientX, y: e.clientY });
				gsap.to(dot, { autoAlpha: 1, duration: 0.3 });
			}
			xTo(e.clientX);
			yTo(e.clientY);
			const target = e.target.closest?.('[data-cursor]');
			label = target?.dataset.cursor ?? '';
			active = !!target || !!e.target.closest?.('a, button');
		};
		const leave = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
		const enter = () => gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
		window.addEventListener('pointermove', move);
		document.addEventListener('pointerleave', leave);
		document.addEventListener('pointerenter', enter);
		return () => {
			window.removeEventListener('pointermove', move);
			document.removeEventListener('pointerleave', leave);
			document.removeEventListener('pointerenter', enter);
		};
	});
</script>

<div
	class="cursor"
	class:enabled
	class:active
	class:labelled={!!label}
	bind:this={dot}
	aria-hidden="true"
>
	<span class="mono">{label}</span>
</div>

<style>
	.cursor {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 150;
		pointer-events: none;
		width: 10px;
		height: 10px;
		margin: -5px 0 0 -5px;
		border-radius: 50%;
		background: var(--yellow);
		mix-blend-mode: difference;
		display: grid;
		place-items: center;
		transition:
			width 0.5s var(--ease-out),
			height 0.5s var(--ease-out),
			margin 0.5s var(--ease-out),
			background 0.3s;
	}
	.cursor:not(.enabled) {
		display: none;
	}
	.cursor.active {
		width: 44px;
		height: 44px;
		margin: -22px 0 0 -22px;
	}
	.cursor.labelled {
		width: 96px;
		height: 96px;
		margin: -48px 0 0 -48px;
		mix-blend-mode: normal;
	}
	.cursor span {
		color: var(--ink);
		opacity: 0;
		transform: scale(0.6);
		transition:
			opacity 0.3s,
			transform 0.5s var(--ease-out);
	}
	.cursor.labelled span {
		opacity: 1;
		transform: none;
	}
</style>
