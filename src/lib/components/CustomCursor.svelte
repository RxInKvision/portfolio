<script>
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/themeStore.js';

    let cursorEl;

    onMount(() => {
        const moveCursor = (e) => {
            if (cursorEl) {
                cursorEl.style.left = `${e.clientX}px`;
                cursorEl.style.top = `${e.clientY}px`;
            }
        };

        const handleHover = (e) => {
            if (e.target.closest('a, button, input, .figma-section, .gallery-item')) {
                cursorEl.classList.add('hover');
                theme.start();
            } else {
                cursorEl.classList.remove('hover');
                theme.stop();
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseover', handleHover);
        document.body.addEventListener('mouseleave', theme.stop);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseover', handleHover);
            document.body.removeEventListener('mouseleave', theme.stop);
        };
    });
</script>

<div bind:this={cursorEl} class="custom-cursor"></div>

<style>
    .custom-cursor {
        position: fixed;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border: 2px solid var(--text-color, #FFE964);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transition: transform 0.2s ease, background-color 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out;
        box-shadow: 0 0 25px 0px rgba(255, 255, 255, 0.3);
    }
    .custom-cursor.hover {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: var(--page-text, #FFE964);
    }
</style>