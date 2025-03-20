<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Handle page transitions
	let loaded = false;

	onMount(() => {
		// Set loaded to true after a short delay to allow for smooth animation
		setTimeout(() => {
			loaded = true;
		}, 500);
	});
</script>

<svelte:head>
	<style>
		@font-face {
			font-family: 'ABC Favorit Mono';
			src: url('/fonts/ABCFavoritMono-Regular-Trial.woff2') format('woff2');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}
		
		@font-face {
			font-family: 'ABC Favorit Mono';
			src: url('/fonts/ABCFavoritMono-Bold-Trial.woff2') format('woff2');
			font-weight: bold;
			font-style: normal;
			font-display: swap;
		}
		
		:root {
			--primary-color: #FFDE59;
			--secondary-color: #7BA77B;
			--background-color: #1E1E1E;
			--text-color: #FFFFFF;
			--border-color: #333333;
		}
		
		/* Global reset */
		*, *::before, *::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		
		/* Font reset - ensures ABC Favorit Mono is used everywhere */
		html, body, button, input, textarea, select {
			font-family: 'ABC Favorit Mono', monospace !important;
		}
		
		body {
			background-color: var(--background-color);
			color: var(--text-color);
			line-height: 1.6;
			overflow-x: hidden;
		}
		
		a {
			color: inherit;
			text-decoration: none;
		}
		
		img {
			max-width: 100%;
			height: auto;
			display: block;
		}
	</style>
</svelte:head>

<div class="app">
	{#if loaded}
		<main transition:fade={{ duration: 500 }}>
			<slot />
		</main>
	{:else}
		<div class="loader">
			<div class="logo-animation">
				<svg viewBox="0 0 100 60" width="100" height="60">
					<g fill="#FFDE59">
						<rect x="45" y="20" width="10" height="60" />
						<rect x="25" y="40" width="10" height="25" />
						<rect x="65" y="40" width="10" height="25" />
					</g>
				</svg>
			</div>
			<p>THINK IN'INK</p>
		</div>
	{/if}
</div>

<style>
	.app {
		min-height: 100vh;
		position: relative;
	}
	
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #1E1E1E;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	
	.logo-animation {
		margin-bottom: 1rem;
	}
	
	.loader p {
		font-size: 1.2rem;
		font-weight: bold;
		letter-spacing: 0.1em;
		color: #FFE964;
	}
</style>