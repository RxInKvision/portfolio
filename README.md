# RXINK — Riccardo Pichi Portfolio

Portfolio di Riccardo Pichi, Art Director & Creative Technologist ad Arsenale 23.
SvelteKit 2 + Svelte 5, GSAP (ScrollTrigger, SplitText), Lenis per lo smooth scroll. Bilingue IT/EN.

## Comandi

```bash
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # build di produzione (tutte le pagine prerenderizzate)
npm run media     # ottimizza i media originali (vedi sotto)
```

Il deploy è su Vercel: ogni push su `main` va in produzione.

## Struttura

| Cosa                                                | Dove                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| Progetti (testi IT/EN, media, ordine)               | `src/lib/data/projects.js`                                                  |
| Testi dell'interfaccia, bio, contatti, social       | `src/lib/i18n.svelte.js`                                                    |
| Colori, font, griglia                               | `src/app.css`                                                               |
| Animazioni condivise (reveal, parallax, split text) | `src/lib/motion.svelte.js`                                                  |
| Pagine                                              | `src/routes/`                                                               |
| Logo SVG                                            | `static/brand/` e `src/lib/components/Logotype.svelte` / `Pictogram.svelte` |

## Aggiungere un progetto

1. Metti gli originali (png/jpg/mp4, anche pesanti) in `media-src/images/projects/<nome-progetto>/`.
2. `npm run media` → crea in `static/media/` le versioni web (WebP 1600/800 px, MP4 720p muti + poster) e aggiorna le dimensioni in `src/lib/data/media-manifest.json`.
3. Aggiungi una voce in `src/lib/data/projects.js` copiando un progetto esistente. I percorsi media non hanno estensione, es. `'projects/<nome-progetto>/cover'`.
4. `featured: true` lo mostra in homepage.

`media-src/` non è nel repository (gli originali pesavano 2,2 GB); le versioni ottimizzate sì.

## Reel della homepage

`static/media/reel/reel.mp4` è un montaggio muto di ~17 s dai progetti. Quando hai uno showreel VFX/AI, sostituisci il file (1280×720, H.264, senza audio, < 4 MB) e il poster `reel-poster.jpg`.
