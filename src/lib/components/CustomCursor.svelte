<script>
    import { onMount } from 'svelte';

    let cursorEl;

    onMount(() => {
        const moveCursor = (e) => {
            if (cursorEl) {
                cursorEl.style.left = `${e.clientX}px`;
                cursorEl.style.top = `${e.clientY}px`;
            }
        };

        const handleHover = (e) => {
            if (e.target.closest('a, button, input, textarea, .figma-section, .gallery-item, .slider-nav-btn, .slider-close-btn')) {
                cursorEl.classList.add('hover');
                document.body.classList.add('electric-mode');
            } else {
                cursorEl.classList.remove('hover');
                document.body.classList.remove('electric-mode');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseover', handleHover);
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
        border: 2px solid var(--page-text);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1), 
                    background-color 0.3s ease-out, 
                    border-color 0.3s ease-out,
                    box-shadow 0.3s ease-out;
        box-shadow: 0 0 25px 0px rgba(255, 255, 255, 0.3);
    }

    .custom-cursor.hover {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: var(--page-text);
    }
</style>