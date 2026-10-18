<script>
	// Responsive image or muted looping video from /static/media.
	// `fill` makes it cover its parent (parent must have a size); otherwise it keeps its own ratio.
	import manifest from '$lib/data/media-manifest.json';
	import { autoplay } from '$lib/motion.svelte.js';

	let {
		src,
		type = 'image',
		alt = '',
		fill = false,
		eager = false,
		sizes = '(max-width: 760px) 100vw, 60vw',
		poster = null,
		position = null,
		videoEl = $bindable(),
		class: klass = ''
	} = $props();

	const dims = $derived(manifest[src] ?? [16, 9]);
	const base = $derived(`/media/${src}`);
</script>

<div class="media {klass}" class:fill style:aspect-ratio={fill ? null : `${dims[0]} / ${dims[1]}`}>
	{#if type === 'video'}
		<video
			bind:this={videoEl}
			use:autoplay
			src="{base}.mp4"
			poster={poster ? `/media/${poster}.webp` : `${base}-poster.webp`}
			muted
			loop
			playsinline
			preload={eager ? 'auto' : 'metadata'}
			width={dims[0]}
			height={dims[1]}
			aria-label={alt}
		></video>
	{:else}
		<img
			src="{base}.webp"
			srcset="{base}-sm.webp 800w, {base}.webp 1600w"
			{sizes}
			{alt}
			width={dims[0]}
			height={dims[1]}
			style:object-position={position}
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
			fetchpriority={eager ? 'high' : 'auto'}
		/>
	{/if}
</div>

<style>
	.media {
		position: relative;
		overflow: hidden;
		background: var(--ink-2);
		width: 100%;
	}
	.media.fill {
		position: absolute;
		inset: 0;
		height: 100%;
	}
	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
