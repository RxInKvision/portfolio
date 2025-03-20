<script>
	import { slide } from 'svelte/transition';
	
	export let work;
	
	let showDetails = false;
	
	function toggleDetails() {
		showDetails = !showDetails;
	}
</script>

<article class="post">
	<div class="post-image" on:click={toggleDetails}>
		{#if work.image}
			<img src={work.image} alt={work.title} />
		{:else}
			<div class="placeholder">
				<!-- Simplified inline SVG logo -->
				<svg width="40" height="40" viewBox="0 0 100 100">
					<g fill="#FFDE59">
						<rect x="45" y="20" width="10" height="60" />
						<rect x="25" y="40" width="10" height="25" />
						<rect x="65" y="40" width="10" height="25" />
					</g>
				</svg>
			</div>
		{/if}
		<div class="overlay">
			<div class="yellow-marker"></div>
			<h3>{work.title}</h3>
		</div>
	</div>
	
	{#if showDetails}
		<div class="details" transition:slide={{ duration: 300 }}>
			<div class="details-header">
				<h3>{work.title}</h3>
				<button class="close-btn" on:click={toggleDetails}>×</button>
			</div>
			
			<div class="details-content">
				<div class="metadata">
					{#if work.year}
						<span class="year">{work.year}</span>
					{/if}
					
					{#if work.categories && work.categories.length > 0}
						<div class="categories">
							{#each work.categories as category}
								<span class="category">{category}</span>
							{/each}
						</div>
					{/if}
				</div>
				
				{#if work.description}
					<p class="description">{work.description}</p>
				{/if}
				
				{#if work.link}
					<a href={work.link} class="view-project">
						VIEW PROJECT
					</a>
				{/if}
			</div>
		</div>
	{/if}
</article>

<style>
	.post {
		display: flex;
		flex-direction: column;
		border: 1px solid #333;
		background-color: #1E1E1E;
		overflow: hidden;
		transition: transform 0.3s ease;
	}
	
	.post:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}
	
	.post-image {
		position: relative;
		aspect-ratio: 4/3;
		overflow: hidden;
		cursor: pointer;
	}
	
	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	
	.post:hover .post-image img {
		transform: scale(1.05);
	}
	
	.placeholder {
		width: 100%;
		height: 100%;
		background-color: #121212;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 1rem;
		transform: translateY(100%);
		transition: transform 0.3s ease;
		display: flex;
		align-items: center;
	}
	
	.yellow-marker {
		width: 10px;
		height: 2rem;
		background-color: #FFDE59;
		margin-right: 1rem;
	}
	
	.post:hover .overlay {
		transform: translateY(0);
	}
	
	.overlay h3 {
		margin: 0;
		font-size: 0.9rem;
		font-weight: normal;
		color: #FFFFFF;
	}
	
	.details {
		padding: 1.5rem;
		background-color: #1E1E1E;
		border-top: 1px solid #333;
	}
	
	.details-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	
	.details-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: normal;
		color: #FFDE59;
	}
	
	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		line-height: 1;
		padding: 0;
		color: #FFFFFF;
	}
	
	.metadata {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.year {
		color: #7ba77b;
		font-size: 0.8rem;
	}
	
	.categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.category {
		border: 1px solid #7ba77b;
		color: #7ba77b;
		padding: 0.2rem 0.5rem;
		font-size: 0.7rem;
		text-transform: uppercase;
	}
	
	.description {
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}
	
	.view-project {
		display: inline-block;
		border: 1px solid #FFDE59;
		color: #FFDE59;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 0.8rem;
		transition: all 0.3s ease;
	}
	
	.view-project:hover {
		background-color: #FFDE59;
		color: #1E1E1E;
	}
</style>