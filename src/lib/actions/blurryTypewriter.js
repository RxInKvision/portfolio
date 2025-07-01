// src/lib/actions/blurryTypewriter.js

export function blurryTypewriter(node) {
    let observer;

    const doAnimate = () => {
        const text = node.textContent;
        const chars = text.split('');
        node.innerHTML = ''; // Svuota il nodo

        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Usa non-breaking space per gli spazi
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.filter = 'blur(10px)';
            span.style.transition = `opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)`;
            span.style.transitionDelay = `${i * 0.02}s`; // Leggero ritardo per ogni lettera
            node.appendChild(span);
        });

        // Forza il reflow per applicare lo stato iniziale prima di animare
        requestAnimationFrame(() => {
            node.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                span.style.filter = 'blur(0)';
            });
        });
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                doAnimate();
                observer.unobserve(node);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(node);

    return {
        destroy() {
            if (observer) observer.disconnect();
        }
    };
}