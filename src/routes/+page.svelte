<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Navbar from '$lib/components/Navbar.svelte';
	import SoftwareLogos from '$lib/components/SoftwareLogos.svelte';

	let ready = false;
	let scrollY = 0;
	let mouseX = 0;
	let mouseY = 0;

	// References for elements
	let giantLogo;
	let pageContainer;
	let svgLayer1, svgLayer2, svgLayer3, svgLayer4, svgLayer5;
	let floatingShapes;

	let shapeConfigs = [
		{ x: -35, y: -38, scroll: 0.04, rotationSpeed: 0.01, width: 60, height: 80, skew: -25 },
		{ x: 40, y: -32, scroll: -0.035, rotationSpeed: -0.01, width: 35, height: 50, skew: 25 },
		{ x: -30, y: 36, scroll: 0.03, rotationSpeed: 0.008, width: 50, height: 70, skew: -28 },
		{ x: 32, y: 28, scroll: -0.025, rotationSpeed: -0.007, width: 45, height: 60, skew: 22 },
		{ x: -38, y: -25, scroll: 0.045, rotationSpeed: 0.01, width: 70, height: 95, skew: -22 },
		{ x: 30, y: 35, scroll: -0.04, rotationSpeed: -0.009, width: 30, height: 45, skew: 30 },
		{ x: -36, y: 30, scroll: 0.035, rotationSpeed: 0.01, width: 40, height: 55, skew: -25 },
		{ x: 34, y: -36, scroll: -0.03, rotationSpeed: -0.008, width: 65, height: 85, skew: 25 },
		{ x: -28, y: -38, scroll: 0.04, rotationSpeed: 0.01, width: 38, height: 50, skew: -30 },
		{ x: 36, y: 24, scroll: -0.03, rotationSpeed: -0.007, width: 55, height: 75, skew: 28 },
		{ x: -32, y: -28, scroll: 0.035, rotationSpeed: 0.008, width: 60, height: 80, skew: -24 },
		{ x: 38, y: -25, scroll: -0.04, rotationSpeed: -0.009, width: 48, height: 65, skew: 26 },
		{ x: -25, y: 35, scroll: 0.025, rotationSpeed: 0.007, width: 30, height: 40, skew: -28 },
		{ x: 30, y: -32, scroll: -0.045, rotationSpeed: -0.01, width: 75, height: 100, skew: 22 },
		{ x: -40, y: 22, scroll: 0.035, rotationSpeed: 0.008, width: 42, height: 60, skew: -26 }
	];

	let mousePos = { x: 0, y: 0 };
	let repulsionRadius = 250;
	let repulsionStrength = 180;
	let mouseMoveEnabled = false;
	let isBackgroundAnimating = false;
	let currentBackground = 'yellow';
	let intervalId;
	let throttleTimer = false;
	let smoothScrollY = 0;
	let lastMouseX = 0;
	let lastMouseY = 0;
	let autoAnimationActive = true;
	let lastScrollY = 0;
	let scrollVelocity = 0;
	let clickedShape = null;
	let shapesScale = [];
	let draggedShape = null;
	let dragOffset = { x: 0, y: 0 };
	let shapeBehaviors = [];
	let magneticPull = false;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		document.documentElement.style.setProperty('--background-color', '#FFE964');
		document.documentElement.style.setProperty('--text-color', '#1A1A1A');

		floatingShapes = document.querySelectorAll('.floating-shape.reactive');
		shapesScale = Array(floatingShapes.length).fill(1);

		floatingShapes.forEach((shape, index) => {
			const config = shapeConfigs[index];
			if (config) {
				shape.style.width = `${config.width}px`;
				shape.style.height = `${config.height}px`;
			}
		});

		initializeShapeBehaviors();
		repulsionRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
		repulsionStrength = Math.min(window.innerWidth, window.innerHeight) * 0.25;
		setupSmoothAnimations();
		startAutoAnimation();
		setupShapeInteractivity();
		setupScrollAnimations();

		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				mouseMoveEnabled = true;
			}, 800);
		}, 500);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearInterval(intervalId);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	function setupScrollAnimations() {
		gsap.from('.about-section .text-container > *', {
			scrollTrigger: {
				trigger: '.about-section',
				start: 'top 80%',
				end: 'bottom top',
				toggleActions: 'play none none reverse'
			},
			opacity: 0,
			y: 50,
			stagger: 0.3,
			ease: 'power3.out',
			duration: 1
		});

		gsap.from('.work-card', {
			scrollTrigger: {
				trigger: '.works-preview',
				start: 'top 70%',
				toggleActions: 'play none none reverse'
			},
			opacity: 0,
			y: 100,
			stagger: 0.2,
			ease: 'power3.out',
			duration: 1.2
		});

		gsap.from('.cta-section .cta-content > *', {
			scrollTrigger: {
				trigger: '.cta-section',
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			},
			opacity: 0,
			y: 50,
			stagger: 0.3,
			ease: 'power3.out',
			duration: 1
		});
	}

	function initializeShapeBehaviors() {
		shapeBehaviors = [];
		const behaviorTypes = ['orbit', 'float', 'gentle', 'drift', 'sway'];

		if (floatingShapes) {
			for (let i = 0; i < floatingShapes.length; i++) {
				const behavior = {
					type: behaviorTypes[Math.floor(Math.random() * behaviorTypes.length)],
					speed: 0.2 + Math.random() * 0.8,
					amplitude: 3 + Math.random() * 8,
					frequency: 0.2 + Math.random() * 0.8,
					phase: Math.random() * Math.PI * 2,
					radius: 10 + Math.random() * 25
				};
				shapeBehaviors.push(behavior);
			}
		}
	}

	function setupShapeInteractivity() {
		if (floatingShapes) {
			floatingShapes.forEach((shape, index) => {
				shape.addEventListener('mousedown', (e) => {
					handleShapeClick(index, e);
				});
				shape.addEventListener('touchstart', (e) => {
					handleShapeClick(index, e.touches[0]);
				});
			});
			window.addEventListener('mousemove', handleMouseDrag);
			window.addEventListener('touchmove', handleTouchDrag, { passive: false });
			window.addEventListener('mouseup', releaseShape);
			window.addEventListener('touchend', releaseShape);
		}
	}

	function handleShapeClick(index, event) {
		if (!floatingShapes) return;
		floatingShapes[index].style.pointerEvents = 'auto';
		clickedShape = index;
		draggedShape = index;
		const rect = floatingShapes[index].getBoundingClientRect();
		dragOffset = {
			x: event.clientX - rect.left - rect.width / 2,
			y: event.clientY - rect.top - rect.height / 2
		};
		event.preventDefault();
		shapesScale[index] = 1.2;
		floatingShapes[index].classList.add('clicked');

		setTimeout(() => {
			if (floatingShapes && floatingShapes[index]) {
				floatingShapes[index].style.pointerEvents = 'none';
				floatingShapes[index].classList.remove('clicked');
				shapesScale[index] = 1;
			}
			clickedShape = null;
		}, 2000);
	}

	function handleMouseDrag(e) {
		if (draggedShape !== null && floatingShapes) {
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
			const shape = floatingShapes[draggedShape];
			const config = shapeConfigs[draggedShape];
			if (config) {
				shape.style.transform = `skewX(${config.skew}deg) translate(${e.clientX - dragOffset.x}px, ${e.clientY - dragOffset.y}px)`;
			}
		}
	}

	function handleTouchDrag(e) {
		if (draggedShape !== null && floatingShapes && e.touches.length > 0) {
			e.preventDefault();
			mousePos.x = e.touches[0].clientX;
			mousePos.y = e.touches[0].clientY;
			const shape = floatingShapes[draggedShape];
			const config = shapeConfigs[draggedShape];
			if (config) {
				shape.style.transform = `skewX(${config.skew}deg) translate(${e.touches[0].clientX - dragOffset.x}px, ${e.touches[0].clientY - dragOffset.y}px)`;
			}
		}
	}

	function releaseShape() {
		if (draggedShape !== null) {
			draggedShape = null;
		}
	}

	function startAutoAnimation() {
		autoAnimationActive = true;
	}

	function toggleMagneticPull() {
		magneticPull = !magneticPull;
		repulsionStrength = magneticPull ? 250 : 180;
	}

	const handleResize = () => {
		repulsionRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
		repulsionStrength = Math.min(window.innerWidth, window.innerHeight) * 0.25;
		ScrollTrigger.refresh();
	};

	function setupSmoothAnimations() {
		smoothScrollY = window.scrollY;
		lastScrollY = window.scrollY;

		function animationLoop() {
			const scrollDelta = window.scrollY - lastScrollY;
			scrollVelocity = 0.8 * scrollVelocity + 0.2 * scrollDelta;
			lastScrollY = window.scrollY;

			smoothScrollY += (window.scrollY - smoothScrollY) * 0.05;

			if (mouseMoveEnabled) {
				lastMouseX += (mouseX - lastMouseX) * 0.1;
				lastMouseY += (mouseY - lastMouseY) * 0.1;
			}

			if (ready) {
				updatePatternPositions();
			}

			requestAnimationFrame(animationLoop);
		}

		animationLoop();
		window.addEventListener('resize', handleResize);
	}

	function applyBehaviorPattern(index, now) {
		if (!shapeBehaviors[index] || !shapeConfigs[index]) return { x: 0, y: 0, rotate: 0 };

		const behavior = shapeBehaviors[index];
		const config = shapeConfigs[index];
		let x = 0,
			y = 0,
			rotate = 0;

		switch (behavior.type) {
			case 'orbit':
				x = Math.cos(now * behavior.speed + behavior.phase) * behavior.radius;
				y = Math.sin(now * behavior.speed + behavior.phase) * behavior.radius;
				rotate = now * config.rotationSpeed * 3;
				break;
			case 'float':
				x = Math.sin(now * behavior.speed) * behavior.amplitude;
				y = Math.cos(now * behavior.speed * 0.7) * behavior.amplitude;
				rotate = Math.sin(now * behavior.frequency * 0.3) * 3;
				break;
			case 'gentle':
				const scale = 1 + Math.sin(now * behavior.frequency) * 0.05;
				x = Math.sin(now * behavior.speed) * behavior.amplitude;
				y = Math.cos(now * behavior.speed) * behavior.amplitude;
				shapesScale[index] = scale;
				break;
			case 'drift':
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.2;
				y = Math.sin(now * behavior.speed * 0.5 + 1) * behavior.amplitude * 0.6;
				rotate = Math.sin(now * behavior.frequency * 0.2) * 4;
				break;
			case 'sway':
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.5;
				rotate = Math.sin(now * behavior.frequency * 0.25) * 3;
				break;
		}

		return { x, y, rotate };
	}

	function updatePatternPositions() {
		const now = Date.now() / 1000;
		if (svgLayer1) {
			svgLayer1.style.transform = `translate(${lastMouseX * 30}px, ${lastMouseY * 30 + smoothScrollY * 0.15}px) rotate(${smoothScrollY * 0.005}deg)`;
		}
		if (svgLayer2) {
			svgLayer2.style.transform = `translate(${lastMouseX * 25}px, ${lastMouseY * 25 + smoothScrollY * 0.1}px)`;
		}
		if (svgLayer3) {
			svgLayer3.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.08}px)`;
		}
		if (svgLayer4) {
			svgLayer4.style.transform = `translate(${lastMouseX * -20}px, ${lastMouseY * -20 - smoothScrollY * 0.1}px) rotate(${-smoothScrollY * 0.003}deg)`;
		}
		if (svgLayer5) {
			svgLayer5.style.transform = `translate(${lastMouseX * -25}px, ${lastMouseY * -25 - smoothScrollY * 0.12}px)`;
		}

		if (floatingShapes && floatingShapes.length > 0) {
			floatingShapes.forEach((shape, index) => {
				if (draggedShape === index) return;

				const config = shapeConfigs[index];
				if (!config) return;

				const rect = shape.getBoundingClientRect();
				const shapeCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
				const dx = shapeCenter.x - mousePos.x;
				const dy = shapeCenter.y - mousePos.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				let forceX = 0,
					forceY = 0;

				if (distance < repulsionRadius) {
					shape.classList.add('repelled');
					const forceFactor = Math.pow(1 - distance / repulsionRadius, 2) * repulsionStrength;
					const magnitude = Math.max(0.1, distance);

					if (magneticPull) {
						forceX = -(dx / magnitude) * forceFactor * 0.7;
						forceY = -(dy / magnitude) * forceFactor * 0.7;
						shape.classList.add('attracted');
					} else {
						forceX = (dx / magnitude) * forceFactor;
						forceY = (dy / magnitude) * forceFactor;
						shape.classList.remove('attracted');
					}
				} else {
					shape.classList.remove('repelled', 'attracted');
				}

				const multiplier = config;
				const baseX = lastMouseX * multiplier.x;
				const baseY = lastMouseY * multiplier.y;
				const scrollEffect = smoothScrollY * multiplier.scroll;
				const scrollVelocityX = scrollVelocity * (index % 2 === 0 ? 0.4 : -0.4);
				const scrollVelocityY = scrollVelocity * (index % 3 === 0 ? 0.3 : -0.3);
				const behaviorEffect = applyBehaviorPattern(index, now);

				let autoX = 0,
					autoY = 0;
				if (autoAnimationActive) {
					const waveSpeed = 0.2 + ((index % 5) * 0.04);
					const waveAmplitude = 5 + ((index % 3) * 2);
					autoX = Math.sin(now * waveSpeed + index) * waveAmplitude;
					autoY = Math.cos(now * waveSpeed * 1.2 + index * 0.7) * waveAmplitude;
				}

				const totalX = baseX + forceX + scrollEffect + scrollVelocityX + autoX + behaviorEffect.x;
				const totalY = baseY + forceY + scrollEffect + scrollVelocityY + autoY + behaviorEffect.y;
				const totalRotation = behaviorEffect.rotate;

				shape.style.transform = `skewX(${config.skew}deg) translate(${totalX}px, ${totalY}px) rotate(${totalRotation}deg) scale(${shapesScale[index]})`;
			});
		}

		// Change: The following block is commented out to disable the logo parallax effect.
		/*
		if (giantLogo) {
			giantLogo.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10}px)`;
		}
		*/
	}

	function setDarkMode(isDark) {
		const newBg = isDark ? '#1A1A1A' : '#FFE964';
		const newText = isDark ? '#FFE964' : '#1A1A1A';

		document.documentElement.style.setProperty('--background-color', newBg);
		document.documentElement.style.setProperty('--text-color', newText);
		currentBackground = isDark ? 'black' : 'yellow';

		if (pageContainer) {
			pageContainer.classList.toggle('dark-mode', isDark);
			pageContainer.classList.toggle('light-mode', !isDark);
		}

		const allLogos = document.querySelectorAll('.responsive-svg');
		allLogos.forEach((logo) => {
			logo.classList.toggle('on-dark', isDark);
			logo.classList.toggle('on-light', !isDark);
		});
	}

	function handleLogoHover() {
		setDarkMode(currentBackground === 'yellow');
	}

	/**
	 * @param {{ key: string; }} event
	 */
	function handleLogoKeyPress(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleLogoHover();
		}
	}

	function startBackgroundAnimation() {
		if (isBackgroundAnimating) return;
		isBackgroundAnimating = true;

		// Change: This interval uses the slower 0.5s transition for a pulsing effect
		intervalId = setInterval(() => {
			setDarkMode(currentBackground === 'yellow');
		}, 550); // Interval slightly longer than transition
	}

	function stopBackgroundAnimation() {
		if (!isBackgroundAnimating) return;
		clearInterval(intervalId);
		isBackgroundAnimating = false;
	}

	function toggleAnimation() {
		if (isBackgroundAnimating) {
			stopBackgroundAnimation();
		} else {
			startBackgroundAnimation();
		}
	}

	function handleMouseMove(e) {
		if (!mouseMoveEnabled || throttleTimer) return;

		throttleTimer = true;
		setTimeout(() => {
			throttleTimer = false;
		}, 5);

		mouseX = (e.clientX / window.innerWidth) * 2 - 1;
		mouseY = (e.clientY / window.innerHeight) * 2 - 1;
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	}
</script>

