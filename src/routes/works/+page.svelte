<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { worksData } from '$lib/works-data';
	import Navbar from '$lib/components/Navbar.svelte';
	
	
	let ready = false;
	let scrollY = 0;
	let mouseX = 0;
	let mouseY = 0;
	
	// References for elements
	let pageContainer;
	let svgLayer1; // Very far layer
	let svgLayer2; // Far layer
	let svgLayer3; // Middle/content layer - keep this one mostly static
	let svgLayer4; // Near layer
	let svgLayer5; // Very near layer
	
	let activeFilter = 'all';
	let categories = ['all'];
	
	// Extract unique categories
	$: if (worksData) {
		const uniqueCategories = new Set();
		worksData.forEach(work => {
			if (work.categories) {
				work.categories.forEach(cat => uniqueCategories.add(cat));
			}
		});
		categories = ['all', ...Array.from(uniqueCategories)];
	}
	
	$: filteredWorks = activeFilter === 'all' 
		? worksData 
		: worksData.filter(work => work.categories && work.categories.includes(activeFilter));
	
	let mouseMoveEnabled = false;
	let currentBackground = "black"; // Default to dark mode
	let throttleTimer = false;
	let smoothScrollY = 0; // For smooth scrolling effect
	let lastMouseX = 0; // Track last mouse position for smoother transitions
	let lastMouseY = 0;
	let lastScrollY = 0; // Track last scroll position for delta calculation
	
	// Navigate to project page
	function navigateToProject(project) {
		goto(project.link);
	}
	
	// Enable animations after initial load
	onMount(() => {
		// Set the dark mode as default
		document.documentElement.style.setProperty('--background-color', '#1A1A1A');
		document.documentElement.style.setProperty('--text-color', '#FFE964');
		
		// Apply dark mode to the container
		if (pageContainer) {
			pageContainer.classList.add('dark-mode');
			pageContainer.classList.remove('light-mode');
		}
		
		// Update all SVG fills for dark mode
		const allLogos = document.querySelectorAll('.responsive-svg');
		allLogos.forEach(logo => {
			logo.classList.add('on-dark');
			logo.classList.remove('on-light');
		});
		
		// Setup smooth scrolling and continuous animation
		setupSmoothAnimations();
				
		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				mouseMoveEnabled = true;
			}, 600); // Faster enable of mouse movement
		}, 300); // Faster initial load
	});
	
	// Setup smooth scroll and continuous animation loop
	function setupSmoothAnimations() {
		// Initial values
		smoothScrollY = window.scrollY;
		lastScrollY = window.scrollY;
		
		// Smooth animation loop for both scroll and mouse movement
		function animationLoop() {
			// Calculate scroll velocity (delta between current and last scroll position)
			const scrollDelta = window.scrollY - lastScrollY;
			lastScrollY = window.scrollY;
			
			// Gradually approach the target scroll position (LERP)
			smoothScrollY += (window.scrollY - smoothScrollY) * 0.05;
			
			// Gradually approach the target mouse position (LERP)
			if (mouseMoveEnabled) {
				lastMouseX += (mouseX - lastMouseX) * 0.1;
				lastMouseY += (mouseY - lastMouseY) * 0.1;
			}
			
			// Apply smoother animations to elements
			if (ready) {
				// Update positions based on smooth values
				updatePatternPositions();
			}
			
			requestAnimationFrame(animationLoop);
		}
		
		// Start the animation loop
		animationLoop();
	}
	
	// Update pattern positions based on mouse, scroll with smoother animation
	function updatePatternPositions() {
		// Very far layer - more subtle movement
		if (svgLayer1) {
			svgLayer1.style.transform = `translate(${lastMouseX * 20}px, ${lastMouseY * 20 + smoothScrollY * 0.08}px) rotate(${smoothScrollY * 0.002}deg)`;
		}
		
		// Far layer - moderate movement
		if (svgLayer2) {
			svgLayer2.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.06}px)`;
		}
		
		// Middle/content layer - very slight movement
		if (svgLayer3) {
			svgLayer3.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10 + smoothScrollY * 0.04}px)`;
		}
		
		// Near layer - subtle opposite movement
		if (svgLayer4) {
			svgLayer4.style.transform = `translate(${lastMouseX * -12}px, ${lastMouseY * -12 - smoothScrollY * 0.05}px) rotate(${-smoothScrollY * 0.001}deg)`;
		}
		
		// Very near layer - slight opposite movement
		if (svgLayer5) {
			svgLayer5.style.transform = `translate(${lastMouseX * -15}px, ${lastMouseY * -15 - smoothScrollY * 0.07}px)`;
		}
	}
	
	// Enhanced mouse movement handler for more responsive repulsion
	function handleMouseMove(e) {
		if (!mouseMoveEnabled || throttleTimer) return;
		
		// Less throttling for more responsive movement
		throttleTimer = true;
		setTimeout(() => {
			throttleTimer = false;
		}, 5); // Even less throttle time for better responsiveness
		
		// Calculate mouse position relative to center of window (-1 to 1 range)
		mouseX = (e.clientX / window.innerWidth) * 2 - 1;
		mouseY = (e.clientY / window.innerHeight) * 2 - 1;
	}
