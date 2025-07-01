// src/lib/stores/themeStore.js
import { writable } from 'svelte/store';

function createThemeStore() {
    const { subscribe, set } = writable({
        isAnimating: false,
        intervalId: null,
        currentBackground: 'yellow', // Stato iniziale
    });

    // Funzione per aggiornare i colori e le classi nel DOM
    const updateDOM = (bgColor, textColor, mode) => {
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--background-color', bgColor);
            document.documentElement.style.setProperty('--text-color', textColor);
            const pageContainer = document.querySelector('.landing-page'); // Selettore generico
            if (pageContainer) {
                pageContainer.classList.toggle('dark-mode', mode === 'dark');
                pageContainer.classList.toggle('light-mode', mode === 'light');
            }
            const allLogos = document.querySelectorAll('.responsive-svg');
            allLogos.forEach(logo => {
                logo.classList.toggle('on-dark', mode === 'dark');
                logo.classList.toggle('on-light', mode === 'light');
            });
        }
    };

    const startAnimation = (state) => {
        if (state.isAnimating) return state; // Già attivo

        const intervalId = setInterval(() => {
            set(currentState => {
                if (currentState.currentBackground === 'yellow') {
                    updateDOM('#1A1A1A', '#FFE964', 'dark');
                    return { ...currentState, currentBackground: 'black' };
                } else {
                    updateDOM('#FFE964', '#1A1A1A', 'light');
                    return { ...currentState, currentBackground: 'yellow' };
                }
            });
        }, 300); // Velocità del flash

        return { ...state, isAnimating: true, intervalId };
    };

    const stopAnimation = (state) => {
        if (!state.isAnimating) return state; // Già fermo

        clearInterval(state.intervalId);
        // Ripristina lo stato di default (scuro)
        updateDOM('#111', '#FFE964', 'dark');

        return { isAnimating: false, intervalId: null, currentBackground: 'black' };
    };

    return {
        subscribe,
        start: () => set(startAnimation),
        stop: () => set(stopAnimation),
        toggle: () => set(state => state.isAnimating ? stopAnimation(state) : startAnimation(state))
    };
}

export const themeStore = createThemeStore();