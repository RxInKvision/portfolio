<script>
	import { createEventDispatcher, onMount } from 'svelte';

	// Passa entrambi i percorsi dei video come props
	export let srcDesktop;
	export let srcMobile;

	let videoEl;
	let isHiding = false; // Attiva l'animazione di chiusura

	const dispatch = createEventDispatcher();

	onMount(() => {
		// Controlla la larghezza dello schermo per scegliere il video
		const isMobile = window.innerWidth < 768;
		videoEl.src = isMobile ? srcMobile : srcDesktop;

		// Prova ad avviare il video (autoplay richiede l'attributo 'muted' per essere affidabile)
		videoEl.play().catch(error => {
			console.error("Video playback failed:", error);
			// Se il play fallisce, procedi comunque a chiudere l'intro
			completeIntro();
		});
	});

	// Funzione chiamata alla fine del video
	function handleVideoEnd() {
		dispatch('hidingstart'); // 👈 NUOVO: Invia un evento quando l'animazione di chiusura INIZIA
		isHiding = true; // Avvia l'animazione della maschera
	}

	// Funzione chiamata alla fine dell'animazione della maschera
	function completeIntro() {
		dispatch('complete'); // Invia l'evento al genitore per indicare che l'intro è finita
	}
</script>

<div class="intro-container" class:hiding={isHiding} on:animationend={completeIntro}>
	<video
		bind:this={videoEl}
		playsinline
		muted
		on:ended={handleVideoEnd}
	></video>
</div>

<style>
	.intro-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #FFE964; /* 🎨 Colore di sfondo giallo per matchare il sito */
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		clip-path: circle(150% at center);
	}

	.intro-container.hiding {
		/* Animazione per la maschera circolare che si chiude */
		animation: circle-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
	}

	/* ✨ NUOVA ANIMAZIONE per rendere la transizione più bella */
	.intro-container.hiding video {
		animation: fade-out 0.5s ease-out forwards;
	}

	@keyframes circle-reveal {
		from {
			clip-path: circle(150% at center);
		}
		to {
			clip-path: circle(0% at center);
		}
	}

	/* ✨ Keyframe per la sfumatura del video */
	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 1;
		transition: opacity 0.5s ease-out; /* Transizione per la sfumatura */
	}
</style>