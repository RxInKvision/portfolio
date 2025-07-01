<script>
    import { createEventDispatcher, onMount } from 'svelte';

    export let src; // Il percorso del video verrà passato qui

    let videoEl;
    let showPlayButton = true; // Mostra il pulsante all'inizio
    let isHiding = false; // Attiva l'animazione di chiusura

    const dispatch = createEventDispatcher();

    // Funzione per avviare il video
    async function playIntro() {
        showPlayButton = false;
        try {
            // Prova a far partire il video con audio
            await videoEl.play();
        } catch (error) {
            // Se fallisce (improbabile dopo un click), gestisci l'errore
            console.error("Video playback failed:", error);
            // In caso di errore, consideriamo l'intro completata
            completeIntro();
        }
    }

    // Funzione chiamata alla fine del video
    function handleVideoEnd() {
        isHiding = true; // Avvia l'animazione della maschera
    }

    // Funzione chiamata alla fine dell'animazione della maschera
    function completeIntro() {
        dispatch('complete'); // Invia l'evento al genitore
    }
</script>

<div class="intro-container" class:hiding={isHiding} on:animationend={completeIntro}>
    <video
        bind:this={videoEl}
        {src}
        playsinline
        on:ended={handleVideoEnd}
    ></video>

    {#if showPlayButton}
        <div class="overlay" on:click={playIntro}>
            <button class="play-button" aria-label="Start experience">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </button>
        </div>
    {/if}
</div>

<style>
    .intro-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: circle(150% at center); /* Inizia aperto, copre tutto lo schermo */
    }

    .intro-container.hiding {
        /* Animazione per la maschera circolare che si chiude */
        animation: circle-reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
    }

    @keyframes circle-reveal {
        from {
            clip-path: circle(150% at center);
        }
        to {
            clip-path: circle(0% at center);
        }
    }

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .play-button {
        background: none;
        border: 2px solid white;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    .play-button:hover {
        transform: scale(1.1);
        background-color: rgba(255,255,255,0.1);
    }
    .play-button svg {
        transform: translateX(4px); /* Centra l'icona del play */
    }
</style>