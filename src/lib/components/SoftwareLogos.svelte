<script>
    import LogoCard from './LogoCard.svelte';

    const cdnBaseUrl = "https://cdn.jsdelivr.net/npm/simple-icons/icons/";

    const softwareToolkit = [
        // LOCAL ICONS: These point to your static folder
        { name: 'TouchDesigner', logo: '/logos/TouchDesigner.svg' },
        { name: 'Resolume Arena', logo: '/logos/resolume.svg' },
        
        // CDN ICONS: These remain the same
        { name: 'Unreal Engine', logo: `${cdnBaseUrl}unrealengine.svg` },
        { name: 'Three.js', logo: `${cdnBaseUrl}threedotjs.svg` },
        { name: 'Adobe After Effects', logo: `${cdnBaseUrl}adobeaftereffects.svg` },
        // ... rest of your CDN icons
        { name: 'React', logo: `${cdnBaseUrl}react.svg` },
        { name: 'Figma', logo: `${cdnBaseUrl}figma.svg` },
        { name: 'Adobe Photoshop', logo: `${cdnBaseUrl}adobephotoshop.svg` },
        { name: 'DaVinci Resolve', logo: `${cdnBaseUrl}davinciresolve.svg` },
        { name: 'Adobe Illustrator', logo: `${cdnBaseUrl}adobeillustrator.svg` },
        { name: 'Blender', logo: `${cdnBaseUrl}blender.svg` },
        { name: 'Adobe InDesign', logo: `${cdnBaseUrl}adobeindesign.svg` },
        { name: 'HTML5', logo: `${cdnBaseUrl}html5.svg` },
        { name: 'CSS3', logo: `${cdnBaseUrl}css3.svg` },
        { name: 'Flutter', logo: `${cdnBaseUrl}flutter.svg` },
        { name: 'Python', logo: `${cdnBaseUrl}python.svg` },
        { name: 'Arduino', logo: `${cdnBaseUrl}arduino.svg` }
    ];
</script>

<section class="toolkit-section">
    <div class="toolkit-content">
        <h2 class="section-title">MY TOOLKIT</h2>
        <div class="logos-grid">
            {#each softwareToolkit as tool}
                <LogoCard name={tool.name} logoSrc={tool.logo} />
            {/each}
        </div>
    </div>
</section>

<style>
    .toolkit-section {
        padding: 4rem 2rem;
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        background: var(--page-bg);
        transition: background-color 0.05s ease;
    }

    .toolkit-content {
        width: 100%;
        max-width: 1100px;
        text-align: center;
    }

    .section-title {
        font-size: 2.5rem;
        margin-bottom: 4rem;
        font-weight: bold;
        color: var(--page-text);
        text-align: center;
    }

    .logos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        .section-title {
            font-size: 2rem;
            margin-bottom: 3rem;
        }
        .logos-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }
    }

    @media (max-width: 480px) {
        .toolkit-section {
            padding: 3rem 1rem;
        }
        .logos-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>