<script>
	import { page } from '$app/stores';
	import { getWorkById } from '$lib/works-data';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';

	import YoutubeEmbed from '$lib/components/YoutubeEmbed.svelte';
	import VimeoEmbed from '$lib/components/VimeoEmbed.svelte';

	// --- LOGICA DI BASE ---
	$: workId = $page.params.slug;
	$: work = getWorkById(workId);
	$: figmaUrl =
		work && work.figmaEmbedUrl ? `${work.figmaEmbedUrl}&scaling=scale-down-width&hide-ui=1` : '';

	let readyToAnimate = false;
	let heroMediaError = false;
	let figmaContainerElement;

	async function openFigmaFullscreen() {
		if (figmaContainerElement) {
			try {
				if (figmaContainerElement.requestFullscreen) {
					await figmaContainerElement.requestFullscreen();
				} else if (figmaContainerElement.webkitRequestFullscreen) {
					await figmaContainerElement.webkitRequestFullscreen();
				} else if (figmaContainerElement.msRequestFullscreen) {
					await figmaContainerElement.msRequestFullscreen();
				}
			} catch (err) {
				console.error(`Errore nell'attivare la modalità fullscreen: ${err.message}`);
			}
		}
	}

	let pageContainer;
	let svgLayer1, svgLayer2, svgLayer3, svgLayer4, svgLayer5;
	let mouseX = 0;
	let mouseY = 0;
	let mouseMoveEnabled = false;
	let throttleTimer = false;
	let smoothScrollY = 0;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// --- LOGICA SLIDER E GALLERIA ---
	let isSliderOpen = false;
	let currentSlideIndex = 0;
	let galleryVideos = [];

	let galleryFirstRow = [];
	let gallerySecondRow = [];
	let isMultiRow = false;

	$: if (work) {
		if (work.gallery.length > 4) {
			isMultiRow = true;
			const middleIndex = Math.ceil(work.gallery.length / 2);
			galleryFirstRow = work.gallery.slice(0, middleIndex);
			gallerySecondRow = work.gallery.slice(middleIndex);
		} else {
			isMultiRow = false;
			galleryFirstRow = work.gallery;
			gallerySecondRow = [];
		}
	}

	function pauseGalleryVideos() {
		galleryVideos.forEach(v => {
            if (v && !v.paused) {
                v.pause();
            }
        });
	}

	function playGalleryVideos() {
		galleryVideos.forEach(v => {
             if (v && v.paused) {
                v.play().catch(e => console.error("Errore nel riprodurre il video in background", e));
            }
        });
	}

	function openSlider(index) {
		isSliderOpen = true;
		currentSlideIndex = index;
		document.body.style.overflow = 'hidden';
		pauseGalleryVideos();
	}

	function closeSlider() {
		isSliderOpen = false;
		document.body.style.overflow = '';
		playGalleryVideos();
	}

	function nextSlide(event) {
		event.stopPropagation();
		currentSlideIndex = (currentSlideIndex + 1) % work.gallery.length;
	}

	function prevSlide(event) {
		event.stopPropagation();
		currentSlideIndex = (currentSlideIndex - 1 + work.gallery.length) % work.gallery.length;
	}

	function handleKeyDown(event) {
		if (!isSliderOpen) return;
		if (event.key === 'ArrowRight') { event.preventDefault(); nextSlide(event); }
        else if (event.key === 'ArrowLeft') { event.preventDefault(); prevSlide(event); }
        else if (event.key === 'Escape') { event.preventDefault(); closeSlider(); }
	}

	function handleHeroMediaError() {
		heroMediaError = true;
	}

	onMount(() => {
		if (!work) {
			goto('/works');
			return;
		}

		document.documentElement.style.setProperty('--background-color', '#1A1A1A');
		document.documentElement.style.setProperty('--text-color', '#FFE964');
		if (pageContainer) {
			pageContainer.classList.add('dark-mode');
		}
		const allLogos = document.querySelectorAll('.responsive-svg');
		allLogos.forEach((logo) => {
			logo.classList.add('on-dark');
			logo.classList.remove('on-light');
		});

		setupSmoothAnimations();

		setTimeout(() => {
			readyToAnimate = true;
			setTimeout(() => {
				mouseMoveEnabled = true;
			}, 600);
		}, 300);

		return () => {
			document.body.style.overflow = '';
		};
	});

	function setupSmoothAnimations() {
		smoothScrollY = window.scrollY;
		function animationLoop() {
			if (isSliderOpen) {
				requestAnimationFrame(animationLoop);
				return;
			}
			smoothScrollY += (window.scrollY - smoothScrollY) * 0.05;
			if (mouseMoveEnabled) {
				lastMouseX += (mouseX - lastMouseX) * 0.1;
				lastMouseY += (mouseY - lastMouseY) * 0.1;
			}
			if (readyToAnimate) {
				updatePatternPositions();
			}
			requestAnimationFrame(animationLoop);
		}
		animationLoop();
	}

	function updatePatternPositions() {
		if (svgLayer1) svgLayer1.style.transform = `translate(${lastMouseX * 20}px, ${lastMouseY * 20 + smoothScrollY * 0.08}px) rotate(${smoothScrollY * 0.002}deg)`;
		if (svgLayer2) svgLayer2.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.06}px)`;
		if (svgLayer3) svgLayer3.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10 + smoothScrollY * 0.04}px)`;
		if (svgLayer4) svgLayer4.style.transform = `translate(${lastMouseX * -12}px, ${lastMouseY * -12 - smoothScrollY * 0.05}px) rotate(${-smoothScrollY * 0.001}deg)`;
		if (svgLayer5) svgLayer5.style.transform = `translate(${lastMouseX * -15}px, ${lastMouseY * -15 - smoothScrollY * 0.07}px)`;
	}

	function handleMouseMove(e) {
		if (!mouseMoveEnabled || throttleTimer || isSliderOpen) return;
		throttleTimer = true;
		setTimeout(() => { throttleTimer = false; }, 16);
		mouseX = (e.clientX / window.innerWidth) * 2 - 1;
		mouseY = (e.clientY / window.innerHeight) * 2 - 1;
	}

	function navigateBack() {
		goto('/works');
	}
