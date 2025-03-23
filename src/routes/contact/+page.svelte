<script>
	import { onMount } from 'svelte';
	
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
	
	let mouseMoveEnabled = false;
	let isBackgroundAnimating = false; // Start with animation off
	let currentBackground = "black"; // Default to dark mode
	let throttleTimer = false;
	let smoothScrollY = 0; // For smooth scrolling effect
	let lastMouseX = 0; // Track last mouse position for smoother transitions
	let lastMouseY = 0;
	let lastScrollY = 0; // Track last scroll position for delta calculation
	
	// Contact form data
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	
	let formSubmitted = false;
	let formError = false;
	
	function handleSubmit() {
		// Simulate form submission
		formSubmitted = true;
		
		// You would typically send the form data to a server here
		console.log('Form submitted:', formData);
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
	<title>Contact | Riccardo Pichi</title>
	<meta name="description" content="Contact Riccardo Pichi - Media Designer and Visual Artist" />
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
		
		h1, h2, h3, p, a {
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

	<!-- Controls removed as electric mode is disabled -->

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
			<li class="active"><a href="/contact">CONTACT</a></li>
		</ul>
	</nav>
	
	<!-- Contact Section -->
	<section class="contact-section">
		<div class="page-header appear always-visible">
			<h1>CONTACT ME</h1>
		</div>
		
		<div class="contact-container appear always-visible">
			<div class="contact-info">
				<div class="info-item appear always-visible">
					<h3>EMAIL</h3>
					<p>rxink.designer@gmail.com</p>
				</div>
				
				<div class="info-item appear always-visible">
					<h3>PHONE</h3>
					<p>+39 392 814 5287</p>
				</div>
				
				<div class="info-item appear always-visible">
					<h3>LOCATION</h3>
					<p>Rome, Italy</p>
				</div>
				
				<div class="socials appear always-visible">
					<h3>FIND ME ON</h3>
					<div class="social-links">
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
						</a>
						<a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M22.875 10.063c-2.442 5.217-8.337 12.319-12.063 12.319-3.672 0-4.203-7.831-6.208-13.043-.987-2.565-1.624-1.976-3.474-.681l-1.128-1.455c2.698-2.372 5.398-5.127 7.057-5.28 1.868-.179 3.018 1.098 3.448 3.832.568 3.593 1.362 9.17 2.748 9.17 1.08 0 3.741-4.424 3.878-6.006.243-2.316-1.703-2.386-3.392-1.663 2.673-8.754 13.793-7.142 9.134 2.807z"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
			
			<div class="contact-form appear always-visible">
				{#if formSubmitted}
					<div class="success-message">
						<h3>Thank you for your message!</h3>
						<p>I'll get back to you as soon as possible.</p>
					</div>
				{:else}
					<form on:submit|preventDefault={handleSubmit}>
						<div class="form-group">
							<label for="name">NAME</label>
							<input 
								type="text" 
								id="name" 
								bind:value={formData.name} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="email">EMAIL</label>
							<input 
								type="email" 
								id="email" 
								bind:value={formData.email} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="subject">SUBJECT</label>
							<input 
								type="text" 
								id="subject" 
								bind:value={formData.subject} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="message">MESSAGE</label>
							<textarea 
								id="message" 
								bind:value={formData.message} 
								rows="6" 
								required
							></textarea>
						</div>
						
						<button type="submit" class="submit-btn">SEND MESSAGE</button>
					</form>
				{/if}
			</div>
		</div>
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
	.light-mode {
		--page-bg: #FFE964;
		--page-text: #1A1A1A;
		--page-accent: #4A8D65; /* Subdued green */
		--shape-glow: rgba(74, 141, 101, 0.5); /* Reduced opacity */
		--glass-bg-light: rgba(255, 255, 255, 0.1);
		--glass-bg-dark: rgba(0, 0, 0, 0.1);
		--accent-opacity: 0.2; /* Lower opacity for accents */
	}
	
	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #4A8D65; /* Subdued green */
		--shape-glow: rgba(74, 141, 101, 0.5); /* Reduced opacity */
		--glass-bg-light: rgba(0, 0, 0, 0.1);
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
	.light-mode .svg-pattern {
		filter: brightness(0) saturate(100%); /* Black in light mode */
	}
	
	.dark-mode .svg-pattern {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%) contrast(103%); /* Yellow in dark mode */
	}
	
	.landing-page {
		min-height: 100vh;
		overflow-x: hidden;
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
		background: rgba(255, 255, 255, 0.08);  /* More subtle white base */
		backdrop-filter: blur(12px); /* Slightly increased blur for smoothness */
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(74, 141, 101, 0.2);  /* More subtle border */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* Softer shadow */
		transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); /* Smoother transition */
	}
	
	/* Dark mode adjustments for navbar */
	.dark-mode .main-nav {
		background: rgba(0, 0, 0, 0.08); /* More subtle background */
		border-bottom: 1px solid rgba(74, 141, 101, 0.15); /* Even more subtle border */
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
	
	/* Contact Page Specific Styles */
	.contact-section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 8rem 2rem 4rem;
		position: relative;
		z-index: 2;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.page-header {
		opacity: 0;
		transform: translateY(30px);
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.page-header.visible, .page-header.always-visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	h1 {
		color: var(--page-accent);
		font-size: 3rem;
		font-weight: bold;
		margin: 0;
		line-height: 1.2;
	}
	
	.contact-container {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
	}
	
	.contact-container.visible, .contact-container.always-visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	.contact-info {
		border-right: 1px solid rgba(98, 168, 124, 0.3);
		padding-right: 2rem;
	}
	
	.info-item {
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
	}
	
	.info-item.visible, .info-item.always-visible {
		opacity: 1;
		transform: translateX(0);
	}
	
	h3 {
		color: var(--page-accent);
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
		font-weight: normal;
	}
	
	.info-item p {
		font-size: 0.9rem;
		margin: 0;
	}
	
	.socials {
		margin-top: 3rem;
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.6s;
	}
	
	.socials.visible, .socials.always-visible {
		opacity: 1;
		transform: translateX(0);
	}
	
	.social-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}
	
	.social-link {
		color: var(--page-accent);
		transition: all 0.3s ease;
	}
	
	.social-link:hover {
		color: var(--page-text);
		transform: translateY(-2px); /* Less movement */
		filter: drop-shadow(0 2px 4px rgba(74, 141, 101, 0.3)); /* More subtle shadow */
	}
	
	.contact-form {
		width: 100%;
		opacity: 0;
		transform: translateX(20px);
		transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.3s;
	}
	
	.contact-form.visible, .contact-form.always-visible {
		opacity: 1;
		transform: translateX(0);
	}
	
	.form-group {
		margin-bottom: 1.5rem;
	}
	
	label {
		display: block;
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		color: var(--page-accent);
	}
	
	input, textarea {
		width: 100%;
		padding: 0.8rem;
		background: transparent;
		border: 1px solid rgba(98, 168, 124, 0.3);
		color: var(--page-text);
		font-family: 'ABC Favorit Mono', monospace;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		border-radius: 4px;
	}
	
	input:focus, textarea:focus {
		outline: none;
		border-color: var(--page-accent);
		box-shadow: 0 0 8px rgba(74, 141, 101, 0.15); /* More subtle focus effect */
	}
	
	.submit-btn {
		background-color: rgba(74, 141, 101, var(--accent-opacity));
		border: 1px solid var(--page-accent);
		color: var(--page-text);
		padding: 1rem 2rem;
		font-family: 'ABC Favorit Mono', monospace;
		font-size: 0.9rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
		border-radius: 4px;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
	
	.submit-btn:hover {
		background-color: rgba(74, 141, 101, 0.3); /* Slightly more visible but still subtle */
		color: var(--page-text);
		transform: translateY(-2px); /* Less extreme movement */
		box-shadow: 0 4px 12px rgba(74, 141, 101, 0.2); /* More subtle shadow */
	}
	
	.success-message {
		background-color: rgba(74, 141, 101, var(--accent-opacity));
		border: 1px solid var(--page-accent);
		padding: 2rem;
		text-align: center;
		border-radius: 8px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	
	.success-message h3 {
		color: var(--page-text);
		margin-bottom: 1rem;
		font-size: 1.2rem;
		font-weight: bold;
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
	
	footer {
		padding: 3rem 2rem;
		border-top: 1px solid rgba(74, 141, 101, 0.15); /* More subtle border */
		position: relative;
		z-index: 2;
		max-width: 1200px;
		margin: 0 auto;
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
	
	/* Responsive adjustments */
	@media (max-width: 768px) {
		/* Contact page responsive */
		.contact-container {
			grid-template-columns: 1fr;
		}
		
		.contact-info {
			border-right: none;
			border-bottom: 1px solid rgba(74, 141, 101, 0.15);
			padding-right: 0;
			padding-bottom: 2rem;
			margin-bottom: 2rem;
		}
		
		.main-nav {
			padding: 1rem;
			backdrop-filter: blur(8px);
		}
		
		.nav-links {
			gap: 1rem;
		}
		
		.nav-links a {
			font-size: 0.8rem;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		
		/* Adjust pattern movement for mobile */
		.svg-layer {
			transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
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
		
		h1 {
			font-size: 2.4rem;
		}
	}
	
	@media (max-width: 480px) {
		/* Contact page adjustments */
		.contact-section {
			padding: 6rem 1rem 3rem;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		.submit-btn {
			width: 100%;
			padding: 0.8rem;
		}
		
		.form-group {
			margin-bottom: 1rem;
		}
		
		.info-item {
			margin-bottom: 1.5rem;
		}
		
		.socials {
			margin-top: 2rem;
		}
	}
</style>