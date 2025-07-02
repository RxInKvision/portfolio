<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import VideoIntro from '$lib/components/videoIntro.svelte';
    import CustomCursor from '$lib/components/CustomCursor.svelte';

    let showIntro = false;
    let siteVisible = false;

    onMount(() => {
        if (!sessionStorage.getItem('introShown')) {
            showIntro = true;
        } else {
            siteVisible = true;
        }
    });

    function handleIntroComplete() {
        showIntro = false;
        siteVisible = true;
        sessionStorage.setItem('introShown', 'true');
    }
</script>

<svelte:head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        
        :root {
            --page-bg: #111;
            --page-text: #FFE964;
            --page-secondary-text: #C4C4C4;
            --page-accent: #4A8D65;
        }
        
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            cursor: none;
        }
        
        html, body {
            font-family: 'IBM Plex Mono', monospace !important;
            background-color: var(--page-bg);
            color: var(--page-text);
            transition: background-color 0.3s ease-out;
        }
        
        /* Logica "Electric Mode" Globale */
        body.electric-mode {
            --page-bg: #FFE964;
            --page-text: #111;
            --page-secondary-text: #333;
            --page-accent: #111;
        }
        
        /* Forzatura inversione su tutti gli elementi di testo e contenitori */
        h1, h2, h3, h4, h5, h6, p, span, a, li, div, button, footer, header, nav {
            color: var(--page-text);
            transition: color 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out, opacity 0.3s ease-out;
        }
        
        /* Eccezioni per mantenere i colori corretti in electric mode */
        body.electric-mode .nav-links a.active,
        body.electric-mode .back-button,
        body.electric-mode .tagline,
        body.electric-mode .detail-section h3,
        body.electric-mode .project-features li::before {
            color: var(--page-accent) !important;
        }

        body.electric-mode .category-tag,
        body.electric-mode .tech-item,
        body.electric-mode .skill-tag {
            background-color: rgba(0,0,0,0.1) !important;
            border-color: rgba(0,0,0,0.2) !important;
            color: var(--page-text) !important;
        }

        body.electric-mode .responsive-svg.on-dark {
            filter: brightness(0) saturate(100%); /* Da giallo a nero */
        }
        
        a { text-decoration: none; }
        img { max-width: 100%; height: auto; display: block; }
    </style>
</svelte:head>

<div class="app">
    <CustomCursor />

    {#if showIntro}
        <VideoIntro src="/video/intro.mp4" on:complete={handleIntroComplete} />
    {/if}

    {#if siteVisible}
        <main transition:fade={{ duration: 500 }}>
            <slot />
        </main>
    {/if}
</div>

<style>
    .app {
        min-height: 100vh;
        position: relative;
        background-color: var(--page-bg);
        transition: background-color 0.3s ease-out;
    }
</style>