// src/lib/stores/theme.js
import { writable } from 'svelte/store';

function createThemeStore() {
    const { subscribe, set, update } = writable({
        isAnimating: false,
        intervalId: null,
        currentBackground: 'dark', // Default state
    });

    const updateDOM = (mode) => {
        if (typeof document === 'undefined') return;

        const pageContainer = document.querySelector('.page-container');
        const allSvgs = document.querySelectorAll('.responsive-svg');

        if (mode === 'dark') {
            document.documentElement.style.setProperty('--background-color', '#111');
            document.documentElement.style.setProperty('--text-color', '#FFE964');
            document.documentElement.style.setProperty('--page-secondary-text', '#C4C4C4'); // Grigio su nero
            if (pageContainer) {
                pageContainer.classList.add('dark-mode');
                pageContainer.classList.remove('light-mode');
            }
            allSvgs.forEach(svg => {
                svg.classList.add('on-dark');
                svg.classList.remove('on-light');
            });
        } else { // light mode
            document.documentElement.style.setProperty('--background-color', '#FFE964');
            document.documentElement.style.setProperty('--text-color', '#1A1A1A');
            document.documentElement.style.setProperty('--page-secondary-text', '#1A1A1A'); // Nero su giallo
            if (pageContainer) {
                pageContainer.classList.add('light-mode');
                pageContainer.classList.remove('dark-mode');
            }
            allSvgs.forEach(svg => {
                svg.classList.add('on-light');
                svg.classList.remove('on-dark');
            });
        }
    };

    function start() {
        update(state => {
            if (state.isAnimating) return state;

            const intervalId = setInterval(() => {
                update(s => {
                    const newMode = s.currentBackground === 'dark' ? 'light' : 'dark';
                    updateDOM(newMode);
                    return { ...s, currentBackground: newMode };
                });
            }, 300);

            return { ...state, isAnimating: true, intervalId };
        });
    }

    function stop() {
        update(state => {
            if (!state.isAnimating) return state;
            clearInterval(state.intervalId);
            updateDOM('dark'); // Ripristina lo stato scuro
            return { isAnimating: false, intervalId: null, currentBackground: 'dark' };
        });
    }

    return {
        subscribe,
        start,
        stop,
        toggle: () => update(state => (state.isAnimating ? stop(state) : start(state))),
        reset: () => update(state => stop(state)) // Funzione per resettare allo stato di default
    };
}

export const theme = createThemeStore();