<svelte:head>
	<style>
		:root {
			--background-color: #FFE964;
			--text-color: #1A1A1A;
		}
		body {
			background-color: var(--background-color) !important;
			color: var(--text-color) !important;
			/* Change: Increased transition duration for a smooth effect */
			transition: background-color 0.5s ease, color 0.5s ease !important;
			overflow-x: hidden;
			scroll-behavior: smooth;
		}
		html {
			scroll-behavior: smooth;
		}
		h1,
		h2,
		h3,
		p,
		a {
			/* Change: Increased transition duration for a smooth effect */
			transition: color 0.5s ease !important;
		}
	</style>
</svelte:head>

<svelte:window bind:scrollY on:mousemove={handleMouseMove} />

<Navbar />

<div
	class="landing-page"
	bind:this={pageContainer}
	class:light-mode={currentBackground === 'yellow'}
	class:dark-mode={currentBackground === 'black'}
>
	<div class="floating-shapes-container">
		<div class="floating-shape slanted-parallelogram shape-instance-1 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-2 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-3 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-4 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-5 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-6 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-7 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-8 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-9 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-10 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-11 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-12 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-13 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-14 reactive" />
		<div class="floating-shape slanted-parallelogram shape-instance-15 reactive" />
	</div>

	<div class="svg-background-container">
		<div class="svg-layer svg-layer-1" bind:this={svgLayer1}><div class="svg-pattern bg-far" /></div>
		<div class="svg-layer svg-layer-2" bind:this={svgLayer2}>
			<div class="svg-pattern bg-medium-far" />
		</div>
		<div class="svg-layer svg-layer-3" bind:this={svgLayer3}>
			<div class="svg-pattern bg-middle" />
		</div>
		<div class="svg-layer svg-layer-4" bind:this={svgLayer4}>
			<div class="svg-pattern bg-medium-near" />
		</div>
		<div class="svg-layer svg-layer-5" bind:this={svgLayer5}><div class="svg-pattern bg-near" /></div>
	</div>

	<div class="controls-container">
		<button class="glassmorphic-btn electric-btn" on:click={toggleAnimation}>
			{isBackgroundAnimating ? 'CALM DOWN' : 'FEELING ELECTRIC?'}
		</button>
		<button class="glassmorphic-btn" on:click={toggleMagneticPull}>
			{magneticPull ? 'REPEL MODE' : 'ATTRACT MODE'}
		</button>
		<button class="glassmorphic-btn" on:click={initializeShapeBehaviors}> REFRESH SHAPES </button>
	</div>

	<div class="hero">
		<div class="hero-content">
			<div
				class="giant-logotype-container"
				class:active={ready}
				bind:this={giantLogo}
				on:mouseenter={handleLogoHover}
				on:keydown={handleLogoKeyPress}
				role="button"
				tabindex="0"
			>
				<img src="/images/logotype.svg" alt="RxInK Logotype" class="giant-logotype responsive-svg on-light" />
			</div>
			<div class="title-container" class:active={ready}>
				<h2>RICCARDO PICHI</h2>
			</div>
			<div class="subtitle-container" class:active={ready}>
				<h3>MEDIA DESIGNER | VISUAL ARTIST</h3>
			</div>
		</div>
	</div>

	<section class="about-section" id="about">
		<div class="about-content">
			<div class="text-container">
				<p class="tagline">THINK IN INK</p>
				<p class="description">
					I create <span class="highlight">immersive experiences</span> that blend technology, aesthetics, and
					human perception, transforming spaces into dynamic narratives.
				</p>
			</div>
		</div>
	</section>

	<SoftwareLogos />

	<section class="works-preview" id="works-preview">
		<h2 class="section-title">SELECTED WORKS</h2>
		<div class="works-cards">
			<div class="work-card">
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image image1" />
						<div class="work-title"><h3>Interactive Installations</h3></div>
					</div>
					<div class="card-back">
						<p>Creative Direction for Installations</p>
						<a href="/works" class="view-btn">View Work</a>
					</div>
				</div>
			</div>
			<div class="work-card">
				<div class="card-inner">
					<div class="card-front">
						<div class="work-image image2" />
						<div class="work-title"><h3>Live Visual Performance</h3></div>
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
						<div class="work-image image3" />
						<div class="work-title"><h3>Brand Identity System</h3></div>
					</div>
					<div class="card-back">
						<p>Comprehensive visual identity for tech startup</p>
						<a href="/works" class="view-btn">View Work</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="cta-section">
		<div class="cta-content">
			<h2>WANNA SEE MORE?</h2>
			<div class="logo-accent">
				<img src="/images/full-logo.svg" alt="RxInK Logo" class="cta-logo responsive-svg on-light" />
			</div>
			<div class="cta-buttons">
				<a href="/works" class="glassmorphic-btn">EXPLORE WORKS</a>
				<a href="/contact" class="glassmorphic-btn">GET IN TOUCH</a>
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
	:global(.light-mode) {
		--page-bg: #FFE964;
		--page-text: #1A1A1A;
		--page-accent: #62A87C;
		--shape-glow: rgba(98, 168, 124, 0.7);
		--shape-bg: rgba(255, 255, 255, 0.08);
		--shape-border: transparent;
		--glass-bg: rgba(255, 255, 255, 0.1);
	}
	:global(.dark-mode) {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #62A87C;
		--shape-glow: rgba(98, 168, 124, 0.7);
		--shape-bg: rgba(0, 0, 0, 0.1);
		--shape-border: transparent;
		--glass-bg: rgba(0, 0, 0, 0.1);
	}

	/* === SHAPES === */
	.floating-shapes-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		pointer-events: none;
		overflow: hidden;
	}

	.floating-shape {
		position: absolute;
		pointer-events: none;
		will-change: transform;
		transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), background 0.3s ease,
			box-shadow 0.3s ease;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		background: var(--shape-bg);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
		border: 1px solid var(--shape-border);
	}

	.slanted-parallelogram {
		width: 80px;
		height: 100px;
		transform: skewX(-20deg);
	}

	/* svelte-ignore css-unused-selector */
	.floating-shape.repelled {
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 20px var(--shape-glow);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease,
			box-shadow 0.2s ease;
		z-index: 1001;
	}
	/* svelte-ignore css-unused-selector */
	.dark-mode .floating-shape.repelled {
		background: rgba(0, 0, 0, 0.1);
	}

	/* svelte-ignore css-unused-selector */
	.floating-shape.attracted {
		background: rgba(98, 168, 124, 0.12);
		box-shadow: 0 0 20px rgba(98, 168, 124, 0.5);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease,
			box-shadow 0.2s ease;
		z-index: 1001;
	}

	/* svelte-ignore css-unused-selector */
	.floating-shape.clicked {
		background: rgba(98, 168, 124, 0.15);
		box-shadow: 0 0 30px var(--shape-glow), 0 0 15px white;
		z-index: 1002;
		transition: transform 0.3s cubic-bezier(0.18, 1.25, 0.4, 1.1), background 0.3s ease,
			box-shadow 0.3s ease;
	}

	.shape-instance-1 {
		top: 15%;
		left: 20%;
	}
	.shape-instance-2 {
		top: 30%;
		right: 25%;
	}
	.shape-instance-3 {
		bottom: 25%;
		left: 15%;
	}
	.shape-instance-4 {
		bottom: 20%;
		right: 15%;
	}
	.shape-instance-5 {
		top: 50%;
		left: 40%;
	}
	.shape-instance-6 {
		top: 10%;
		right: 10%;
	}
	.shape-instance-7 {
		top: 70%;
		left: 8%;
	}
	.shape-instance-8 {
		top: 40%;
		right: 45%;
	}
	.shape-instance-9 {
		bottom: 15%;
		left: 35%;
	}
	.shape-instance-10 {
		top: 25%;
		left: 65%;
	}
	.shape-instance-11 {
		bottom: 30%;
		right: 30%;
	}
	.shape-instance-12 {
		top: 80%;
		right: 5%;
	}
	.shape-instance-13 {
		top: 60%;
		left: 55%;
	}
	.shape-instance-14 {
		top: 5%;
		left: 45%;
	}
	.shape-instance-15 {
		bottom: 40%;
		left: 50%;
	}

	/* === Global & Page Styles === */
	:global(.responsive-svg.on-light) {
		filter: brightness(0) saturate(100%);
		/* Change: Increased transition duration for a smooth effect */
		transition: filter 0.5s ease;
	}
	:global(.responsive-svg.on-dark) {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%)
			contrast(103%);
		/* Change: Increased transition duration for a smooth effect */
		transition: filter 0.5s ease;
	}

	.landing-page {
		min-height: 300vh;
		overflow-x: hidden;
		position: relative;
	}

	/* === Parallax Background === */
	.svg-background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.svg-layer {
		position: absolute;
		top: -150%;
		left: -150%;
		width: 400%;
		height: 400%;
		transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
		will-change: transform;
	}
	.svg-layer-1 {
		z-index: 1;
		opacity: 0.01;
	}
	.svg-layer-2 {
		z-index: 2;
		opacity: 0.015;
	}
	.svg-layer-3 {
		z-index: 3;
		opacity: 0.02;
	}
	.svg-layer-4 {
		z-index: 4;
		opacity: 0.015;
	}
	.svg-layer-5 {
		z-index: 5;
		opacity: 0.01;
	}
	.svg-pattern {
		position: absolute;
		width: 100%;
		height: 100%;
		background-repeat: repeat;
	}
	.bg-far {
		background-image: url('/images/full-logo.svg');
		background-size: 600px auto;
	}
	.bg-medium-far {
		background-image: url('/images/logotype.svg');
		background-size: 450px auto;
	}
	.bg-middle {
		background-image: url('/images/pictogram.svg');
		background-size: 200px auto;
	}
	.bg-medium-near {
		background-image: url('/images/logotype.svg');
		background-size: 250px auto;
		transform: rotate(45deg);
	}
	.bg-near {
		background-image: url('/images/pictogram.svg');
		background-size: 100px auto;
	}
	.light-mode .svg-pattern {
		filter: brightness(0) saturate(100%);
	}
	.dark-mode .svg-pattern {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%)
			contrast(103%);
	}

	/* === UI Controls === */
	.controls-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.glassmorphic-btn {
		padding: 10px 15px;
		background: var(--glass-bg);
		color: var(--page-text);
		border: none;
		font-family: 'ABC Favorit Mono', monospace;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		border-radius: 4px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	/* svelte-ignore css-unused-selector */
	.electric-btn.active {
		background-color: rgba(98, 168, 124, 0.3);
	}

	/* === Sections & Layout === */
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
	.giant-logotype-container {
		margin: 0 auto 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
		width: 60%;
		max-width: 600px;
		will-change: transform;
		cursor: pointer;
	}
	.giant-logotype-container.active {
		opacity: 1;
		transform: translateY(0);
	}
	.giant-logotype {
		width: 100%;
		height: auto;
		will-change: transform;
	}
	.title-container,
	.subtitle-container {
		opacity: 0;
		transform: translateY(20px);
	}
	.title-container {
		transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
	}
	.subtitle-container {
		transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
	}
	.title-container.active,
	.subtitle-container.active {
		opacity: 1;
		transform: translateY(0);
	}
	h2 {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 0;
	}

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
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
		transform-style: preserve-3d;
	}
	.work-card:hover .card-inner {
		transform: rotateY(180deg);
	}
	.card-front,
	.card-back {
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
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.card-back p {
		color: #ffe964;
	}
	.work-image {
		flex: 1;
		background-size: cover;
		background-position: center;
	}
	.image1 {
		background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('/images/cards/kollateral1.png');
	}
	.image2 {
		background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('/images/projects/videocitta/hero.png');
	}
	.image3 {
		background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('/images/projects/circularthub/hero.png');
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
		max-width: 800px;
		width: 100%;
	}
	.cta-content h2 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		font-weight: bold;
	}
	.logo-accent {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2rem 0;
	}
	.cta-logo {
		animation: pulse 10s infinite;
		max-width: 80%;
	}
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}
	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

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
	.copyright,
	.tagline {
		font-size: 0.8rem;
		font-weight: bold;
	}

	/* === UNIFIED HOVER STYLES === */
	.glassmorphic-btn:hover,
	.view-btn:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 25px rgba(98, 168, 124, 0.25);
		background-color: #62a87c;
	}

	/* === Responsive Adjustments === */
	@media (max-width: 768px) {
		.slanted-parallelogram {
			width: 50px;
			height: 65px;
		}
		.controls-container {
			flex-direction: row;
			bottom: 10px;
			right: 10px;
			gap: 5px;
		}
		.glassmorphic-btn {
			padding: 8px 10px;
			font-size: 0.7rem;
		}
		.description {
			font-size: 1.2rem;
		}
		.works-cards {
			flex-direction: column;
			align-items: center;
		}
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		.giant-logotype-container {
			width: 70%;
			max-width: 450px;
		}
		.svg-layer {
			transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
			top: -100%;
			left: -100%;
			width: 300%;
			height: 300%;
		}
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

	@media (max-width: 480px) {
		.slanted-parallelogram {
			width: 40px;
			height: 50px;
		}
		.shape-instance-6,
		.shape-instance-7,
		.shape-instance-12,
		.shape-instance-14,
		.shape-instance-15 {
			display: none;
		}
		.giant-logotype-container {
			width: 80%;
			max-width: 350px;
		}
		.controls-container {
			right: 5px;
			bottom: 5px;
		}
		.glassmorphic-btn {
			padding: 6px 8px;
			font-size: 0.6rem;
		}
		.works-preview {
			padding: 3rem 1rem;
		}
		.section-title {
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		.work-card {
			width: 280px;
			height: 380px;
		}
		.about-section {
			padding: 3rem 1rem;
		}
		.tagline {
			font-size: 1.5rem;
		}
		.description {
			font-size: 1rem;
		}
	}
</style>