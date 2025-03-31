<script>
    import { page } from '$app/stores';
    import { getWorkById } from '$lib/works-data';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    // Get the work ID from the URL
    $: workId = $page.params.slug;
    $: work = getWorkById(workId);
    
    let readyToAnimate = false;
    let heroImageError = false;
    let galleryImageErrors = new Set();
    
    function handleHeroImageError() {
        heroImageError = true;
    }
    
    function handleGalleryImageError(index) {
        galleryImageErrors.add(index);
        galleryImageErrors = galleryImageErrors;
    }
    
    onMount(() => {
        // Validate work exists
        if (!work) {
            goto('/works');
            return;
        }
        
        // Set dark mode
        document.body.style.backgroundColor = "#1A1A1A";
        document.body.style.color = "#FFE964";
        
        // Animate in after a short delay
        setTimeout(() => {
            readyToAnimate = true;
        }, 100);
        
        // Cleanup
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    });

    function navigateBack() {
        goto('/works');
    }
</script>

<svelte:head>
    <title>{work ? work.title : 'Project'} | Riccardo Pichi</title>
    <meta name="description" content={work ? work.description : 'Project details'} />
</svelte:head>

{#if work}
    <div class="project-page" class:ready={readyToAnimate}>
        <!-- Navigation -->
        <nav class="project-nav">
            <button on:click={navigateBack} class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                Back to Works
            </button>
        </nav>

        <!-- Hero Section -->
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
            <div class="hero-image">
                <img 
                    src={heroImageError ? '/placeholder-av-performance.svg' : work.heroImage} 
                    alt={`Hero image for ${work.title} project`} 
                    style="width: 100%; height: auto; object-fit: cover;"
                    on:error={handleHeroImageError}
                />
            </div>
        </section>
        
        <!-- Project Overview -->
        <section class="project-overview">
            <div class="overview-content">
                <h2>Project Overview</h2>
                <p>{work.description}</p>
                
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
        
        <!-- Technologies -->
        <section class="project-technologies">
            <h2>Technologies Used</h2>
            <div class="technologies-grid">
                {#each work.technologies as tech}
                    <div class="tech-item">{tech}</div>
                {/each}
            </div>
        </section>
        
        <!-- Key Features -->
        <section class="project-features">
            <h2>Key Features</h2>
            <ul>
                {#each work.keyFeatures as feature}
                    <li>{feature}</li>
                {/each}
            </ul>
        </section>
        
        <!-- Gallery -->
        <section class="project-gallery">
            <h2>Project Gallery</h2>
            <div class="gallery-grid">
                {#each work.gallery as image, index}
                    <div class="gallery-item">
                        <img 
                            src={galleryImageErrors.has(index) 
                                ? '/placeholder-brand-identity.svg' 
                                : image} 
                            alt={`Gallery image ${index + 1} of ${work.title} project`} 
                            style="width: 100%; height: 300px; object-fit: cover;"
                            on:error={() => handleGalleryImageError(index)}
                        />
                    </div>
                {/each}
            </div>
        </section>
    </div>
{:else}
    <div class="not-found">
        <h1>Project Not Found</h1>
        <p>The project you are looking for does not exist.</p>
        <a href="/works">Back to Works</a>
    </div>
{/if}

<style>
    .project-nav {
        margin-bottom: 2rem;
    }

    .back-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        border: none;
        color: #4A8D65;
        font-size: 1rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .back-button:hover {
        color: #FFE964;
    }

    .back-button svg {
        width: 24px;
        height: 24px;
    }

    .project-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
        color: #FFE964;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .project-page.ready {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Hero Section */
    .project-hero {
        display: flex;
        align-items: center;
        margin-bottom: 4rem;
        gap: 2rem;
    }
    
    .hero-content {
        flex: 1;
    }
    
    .hero-content h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #4A8D65;
    }
    
    .project-year {
        font-size: 1.2rem;
        color: rgba(255, 233, 100, 0.7);
        margin-bottom: 1rem;
    }
    
    .project-categories {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .category-tag {
        background-color: rgba(74, 141, 101, 0.2);
        color: #4A8D65;
        padding: 0.3rem 0.8rem;
        border-radius: 3px;
        font-size: 0.8rem;
        text-transform: uppercase;
    }
    
    .hero-image {
        flex: 1;
    }
    
    .hero-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
    }
    
    /* Project Overview */
    .project-overview {
        margin-bottom: 4rem;
    }
    
    .overview-content h2 {
        color: #4A8D65;
        margin-bottom: 1.5rem;
    }
    
    .project-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .detail-section h3 {
        color: #4A8D65;
        margin-bottom: 1rem;
    }
    
    /* Technologies */
    .project-technologies {
        margin-bottom: 4rem;
    }
    
    .technologies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .tech-item {
        background-color: rgba(74, 141, 101, 0.1);
        color: #4A8D65;
        padding: 1rem;
        text-align: center;
        border-radius: 4px;
    }
    
    /* Key Features */
    .project-features {
        margin-bottom: 4rem;
    }
    
    .project-features ul {
        list-style-type: none;
        padding: 0;
    }
    
    .project-features li {
        position: relative;
        padding-left: 2rem;
        margin-bottom: 1rem;
    }
    
    .project-features li::before {
        content: '▶';
        position: absolute;
        left: 0;
        color: #4A8D65;
        margin-right: 1rem;
    }
    
    /* Gallery */
    .project-gallery {
        margin-bottom: 4rem;
    }
    
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .gallery-item img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s ease;
    }
    
    .gallery-item img:hover {
        transform: scale(1.05);
    }

    /* Not Found Styles */
    .not-found {
        max-width: 600px;
        margin: 4rem auto;
        text-align: center;
        color: #FFE964;
    }

    .not-found a {
        color: #4A8D65;
        text-decoration: none;
        margin-top: 1rem;
        display: inline-block;
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
        .project-hero {
            flex-direction: column;
        }
        
        .project-details {
            grid-template-columns: 1fr;
        }
    }
</style>