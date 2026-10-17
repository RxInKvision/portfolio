<script>
	// RXINK three-bar pictogram.
	let { class: klass = '', el = $bindable() } = $props();
</script>

<svg
	bind:this={el}
	class={klass}
	viewBox="0 0 786.53 1963.52"
	fill="currentColor"
	aria-hidden="true"
>
	<path class="bar" d="M217.74,594.12v648.63L0,1369.4v-648.63l217.74-126.65Z" />
	<path class="bar" d="M502.14,0v1836.88l-217.74,126.65V126.65L502.14,0Z" />
	<path class="bar" d="M786.53,594.12v648.63l-217.74,126.65v-648.63l217.74-126.65Z" />
</svg>