</script>

<svelte:head>
	<title>Works | Riccardo Pichi</title>
	<meta name="description" content="Works by Riccardo Pichi - Media Designer | Visual Artist" />
	<style>
		body {
			background-color: var(--background-color) !important;
			color: var(--text-color) !important;
			transition: background-color 0.05s ease, color 0.05s ease !important;
			overflow-x: hidden; /* Prevent horizontal scrolling */
			scroll-behavior: smooth; /* Native smooth scrolling */
		}
		
		html {
			scroll-behavior: smooth; /* Native smooth scrolling */
		}
		
		h1, h2, h3, p, a {
			transition: color 0.00s ease !important;
		}
	</style>
</svelte:head>

<svelte:window bind:scrollY on:mousemove={handleMouseMove}/>

<div class="works-page" bind:this={pageContainer} class:dark-mode={currentBackground === "black"}>
	<!-- SVG Background Layers -->
	<div class="svg-background-container">
		<!-- Layer 1 (very far) - Large sparse patterns -->
		<div class="svg-layer svg-layer-1" bind:this={svgLayer1}>
			<div class="svg-pattern bg-far"></div>
		</div>
		
		<!-- Layer 2 (far) - Medium patterns -->
		<div class="svg-layer svg-layer-2" bind:this={svgLayer2}>
			<div class="svg-pattern bg-medium-far"></div>
		</div>
		
		<!-- Layer 3 (content layer) - Stable main content -->
		<div class="svg-layer svg-layer-3" bind:this={svgLayer3}>
			<div class="svg-pattern bg-middle"></div>
		</div>
		
		<!-- Layer 4 (near) - Near patterns -->
		<div class="svg-layer svg-layer-4" bind:this={svgLayer4}>
			<div class="svg-pattern bg-medium-near"></div>
		</div>
		
		<!-- Layer 5 (very near) - Very near patterns -->
		<div class="svg-layer svg-layer-5" bind:this={svgLayer5}>
			<div class="svg-pattern bg-near"></div>
		</div>
	</div>

