<script>
	import { onMount } from 'svelte';
	
	let ready = false;
	let scrollY = 0;
	let mouseX = 0;
	let mouseY = 0;
	
	// References for elements
	let giantLogo;
	let pageContainer;
	let svgLayer1; // Very far layer
	let svgLayer2; // Far layer
	let svgLayer3; // Middle/content layer - keep this one mostly static
	let svgLayer4; // Near layer
	let svgLayer5; // Very near layer
	let mouseMoveEnabled = false;
	let isBackgroundAnimating = false;
	let currentBackground = "yellow"; // Track current background color
	let intervalId; // Store interval ID for stopping animation
	let throttleTimer = false;
	let smoothScrollY = 0; // For smooth scrolling effect
	let lastMouseX = 0; // Track last mouse position for smoother transitions
	let lastMouseY = 0;
	
	// Enable animations after initial load
	onMount(() => {
		// Update CSS variables to match our needs
		document.documentElement.style.setProperty('--background-color', '#FFE964');
		document.documentElement.style.setProperty('--text-color', '#1A1A1A');
		
		// Setup smooth scrolling and continuous animation
		setupSmoothAnimations();
		
		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				mouseMoveEnabled = true;
				startBackgroundAnimation();
			}, 1000);
		}, 500);
	});
	
	// Setup smooth scroll and continuous animation loop
	function setupSmoothAnimations() {
		// Initial values
		smoothScrollY = window.scrollY;
		
		// Smooth animation loop for both scroll and mouse movement
		function animationLoop() {
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
	
	// Update pattern positions based on mouse and scroll
	function updatePatternPositions() {
		// Very far layer - most movement
		if (svgLayer1) {
			svgLayer1.style.transform = `translate(${lastMouseX * 50}px, ${lastMouseY * 50 + smoothScrollY * 0.2}px) rotate(${smoothScrollY * 0.01}deg)`;
		}
		
		// Far layer - significant movement
		if (svgLayer2) {
			svgLayer2.style.transform = `translate(${lastMouseX * 40}px, ${lastMouseY * 40 + smoothScrollY * 0.15}px)`;
		}
		
		// Middle/content layer - slight movement
		if (svgLayer3) {
			svgLayer3.style.transform = `translate(${lastMouseX * 20}px, ${lastMouseY * 20 + smoothScrollY * 0.1}px)`;
		}
		
		// Near layer - opposite movement
		if (svgLayer4) {
			svgLayer4.style.transform = `translate(${lastMouseX * -30}px, ${lastMouseY * -30 - smoothScrollY * 0.12}px) rotate(${-smoothScrollY * 0.005}deg)`;
		}
		
		// Very near layer - most opposite movement
		if (svgLayer5) {
			svgLayer5.style.transform = `translate(${lastMouseX * -45}px, ${lastMouseY * -45 - smoothScrollY * 0.18}px)`;
		}
		
		// Apply subtle movement to the logo
		if (giantLogo) {
			giantLogo.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15}px)`;
		}
	}
	
	// Background animation with SVG fill adjustment
	function startBackgroundAnimation() {
		if (isBackgroundAnimating) return;
		isBackgroundAnimating = true;
		
		// Flash between colors
		intervalId = setInterval(() => {
			// Toggle between yellow and black
			if (currentBackground === "yellow") {
				// Update to black background
				document.documentElement.style.setProperty('--background-color', '#1A1A1A');
				document.documentElement.style.setProperty('--text-color', '#FFE964');
				currentBackground = "black";
				
				if (pageContainer) {
					pageContainer.classList.add('dark-mode');
					pageContainer.classList.remove('light-mode');
				}
				
				// Update all SVG fills when background is black
				const allLogos = document.querySelectorAll('.responsive-svg');
				allLogos.forEach(logo => {
					logo.classList.add('on-dark');
					logo.classList.remove('on-light');
				});
			} else {
				// Update to yellow background
				document.documentElement.style.setProperty('--background-color', '#FFE964');
				document.documentElement.style.setProperty('--text-color', '#1A1A1A');
				currentBackground = "yellow";
				
				if (pageContainer) {
					pageContainer.classList.add('light-mode');
					pageContainer.classList.remove('dark-mode');
				}
				
				// Update all SVG fills when background is yellow
				const allLogos = document.querySelectorAll('.responsive-svg');
				allLogos.forEach(logo => {
					logo.classList.add('on-light');
					logo.classList.remove('on-dark');
				});
			}
		}, 300); // Flash speed - adjust for more/less intensity
	}
	
	// Function to stop background animation
	function stopBackgroundAnimation() {
		if (!isBackgroundAnimating) return;
		clearInterval(intervalId);
		isBackgroundAnimating = false;
	}
	
	// Function to toggle animation
	function toggleAnimation() {
		if (isBackgroundAnimating) {
			stopBackgroundAnimation();
		} else {
			startBackgroundAnimation();
		}
	}
	
	// Throttled mouse movement handler for smoother tracking
	function handleMouseMove(e) {
		if (!mouseMoveEnabled || throttleTimer) return;
		
		// Throttle mouse movement events for better performance
		throttleTimer = true;
		setTimeout(() => {
			throttleTimer = false;
		}, 20);
		
		// Calculate mouse position relative to center of window (-1 to 1 range)
		mouseX = (e.clientX / window.innerWidth) * 2 - 1;
		mouseY = (e.clientY / window.innerHeight) * 2 - 1;
		
		// Note: We don't apply positions directly here anymore
		// Instead, the continuous animation loop uses these values
	}
</script>

<svelte:head>
	<style>
		/* Override body styles at a higher specificity */
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
		
		h1, h2, h3, p, a, {
			transition: color 0.00s ease !important;
		}
	</style>
</svelte:head>

<svelte:window bind:scrollY on:mousemove={handleMouseMove}/>

<div class="landing-page" bind:this={pageContainer} class:light-mode={currentBackground === "yellow"} class:dark-mode={currentBackground === "black"}>
	<!-- SVG Pattern Background Layers -->
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

	<!-- Toggle Animation Button -->
	<button class="toggle-animation-btn" on:click={toggleAnimation}>
		{isBackgroundAnimating ? 'STOP ANIMATION' : 'START ANIMATION'}
	</button>

	<!-- Hero Section with 3D Logo and Giant Logotype -->
	<div class="hero">
		<div class="hero-content">
			<!-- Giant Logotype with subtle movement animation -->
			<div class="giant-logotype-container" class:active={ready} bind:this={giantLogo}>
				<img src="/images/logotype.svg" alt="RxInK Logotype" class="giant-logotype responsive-svg on-light" />
			</div>
			
			<div class="title-container" class:active={ready}>
				<h2>
					RICCARDO PICHI
				</h2>
			</div>
			
			<div class="subtitle-container" class:active={ready}>
				<h3>MEDIA DESIGNER | VISUAL ARTIST</h3>
			</div>
		</div>
	</div>
	
	<!-- Navigation -->
	<nav class="main-nav">
		<div class="nav-logo">
			<a href="/">
				<img src="/images/pictogram.svg" alt="RxInK Logo" class="responsive-svg on-light" />
			</a>
		</div>
		<ul class="nav-links">
			<li><a href="/works">WORKS</a></li>
			<li><a href="/about">ABOUT</a></li>
			<li><a href="/contact">CONTACT</a></li>
		</ul>
	</nav>
	
	<!-- Rest of your page content -->
	<!-- About Section -->
	<section class="about-section" id="about">
		<div class="about-content">
			<div class="text-container" class:visible={scrollY > 200}>
				<p class="tagline">THINK IN'INK</p>
				<p class="description">
					I create <span class="highlight">immersive experiences</span> that blend technology, 
					aesthetics, and human perception, transforming spaces into 
					dynamic narratives.
				</p>
			</div>
		</div>
	</section>
	
	<!-- Works Preview Section with Cards -->
	<section class="works-preview" id="works-preview">
		<h2 class="section-title">SELECTED WORKS</h2>
		
		<div class="works-cards">
			<div class="work-card">
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image image1"></div>
						<div class="work-title">
							<h3>Live Visual Performance</h3>
						</div>
					</div>
					<div class="card-back">
						<p>Real-time visual performance system for live music events</p>
						<a href="/works" class="view-btn">View Work</a>
					</div>
				</div>
			</div>
			
			<div class="work-card">
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image image2"></div>
						<div class="work-title">
							<h3>Interactive Installation</h3>
						</div>
					</div>
					<div class="card-back">
						<p>Motion-reactive projection mapping installation</p>
						<a href="/works" class="view-btn">View Work</a>
					</div>
				</div>
			</div>
			
			<div class="work-card">
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image image3"></div>
						<div class="work-title">
							<h3>Brand Identity System</h3>
						</div>
					</div>
					<div class="card-back">
						<p>Comprehensive visual identity for tech startup</p>
						<a href="/works" class="view-btn">View Work</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- CTA Section -->
	<section class="cta-section">
		<div class="cta-content" class:visible={scrollY > 1000}>
			<h2>WANNA SEE MORE?</h2>
			<div class="logo-accent">
				<img src="/images/full-logo.svg" alt="RxInK Logo" class="cta-logo responsive-svg on-light" />
			</div>
			<div class="cta-buttons">
				<a href="/works" class="cta-button">EXPLORE WORKS</a>
				<a href="/contact" class="cta-button outline">GET IN TOUCH</a>
			</div>
		</div>
	</section>
	
	<footer>
		<div class="footer-content">
			<p class="copyright">&copy; {new Date().getFullYear()} RICCARDO PICHI</p>
			<p class="tagline">THINK IN INK</p>
		</div>
	</footer>
</div>

<style>
	/* Color mode classes */
	.light-mode {
		--page-bg: #FFE964;
		--page-text: #1A1A1A;
		--page-accent: #62A87C;
	}
	
	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #62A87C;
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
	
	/* SVG Pattern Background Styles - More subtle and fluid */
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
		transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1); /* Super smooth transitions */
		will-change: transform;
		pointer-events: none;
	}
	
	/* Five layers with reduced opacity */
	.svg-layer-1 {
		z-index: 1; /* Very far layer */
		opacity: 0.01; /* Much lower opacity */
	}
	
	.svg-layer-2 {
		z-index: 2; /* Far layer */
		opacity: 0.015;
	}
	
	.svg-layer-3 {
		z-index: 3; /* Content layer */
		opacity: 0.02;
	}
	
	.svg-layer-4 {
		z-index: 4; /* Near layer */
		opacity: 0.015;
	}
	
	.svg-layer-5 {
		z-index: 5; /* Very near layer */
		opacity: 0.01;
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
	.light-mode .svg-pattern {
		filter: brightness(0) saturate(100%); /* Black in light mode */
	}
	
	.dark-mode .svg-pattern {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%) contrast(103%); /* Yellow in dark mode */
	}
	
	/* Toggle animation button */
	.toggle-animation-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		padding: 10px 15px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		border: 2px solid var(--page-accent);
		font-family: 'ABC Favorit Mono', monospace;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.toggle-animation-btn:hover {
		background-color: #1A1A1A;
		transform: translateY(-3px);
	}
	
	.landing-page {
		min-height: 300vh;
		overflow-x: hidden;
		position: relative;
	}
	
	/* Hero Section */
	.hero {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 1;
	}
	
	.hero-content {
		text-align: center;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	
	/* Giant logotype styles - with optimized animation properties */
	.giant-logotype-container {
		margin: 0 auto 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 1s ease 0.2s;
		width: 80%;
		max-width: 800px;
		/* Smooth transition for the mouse movement */
		transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
	}
	
	.giant-logotype-container.active {
		opacity: 1;
		transform: translateY(0);
	}
	
	.giant-logotype {
		width: 100%;
		height: auto;
		will-change: transform; /* Optimize for animation performance */
	}
	
	.title-container {
		margin: 2rem 0;
		opacity: 0;
		transform: translateY(20px);
	}
	
	.title-container.active {
		opacity: 1;
		transform: translateY(0);
	}
	
	h1 {
		font-size: 5rem;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		line-height: 1.2;
	}
	
	.subtitle-container {
		opacity: 0;
		transform: translateY(20px);
	}
	
	.subtitle-container.active {
		opacity: 1;
		transform: translateY(0);
	}
	
	h2 {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 0;
	}
	
	/* Navigation */
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
	}
	
	.nav-logo img {
		width: 40px;
		height: 40px;
		transition: transform 0.3s ease;
	}
	
	.nav-logo:hover img {
		transform: scale(1.1);
	}
	
	.nav-links {
		display: flex;
		list-style: none;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}
	
	.nav-links a {
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
		font-weight: bold;
	}
	
	.nav-links a:hover {
		text-decoration: underline;
	}
	
	/* Enhanced navbar animations using accent color */

.nav-links li {
  position: relative;
  transition: transform 0.3s ease;
}

.nav-links li:hover {
  transform: translateY(-2px);
}

.nav-links a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  transition: color 0.3s ease;
}

/* Animated underline effect */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--page-accent);
  transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0;
}

.nav-links a:hover::after {
  width: 100%;
  opacity: 1;
}

/* Subtle glow effect on hover */
.nav-links a:hover {
  color: var(--page-accent);
  text-shadow: 0 0 8px rgba(98, 168, 124, 0.4);
}

/* Add this to your existing styles or replace the current .nav-links a:hover */
.nav-links a:hover {
  text-decoration: none;
}
	/* About Section */
	.about-section {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		position: relative;
		z-index: 2;
	}
	
	.about-content {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.text-container {
		opacity: 0;
		transform: translateY(50px);
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1); /* Smoother animation */
	}
	
	.text-container.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.tagline {
		font-size: 2rem;
		margin-bottom: 1rem;
		font-weight: bold;
	}
	
	.description {
		font-size: 1.5rem;
		line-height: 1.6;
	}
	
	.highlight {
		font-weight: bold;
		text-decoration: underline;
	}
	
	/* Works Preview Section */
	.works-preview {
		min-height: 100vh;
		padding: 4rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 2;
	}
	
	.section-title {
		font-size: 2.5rem;
		margin-bottom: 4rem;
		text-align: center;
		font-weight: bold;
	}
	
	.works-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 3rem;
		width: 100%;
		max-width: 1200px;
	}
	
	.work-card {
		width: 300px;
		height: 400px;
		perspective: 1000px;
	}
	
	.work-card:hover .card-inner {
		transform: rotateY(180deg);
	}
	
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1); /* Smoother card flip */
		transform-style: preserve-3d;
	}
	
	.card-front, .card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: rgba(0, 0, 0, 0.8);
		border: 1px solid var(--page-accent);
		display: flex;
		flex-direction: column;
	}
	
	.card-back {
		transform: rotateY(180deg);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.card-back p {
		color: #FFE964;
	}
	
	.work-image {
		flex: 1;
		background-size: cover;
		background-position: center;
	}
	
	.image1 {
		background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/static/images/logotype.svg');
	}
	
	.image2 {
		background-color: #111;
		background-image: radial-gradient(circle at 30% 40%, #FFE964 5px, transparent 5px),
		                  radial-gradient(circle at 70% 60%, #1A1A1A 8px, transparent 8px);
	}
	
	.image3 {
		background-color: #111;
		background-image: linear-gradient(45deg, transparent 48%, #FFE964 48%, #FFE964 52%, transparent 52%);
		background-size: 20px 20px;
	}
	
	.work-title {
		background: #000000;
		padding: 1rem;
		border-top: 1px solid #333;
	}
	
	.work-title h3 {
		margin: 0;
		color: #ffffff;
		font-size: 1.1rem;
		font-weight: normal;
	}
	
	.view-btn {
		display: inline-block;
		background-color: #ffffff;
		color: #000000;
		padding: 0.8rem 1.5rem;
		margin-top: 2rem;
		text-decoration: none;
		font-weight: bold;
		transition: all 0.3s ease;
	}
	
	.view-btn:hover {
		background-color: #FFE964;
		transform: translateY(-3px);
	}
	
	/* CTA Section */
	.cta-section {
		min-height: 70vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
		position: relative;
		z-index: 2;
	}
	
	.cta-content {
		opacity: 0;
		transform: translateY(50px);
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
		max-width: 800px;
	}
	
	.cta-content.visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.cta-content h2 {
		font-size: 1.5 rem;
		margin-bottom: 2rem;
		font-weight: bold;
	}
	
	.logo-accent {
		margin: 2rem auto;
	}
	
	.cta-logo {
		
		animation: pulse 10s infinite;
	}
	
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.1); }
		100% { transform: scale(1); }
	}
	
	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}
	
	.cta-button {
		display: inline-block;
		padding: 1rem 2rem;
		background-color: #000000;
		color: #ffffff;
		font-size: 1rem;
		font-weight: bold;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	
	.cta-button:hover {
		transform: translateY(-5px);
	}
	
	.cta-button.outline {
		background-color: transparent;
		border: 2px solid var(--page-accent);
		color: var(--page-text);
	}
	
	/* Footer */
	footer {
		padding: 3rem 2rem;
		border-top: 1px solid var(--page-accent);
		position: relative;
		z-index: 2;
	}
	
	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.copyright {
		font-size: 0.8rem;
		font-weight: bold;
	}
	
	.tagline {
		font-size: 0.8rem;
		font-weight: bold;
	}
	
	/* Responsive Adjustments */
	@media (max-width: 768px) {
		h1 {
			font-size: 3rem;
		}
		
		.description {
			font-size: 1.2rem;
		}
		
		.works-cards {
			flex-direction: column;
			align-items: center;
		}
		
		.main-nav {
			padding: 1rem;
		}
		
		.nav-links {
			gap: 1rem;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		
		.giant-logotype-container {
			width: 90%;
		}
		
		.toggle-animation-btn {
			bottom: 10px;
			right: 10px;
			padding: 8px 12px;
			font-size: 0.8rem;
		}
		
		/* Adjust pattern movement for mobile */
		.svg-layer {
			transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
			top: -100%;
			left: -100%;
			width: 300%;
			height: 300%;
		}
		
		/* Reduce pattern size on mobile */
		.bg-far {
			background-size: 400px auto;
		}
		
		.bg-medium-far {
			background-size: 300px auto;
		}
		
		.bg-middle {
			background-size: 150px auto;
		}
		
		.bg-medium-near {
			background-size: 180px auto;
		}
		
		.bg-near {
			background-size: 70px auto;
		}
	}
</style>