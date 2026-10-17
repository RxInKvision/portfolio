<script>
	// RXINK wordmark. Each glyph is a separate path so it can be animated.
	import { LOGO_W, LOGO_H, LOGO_PATHS } from '$lib/brand.js';

	let { class: klass = '', title = 'RXINK', el = $bindable() } = $props();
</script>

<svg
	bind:this={el}
	class={klass}
	viewBox="0 0 {LOGO_W} {LOGO_H}"
	fill="currentColor"
	role="img"
	aria-label={title}
>
	{#each LOGO_PATHS as d}
		<path class="g" {d} />
	{/each}
</svg>
