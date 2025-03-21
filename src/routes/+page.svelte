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
	let floatingShapes; // Reference to floating shapes
	
	// Adjusted multipliers for more movement but less rotation
	let shapeReactivityMultipliers = [
		{ x: -35, y: -38, scroll: 0.04, rotationSpeed: 0.01 },  // shape-instance-1
		{ x: 40, y: -32, scroll: -0.035, rotationSpeed: -0.01 }, // shape-instance-2
		{ x: -30, y: 36, scroll: 0.03, rotationSpeed: 0.008 },   // shape-instance-3
		{ x: 32, y: 28, scroll: -0.025, rotationSpeed: -0.007 },  // shape-instance-4
		{ x: -38, y: -25, scroll: 0.045, rotationSpeed: 0.01 },  // shape-instance-5
		{ x: 30, y: 35, scroll: -0.04, rotationSpeed: -0.009 },  // shape-instance-6
		{ x: -36, y: 30, scroll: 0.035, rotationSpeed: 0.01 },   // shape-instance-7
		{ x: 34, y: -36, scroll: -0.03, rotationSpeed: -0.008 }, // shape-instance-8
		{ x: -28, y: -38, scroll: 0.04, rotationSpeed: 0.01 },  // shape-instance-9
		{ x: 36, y: 24, scroll: -0.03, rotationSpeed: -0.007 }, // shape-instance-10
		{ x: -32, y: -28, scroll: 0.035, rotationSpeed: 0.008 },  // shape-instance-11
		{ x: 38, y: -25, scroll: -0.04, rotationSpeed: -0.009 },// shape-instance-12
		{ x: -25, y: 35, scroll: 0.025, rotationSpeed: 0.007 },   // shape-instance-13
		{ x: 30, y: -32, scroll: -0.045, rotationSpeed: -0.01 }, // shape-instance-14
		{ x: -40, y: 22, scroll: 0.035, rotationSpeed: 0.008 },  // shape-instance-15
		{ x: 42, y: -30, scroll: -0.04, rotationSpeed: -0.01 }, // shape-instance-16
		{ x: -36, y: 32, scroll: 0.035, rotationSpeed: 0.007 },   // shape-instance-17
		{ x: 38, y: -38, scroll: -0.03, rotationSpeed: -0.009 }, // shape-instance-18
		{ x: -42, y: -26, scroll: 0.04, rotationSpeed: 0.01 }, // shape-instance-19
		{ x: 32, y: 40, scroll: -0.035, rotationSpeed: -0.008 },  // shape-instance-20
		{ x: -30, y: -38, scroll: 0.03, rotationSpeed: 0.007 },  // shape-instance-21
		{ x: 44, y: 28, scroll: -0.04, rotationSpeed: -0.01 },  // shape-instance-22
		{ x: -38, y: 38, scroll: 0.035, rotationSpeed: 0.008 },  // shape-instance-23
		{ x: 36, y: -32, scroll: -0.03, rotationSpeed: -0.007 },// shape-instance-24
		{ x: -28, y: -36, scroll: 0.04, rotationSpeed: 0.01 },  // shape-instance-25
		{ x: 34, y: 24, scroll: -0.035, rotationSpeed: -0.008 }, // shape-instance-26
		{ x: -42, y: -30, scroll: 0.045, rotationSpeed: 0.01 },  // shape-instance-27
		{ x: 30, y: -40, scroll: -0.04, rotationSpeed: -0.009 }, // shape-instance-28
		{ x: -32, y: 26, scroll: 0.035, rotationSpeed: 0.008 },   // shape-instance-29
		{ x: 38, y: 36, scroll: -0.03, rotationSpeed: -0.007 }  // shape-instance-30
	];
	
	let mousePos = { x: 0, y: 0 }; // Actual mouse position in px
	let repulsionRadius = 250; // Radius for interaction
	let repulsionStrength = 180; // Increased for more noticeable effect
	let repulsionActive = true; // Always enable repulsion
	let mouseMoveEnabled = false;
	let isBackgroundAnimating = false; // Start with animation off
	let currentBackground = "yellow"; // Track current background color
	let intervalId; // Store interval ID for stopping animation
	let throttleTimer = false;
	let smoothScrollY = 0; // For smooth scrolling effect
	let lastMouseX = 0; // Track last mouse position for smoother transitions
	let lastMouseY = 0;
	let autoAnimationActive = true; // Flag for continuous automatic motion
	let lastScrollY = 0; // Track last scroll position for delta calculation
	let scrollVelocity = 0; // Track scroll velocity
	let clickedShape = null; // Track which shape was clicked for special effects
	let shapeRotations = []; // Track rotation angles for each shape
	let magneticPull = false; // Option for magnetic pull effect
	let shapesScale = []; // Track scale for each shape
	let draggedShape = null; // Track which shape is being dragged
	let dragOffset = { x: 0, y: 0 }; // Offset for dragging
	let shapeBehaviors = []; // Various behavior patterns for shapes
	
	// Enable animations after initial load
	onMount(() => {
		// Update CSS variables to match our needs
		document.documentElement.style.setProperty('--background-color', '#FFE964');
		document.documentElement.style.setProperty('--text-color', '#1A1A1A');
		
		// Get references to floating shapes
		floatingShapes = document.querySelectorAll('.floating-shape.reactive');
		
		// Initialize shape rotations and scales
		shapeRotations = Array(floatingShapes.length).fill(0);
		shapesScale = Array(floatingShapes.length).fill(1);
		
		// Initialize random behavior patterns for each shape
		initializeShapeBehaviors();
		
		// Initialize repulsion variables based on screen size
		repulsionRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35; // 35% of smaller dimension
		
		// Adjust repulsion strength based on screen size
		repulsionStrength = Math.min(window.innerWidth, window.innerHeight) * 0.25; // 25% of smaller dimension
		
		// Setup smooth scrolling and continuous animation
		setupSmoothAnimations();
		
		// Start auto-animation for shapes
		startAutoAnimation();
		
		// Add click listeners to shapes for interactive fun
		setupShapeInteractivity();
		
		// Animation starts in OFF state (isBackgroundAnimating is false by default)
		
		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				mouseMoveEnabled = true;
			}, 800);
		}, 500);
	});
	
	// Initialize different behavior patterns for each shape
	function initializeShapeBehaviors() {
		shapeBehaviors = [];
		
		// Create behavior types for variety - more relaxed options
		const behaviorTypes = [
			'orbit', 'float', 'gentle', 'drift', 'sway'
		];
		
		// Generate random parameters for each shape
		if (floatingShapes) {
			for (let i = 0; i < floatingShapes.length; i++) {
				const behavior = {
					type: behaviorTypes[Math.floor(Math.random() * behaviorTypes.length)],
					speed: 0.2 + Math.random() * 0.8, // Slower speeds
					amplitude: 3 + Math.random() * 8,  // Smaller amplitude
					frequency: 0.2 + Math.random() * 0.8, // Slower frequency
					phase: Math.random() * Math.PI * 2,
					radius: 10 + Math.random() * 25    // Smaller radius
				};
				shapeBehaviors.push(behavior);
			}
		}
	}
	
	// Add click and touch interactivity to shapes
	function setupShapeInteractivity() {
		if (floatingShapes) {
			floatingShapes.forEach((shape, index) => {
				// Make shapes able to receive pointer events temporarily when clicked
				shape.addEventListener('mousedown', (e) => {
					handleShapeClick(index, e);
				});
				
				shape.addEventListener('touchstart', (e) => {
					handleShapeClick(index, e.touches[0]);
				});
				
				// Global events for drag
				window.addEventListener('mousemove', handleMouseDrag);
				window.addEventListener('touchmove', (e) => handleTouchDrag(e), { passive: false });
				
				window.addEventListener('mouseup', releaseShape);
				window.addEventListener('touchend', releaseShape);
			});
		}
	}
	
	// Handle shape click/touch
	function handleShapeClick(index, event) {
		if (!floatingShapes) return;
		
		// Enable pointer events temporarily
		floatingShapes[index].style.pointerEvents = 'auto';
		
		// Mark this shape as clicked for special effects
		clickedShape = index;
		
		// Start dragging this shape
		draggedShape = index;
		
		// Calculate offset
		const rect = floatingShapes[index].getBoundingClientRect();
		dragOffset = {
			x: event.clientX - rect.left - rect.width / 2,
			y: event.clientY - rect.top - rect.height / 2
		};
		
		// Prevent default to avoid text selection during drag
		event.preventDefault();
		
		// Make the shape larger temporarily (but less dramatic)
		shapesScale[index] = 1.2;
		
		// Apply a special glow effect
		floatingShapes[index].classList.add('clicked');
		
		// Disable pointer events after a delay
		setTimeout(() => {
			if (floatingShapes[index]) {
				floatingShapes[index].style.pointerEvents = 'none';
			}
			clickedShape = null;
			floatingShapes[index].classList.remove('clicked');
			shapesScale[index] = 1;
		}, 2000);
	}
	
	// Handle dragging with mouse
	function handleMouseDrag(e) {
		if (draggedShape !== null && floatingShapes) {
			// Update the dragged shape position directly
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
			
			// Apply direct positioning
			const shape = floatingShapes[draggedShape];
			shape.style.transform = `translate(${e.clientX - dragOffset.x}px, ${e.clientY - dragOffset.y}px)`;
		}
	}
	
	// Handle dragging with touch
	function handleTouchDrag(e) {
		if (draggedShape !== null && floatingShapes && e.touches.length > 0) {
			// Prevent scrolling while dragging
			e.preventDefault();
			
			// Update the dragged shape position directly
			mousePos.x = e.touches[0].clientX;
			mousePos.y = e.touches[0].clientY;
			
			// Apply direct positioning
			const shape = floatingShapes[draggedShape];
			shape.style.transform = `translate(${e.touches[0].clientX - dragOffset.x}px, ${e.touches[0].clientY - dragOffset.y}px)`;
		}
	}
	
	// Release the dragged shape
	function releaseShape() {
		if (draggedShape !== null && floatingShapes) {
			draggedShape = null;
		}
	}
	
	// Function to start continuous auto-animation for shapes
	function startAutoAnimation() {
		autoAnimationActive = true;
	}
	
	// Toggle magnetic pull effect with enhanced differences
	function toggleMagneticPull() {
		magneticPull = !magneticPull;
		
		// Update the repulsion strength based on mode
		if (magneticPull) {
			// Stronger attraction in magnetic mode
			repulsionStrength = 250;
		} else {
			// Normal repulsion in repel mode
			repulsionStrength = 180;
		}
	}
	
	// Setup smooth scroll and continuous animation loop
	function setupSmoothAnimations() {
		// Initial values
		smoothScrollY = window.scrollY;
		lastScrollY = window.scrollY;
		
		// Smooth animation loop for both scroll and mouse movement
		function animationLoop() {
			// Calculate scroll velocity (delta between current and last scroll position)
			const scrollDelta = window.scrollY - lastScrollY;
			scrollVelocity = 0.8 * scrollVelocity + 0.2 * scrollDelta; // Smooth the velocity
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
		
		// Add resize handler to update repulsion values
		window.addEventListener('resize', () => {
			repulsionRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
			repulsionStrength = Math.min(window.innerWidth, window.innerHeight) * 0.25;
		});
	}
	
	// Apply behavior pattern to a shape - more movement but less rotation
	function applyBehaviorPattern(index, now) {
		if (!shapeBehaviors[index]) return { x: 0, y: 0, rotate: 0 };
		
		const behavior = shapeBehaviors[index];
		let x = 0, y = 0, rotate = 0;
		
		switch (behavior.type) {
			case 'orbit':
				x = Math.cos(now * behavior.speed + behavior.phase) * behavior.radius * 1.5;
				y = Math.sin(now * behavior.speed + behavior.phase) * behavior.radius * 1.5;
				rotate = now * shapeReactivityMultipliers[index].rotationSpeed * 3; // Reduced rotation
				break;
			case 'float':
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.4;
				y = Math.cos(now * behavior.speed * 0.7) * behavior.amplitude * 1.4;
				rotate = Math.sin(now * behavior.frequency * 0.3) * 3; // Very gentle rotation
				break;
			case 'gentle':
				const scale = 1 + Math.sin(now * behavior.frequency) * 0.05; // Subtle scale change
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.3;
				y = Math.cos(now * behavior.speed) * behavior.amplitude * 1.3;
				shapesScale[index] = scale;
				break;
			case 'drift':
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.6;
				y = Math.sin(now * behavior.speed * 0.5 + 1) * behavior.amplitude * 0.8;
				rotate = Math.sin(now * behavior.frequency * 0.2) * 4; // Even slower, more gentle rotation
				break;
			case 'sway':
				x = Math.sin(now * behavior.speed) * behavior.amplitude * 1.5;
				rotate = Math.sin(now * behavior.frequency * 0.25) * 3; // Very subtle sway
				break;
		}
		
		return { x, y, rotate };
	}
	
	// Update pattern positions based on mouse, scroll, and auto-animation
	function updatePatternPositions() {
		const now = Date.now() / 1000; // Current time in seconds for wave motion
		
		// Very far layer - most movement
		if (svgLayer1) {
			svgLayer1.style.transform = `translate(${lastMouseX * 30}px, ${lastMouseY * 30 + smoothScrollY * 0.15}px) rotate(${smoothScrollY * 0.005}deg)`;
		}
		
		// Far layer - significant movement
		if (svgLayer2) {
			svgLayer2.style.transform = `translate(${lastMouseX * 25}px, ${lastMouseY * 25 + smoothScrollY * 0.1}px)`;
		}
		
		// Middle/content layer - slight movement
		if (svgLayer3) {
			svgLayer3.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.08}px)`;
		}
		
		// Near layer - opposite movement
		if (svgLayer4) {
			svgLayer4.style.transform = `translate(${lastMouseX * -20}px, ${lastMouseY * -20 - smoothScrollY * 0.1}px) rotate(${-smoothScrollY * 0.003}deg)`;
		}
		
		// Very near layer - most opposite movement
		if (svgLayer5) {
			svgLayer5.style.transform = `translate(${lastMouseX * -25}px, ${lastMouseY * -25 - smoothScrollY * 0.12}px)`;
		}
		
		// Update floating shape positions with enhanced mouse repulsion and scroll reactivity
		if (floatingShapes && floatingShapes.length > 0) {
			floatingShapes.forEach((shape, index) => {
				// Skip updating if this shape is being dragged
				if (draggedShape === index) return;
				
				const rect = shape.getBoundingClientRect();
				const shapeCenter = {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2
				};
				
				// Calculate distance between mouse and shape center
				const dx = shapeCenter.x - mousePos.x;
				const dy = shapeCenter.y - mousePos.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				// Apply more dramatic repulsion or attraction force when mouse is within radius
				let forceX = 0;
				let forceY = 0;
				
				if (distance < repulsionRadius) {
					// Add "repelled" class for visual effect when cursor is near
					shape.classList.add('repelled');
					
					// Calculate force (more dramatic)
					const forceFactor = Math.pow(1 - distance / repulsionRadius, 2) * repulsionStrength;
					
					// Normalize direction
					const magnitude = Math.max(0.1, distance); // Avoid division by zero
					
					if (magneticPull) {
						// Strong attraction in magnetic mode - all shapes are attracted
						forceX = -(dx / magnitude) * forceFactor * 0.7;
						forceY = -(dy / magnitude) * forceFactor * 0.7;
						// Add a slight rotation toward the cursor in attract mode
						const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
						shape.style.setProperty('--target-rotation', `${targetAngle}deg`);
						shape.classList.add('attracted');
					} else {
						// Standard repulsion for all shapes in repel mode
						forceX = (dx / magnitude) * forceFactor;
						forceY = (dy / magnitude) * forceFactor;
						shape.classList.remove('attracted');
					}
				} else {
					// Remove effect classes when cursor is far
					shape.classList.remove('repelled');
					shape.classList.remove('attracted');
				}
				
				// Get multiplier for this shape
				const multiplier = shapeReactivityMultipliers[index] || { x: -10, y: -10, scroll: 0.02, rotationSpeed: 0.03 };
				
				// Base movement from mouse position
				const baseX = lastMouseX * multiplier.x;
				const baseY = lastMouseY * multiplier.y;
				
				// Add scroll-based movement
				const scrollEffect = smoothScrollY * multiplier.scroll;
				
				// Add scroll velocity effect - shapes react to how fast you scroll
				const scrollVelocityX = scrollVelocity * (index % 2 === 0 ? 0.4 : -0.4);
				const scrollVelocityY = scrollVelocity * (index % 3 === 0 ? 0.3 : -0.3);
				
				// Apply behavior pattern - fluid motion
				const behaviorEffect = applyBehaviorPattern(index, now);
				
				// Add continuous wave motion when auto-animation is active
				let autoX = 0;
				let autoY = 0;
				
				if (autoAnimationActive) {
					// Each shape moves in a different wave pattern - more gentle
					const waveSpeed = 0.2 + (index % 5) * 0.04;
					const waveAmplitude = 5 + (index % 3) * 2;
					
					autoX = Math.sin(now * waveSpeed + index) * waveAmplitude;
					autoY = Math.cos(now * waveSpeed * 1.2 + index * 0.7) * waveAmplitude;
				}
				
				// Combine all movement factors
				const totalX = baseX + forceX + scrollEffect + scrollVelocityX + autoX + behaviorEffect.x;
				const totalY = baseY + forceY + scrollEffect + scrollVelocityY + autoY + behaviorEffect.y;
				
				// Get consistent rotation for diamond shapes
				let baseRotation = 0;
				if (shape.classList.contains('shape-diamond') || shape.classList.contains('shape-diamond-small')) {
					baseRotation = 45; // Fixed base rotation for diamond shapes
				}
				
				// Total rotation is now more consistent
				const totalRotation = baseRotation + behaviorEffect.rotate;
				
				// Apply combined transform with rotation and scale
				shape.style.transform = `translate(${totalX}px, ${totalY}px) 
                                     rotate(${totalRotation}deg) 
                                     scale(${shapesScale[index]})`;
				
				// Add a very subtle pulse effect
				if (index % 4 === 0) {
					const pulseScale = 1 + Math.sin(now * 1.5 + index) * 0.03;
					shape.style.transform += ` scale(${pulseScale})`;
				}
			});
		}
		
		// Apply subtle movement to the logo
		if (giantLogo) {
			giantLogo.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10}px)`;
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
	
	// Function to toggle animation - now toggles on/off
	function toggleAnimation() {
		if (isBackgroundAnimating) {
			stopBackgroundAnimation();
		} else {
			startBackgroundAnimation();
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
		
		// Store actual mouse position in pixels for repulsion effect
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
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
	<!-- Floating Glassmorphic Shapes -->
	<div class="floating-shapes-container">
		<!-- Original shapes -->
		<div class="floating-shape shape-circle shape-instance-1 reactive"></div>
		<div class="floating-shape shape-triangle shape-instance-2 reactive"></div>
		<div class="floating-shape shape-square shape-instance-3 reactive"></div>
		<div class="floating-shape shape-hexagon shape-instance-4 reactive"></div>
		<div class="floating-shape shape-diamond shape-instance-5 reactive"></div>
		
		<div class="floating-shape shape-circle shape-instance-6 reactive"></div>
		<div class="floating-shape shape-rectangle shape-instance-7 reactive"></div>
		<div class="floating-shape shape-triangle shape-instance-8 reactive"></div>
		<div class="floating-shape shape-square shape-instance-9 reactive"></div>
		<div class="floating-shape shape-hexagon shape-instance-10 reactive"></div>
		<div class="floating-shape shape-rectangle shape-instance-11 reactive"></div>
		<div class="floating-shape shape-circle shape-instance-12 reactive"></div>
		<div class="floating-shape shape-diamond shape-instance-13 reactive"></div>
		<div class="floating-shape shape-square shape-instance-14 reactive"></div>
		<div class="floating-shape shape-triangle shape-instance-15 reactive"></div>
		
		<!-- New shapes - more variety but smaller -->
		<div class="floating-shape shape-pentagon shape-instance-16 reactive"></div>
		<div class="floating-shape shape-oval shape-instance-17 reactive"></div>
		<div class="floating-shape shape-rhombus shape-instance-18 reactive"></div>
		<div class="floating-shape shape-trapezoid shape-instance-19 reactive"></div>
		<div class="floating-shape shape-parallelogram shape-instance-20 reactive"></div>
		<div class="floating-shape shape-star shape-instance-21 reactive"></div>
		<div class="floating-shape shape-cross shape-instance-22 reactive"></div>
		<div class="floating-shape shape-heart shape-instance-23 reactive"></div>
		<div class="floating-shape shape-droplet shape-instance-24 reactive"></div>
		<div class="floating-shape shape-octagon shape-instance-25 reactive"></div>
		<div class="floating-shape shape-circle-small shape-instance-26 reactive"></div>
		<div class="floating-shape shape-triangle-small shape-instance-27 reactive"></div>
		<div class="floating-shape shape-square-small shape-instance-28 reactive"></div>
		<div class="floating-shape shape-hexagon-small shape-instance-29 reactive"></div>
		<div class="floating-shape shape-diamond-small shape-instance-30 reactive"></div>
	</div>

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

	<!-- Controls for Shape Interaction - Glassmorphic style -->
	<div class="controls-container">
		<button class="glassmorphic-btn electric-btn" on:click={toggleAnimation}>
			{isBackgroundAnimating ? 'CALM DOWN' : 'FEELING ELECTRIC?'}
		</button>
		<button class="glassmorphic-btn" on:click={toggleMagneticPull}>
			{magneticPull ? 'REPEL MODE' : 'ATTRACT MODE'}
		</button>
		<button class="glassmorphic-btn" on:click={initializeShapeBehaviors}>
			REFRESH SHAPES
		</button>
	</div>

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
	
	<!-- About Section -->
	<section class="about-section" id="about">
		<div class="about-content">
			<div class="text-container" class:visible={scrollY > 200}>
				<p class="tagline">THINK IN INK</p>
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
		--shape-glow: rgba(98, 168, 124, 0.7);
		--shape-bg-light: rgba(255, 255, 255, 0.06);
		--shape-bg-dark: rgba(0, 0, 0, 0.06);
		--shape-border-light: transparent;
		--shape-border-dark: transparent;
		--glass-bg-light: rgba(255, 255, 255, 0.1);
		--glass-bg-dark: rgba(0, 0, 0, 0.1);
	}
	
	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-accent: #62A87C;
		--shape-glow: rgba(98, 168, 124, 0.7);
		--shape-bg-light: rgba(0, 0, 0, 0.06);
		--shape-bg-dark: rgba(255, 255, 255, 0.06);
		--shape-border-light: transparent;
		--shape-border-dark: transparent;
		--glass-bg-light: rgba(0, 0, 0, 0.1);
		--glass-bg-dark: rgba(255, 255, 255, 0.1);
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
	
	/* Controls container */
	.controls-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	
	/* Glassmorphic buttons - styled like navbar */
	.glassmorphic-btn {
		padding: 10px 15px;
		background: var(--glass-bg-light);
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
	
	.dark-mode .glassmorphic-btn {
		background: var(--glass-bg-dark);
		color: var(--page-text);
	}
	
	.glassmorphic-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(98, 168, 124, 0.2);
	}
	
	/* Active state for electric button */
	.electric-btn.active {
		background-color: rgba(98, 168, 124, 0.3);
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
		width: 60%;  /* Reduced from 80% */
		max-width: 600px;  /* Reduced from 800px */
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
		transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
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
		transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
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
	
	/* Glassmorphic navbar with accent colors */
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
		background: rgba(255, 255, 255, 0.1);  /* Very subtle white base */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(98, 168, 124, 0.3);  /* Subtle accent color border */
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		transition: all 0.4s ease;
	}
	
	/* Dark mode adjustments for navbar */
	.dark-mode .main-nav {
		background: rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(98, 168, 124, 0.3);
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
	
	/* Nav links styling */
	.nav-links a {
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: bold;
		position: relative;
		padding: 8px 0;
		transition: all 0.3s ease;
	}
	
	/* Bold, prominent underline effect with accent color */
	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 3px;
		background-color: var(--page-accent);
		transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1), 
					box-shadow 0.3s ease;
		opacity: 0;
	}
	
	.nav-links a:hover::after {
		width: 100%;
		opacity: 1;
		box-shadow: 0 0 10px var(--page-accent), 
					0 0 20px rgba(98, 168, 124, 0.4);
	}
	
	/* Enhanced accent color effect on hover */
	.nav-links a:hover {
		color: var(--page-accent);
		text-shadow: 0 0 8px rgba(98, 168, 124, 0.6);
		letter-spacing: 0.05em;
	}
	
	/* Glassmorphic Shapes Container */
	.floating-shapes-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999; /* Just below navbar (1000) */
		pointer-events: none;
		overflow: hidden;
	}
	
	/* Base style for all floating shapes - smaller and more subtle */
	.floating-shape {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		will-change: transform;
		transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), 
					background 0.3s ease,
					box-shadow 0.3s ease;
		backdrop-filter: blur(5px); /* Reduced from 15px */
		-webkit-backdrop-filter: blur(5px); /* Reduced from 15px */
		background: var(--shape-bg-light);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		border: 1px solid var(--shape-border-light);
	}
	
	/* Dark mode adjustments */
	.dark-mode .floating-shape {
		background: var(--shape-bg-dark);
		border-color: var(--shape-border-dark);
	}
	
	/* Enhanced effect when cursor is near */
	.floating-shape.repelled {
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 20px var(--shape-glow);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
					background 0.2s ease,
					box-shadow 0.2s ease;
		z-index: 1001; /* Bring repelled shapes to front */
	}
	
	.dark-mode .floating-shape.repelled {
		background: rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 20px var(--shape-glow);
	}
	
	/* Attraction effect - distinct from repulsion */
	.floating-shape.attracted {
		background: rgba(98, 168, 124, 0.12);
		box-shadow: 0 0 20px rgba(98, 168, 124, 0.5);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
					background 0.2s ease,
					box-shadow 0.2s ease;
		z-index: 1001;
	}

	.dark-mode .floating-shape.attracted {
		background: rgba(98, 168, 124, 0.12);
		box-shadow: 0 0 20px rgba(98, 168, 124, 0.5);
	}
	
	/* Special effect when shape is clicked */
	.floating-shape.clicked {
		background: rgba(98, 168, 124, 0.15);
		box-shadow: 0 0 30px var(--shape-glow), 0 0 15px white;
		z-index: 1002; /* Bring clicked shapes to very front */
		transition: transform 0.3s cubic-bezier(0.18, 1.25, 0.4, 1.1),
					background 0.3s ease,
					box-shadow 0.3s ease;
	}
	
	/* Basic shape styles - SMALLER SIZES */
	
	/* Circle shapes */
	.shape-circle {
		border-radius: 50%;
		width: 100px; /* Reduced from 140px */
		height: 100px;
	}
	
	.shape-circle-small {
		border-radius: 50%;
		width: 30px; /* Reduced from 40px */
		height: 30px;
	}
	
	/* Triangle shapes using clip-path */
	.shape-triangle {
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		width: 90px; /* Reduced from 120px */
		height: 90px;
	}
	
	.shape-triangle-small {
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		width: 40px; /* Reduced from 50px */
		height: 40px;
	}
	
	/* Square shapes with rounded corners */
	.shape-square {
		border-radius: 10px;
		width: 90px; /* Reduced from 120px */
		height: 90px;
	}
	
	.shape-square-small {
		border-radius: 5px;
		width: 30px; /* Reduced from 40px */
		height: 30px;
	}
	
	/* Rectangle shapes */
	.shape-rectangle {
		border-radius: 10px;
		width: 110px; /* Reduced from 150px */
		height: 60px; /* Reduced from 80px */
	}
	
	/* Diamond shapes */
	.shape-diamond {
		transform: rotate(45deg);
		border-radius: 10px;
		width: 80px; /* Reduced from 100px */
		height: 80px;
	}
	
	.shape-diamond-small {
		transform: rotate(45deg);
		border-radius: 5px;
		width: 35px; /* Reduced from 45px */
		height: 35px;
	}
	
	/* Hexagon shapes */
	.shape-hexagon {
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		width: 90px; /* Reduced from 120px */
		height: 90px;
	}
	
	.shape-hexagon-small {
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		width: 45px; /* Reduced from 60px */
		height: 45px;
	}
	
	/* Pentagon shape */
	.shape-pentagon {
		clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
		width: 85px; /* Reduced from 110px */
		height: 85px;
	}
	
	/* Oval shape */
	.shape-oval {
		border-radius: 50%;
		width: 90px; /* Reduced from 120px */
		height: 55px; /* Reduced from 70px */
	}
	
	/* Rhombus shape */
	.shape-rhombus {
		transform: skew(20deg, 10deg);
		width: 70px; /* Reduced from 90px */
		height: 70px;
	}
	
	/* Trapezoid shape */
	.shape-trapezoid {
		clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
		width: 90px; /* Reduced from 120px */
		height: 60px; /* Reduced from 80px */
	}
	
	/* Parallelogram shape */
	.shape-parallelogram {
		transform: skew(-20deg);
		width: 75px; /* Reduced from 100px */
		height: 45px; /* Reduced from 60px */
	}
	
	/* Star shape */
	.shape-star {
		clip-path: polygon(
			50% 0%, 61% 35%, 98% 35%, 68% 57%,
			79% 91%, 50% 70%, 21% 91%, 32% 57%,
			2% 35%, 39% 35%
		);
		width: 60px; /* Reduced from 80px */
		height: 60px;
	}
	
	/* Cross shape */
	.shape-cross {
		clip-path: polygon(
			35% 0%, 65% 0%, 65% 35%, 100% 35%,
			100% 65%, 65% 65%, 65% 100%, 35% 100%,
			35% 65%, 0% 65%, 0% 35%, 35% 35%
		);
		width: 55px; /* Reduced from 70px */
		height: 55px;
	}
	
	/* Heart shape */
	.shape-heart {
		clip-path: path('M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z');
		width: 55px; /* Reduced from 70px */
		height: 55px;
	}
	
	/* Droplet shape */
	.shape-droplet {
		clip-path: path('M50,0 C50,0 0,50 0,75 C0,100 25,100 50,100 C75,100 100,100 100,75 C100,50 50,0 50,0 Z');
		width: 45px; /* Reduced from 60px */
		height: 60px; /* Reduced from 80px */
	}
	
	/* Octagon shape */
	.shape-octagon {
		clip-path: polygon(
			30% 0%, 70% 0%, 100% 30%, 100% 70%,
			70% 100%, 30% 100%, 0% 70%, 0% 30%
		);
		width: 55px; /* Reduced from 70px */
		height: 55px;
	}
	
	/* Position all shapes */
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
		right: 55%;
	}
	
	/* New shape positions */
	.shape-instance-16 {
		top: 22%;
		left: 5%;
	}
	
	.shape-instance-17 {
		top: 85%;
		right: 25%;
	}
	
	.shape-instance-18 {
		top: 15%;
		right: 35%;
	}
	
	.shape-instance-19 {
		bottom: 50%;
		left: 28%;
	}
	
	.shape-instance-20 {
		bottom: 70%;
		right: 18%;
	}
	
	.shape-instance-21 {
		top: 38%;
		left: 78%;
	}
	
	.shape-instance-22 {
		bottom: 25%;
		right: 42%;
	}
	
	.shape-instance-23 {
		top: 55%;
		left: 12%;
	}
	
	.shape-instance-24 {
		top: 72%;
		right: 7%;
	}
	
	.shape-instance-25 {
		bottom: 62%;
		left: 75%;
	}
	
	.shape-instance-26 {
		top: 7%;
		left: 85%;
	}
	
	.shape-instance-27 {
		bottom: 7%;
		left: 60%;
	}
	
	.shape-instance-28 {
		top: 65%;
		right: 75%;
	}
	
	.shape-instance-29 {
		bottom: 35%;
		left: 4%;
	}
	
	.shape-instance-30 {
		top: 45%;
		right: 4%;
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
		background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.05)), url('/images/cards/avperformace.jpg');
	}
	
	.image2 {
		background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.05)), url('/images/cards/interactive.png');
	}
	
	.image3 {
		
		background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.05)), url('/images/cards/branding.png');
		
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
		font-size: 1.5rem;
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
	
	/* Responsive adjustments for floating shapes */
	@media (max-width: 768px) {
		.floating-shape {
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
		}
		
		/* Adjust sizes for mobile */
		.shape-circle, .shape-square, .shape-hexagon, .shape-triangle, .shape-pentagon {
			width: 60px !important;
			height: 60px !important;
		}
		
		.shape-rectangle, .shape-oval, .shape-parallelogram, .shape-trapezoid {
			width: 70px !important;
			height: 40px !important;
		}
		
		.shape-star, .shape-cross, .shape-heart, .shape-droplet, .shape-octagon, .shape-rhombus, .shape-diamond {
			width: 50px !important;
			height: 50px !important;
		}
		
		.shape-circle-small, .shape-triangle-small, .shape-square-small, .shape-hexagon-small, .shape-diamond-small {
			width: 25px !important;
			height: 25px !important;
		}
		
		/* Controls for mobile */
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
		
		/* Responsive Adjustments */
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
		
		.giant-logotype-container {
			width: 70%;
			max-width: 450px;
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
	
	@media (max-width: 480px) {
		.giant-logotype-container {
			width: 80%;
			max-width: 350px;
		}
		
		.floating-shape {
			backdrop-filter: blur(3px);
			-webkit-backdrop-filter: blur(3px);
		}
		
		/* Even smaller on very small screens */
		.shape-circle, .shape-square, .shape-hexagon, .shape-triangle, .shape-pentagon {
			width: 45px !important;
			height: 45px !important;
		}
		
		.shape-rectangle, .shape-oval, .shape-parallelogram, .shape-trapezoid {
			width: 50px !important;
			height: 30px !important;
		}
		
		.shape-star, .shape-cross, .shape-heart, .shape-droplet, .shape-octagon, .shape-rhombus, .shape-diamond {
			width: 40px !important;
			height: 40px !important;
		}
		
		.shape-circle-small, .shape-triangle-small, .shape-square-small, .shape-hexagon-small, .shape-diamond-small {
			width: 20px !important;
			height: 20px !important;
		}
		
		/* Hide some shapes on very small screens to prevent overcrowding */
		.shape-instance-16, .shape-instance-18, .shape-instance-21, .shape-instance-24, .shape-instance-27, .shape-instance-29 {
			display: none;
		}
		
		/* Adjustments for controls on small screens */
		.controls-container {
			right: 5px;
			bottom: 5px;
		}
		
		.glassmorphic-btn {
			padding: 6px 8px;
			font-size: 0.6rem;
		}
		
		/* Main content adjustments */
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
		
		.cta-button {
			padding: 0.8rem 1.5rem;
			font-size: 0.9rem;
		}
	}
</style>