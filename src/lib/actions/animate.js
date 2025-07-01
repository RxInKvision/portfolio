// src/lib/actions/animate.js

export function animate(node) {
    let observer;

    const options = {
        root: null, // osserva rispetto al viewport
        rootMargin: '0px',
        threshold: 0.2 // l'animazione parte quando il 20% dell'elemento è visibile
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.classList.add('visible');
                // Opzionale: smetti di osservare dopo che l'animazione è partita
                observer.unobserve(node);
            }
        });
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(node);

    return {
        destroy() {
            // Pulisce l'observer quando il componente viene distrutto
            if (observer) {
                observer.disconnect();
            }
        }
    };
}