<Navbar />
	
	<!-- Works Header -->
	<header class="works-header appear always-visible">
		<h1>WORKS</h1>
		<p class="subtitle">A curated selection of my projects</p>
		
		<!-- Category Filters -->
		<div class="filters">
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
		</div>
	</header>
	
	<!-- Works Grid -->
	<section class="works-grid appear always-visible">
		{#each filteredWorks as work}
			<div class="work-card" on:click={() => navigateToProject(work)}>
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image" style="background-image: url({work.image || `/images/cards/${work.categories?.[0]?.toLowerCase().replace(/\s+/g, '') || 'branding'}.png`});">
							<div class="work-overlay"></div>
						</div>
						<div class="work-title">
							<h3>{work.title}</h3>
							<span class="work-year">{work.year}</span>
						</div>
					</div>
					<div class="card-back">
						<div class="work-categories">
							{#each work.categories || [] as category}
								<span class="work-category">{category}</span>
							{/each}
						</div>
						<p class="work-description">{work.shortDescription}</p>
						<div class="view-btn">VIEW PROJECT</div>
					</div>
				</div>
			</div>
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
	/* Color mode classes */
	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #4A8D65; /* Subdued green */
		--shape-glow: rgba(74, 141, 101, 0.5); /* Reduced opacity */
		--glass-bg-dark: rgba(255, 255, 255, 0.08); /* Slightly more subtle */
		--accent-opacity: 0.15; /* Lower opacity for accents */
	}
	
	/* SVG color responsiveness */
	:global(.responsive-svg.on-light) {
		filter: brightness(0) saturate(100%); /* Makes SVG black when on yellow */
		transition: filter 0.05s ease;
	}
	
	:global(.responsive-svg.on-dark) {
		/* Precisely calibrated filter to match #FFE964 yellow */
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%) contrast(103%);
		transition: filter 0.05s ease;
	}
	
	/* SVG Pattern Background Styles - Even more subtle and smoother */
	.svg-background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		overflow: hidden;
		pointer-events: none; /* Don't block mouse events */
	}
	
	.svg-layer {
		position: absolute;
		top: -150%; /* Expanded size to avoid pattern repeating during scroll */
		left: -150%;
		width: 400%; /* Make patterns 4x viewport size */
		height: 400%;
		transition: transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1); /* Smoother, more elegant transitions */
		will-change: transform;
		pointer-events: none;
	}
	
	/* Five layers with even lower opacity */
	.svg-layer-1 {
		z-index: 1; /* Very far layer */
		opacity: 0.008; /* Even lower opacity */
	}
	
	.svg-layer-2 {
		z-index: 2; /* Far layer */
		opacity: 0.01;
	}
	
	.svg-layer-3 {
		z-index: 3; /* Content layer */
		opacity: 0.015;
	}
	
	.svg-layer-4 {
		z-index: 4; /* Near layer */
		opacity: 0.01;
	}
	
	.svg-layer-5 {
		z-index: 5; /* Very near layer */
		opacity: 0.008;
	}
	
	/* SVG Pattern Styles - Larger patterns, more subtlety */
	.svg-pattern {
		position: absolute;
		width: 100%;
		height: 100%;
		background-repeat: repeat;
	}
	
	/* Very far background */
	.bg-far {
		background-image: url('/images/full-logo.svg');
		background-size: 600px auto;
		filter: blur(3px); /* More blur for distant objects */
		opacity: 0.7; /* Reduced opacity for depth */
	}
	
	/* Far background */
	.bg-medium-far {
		background-image: url('/images/logotype.svg');
		background-size: 450px auto;
		filter: blur(2px);
		opacity: 0.8;
	}
	
	/* Middle layer - content, more stable */
	.bg-middle {
		background-image: url('/images/pictogram.svg');
		background-size: 200px auto;
		filter: blur(1px);
		opacity: 0.9;
	}
	
	/* Near background */
	.bg-medium-near {
		background-image: url('/images/logotype.svg');
		background-size: 250px auto;
		transform: rotate(45deg);
		filter: blur(2px);
		opacity: 0.8;
	}
	
	/* Very near background */
	.bg-near {
		background-image: url('/images/pictogram.svg');
		background-size: 100px auto;
		filter: blur(3px);
		opacity: 0.7;
	}
	
	/* Responsive fill for pattern SVGs */
	.svg-pattern {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%) contrast(103%); /* Yellow in dark mode */
	}
	
	.works-page {
		min-height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
		padding: 8rem 2rem 4rem;
		position: relative;
	}
	
	.main-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.08); /* More subtle background */
		backdrop-filter: blur(12px); /* Slightly increased blur for smoothness */
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(74, 141, 101, 0.15); /* Even more subtle border */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* Softer shadow */
		transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); /* Smoother transition */
	}
	
	.nav-logo img {
		width: 40px;
		height: 40px;
		transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), 
					filter 0.4s ease;
	}
	
	.nav-logo:hover img {
		transform: scale(1.1) rotate(5deg);
		filter: drop-shadow(0 0 8px var(--page-accent));
	}
	
	/* Nav links container */
	.nav-links {
		display: flex;
		list-style: none;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}
	
	/* Individual nav items */
	.nav-links li {
		position: relative;
		transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
	}
	
	.nav-links li:hover {
		transform: translateY(-3px);
	}
	
	.nav-links li.active a {
		color: var(--page-accent);
	}
	
	/* Nav links styling */
	.nav-links a {
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: bold;
		position: relative;
		padding: 8px 0;
		transition: all 0.3s ease;
	}
	
	/* Subtle underline effect with accent color */
	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px; /* Thinner line */
		background-color: var(--page-accent);
		transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), 
					opacity 0.4s ease;
		opacity: 0;
	}
	
	.nav-links a:hover::after, .nav-links li.active a::after {
		width: 100%;
		opacity: 0.8; /* Slightly more subtle */
		box-shadow: 0 0 6px rgba(74, 141, 101, 0.3); /* More subtle glow */
	}
	
	/* More subtle hover effect */
	.nav-links a:hover {
		color: var(--page-accent);
		text-shadow: 0 0 4px rgba(74, 141, 101, 0.3); /* Reduced shadow */
		letter-spacing: 0.03em; /* Less letter spacing */
	}
	
	/* Works Header Styles */
	.works-header {
		text-align: center;
		margin-bottom: 3rem;
		position: relative;
		z-index: 2;
	}
	
	h1 {
		color: var(--page-accent);
		font-size: 3rem;
		margin: 0;
		line-height: 1.2;
		font-weight: bold;
	}
	
	.subtitle {
		color: var(--page-text);
		font-size: 1rem;
		margin-top: 0.5rem;
		opacity: 0.9;
	}
	
	/* Filters */
	.filters {
		margin: 2rem 0;
	}
	
	.filter-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
	
	.filter-btn {
		background: transparent;
		border: 1px solid var(--page-accent);
		color: var(--page-text);
		padding: 0.5rem 1.2rem;
		font-family: inherit;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.3s ease;
		border-radius: 3px;
		text-transform: uppercase;
	}
	
	.filter-btn.active, .filter-btn:hover {
		background-color: var(--page-accent);
		color: #1a1a1a;
	}
	
	/* Works Grid */
	.works-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2.5rem;
		position: relative;
		z-index: 2;
	}
	
	/* Work Card with Flip Effect */
	.work-card {
		height: 400px;
		perspective: 1500px;
		margin-bottom: 1.5rem;
	}
	
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
		transform-style: preserve-3d;
	}
	
	.work-card:hover .card-inner {
		transform: rotateY(180deg);
	}
	
	.card-front, .card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
	}
	
	.card-front {
		background-color: #000;
		display: flex;
		flex-direction: column;
	}
	
	.card-back {
		background-color: rgba(26, 26, 26, 0.95);
		transform: rotateY(180deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		text-align: center;
	}
	
	.work-image {
		flex: 1;
		background-size: cover;
		background-position: center;
		position: relative;
	}
	
	.work-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
		transition: all 0.3s ease;
	}
	
	.work-card:hover .work-overlay {
		background: linear-gradient(to top, rgba(74, 141, 101, 0.3) 0%, rgba(0,0,0,0) 70%);
	}
	
	.work-title {
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.8);
		border-top: 1px solid rgba(74, 141, 101, 0.2);
	}
	
	.work-title h3 {
		margin: 0;
		color: var(--page-text);
		font-size: 1.1rem;
		font-weight: normal;
	}
	
	.work-year {
		font-size: 0.8rem;
		color: var(--page-accent);
		opacity: 0.8;
	}
	
	/* Card Back Content */
	.work-categories {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
	
	.work-category {
		background-color: rgba(74, 141, 101, 0.15);
		border: 1px solid rgba(74, 141, 101, 0.3);
		color: var(--page-text);
		padding: 0.3rem 0.8rem;
		font-size: 0.7rem;
		border-radius: 2px;
		text-transform: uppercase;
	}
	
	.work-description {
		color: var(--page-text);
		opacity: 0.9;
		font-size: 0.9rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.view-btn {
		display: inline-block;
		background-color: var(--page-accent);
		color: #000;
		padding: 0.7rem 1.5rem;
		text-decoration: none;
		font-weight: bold;
		font-size: 0.8rem;
		transition: all 0.3s ease;
		border-radius: 3px;
	}
	
	.view-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
	
	/* Smoother animation class */
	.appear {
		opacity: 0;
		transform: translateY(20px); /* Less movement */
		transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); /* Smoother, more elegant transition */
	}
	
	.appear.visible, .appear.always-visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	/* Footer */
	footer {
		padding: 3rem 0;
		margin-top: 3rem;
		border-top: 1px solid rgba(74, 141, 101, 0.15);
		position: relative;
		z-index: 2;
	}
	
	.footer-content {
		display: flex;
		justify-content: space-between;
	}
	
	.copyright, .tagline {
		font-size: 0.8rem;
	}
	
	.tagline {
		color: var(--page-accent);
	}
	
	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.works-page {
			padding: 6rem 1.5rem 3rem;
		}
		
		.works-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 1.5rem;
		}
		
		.work-card {
			height: 350px;
		}
		
		.main-nav {
			padding: 1rem;
		}
		
		h1 {
			font-size: 2.5rem;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
	
	@media (max-width: 480px) {
		.works-page {
			padding: 5rem 1rem 2rem;
		}
		
		.works-grid {
			grid-template-columns: 1fr;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		.filter-container {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}
		
		.filter-btn {
			width: 100%;
			max-width: 200px;
		}
	}

	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #4A8D65; /* Subdued green */
		--shape-glow: rgba(74, 141, 101, 0.5); /* Reduced opacity */
		--glass-bg-dark: rgba(255, 255, 255, 0.08); /* Slightly more subtle */
		--accent-opacity: 0.15; /* Lower opacity for accents */
	}
	
	/* Work Card specific hover effects */
	.work-card {
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.work-card:hover {
		transform: scale(1.03);
		box-shadow: 0 15px 30px rgba(0,0,0,0.2);
	}

	.work-card .view-btn {
		display: inline-block;
		background-color: var(--page-accent);
		color: #000;
		padding: 0.7rem 1.5rem;
		text-decoration: none;
		font-weight: bold;
		font-size: 0.8rem;
		transition: all 0.3s ease;
		border-radius: 3px;
		text-align: center;
	}

	.work-card .view-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
</style>