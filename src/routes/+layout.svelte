<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import VideoIntro from '$lib/components/videoIntro.svelte';

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
        }
        
        html, body {
            font-family: 'IBM Plex Mono', monospace !important;
            background-color: var(--page-bg);
            color: var(--page-text);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; height: auto; display: block; }
    </style>
</svelte:head>

<div class="app">
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
    }
</style>