<script>
    import { page } from '$app/stores';
    import { getWorkById } from '$lib/works-data';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    // Get the work ID from the URL
    $: workId = $page.params.slug;
    $: work = getWorkById(workId);

    let readyToAnimate = false;
    let heroMediaError = false;
    let galleryMediaErrors = new Set();

    // Elements for background animation
    let pageContainer;
    let svgLayer1; // Very far layer
    let svgLayer2; // Far layer
    let svgLayer3; // Middle/content layer
    let svgLayer4; // Near layer
    let svgLayer5; // Very near layer

    let mouseX = 0;
    let mouseY = 0;
    let mouseMoveEnabled = false;
    let throttleTimer = false;
    let smoothScrollY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastScrollY = 0;

    // --- Slider related state ---
    let isSliderOpen = false;
    let currentSlideIndex = 0;
    let currentSliderVideo = null; // To manage video playback in slider

    // Function to handle video playback in slider
    function playSliderVideo() {
        if (currentSliderVideo) {
            currentSliderVideo.play().then(() => {
                // console.log("Video playback initiated successfully.");
            }).catch(error => {
                console.error("Error attempting to play video in slider:", error);
            });
        }
    }

    // Function to handle video pause in slider
    function pauseSliderVideo() {
        if (currentSliderVideo) {
            currentSliderVideo.pause();
            // console.log("Video paused.");
        }
    }

    // Opens the slider to a specific media item
    function openSlider(index) {
        // Only open slider for images and videos, PDFs will open in a new tab directly from the gallery item
        if (work.gallery[index].type === 'image' || work.gallery[index].type === 'video') {
            currentSlideIndex = index;
            isSliderOpen = true;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when slider is open

            if (work.gallery[currentSlideIndex].type === 'video') {
                setTimeout(() => {
                    playSliderVideo();
                }, 100);
            }
        } else if (work.gallery[index].type === 'pdf') {
            // For PDFs, let the click on the <a> tag handle opening in a new tab
            // This function won't be called if the click is directly on the <a>,
            // but it's here as a fallback or if structure changes.
            window.open(work.gallery[index].src, '_blank');
        }
    }

    // Closes the slider
    function closeSlider() {
        isSliderOpen = false;
        document.body.style.overflow = ''; // Restore scrolling
        pauseSliderVideo(); // Pause any playing video in the slider
    }

    // Navigates to the next slide
    function nextSlide(event) {
        event.stopPropagation(); // Prevent closing slider when clicking nav buttons
        pauseSliderVideo();
        currentSlideIndex = (currentSlideIndex + 1) % work.gallery.length;
        if (work.gallery[currentSlideIndex].type === 'video') {
            setTimeout(() => {
                playSliderVideo();
            }, 100);
        }
    }

    // Navigates to the previous slide
    function prevSlide(event) {
        event.stopPropagation(); // Prevent closing slider when clicking nav buttons
        pauseSliderVideo();
        currentSlideIndex = (currentSlideIndex - 1 + work.gallery.length) % work.gallery.length;
        if (work.gallery[currentSlideIndex].type === 'video') {
            setTimeout(() => {
                playSliderVideo();
            }, 100);
        }
    }
    // --- End Slider related state ---


    function handleHeroMediaError() {
        heroMediaError = true;
        console.error("Hero media failed to load. Displaying fallback.");
    }

    function handleGalleryMediaError(index) {
        galleryMediaErrors = galleryMediaErrors.add(index);
        console.error(`Gallery media item ${index} failed to load. Displaying fallback.`);
    }

    onMount(() => {
        if (!work) {
            goto('/works');
            return;
        }

        document.documentElement.style.setProperty('--background-color', '#1A1A1A');
        document.documentElement.style.setProperty('--text-color', '#FFE964');
        document.documentElement.style.setProperty('--page-secondary-text', '#C4C4C4');
        document.body.style.backgroundColor = "#1A1A1A";
        document.body.style.color = "#FFE964";

        if (pageContainer) {
            pageContainer.classList.add('dark-mode');
        }

        const allLogos = document.querySelectorAll('.responsive-svg');
        allLogos.forEach(logo => {
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
            document.documentElement.style.removeProperty('--background-color');
            document.documentElement.style.removeProperty('--text-color');
            document.documentElement.style.removeProperty('--page-secondary-text');
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.body.style.overflow = ''; // Ensure overflow is reset on component unmount
        };
    });

    function setupSmoothAnimations() {
        smoothScrollY = window.scrollY;
        lastScrollY = window.scrollY;

        function animationLoop() {
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;

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
        if (svgLayer1) {
            svgLayer1.style.transform = `translate(${lastMouseX * 20}px, ${lastMouseY * 20 + smoothScrollY * 0.08}px) rotate(${smoothScrollY * 0.002}deg)`;
        }
        if (svgLayer2) {
            svgLayer2.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.06}px)`;
        }
        if (svgLayer3) {
            svgLayer3.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10 + smoothScrollY * 0.04}px)`;
        }
        if (svgLayer4) {
            svgLayer4.style.transform = `translate(${lastMouseX * -12}px, ${lastMouseY * -12 - smoothScrollY * 0.05}px) rotate(${-smoothScrollY * 0.001}deg)`;
        }
        if (svgLayer5) {
            svgLayer5.style.transform = `translate(${lastMouseX * -15}px, ${lastMouseY * -15 - smoothScrollY * 0.07}px)`;
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

        h1, h2, h3, p, a, span, li, button {
            transition: color 0.1s ease !important;
        }
    </style>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} />

<div class="project-page-container" bind:this={pageContainer} class:dark-mode={true}>
    <div class="svg-background-container">
        <div class="svg-layer svg-layer-1" bind:this={svgLayer1}>
            <div class="svg-pattern bg-far"></div>
        </div>
        <div class="svg-layer svg-layer-2" bind:this={svgLayer2}>
            <div class="svg-pattern bg-medium-far"></div>
        </div>
        <div class="svg-layer svg-layer-3" bind:this={svgLayer3}>
            <div class="svg-pattern bg-middle"></div>
        </div>
        <div class="svg-layer svg-layer-4" bind:this={svgLayer4}>
            <div class="svg-pattern bg-medium-near"></div>
        </div>
        <div class="svg-layer svg-layer-5" bind:this={svgLayer5}>
            <div class="svg-pattern bg-near"></div>
        </div>
    </div>

    <nav class="main-nav">
        <div class="nav-logo">
            <a href="/">
                <img src="/images/pictogram.svg" alt="RxInK Logo" class="responsive-svg on-light" />
            </a>
        </div>
        <ul class="nav-links">
            <li class="active"><a href="/works">WORKS</a></li>
            <li><a href="/about">ABOUT</a></li>
            <li><a href="/contact">CONTACT</a></li>
        </ul>
    </nav>

    {#if work}
        <div class="project-content" class:ready={readyToAnimate}>
            <nav class="project-nav">
                <button on:click={navigateBack} class="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    Back to Works
                </button>
            </nav>

            <section class="project-hero">
                <div class="hero-content">
                    <h1>{work.title}</h1>
                    <p class="project-year">{work.year}</p>
                    <div class="project-categories">
                        {#each work.categories as category}
                            <span class="category-tag">{category}</span>
                        {/each}
                    </div>
                </div>
                <div class="hero-media">
                    {#if work.heroMedia.type === 'image'}
                        <img
                            src={heroMediaError ? '/placeholder-av-performance.svg' : work.heroMedia.src}
                            alt={`Hero image for ${work.title} project`}
                            on:error={handleHeroMediaError}
                        />
                    {:else if work.heroMedia.type === 'video'}
                        <video controls autoplay loop playsinline
                            src={heroMediaError ? '' : work.heroMedia.src}
                            on:error={handleHeroMediaError}
                        >
                            Your browser does not support the video tag.
                        </video>
                    {:else if work.heroMedia.type === 'pdf'}
                        <object data={work.heroMedia.src} type="application/pdf">
                            <p>Unable to display PDF. <a href={work.heroMedia.src} target="_blank">Download the PDF</a> instead.</p>
                        </object>
                    {/if}
                </div>
            </section>

            <section class="project-gallery">
                <h2>Project Gallery</h2>
                <div class="gallery-grid">
                    {#each work.gallery as mediaItem, index}
                        {#if mediaItem.type === 'pdf'}
                            <a href={mediaItem.src} target="_blank" class="gallery-item pdf-gallery-item">
                                <div class="pdf-thumbnail">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <span>View PDF</span>
                                </div>
                            </a>
                        {:else}
                            <div class="gallery-item" on:click={() => openSlider(index)}>
                                {#if mediaItem.type === 'image'}
                                    <img
                                        src={galleryMediaErrors.has(index)
                                            ? '/images/cards/avperformance.jpg' /* Fallback image */
                                            : mediaItem.src}
                                        alt={`Gallery image ${index + 1} of ${work.title} project`}
                                        on:error={() => handleGalleryMediaError(index)}
                                    />
                                {:else if mediaItem.type === 'video'}
                                    <video controls playsinline
                                        src={galleryMediaErrors.has(index)
                                            ? ''
                                            : mediaItem.src}
                                        on:error={() => handleGalleryMediaError(index)}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <div class="play-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
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
            <p class="copyright">&copy; {new Date().getFullYear()} RICCARDO PICHI</p>
            <p class="tagline">THINK IN'INK</p>
        </div>
    </footer>
</div>

{#if isSliderOpen}
    <div class="slider-overlay" class:active={isSliderOpen} on:click|self={closeSlider}>
        <button class="slider-close-btn" on:click={closeSlider}>&times;</button>

        <div class="slider-content">
            {#if work.gallery[currentSlideIndex].type === 'image'}
                <img src={work.gallery[currentSlideIndex].src} alt={`Slide ${currentSlideIndex + 1}`} />
            {:else if work.gallery[currentSlideIndex].type === 'video'}
                <video controls autoplay playsinline loop bind:this={currentSliderVideo}>
                    <source src={work.gallery[currentSlideIndex].src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            {:else if work.gallery[currentSlideIndex].type === 'pdf'}
                <iframe src={work.gallery[currentSlideIndex].src} title="PDF Viewer" width="100%" height="100%" frameborder="0">
                    <p>It appears your browser doesn't support iframes. You can <a href={work.gallery[currentSlideIndex].src} target="_blank">download the PDF</a> instead.</p>
                </iframe>
            {/if}
        </div>

        <button class="slider-nav-btn prev" on:click={prevSlide}>&#10094;</button>
        <button class="slider-nav-btn next" on:click={nextSlide}>&#10095;</button>
    </div>
{/if}

<style>
    /* Color mode classes */
    .dark-mode {
        --page-bg: #1A1A1A;
        --page-text: #FFE964; /* Main yellow text */
        --page-secondary-text: #C4C4C4; /* New secondary grey text */
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

    .project-page-container {
        min-height: 100vh;
        max-width: 1200px;
        margin: 0 auto;
        padding: 8rem 2rem 4rem;
        position: relative;
        z-index: 2; /* Ensures content is above patterns */
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
        color: var(--page-text); /* Use CSS variable */
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

    /* Project Page Content Styles */
    .project-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        position: relative;
        z-index: 10; /* Ensure content is above patterns */
    }

    .project-content.ready {
        opacity: 1;
        transform: translateY(0);
    }

    .project-nav {
        margin-bottom: 1.5rem; /* Smaller margin */
    }

    .back-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        border: none;
        color: var(--page-accent);
        font-size: 0.95rem; /* Smaller text */
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .back-button:hover {
        color: var(--page-text);
    }

    .back-button svg {
        width: 20px; /* Smaller icon */
        height: 20px;
    }

    /* Hero Section - Increased Size and Media Handling */
    .project-hero {
        display: flex;
        align-items: center;
        margin-bottom: 3rem; /* Adjusted margin */
        gap: 3rem; /* Increased gap */
    }

    .hero-content {
        flex: 1;
    }

    .hero-content h1 {
        font-size: 3.2rem; /* Slightly smaller heading */
        margin-bottom: 0.8rem; /* Smaller margin */
        color: var(--page-accent);
    }

    .project-year {
        font-size: 1rem; /* Slightly smaller */
        color: rgba(255, 233, 100, 0.7);
        margin-bottom: 1rem;
    }

    .project-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem; /* Smaller gap */
        margin-bottom: 1.5rem; /* Adjusted margin */
    }

    .category-tag {
        background-color: rgba(74, 141, 101, 0.1); /* Lighter background */
        color: var(--page-accent);
        padding: 0.3rem 0.7rem; /* Adjusted padding */
        border-radius: 4px; /* Slightly more rounded */
        font-size: 0.75rem;
        text-transform: uppercase;
        border: 1px solid rgba(74, 141, 101, 0.3); /* Subtle border */
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .category-tag:hover {
        background-color: rgba(74, 141, 101, 0.2); /* Darker on hover */
        border-color: var(--page-accent); /* Stronger border on hover */
    }

    .hero-media {
        flex: 1.5; /* Makes hero media section slightly larger than content */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        overflow: hidden; /* Ensures media fits within bounds */
        min-height: 320px; /* Adjusted min height */
        background-color: #000; /* Dark background for videos/PDFs */
    }

    .hero-media img,
    .hero-media video,
    .hero-media object {
        width: 100%;
        height: 100%; /* Fill the container */
        object-fit: cover; /* Cover the area, cropping if necessary */
        border-radius: 8px; /* Apply border-radius directly to media */
    }

    /* Specific style for PDF objects in heroMedia to ensure visibility */
    .hero-media object {
        width: 100%;
        height: 450px; /* Adjusted PDF height */
        max-width: 100%;
        border: none; /* Remove default object border */
    }

    /* Project Overview */
    .project-overview {
        margin-bottom: 3rem; /* Adjusted margin */
    }

    .overview-content h2 {
        color: var(--page-accent);
        margin-bottom: 1.2rem; /* Smaller margin */
        font-size: 1.8rem; /* Smaller H2 size */
    }

    .overview-content p {
        font-size: 0.9rem; /* Smaller paragraph font */
        line-height: 1.6; /* Adjusted line height */
        color: var(--page-secondary-text); /* Secondary text color for general paragraphs */
    }

    .overview-content p.main-description {
        font-size: 1rem; /* Slightly smaller for the main description */
        color: var(--page-text); /* Keep main description in primary yellow */
        margin-bottom: 1.5rem; /* Added margin for main description */
    }

    .project-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem; /* Increased gap for details section */
        margin-top: 2rem; /* Adjusted margin */
    }

    .detail-section h3 {
        color: var(--page-accent);
        margin-bottom: 0.8rem; /* Smaller margin */
        font-size: 1.1rem; /* Smaller H3 */
    }

    .detail-section p {
        font-size: 0.85rem; /* Smaller detail paragraph font */
        color: var(--page-secondary-text); /* Secondary text color */
        line-height: 1.5; /* Adjusted line height */
    }

    /* Technologies */
    .project-technologies {
        margin-bottom: 3rem; /* Adjusted margin */
    }

    .project-technologies h2 {
        color: var(--page-accent);
        margin-bottom: 1.2rem; /* Consistent H2 margin */
        font-size: 1.8rem; /* Consistent H2 size */
    }

    .technologies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Adjusted min width */
        gap: 0.8rem; /* Smaller gap */
    }

    .tech-item {
        background-color: rgba(74, 141, 101, 0.1); /* Lighter background */
        color: var(--page-accent);
        padding: 0.7rem 0.9rem; /* Adjusted padding */
        text-align: center;
        border-radius: 4px; /* Slightly more rounded */
        font-size: 0.85rem;
        border: 1px solid rgba(74, 141, 101, 0.3); /* Subtle border */
        transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
    }

    .tech-item:hover {
        background-color: rgba(74, 141, 101, 0.2);
        border-color: var(--page-accent);
        transform: translateY(-2px); /* Subtle lift on hover */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    /* Key Features */
    .project-features {
        margin-bottom: 3rem; /* Adjusted margin */
    }

    .project-features h2 {
        color: var(--page-accent);
        margin-bottom: 1.2rem; /* Consistent H2 margin */
        font-size: 1.8rem; /* Consistent H2 size */
    }

    .project-features ul {
        list-style-type: none;
        padding: 0;
    }

    .project-features li {
        position: relative;
        padding-left: 1.8rem; /* Adjusted padding */
        margin-bottom: 0.7rem; /* Slightly larger gap between list items */
        font-size: 0.9rem; /* Adjusted list item font */
        color: var(--page-secondary-text); /* Secondary text color */
        line-height: 1.5;
    }

    .project-features li::before {
        content: '▶';
        position: absolute;
        left: 0;
        color: var(--page-accent);
        margin-right: 0.8rem;
        font-size: 0.75rem;
    }

    /* Gallery - Increased Size */
    .project-gallery {
        margin-bottom: 3rem; /* Adjusted margin */
    }

    .project-gallery h2 {
        color: var(--page-accent);
        margin-bottom: 1.2rem; /* Consistent H2 margin */
        font-size: 1.8rem; /* Consistent H2 size */
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Adjusted minimum width for gallery items */
        gap: 1.5rem; /* Smaller gap */
    }

    .gallery-item {
        position: relative;
        width: 100%;
        height: 320px; /* Adjusted fixed height for consistent gallery items */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer; /* Indicate it's clickable */
    }
    
    /* Specific styles for PDF gallery items (now direct links) */
    .gallery-item.pdf-gallery-item {
        cursor: pointer; /* Keep cursor pointer */
        text-decoration: none; /* Remove underline from link */
    }

    .gallery-item:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .gallery-item img,
    .gallery-item video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    .pdf-thumbnail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: var(--page-text);
        background-color: rgba(74, 141, 101, 0.1);
        border: 1px solid var(--page-accent);
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .pdf-thumbnail:hover {
        background-color: rgba(74, 141, 101, 0.2);
        border-color: var(--page-accent);
    }

    .pdf-thumbnail svg {
        color: var(--page-accent);
        margin-bottom: 0.5rem;
    }

    .pdf-thumbnail span {
        font-size: 0.9rem; /* Smaller PDF text */
        font-weight: bold;
    }

    .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.8);
        font-size: 2.5rem; /* Smaller play icon */
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 5;
    }

    .gallery-item:hover .play-icon {
        opacity: 1;
    }

    /* Fullscreen Slider Styles */
    .slider-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0s linear 0.3s;
    }

    .slider-overlay.active {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease, visibility 0s linear 0s;
    }

    .slider-close-btn {
        position: absolute;
        top: 15px; /* Smaller distance from top */
        right: 20px; /* Smaller distance from right */
        background: none;
        border: none;
        color: var(--page-text);
        font-size: 2rem; /* Smaller 'x' */
        cursor: pointer;
        z-index: 2001;
        transition: color 0.3s ease;
    }

    .slider-close-btn:hover {
        color: var(--page-accent);
    }

    .slider-content {
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        overflow: hidden;
    }

    .slider-content img,
    .slider-content video {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 0;
    }

    /* Adjust iframe height for PDFs in slider */
    .slider-content iframe {
        width: 80vw;
        height: 80vh;
        max-width: 100%;
        max-height: 100%;
        background-color: #fff;
        border: none;
        border-radius: 8px;
    }

    .slider-nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--page-text);
        font-size: 2rem; /* Smaller arrows */
        cursor: pointer;
        padding: 8px 12px; /* Smaller padding */
        transition: color 0.3s ease;
        z-index: 2001;
    }

    .slider-nav-btn:hover {
        color: var(--page-accent);
    }

    .slider-nav-btn.prev {
        left: 15px; /* Adjusted position */
    }

    .slider-nav-btn.next {
        right: 15px; /* Adjusted position */
    }

    /* Not Found Styles */
    .not-found {
        max-width: 600px;
        margin: 4rem auto;
        text-align: center;
        color: var(--page-text);
        position: relative;
        z-index: 10;
    }

    .not-found a {
        color: var(--page-accent);
        text-decoration: none;
        margin-top: 1rem;
        display: inline-block;
    }

    /* Footer */
    footer {
        padding: 2.5rem 0; /* Smaller padding */
        margin-top: 2.5rem; /* Smaller margin */
        border-top: 1px solid rgba(74, 141, 101, 0.15);
        position: relative;
        z-index: 2;
        color: var(--page-text);
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .copyright, .tagline {
        font-size: 0.75rem; /* Smaller font */
        color: var(--page-secondary-text);
    }

    .tagline {
        color: var(--page-accent);
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
        .project-hero {
            flex-direction: column;
            gap: 1.5rem; /* Smaller gap */
        }

        .hero-media {
            min-height: 280px; /* Adjusted min height */
        }

        .hero-content h1 {
            font-size: 2.8rem; /* Adjusted font size */
        }

        .project-details {
            grid-template-columns: 1fr;
            gap: 1rem; /* Smaller gap */
        }

        .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Adjusted for medium screens */
            gap: 1.2rem; /* Smaller gap */
        }

        .gallery-item {
            height: 280px; /* Adjusted height */
        }
    }

    @media (max-width: 768px) {
        .project-page-container {
            padding: 5rem 1rem 2rem; /* Adjusted padding */
        }

        .main-nav {
            padding: 0.8rem 1rem; /* Smaller padding */
        }

        .hero-content h1 {
            font-size: 2.2rem; /* Adjusted font size */
        }

        .hero-media {
            min-height: 250px; /* Adjusted min height */
        }

        .gallery-item {
            height: 250px; /* Adjusted height */
        }
        
        .slider-content {
            max-width: 95vw;
            max-height: 85vh; /* Adjusted max height */
        }

        .slider-nav-btn {
            font-size: 1.8rem; /* Further smaller */
            padding: 5px 8px; /* Adjusted padding */
        }

        .slider-nav-btn.prev {
            left: 5px;
        }

        .slider-nav-btn.next {
            right: 5px;
        }

        .slider-close-btn {
            font-size: 1.8rem; /* Further smaller */
            top: 10px;
            right: 10px;
        }

        .footer-content {
            flex-direction: column;
            gap: 0.8rem; /* Smaller gap */
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        .project-page-container {
            padding: 4rem 0.8rem 1.5rem; /* Further adjusted padding */
        }

        .hero-content h1 {
            font-size: 1.8rem; /* Adjusted font size */
        }

        .hero-media {
            min-height: 200px; /* Adjusted min height */
        }

        .gallery-grid {
            grid-template-columns: 1fr;
            gap: 1rem; /* Smaller gap */
        }

        .gallery-item {
            height: 220px; /* Adjusted height */
        }

        .slider-content {
            max-width: 98vw;
            max-height: 75vh; /* Adjusted max height */
        }
    }
</style>