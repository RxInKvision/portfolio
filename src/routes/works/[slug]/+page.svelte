<script>
	import Post from "$lib/components/Post.svelte";
	
	export let data;
	
	let activeFilter = 'all';
	let categories = ['all'];
	
	// Extract unique categories
	$: if (data && data.works) {
		const uniqueCategories = new Set();
		data.works.forEach(work => {
			if (work.categories) {
				work.categories.forEach(cat => uniqueCategories.add(cat));
			}
		});
		categories = ['all', ...Array.from(uniqueCategories)];
	}
	
	$: filteredWorks = activeFilter === 'all' 
		? data.works 
		: data.works.filter(work => work.categories && work.categories.includes(activeFilter));
</script>

<svelte:head>
	<title>Works | Riccardo Pichi</title>
	<meta name="description" content="Works by Riccardo Pichi - Media Designer | Visual Artist" />
</svelte:head>

<div class="works-page">
	<header class="main-header">
		<div class="logo">
			<a href="/">
				<svg width="40" height="40" viewBox="0 0 100 100">
					<g fill="#FFDE59">
						<rect x="45" y="20" width="10" height="60" />
						<rect x="25" y="40" width="10" height="25" />
						<rect x="65" y="40" width="10" height="25" />
					</g>
				</svg>
			</a>
		</div>
		<nav>
			<ul>
				<li class="active"><a href="/works">WORKS</a></li>
				<li><a href="/about">ABOUT</a></li>
				<li><a href="/contact">CONTACT</a></li>
			</ul>
		</nav>
	</header>

	<section class="intro">
		<h1>
			<span>WORKS</span>
		</h1>
		<p class="subtitle">A selection of recent projects</p>
	</section>
	
	<section class="filters">
		<div class="filter-container">
			{#each categories as category}
				<button 
					class="filter-btn" 
					class:active={activeFilter === category}
					on:click={() => activeFilter = category}
				>
					{category}
				</button>
			{/each}
		</div>
	</section>
	
	<section class="works">
		{#each filteredWorks as work}
			<Post {work} />
		{/each}
	</section>
	
	<footer>
		<div class="footer-content">
			<p class="copyright">&copy; {new Date().getFullYear()} RICCARDO PICHI</p>
			<p class="tagline">THINK IN'INK</p>
		</div>
	</footer>
</div>

<style>
	/* Reset all font styles */
	:global(body), :global(html), :global(*) {
		font-family: 'ABC Favorit Mono', monospace;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	:global(body) {
		background-color: #1E1E1E;
		color: #FFFFFF;
	}
	
	.works-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}
	
	.main-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rem;
	}
	
	.logo {
		flex: 0 0 auto;
	}
	
	.logo a {
		display: block;
		transition: transform 0.3s ease;
	}
	
	.logo a:hover {
		transform: scale(1.1);
	}
	
	nav ul {
		display: flex;
		list-style: none;
		gap: 2rem;
	}
	
	nav a {
		color: #FFFFFF;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}
	
	nav a:hover, nav li.active a {
		color: #FFDE59;
	}
	
	.intro {
		margin-bottom: 4rem;
	}
	
	h1 {
		display: flex;
		flex-direction: column;
		color: #FFDE59;
		font-size: 2.5rem;
		margin: 0;
		font-weight: bold;
	}
	
	.subtitle {
		color: #7ba77b;
		font-size: 1rem;
		margin-top: 0.5rem;
	}
	
	.filters {
		margin-bottom: 2rem;
	}
	
	.filter-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	
	.filter-btn {
		background: transparent;
		border: 1px solid #7ba77b;
		color: #FFFFFF;
		padding: 0.5rem 1rem;
		font-family: inherit;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.filter-btn.active, .filter-btn:hover {
		background-color: #7ba77b;
		color: #1E1E1E;
	}
	
	.works {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}
	
	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid #333;
	}
	
	.footer-content {
		display: flex;
		justify-content: space-between;
	}
	
	.copyright, .tagline {
		font-size: 0.8rem;
	}
	
	.tagline {
		color: #FFDE59;
	}
	
	@media (max-width: 768px) {
		.main-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		
		nav ul {
			gap: 1rem;
		}
		
		.works {
			grid-template-columns: 1fr;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>