</script>

<svelte:head>
	<title>{work ? work.title : 'Project'} | Riccardo Pichi</title>
	<meta name="description" content={work ? work.description : 'Project details'} />
	<style>
		body {
			background-color: var(--background-color) !important;
			color: var(--text-color) !important;
			transition: background-color 0.05s ease, color 0.05s ease !important;
			overflow-x: hidden;
			scroll-behavior: smooth;
		}
		html {
			scroll-behavior: smooth;
		}
		h1, h2, h3, p, a {
			transition: color 0.00s ease !important;
		}
	</style>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:keydown={handleKeyDown} />

<div class="project-page-container" bind:this={pageContainer} class:dark-mode={true} class:slider-open={isSliderOpen}>
	<div class="svg-background-container">
		<div class="svg-layer svg-layer-1" bind:this={svgLayer1}><div class="svg-pattern bg-far"></div></div>
		<div class="svg-layer svg-layer-2" bind:this={svgLayer2}><div class="svg-pattern bg-medium-far"></div></div>
		<div class="svg-layer svg-layer-3" bind:this={svgLayer3}><div class="svg-pattern bg-middle"></div></div>
		<div class="svg-layer svg-layer-4" bind:this={svgLayer4}><div class="svg-pattern bg-medium-near"></div></div>
		<div class="svg-layer svg-layer-5" bind:this={svgLayer5}><div class="svg-pattern bg-near"></div></div>
	</div>

	<Navbar />

	{#if work}
		<div class="project-content" class:ready={readyToAnimate}>
			<nav class="project-nav">
				<button on:click={navigateBack} class="back-button">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M15 18l-6-6 6-6" />
					</svg>
					Back to Works
				</button>
			</nav>

			<section class="project-hero">
				<div class="hero-media">
					{#if work.heroMedia.type === 'image'}
						<img src={heroMediaError ? '/placeholder-av-performance.svg' : work.heroMedia.src} alt={`Hero image for ${work.title} project`} on:error={handleHeroMediaError}/>
					{:else if work.heroMedia.type === 'video'}
						<video controls autoplay loop playsinline muted src={heroMediaError ? '' : work.heroMedia.src} on:error={handleHeroMediaError}>
							Your browser does not support the video tag.
						</video>
					{:else if work.heroMedia.type === 'youtube'}
						<YoutubeEmbed videoId={work.heroMedia.videoId} />
					{:else if work.heroMedia.type === 'vimeo'}
						<VimeoEmbed videoId={work.heroMedia.videoId} />
					{/if}
				</div>
				<div class="hero-content">
					<h1>{work.title}</h1>
					<p class="project-year">{work.year}</p>
					<div class="project-categories">
						{#each work.categories as category}
							<span class="category-tag">{category}</span>
						{/each}
					</div>
				</div>
			</section>

			<section class="scrolling-gallery">
                {#if galleryFirstRow.length > 0}
				<div class="gallery-track-wrapper">
					<div class="gallery-track-content">
						{#each galleryFirstRow as mediaItem, index (`row1-${index}`)}
							<div class="gallery-item" on:click={() => openSlider(index)}>
								{#if mediaItem.type === 'video'}
									<video bind:this={galleryVideos[index]} autoplay muted loop playsinline preload="auto" src={mediaItem.src}></video>
									<div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div>
								{:else}
									<img src={mediaItem.src} alt={`Gallery item ${index + 1}`} loading="lazy" />
								{/if}
							</div>
						{/each}
					</div>
					<div class="gallery-track-content" aria-hidden="true">
						{#each galleryFirstRow as mediaItem, index (`row1-clone-${index}`)}
							<div class="gallery-item" on:click={() => openSlider(index)}>
								{#if mediaItem.type === 'video'}
									<video autoplay muted loop playsinline preload="auto" src={mediaItem.src}></video>
									<div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div>
								{:else}
									<img src={mediaItem.src} alt={`Gallery item ${index + 1}`} loading="lazy" />
								{/if}
							</div>
						{/each}
					</div>
				</div>
                {/if}
                {#if isMultiRow}
				<div class="gallery-track-wrapper">
					<div class="gallery-track-content reverse">
						{#each gallerySecondRow as mediaItem, index (`row2-${index}`)}
							{@const globalIndex = galleryFirstRow.length + index}
							<div class="gallery-item" on:click={() => openSlider(globalIndex)}>
								{#if mediaItem.type === 'video'}
									<video bind:this={galleryVideos[globalIndex]} autoplay muted loop playsinline preload="auto" src={mediaItem.src}></video>
									<div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div>
								{:else}
									<img src={mediaItem.src} alt={`Gallery item ${globalIndex + 1}`} loading="lazy" />
								{/if}
							</div>
						{/each}
					</div>
					<div class="gallery-track-content reverse" aria-hidden="true">
						{#each gallerySecondRow as mediaItem, index (`row2-clone-${index}`)}
							{@const globalIndex = galleryFirstRow.length + index}
							<div class="gallery-item" on:click={() => openSlider(globalIndex)}>
								{#if mediaItem.type === 'video'}
									<video autoplay muted loop playsinline preload="auto" src={mediaItem.src}></video>
									<div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div>
								{:else}
									<img src={mediaItem.src} alt={`Gallery item ${globalIndex + 1}`} loading="lazy" />
								{/if}
							</div>
						{/each}
					</div>
				</div>
                {/if}
			</section>

			<section class="project-overview">
				<div class="overview-content">
					<h2>Project Overview</h2>
					<p class="main-description">{work.description}</p>
					<div class="project-details">
						<div class="detail-section">
							<h3>Challenge</h3>
							<p>{work.challenge}</p>
						</div>
						<div class="detail-section">
							<h3>Solution</h3>
							<p>{work.solution}</p>
						</div>
					</div>
				</div>
			</section>

			{#if work.figmaEmbedUrl}
				<section class="figma-section" on:click={openFigmaFullscreen}>
					<h3>Esplora il Prototipo</h3>
					<p class="figma-instructions">Clicca per aprire a schermo intero</p>
					<div class="figma-aspect-ratio-container" bind:this={figmaContainerElement}>
						<div class="figma-fullscreen-overlay">
							<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                            </svg>
						</div>
						<iframe class="figma-iframe" title="{work.title} Figma Prototype" src={figmaUrl} allowfullscreen></iframe>
					</div>
				</section>
			{/if}

			<section class="project-technologies">
				<h2>Technologies Used</h2>
				<div class="technologies-grid">
					{#each work.technologies as tech}
						<div class="tech-item">{tech}</div>
					{/each}
				</div>
			</section>

			<section class="project-features">
				<h2>Key Features</h2>
				<ul>
					{#each work.keyFeatures as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</section>
		</div>
	{:else}
		<div class="not-found">
			<h1>Project Not Found</h1>
			<p>The project you are looking for does not exist.</p>
			<a href="/works">Back to Works</a>
		</div>
	{/if}

	<footer>
		<div class="footer-content">
			<p class="copyright">© {new Date().getFullYear()} RICCARDO PICHI</p>
			<p class="tagline">THINK IN'INK</p>
		</div>
	</footer>
</div>

{#if isSliderOpen}
	<div class="slider-overlay" on:click|self={closeSlider}>
		<button class="slider-close-btn" on:click={closeSlider}>×</button>
		<div class="slider-content">
			{#key currentSlideIndex}
				{@const item = work.gallery[currentSlideIndex]}
				{#if item.type === 'image'}
					<img src={item.src} alt={`Slide ${currentSlideIndex + 1}`} />
				{:else if item.type === 'video'}
					<video controls autoplay playsinline loop src={item.src}>
						Your browser does not support the video tag.
					</video>
				{/if}
			{/key}
		</div>
		<button class="slider-nav-btn prev" on:click={prevSlide}>❮</button>
		<button class="slider-nav-btn next" on:click={nextSlide}>❯</button>
	</div>
{/if}

<style>
	/* === STILI GLOBALI E DI BASE === */
	.dark-mode {
		--page-bg: #1A1A1A;
		--page-text: #FFE964;
		--page-secondary-text: #C4C4C4;
		--page-accent: #4A8D65;
	}
	:global(.responsive-svg.on-dark) {
		filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%)
			contrast(103%);
		transition: filter 0.05s ease;
	}
	.project-page-container {
		min-height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
		padding: 8rem 2rem 4rem;
		position: relative;
		z-index: 2;
	}
	.project-content {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s ease, transform 0.8s ease;
		position: relative;
		z-index: 10;
	}
	.project-content.ready {
		opacity: 1;
		transform: translateY(0);
	}

	/* === SFONDO ANIMATO SVG === */
	.svg-background-container {
		position: fixed; top: 0; left: 0; width: 100%; height: 100%;
		z-index: 0; overflow: hidden; pointer-events: none;
	}
	.svg-layer {
		position: absolute; top: -150%; left: -150%; width: 400%; height: 400%;
		transition: transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
		will-change: transform; pointer-events: none;
	}
    .slider-open .svg-layer {
        transition: none !important;
    }
	.svg-layer-1 { z-index: 1; opacity: 0.02; }
	.svg-layer-2 { z-index: 2; opacity: 0.03; }
	.svg-layer-3 { z-index: 3; opacity: 0.04; }
	.svg-layer-4 { z-index: 4; opacity: 0.03; }
	.svg-layer-5 { z-index: 5; opacity: 0.02; }
	.svg-pattern {
		position: absolute; width: 100%; height: 100%; background-repeat: repeat;
		filter: grayscale(100%); mix-blend-mode: overlay;
	}
	.bg-far { background-image: url('/images/full-logo.svg'); background-size: 600px auto; }
	.bg-medium-far { background-image: url('/images/logotype.svg'); background-size: 450px auto; }
	.bg-middle { background-image: url('/images/pictogram.svg'); background-size: 200px auto; }
	.bg-medium-near { background-image: url('/images/logotype.svg'); background-size: 250px auto; transform: rotate(45deg); }
	.bg-near { background-image: url('/images/pictogram.svg'); background-size: 100px auto; }

	/* === NAVIGAZIONE === */
	.main-nav {
		position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between;
		align-items: center; padding: 1.5rem 2rem; z-index: 1000; background: rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(74, 141, 101, 0.15); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}
	.nav-logo img {
		width: 40px; height: 40px;
		transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), filter 0.4s ease;
	}
	.nav-logo:hover img {
		transform: scale(1.1) rotate(5deg); filter: drop-shadow(0 0 8px var(--page-accent));
	}
	.nav-links {
		display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0;
	}
	.nav-links li { position: relative; transition: transform 0.3s ease; }
	.nav-links li:hover { transform: translateY(-3px); }
	.nav-links li.active a { color: var(--page-accent); }
	.nav-links a {
		text-decoration: none; font-size: 0.9rem; font-weight: bold; position: relative;
		padding: 8px 0; color: var(--page-text); transition: all 0.3s ease;
	}
	.nav-links a::after {
		content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
		background-color: var(--page-accent);
		transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
		opacity: 0;
	}
	.nav-links a:hover::after,
	.nav-links li.active a::after {
		width: 100%; opacity: 0.8; box-shadow: 0 0 6px rgba(74, 141, 101, 0.3);
	}
	.nav-links a:hover {
		color: var(--page-accent); text-shadow: 0 0 4px rgba(74, 141, 101, 0.3);
		letter-spacing: 0.03em;
	}

	/* === CONTENUTO DELLA PAGINA === */
	.project-nav { margin-bottom: 3rem; }
	.back-button {
		display: inline-flex; align-items: center; gap: 0.5rem; background: none; border: none;
		color: var(--page-accent); font-size: 0.9rem; font-weight: bold; text-transform: uppercase;
        cursor: pointer; transition: color 0.3s ease, letter-spacing 0.3s ease;
	}
	.back-button:hover { color: var(--page-text); letter-spacing: 0.5px; }
	.back-button svg { width: 18px; height: 18px; }
	.project-hero {
		text-align: center;
		margin-bottom: 4rem;
	}
	.hero-media {
		width: 100%;
        max-width: 900px;
        margin: 0 auto 2rem auto;
		min-height: 320px; background-color: #000;
		border-radius: 8px; overflow: hidden;
	}
	.hero-media img, .hero-media video, .hero-media object {
		width: 100%; height: 100%; object-fit: cover; border-radius: 8px;
	}
	.hero-media > :global(div) { width: 100%; height: 100%; }
	.hero-content h1 {
		font-size: 3rem; margin: 0; line-height: 1.2; font-weight: bold; color: var(--page-accent);
	}
	.project-year {
		font-size: 1rem; color: var(--page-text); margin-top: 0.5rem; opacity: 0.9;
	}
	.project-categories {
		display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;
	}
	.category-tag {
		background-color: transparent; border: 1px solid var(--page-accent);
        color: var(--page-text); padding: 0.5rem 1.2rem; font-family: inherit;
        font-size: 0.8rem; cursor: default; border-radius: 3px; text-transform: uppercase;
	}

	/* === GALLERIA SCORREVOLE === */
	@keyframes scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}
	.scrolling-gallery {
		max-width: 100vw; overflow: hidden;
		-webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
		mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
		margin-top: 6rem; margin-bottom: 6rem; display: flex; flex-direction: column; gap: 1rem;
	}
    .gallery-track-wrapper { display: flex; }
	.gallery-track-content {
		display: flex; flex-shrink: 0;
		animation: scroll 30s linear infinite;
	}
    .gallery-track-content.reverse { animation-direction: reverse; }
	.scrolling-gallery:hover .gallery-track-content,
    .slider-open .gallery-track-content {
		animation-play-state: paused;
	}
	.gallery-item {
		flex-shrink: 0; width: 450px; height: 350px;
        margin-right: 1rem;
		border-radius: 8px; overflow: hidden; cursor: pointer;
		position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.gallery-item:hover {
		transform: scale(0.97); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
	}
	.gallery-item img, .gallery-item video {
		width: 100%; height: 100%; object-fit: cover;
	}
	.play-icon {
		position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
		color: rgba(255, 255, 255, 0.8); font-size: 2.5rem; opacity: 0;
		transition: opacity 0.3s ease; pointer-events: none; z-index: 5;
	}
	.gallery-item:hover .play-icon { opacity: 1; }

	/* === DETTAGLI PROGETTO === */
	.project-overview { margin-bottom: 3rem; text-align: center; }
    .overview-content { max-width: 800px; margin: 0 auto; }
	h2 {
		color: var(--page-accent); margin-bottom: 1.2rem; font-size: 1.8rem; text-align: center;
	}
	.overview-content p.main-description {
		font-size: 1rem; color: var(--page-text); margin-bottom: 3rem; line-height: 1.6;
	}
	.project-details {
		display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2.5rem; margin-top: 2rem; text-align: left;
	}
	.detail-section h3 {
		color: var(--page-accent); margin-bottom: 0.8rem; font-size: 1.1rem;
	}
	.detail-section p {
		font-size: 0.9rem; color: var(--page-secondary-text); line-height: 1.6;
	}
	.project-technologies, .project-features { margin-top: 6rem; }
	.technologies-grid {
		display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;
	}
	.tech-item {
		font-family: 'IBM Plex Mono', monospace; font-weight: 500; text-transform: uppercase;
		letter-spacing: 0.05em; background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.1); color: var(--page-secondary-text);
		padding: 0.8rem 1.5rem; border-radius: 6px; transition: all 0.3s ease;
	}
	.tech-item:hover {
		transform: translateY(-4px); background: rgba(255, 255, 255, 0.1); color: var(--page-text);
		box-shadow: 0 0 20px rgba(74, 141, 101, 0.3), 0 0 5px rgba(255, 233, 100, 0.2);
		border-color: rgba(74, 141, 101, 0.5);
	}
	.project-features ul {
		list-style-type: none; padding: 0; max-width: 800px; margin: 2rem auto 0 auto;
		display: grid; gap: 1.2rem; text-align: left;
	}
	.project-features li {
		padding-left: 2rem; position: relative; font-size: 1rem;
	}
	.project-features li::before {
		content: '↳'; position: absolute; left: 0; top: -2px;
		color: var(--page-accent); font-weight: bold;
	}

	/* === SLIDER FULLSCREEN === */
	.slider-overlay {
		position: fixed; top: 0; left: 0; width: 100%; height: 100%;
		background-color: rgba(0, 0, 0, 0.85); display: flex; justify-content: center;
		align-items: center; z-index: 2000; backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); opacity: 1; transition: opacity 0.3s ease;
	}
	.slider-close-btn {
		position: absolute; top: 15px; right: 20px; background: none; border: none;
		color: white; font-size: 2.5rem; cursor: pointer; z-index: 2001;
		transition: color 0.3s ease, transform 0.3s ease;
	}
    .slider-close-btn:hover { color: var(--page-accent); transform: scale(1.1); }
	.slider-content {
		max-width: 90vw; max-height: 90vh; display: flex;
		justify-content: center; align-items: center; position: relative;
	}
	.slider-content img, .slider-content video {
		width: auto; height: auto; max-width: 100%; max-height: 90vh;
		object-fit: contain; border-radius: 0;
	}
	.slider-nav-btn {
		position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.2);
		border: none; color: var(--page-text); font-size: 2.5rem; cursor: pointer;
		padding: 8px 12px; z-index: 2001; border-radius: 8px; transition: background-color 0.3s ease;
	}
	.slider-nav-btn:hover { background-color: rgba(0,0,0,0.5); }
	.slider-nav-btn.prev { left: 15px; }
	.slider-nav-btn.next { right: 15px; }
	
    /* === SEZIONE FIGMA E FOOTER === */
	.figma-section { cursor: pointer; position: relative; margin-top: 6rem; }
    .figma-section h3 { margin-bottom: 0.5rem; }
	.figma-instructions {
		text-align: center; font-size: 0.85rem; color: var(--page-secondary-text); margin-bottom: 1.5rem;
	}
	.figma-aspect-ratio-container {
		position: relative; width: 100%; height: 0; padding-bottom: 56.25%;
		border-radius: 8px; overflow: hidden; background-color: #000;
	}
	.figma-fullscreen-overlay {
		position: absolute; top: 0; left: 0; width: 100%; height: 100%;
		background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
		align-items: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
	}
	.figma-section:hover .figma-fullscreen-overlay { opacity: 1; }
	.figma-aspect-ratio-container:fullscreen { padding-bottom: 0; height: 100%; width: 100%; }
	.figma-aspect-ratio-container:fullscreen .figma-iframe { height: 100%; width: 100%; }
	.figma-iframe {
		position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;
	}
    footer {
		padding: 3rem 0; margin-top: 3rem; border-top: 1px solid rgba(74, 141, 101, 0.15);
		position: relative; z-index: 2;
	}
	.footer-content { display: flex; justify-content: space-between; }
	.copyright, .tagline { font-size: 0.8rem; }
	.tagline { color: var(--page-accent); }
    .not-found {
		max-width: 600px; margin: 4rem auto; text-align: center;
		color: var(--page-text); position: relative; z-index: 10;
	}
	.not-found a {
		color: var(--page-accent); text-decoration: none; margin-top: 1rem; display: inline-block;
	}
</style>