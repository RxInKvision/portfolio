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
	let currentBackground = "black"; // Default to dark mode
	let throttleTimer = false;
	let smoothScrollY = 0; // For smooth scrolling effect
	let lastMouseX = 0; // Track last mouse position for smoother transitions
	let lastMouseY = 0;
	let lastScrollY = 0; // Track last scroll position for delta calculation
	
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
	<title>About | Riccardo Pichi</title>
	<meta name="description" content="About Riccardo Pichi - Media Designer and Visual Artist" />
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

<div class="landing-page" bind:this={pageContainer} class:dark-mode={currentBackground === "black"}>
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

	<!-- Navigation -->
	<nav class="main-nav">
		<div class="nav-logo">
			<a href="/">
				<img src="/images/pictogram.svg" alt="RxInK Logo" class="responsive-svg on-light" />
			</a>
		</div>
		<ul class="nav-links">
			<li><a href="/works">WORKS</a></li>
			<li class="active"><a href="/about">ABOUT</a></li>
			<li><a href="/contact">CONTACT</a></li>
		</ul>
	</nav>
	
	<!-- About Section -->
	<div class="about-container appear always-visible">
		<div class="about-sidebar">
			<div class="profile-section">
				<div class="profile-image-container">
					<img src="/images/profile/riccardo-pichi.jpg" alt="Riccardo Pichi" class="profile-image" />
					<div class="profile-accent"></div>
				</div>
				
				<div class="sidebar-section">
					<h3>FIND ME</h3>
					<ul class="sidebar-list contact-list">
						<li>
							<div class="icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
								</svg>
							</div>
							<span>rxink.designer@gmail.com</span>
						</li>
						<li>
							<div class="icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/>
								</svg>
							</div>
							<span>Rome | Berlin</span>
						</li>
					</ul>
					
					<div class="social-links">
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
						</a>
						<a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M22.875 10.063c-2.442 5.217-8.337 12.319-12.063 12.319-3.672 0-4.203-7.831-6.208-13.043-.987-2.565-1.624-1.976-3.474-.681l-1.128-1.455c2.698-2.372 5.398-5.127 7.057-5.28 1.868-.179 3.018 1.098 3.448 3.832.568 3.593 1.362 9.17 2.748 9.17 1.08 0 3.741-4.424 3.878-6.006.243-2.316-1.703-2.386-3.392-1.663 2.673-8.754 13.793-7.142 9.134 2.807z"/>
							</svg>
						</a>
					</div>
				</div>
				
				<div class="sidebar-section">
					<h3>I SPEAK</h3>
					<div class="language-bars">
						<div class="language-bar">
							<span class="language-name">ITALIAN</span>
							<div class="bar-container">
								<div class="bar-fill" style="width: 100%"></div>
							</div>
						</div>
						<div class="language-bar">
							<span class="language-name">ENGLISH</span>
							<div class="bar-container">
								<div class="bar-fill" style="width: 95%"></div>
							</div>
						</div>
						<div class="language-bar">
							<span class="language-name">SPANISH</span>
							<div class="bar-container">
								<div class="bar-fill" style="width: 85%"></div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="sidebar-section tags-section">
					<h3>CORE SKILLS</h3>
					<div class="skill-tags">
						<span class="skill-tag">AUDIOVISUAL INTERACTION</span>
						<span class="skill-tag">MOTION DESIGN</span>
						<span class="skill-tag">ANIMATION</span>
						<span class="skill-tag">VISUAL IDENTITY</span>
						<span class="skill-tag">PROJECTION MAPPING</span>
						<span class="skill-tag">CREATIVE CODING</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="about-content">
			<div class="page-header">
				<div class="name-container">
					<h1>RICCARDO PICHI</h1>
					<div class="position-text">MEDIA DESIGNER | VISUAL ARTIST</div>
				</div>
				<div class="header-accent"></div>
			</div>
			
			<div class="story-section">
				<h2 class="section-title">MY JOURNEY</h2>
				
				<div class="story-content">
					<p class="narrative">
						I'm constantly drawn to the space <span class="highlight">where technology and artistry collide</span>. 
						My earliest memories involve deconstructing visual media, wondering how images could move, 
						transform, and evoke emotion. This curiosity evolved into a obsession with creating 
						moments that transcend the ordinary.
					</p>
					
					<div class="story-block">
						<p>
							I discovered my path when attending my first audiovisual performance in Berlin. The way light, motion, 
							and sound synchronized to create an immersive experience completely shifted my perspective on what design could be.
							It wasn't just about aesthetics – it was about <span class="highlight">creating environments that transport people</span>.
						</p>
					</div>
					
					<div class="journey-milestone">
						<div class="milestone-dot"></div>
						<div class="milestone-content">
							<h3>The Beginning</h3>
							<p>
								My journey into media design began through experimentation with motion graphics and visual processing. 
								While studying at IED Rome, I developed a fascination with how technology could transform spaces and 
								perceptions. Every project became an opportunity to push boundaries between the digital and physical worlds.
							</p>
						</div>
					</div>
					
					<div class="journey-milestone">
						<div class="milestone-dot"></div>
						<div class="milestone-content">
							<h3>Finding My Voice</h3>
							<p>
								Working at Villa Medici as a cultural mediator taught me the importance of context and narrative. 
								I learned how to translate complex artistic concepts for different audiences – a skill that now 
								defines my approach to every visual experience I create.
							</p>
						</div>
					</div>
					
					<div class="journey-milestone">
						<div class="milestone-dot"></div>
						<div class="milestone-content">
							<h3>The Present</h3>
							<p>
								Today, I blend technical expertise with artistic vision to craft immersive experiences across 
								platforms. Whether I'm creating live visuals for a performance in Berlin or developing a brand's 
								visual identity, my work centers on creating <span class="highlight">meaningful connections through visual storytelling</span>.
							</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="philosophy-section">
				<h2 class="section-title">MY APPROACH</h2>
				
				<div class="philosophy-content">
					<div class="philosophy-grid">
						<div class="philosophy-item">
							<h3>SPATIAL THINKING</h3>
							<p>
								I approach each project as an environment to be shaped and experienced, considering how viewers will move through and interact with the visual narrative.
							</p>
						</div>
						
						<div class="philosophy-item">
							<h3>TECHNICAL PRECISION</h3>
							<p>
								Behind every creative vision is meticulous technical execution. I believe the most compelling experiences emerge when artistic intuition meets technical mastery.
							</p>
						</div>
						
						<div class="philosophy-item">
							<h3>EMOTIONAL RESONANCE</h3>
							<p>
								Great design should evoke feeling. I create work that resonates on an emotional level, transforming spaces into experiences that linger in memory.
							</p>
						</div>
						
						<div class="philosophy-item">
							<h3>COLLABORATIVE SPIRIT</h3>
							<p>
								The most innovative solutions emerge through collaboration. I value partnerships that challenge perspectives and push creative boundaries.
							</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="toolbox-section">
				<h2 class="section-title">MY TOOLBOX</h2>
				
				<div class="toolbox-categories">
					<div class="toolbox-category">
						<h3>REAL-TIME & INTERACTION</h3>
						<div class="tool-tags">
							<span class="tool-tag">TOUCHDESIGNER</span>
							<span class="tool-tag">UNREAL ENGINE</span>
							<span class="tool-tag">RESOLUME ARENA</span>
						</div>
					</div>
					
					<div class="toolbox-category">
						<h3>DESIGN & ANIMATION</h3>
						<div class="tool-tags">
							<span class="tool-tag">AFTER EFFECTS</span>
							<span class="tool-tag">FIGMA</span>
							<span class="tool-tag">PHOTOSHOP</span>
							<span class="tool-tag">ILLUSTRATOR</span>
							<span class="tool-tag">BLENDER</span>
						</div>
					</div>
					
					<div class="toolbox-category">
						<h3>DEVELOPMENT</h3>
						<div class="tool-tags">
							<span class="tool-tag">HTML & CSS</span>
							<span class="tool-tag">FLUTTER & DART</span>
							<span class="tool-tag">PYTHON</span>
							<span class="tool-tag">ARDUINO</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="cta-section">
				<p class="cta-message">
					I'm always open to <span class="highlight">new collaborations and challenges</span>. If you're working on something that requires 
					a blend of technical expertise and creative vision, let's connect and explore how we can create something remarkable together.
				</p>
				<div class="cta-buttons">
					<a href="/works" class="cta-button">SEE MY WORK</a>
					<a href="/contact" class="cta-button outline">GET IN TOUCH</a>
				</div>
			</div>
		</div>
	</div>
	
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
	.svg-pattern {
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
	
	/* About Page Specific Styles */
	.about-container {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 4rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 8rem 2rem 4rem;
		position: relative;
		z-index: 2;
	}
	
	/* Smooth appearance animation */
	.appear {
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	
	.appear.visible, .appear.always-visible {
		opacity: 1;
		transform: translateY(0);
	}
	
	/* Sidebar Styles */
	.about-sidebar {
		position: sticky;
		top: 8rem;
		align-self: start;
	}
	
	.profile-image-container {
		position: relative;
		margin-bottom: 2.5rem;
		overflow: hidden;
	}
	
	.profile-image {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.5s ease;
	}
	
	.profile-image-container:hover .profile-image {
		transform: scale(1.03);
	}
	
	.profile-accent {
		position: absolute;
		bottom: -10px;
		right: -10px;
		width: 60px;
		height: 60px;
		background-color: var(--page-accent);
		opacity: 0.2;
	}
	
	.sidebar-section {
		margin-bottom: 2.5rem;
	}
	
	h3 {
		color: var(--page-accent);
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
		font-weight: normal;
		letter-spacing: 0.05em;
	}
	
	.sidebar-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.contact-list li {
		display: flex;
		align-items: center;
		margin-bottom: 0.8rem;
		font-size: 0.85rem;
	}
	
	.icon {
		color: var(--page-accent);
		opacity: 0.8;
		margin-right: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.social-links {
		display: flex;
		gap: 1rem;
		margin-top: 1.2rem;
	}
	
	.social-link {
		color: var(--page-accent);
		opacity: 0.8;
		transition: all 0.3s ease;
	}
	
	.social-link:hover {
		color: var(--page-text);
		transform: translateY(-2px);
		opacity: 1;
	}
	
	.language-bars {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.language-bar {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	
	.language-name {
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}
	
	.bar-container {
		height: 4px;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: hidden;
	}
	
	.bar-fill {
		height: 100%;
		background-color: var(--page-accent);
		opacity: 0.7;
		border-radius: 2px;
	}
	
	.skill-tags, .tool-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.skill-tag {
		background-color: rgba(74, 141, 101, 0.1);
		border: 1px solid rgba(74, 141, 101, 0.3);
		color: var(--page-text);
		padding: 0.5rem 0.7rem;
		font-size: 0.7rem;
		display: inline-block;
		border-radius: 3px;
		transition: all 0.3s ease;
	}
	
	.skill-tag:hover {
		background-color: rgba(74, 141, 101, 0.2);
		transform: translateY(-2px);
	}
	
	/* Main Content Styles */
	.about-content {
		padding-right: 1rem;
	}
	
	.page-header {
		margin-bottom: 4rem;
		position: relative;
	}
	
	.name-container {
		margin-bottom: 1rem;
	}
	
	h1 {
		font-size: 3rem;
		color: var(--page-text);
		margin: 0;
		margin-bottom: 0.5rem;
		line-height: 1.1;
		font-weight: 700;
	}
	
	.position-text {
		color: var(--page-accent);
		font-size: 1rem;
		letter-spacing: 0.05em;
	}
	
	.header-accent {
		width: 80px;
		height: 3px;
		background-color: var(--page-accent);
		opacity: 0.7;
	}
	
	.section-title {
		font-size: 1.3rem;
		color: var(--page-accent);
		margin: 0 0 2rem 0;
		letter-spacing: 0.05em;
	}
	
	.story-section, .philosophy-section, .toolbox-section {
		margin-bottom: 5rem;
	}
	
	.story-content {
		position: relative;
	}
	
	.narrative {
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.highlight {
		color: var(--page-text);
		position: relative;
		font-weight: 500;
	}
	
	.highlight::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 8px;
		background-color: var(--page-accent);
		opacity: 0.2;
		z-index: -1;
	}
	
	.story-block {
		border-left: 2px solid var(--page-accent);
		padding-left: 1.5rem;
		margin: 2rem 0;
		opacity: 0.9;
	}
	
	.story-block p {
		line-height: 1.6;
	}
	
	.journey-milestone {
		display: flex;
		margin-bottom: 2.5rem;
		position: relative;
	}
	
	.milestone-dot {
		width: 12px;
		height: 12px;
		background-color: var(--page-accent);
		border-radius: 50%;
		margin-top: 6px;
		margin-right: 1.5rem;
		flex-shrink: 0;
	}
	
	.milestone-content {
		flex: 1;
	}
	
	.milestone-content h3 {
		font-size: 1.1rem;
		color: var(--page-text);
		margin-bottom: 0.8rem;
		font-weight: 500;
	}
	
	.milestone-content p {
		line-height: 1.6;
		color: var(--page-text);
		opacity: 0.9;
	}
	
	/* Philosophy Section */
	.philosophy-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}
	
	.philosophy-item {
		padding: 1.5rem;
		background-color: rgba(74, 141, 101, 0.08);
		border-radius: 4px;
		transition: all 0.3s ease;
	}
	
	.philosophy-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		background-color: rgba(74, 141, 101, 0.12);
	}
	
	.philosophy-item h3 {
		color: var(--page-text);
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.05em;
	}
	
	.philosophy-item p {
		font-size: 0.9rem;
		line-height: 1.6;
		opacity: 0.9;
	}
	
	/* Toolbox Section */
	.toolbox-categories {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.toolbox-category h3 {
		margin-bottom: 1rem;
		color: var(--page-text);
		font-size: 0.9rem;
		font-weight: 500;
	}
	
	.tool-tag {
		background-color: rgba(255, 222, 89, 0.1);
		border: 1px solid rgba(255, 222, 89, 0.3);
		color: var(--page-text);
		padding: 0.5rem 0.7rem;
		font-size: 0.7rem;
		display: inline-block;
		border-radius: 3px;
		transition: all 0.3s ease;
	}
	
	.tool-tag:hover {
		background-color: rgba(255, 222, 89, 0.2);
		transform: translateY(-2px);
	}
	
	/* CTA Section */
	.cta-section {
		margin-top: 5rem;
		padding: 3rem;
		background-color: rgba(74, 141, 101, 0.08);
		border-radius: 8px;
		text-align: center;
	}
	
	.cta-message {
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}
	
	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}
	
	.cta-button {
		display: inline-block;
		padding: 0.8rem 1.5rem;
		background-color: var(--page-accent);
		color: #000;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 4px;
		transition: all 0.3s ease;
	}
	
	.cta-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
	
	.cta-button.outline {
		background-color: transparent;
		border: 1px solid var(--page-accent);
		color: var(--page-text);
	}
	
	/* Footer */
	footer {
		padding: 3rem 2rem;
		border-top: 1px solid rgba(74, 141, 101, 0.15);
		position: relative;
		z-index: 2;
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 5rem;
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
	@media (max-width: 1024px) {
		.about-container {
			grid-template-columns: 280px 1fr;
			gap: 3rem;
		}
		
		h1 {
			font-size: 2.5rem;
		}
		
		.philosophy-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.cta-section {
			padding: 2rem;
		}
	}
	
	@media (max-width: 768px) {
		.about-container {
			grid-template-columns: 1fr;
			gap: 4rem;
		}
		
		.about-sidebar {
			position: relative;
			top: 0;
			max-width: 400px;
			margin: 0 auto;
		}
		
		.main-nav {
			padding: 1rem;
		}
		
		.nav-links {
			gap: 1.5rem;
		}
		
		.cta-buttons {
			flex-direction: column;
			max-width: 300px;
			margin: 0 auto;
			gap: 1rem;
		}
	}
	
	@media (max-width: 480px) {
		.about-container {
			padding: 6rem 1.5rem 3rem;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		.section-title {
			font-size: 1.2rem;
		}
		
		.narrative {
			font-size: 1rem;
		}
		
		.cta-message {
			font-size: 1rem;
		}
		
		.journey-milestone {
			flex-direction: column;
		}
		
		.milestone-dot {
			margin-bottom: 1rem;
		}
		
		.cta-section {
			padding: 1.5rem;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
</style>