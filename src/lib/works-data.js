export const worksData = [
    {
    id: 'forum-archive-reverie',
    title: "Forum - Archive Reverie",
    year: 2025,
    categories: ["Installazione Immersiva", "Web 3D", "Performance"],
    description: "Per il 55° anniversario dei Forum Studios, Archive Reverie affronta la sfida di rivitalizzare l'archivio storico, superando la logica del database statico. La visione trasforma il patrimonio dello studio in un paesaggio memoriale da esplorare liberamente, un ambiente evocativo dove frammenti sonori e visivi diventano echi di una memoria viva, incentivando la scoperta casuale e rendendo l'utente autore della propria esperienza.",
    shortDescription: "Un ecosistema interattivo che trasforma l'archivio storico dei Forum Studios in un paesaggio memoriale 3D esplorabile.",
    image: "/images/cards/forum.png",
    link: "/works/forum-archive-reverie",
    // MODIFICATO: heroMedia ora è un oggetto con tipo e src
    heroMedia:  { type: 'video', src: "/images/TRAILER_meg.mp4" },
    technologies: [
        "React",
        "Three.js (@react-three/fiber)",
        "WebGL/GLSL",
        "Supabase (PostgreSQL)",
        "Cloudinary",
        "TouchDesigner",
        "After Effects",
        "Figma",
        "Web Audio API",
        "WebSocket"
    ],
    keyFeatures: [
        "Archivio interattivo 3D navigabile via browser.",
        "Tool di creazione visiva per generare contenuti e performance live.",
        "Video-installazione immersiva su un'unica tela visiva di 9600x1080px.",
        "Paesaggio sonoro dinamico con audio spaziale 3D (Web Audio API).",
        "Controllo remoto tramite smartphone e controller MIDI fisici (WebSocket).",
        "Workflow di sviluppo innovativo basato su co-creazione con AI."
    ],
    challenge: "La sfida principale era rivitalizzare un archivio storico superando la logica del database statico. Tecnicamente, si trattava di trattare tre superfici video non sincronizzate come un'unica, continua tela visiva, e di creare un sistema performativo e flessibile per la manipolazione dei contenuti.",
    solution: "È stato sviluppato un ecosistema interconnesso con cinque output. La soluzione centrale è una web app 3D che presenta l'archivio come una costellazione di contenuti. Un tool di creazione custom  e una pipeline di rendering offline  permettono di usare l'archivio come strumento creativo ('Archive-as-Instrument'), garantendo coerenza tra l'esperienza web, la video-installazione e le performance live.",
    // MODIFICATO: gallery ora è un array di oggetti con tipo e src
    gallery: [
        { type: 'image', src: "/images/gallery/forum/immagine1.jpg" },
        { type: 'image', src: "/images/gallery/forum/immagine2.jpg" },
        { type: 'image', src: "/images/gallery/forum/immagine3.jpg" }
    ]
},
{
    id: 'kollateral',
    title: "Kollateral",
    year: 2025,
    categories: ["Installazione Interattiva", "Arte Audiovisiva"],
    description: "Kollateral esplora la luce come forza vitale che persiste oltre il trauma. Un telo sospeso, segnato da bruciature e lacerazioni, diventa il punto in cui questa energia si manifesta. Mosso dal suono, il tessuto si contrae e respira, diventando un corpo animato da un impulso vitale che trasforma la lacerazione in possibilità. La luce non è ostacolata dalla ferita: è proprio da lì che emerge.",
    shortDescription: "Un prototipo di installazione dove un telo lacerato, mosso dal suono, diventa un corpo che respira, lasciando emergere la luce dalle sue ferite.",
    image: "/images/cards/kollateral4.png",
    link: "/works/kollateral",
    // MODIFICATO: heroMedia
    heroMedia:  { type: 'video', src: "/images/cards/MAIN_16-9.mp4" },
    technologies: [
        "TouchDesigner",
        "Ableton Live",
        "MIDI",
        "DMX",
        "AI (per la fase di concept)"
    ],
    keyFeatures: [
        "Un telo sospeso si anima e si muove in reazione al suono, grazie a ventilatori controllati in tempo reale.",
        "Composizione audio originale creata ad hoc che interagisce direttamente con gli elementi visivi e fisici.",
        "Integrazione tra Ableton e TouchDesigner per il controllo audio-reattivo di luci e ventilatori.",
        "Illuminazione dinamica con teste mobili controllate via DMX e integrate in TouchDesigner.",
        "Gestione delle sequenze e degli atti dell'opera tramite trigger MIDI inviati da Ableton a TouchDesigner."
    ],
    challenge: "La sfida progettuale è stata quella di dare vita al concetto di un 'corpo che respira' attraverso un telo inanimato. Tecnicamente, ciò ha richiesto la creazione di una perfetta sincronia tra la composizione sonora, il movimento fisico del telo (indotto dai ventilatori) e l'illuminazione dinamica, per trasformare una lacerazione da semplice danno a un punto di passaggio per la luce.",
    solution: "È stato sviluppato un sistema integrato che collega Ableton Live a TouchDesigner. Ableton gestisce la traccia audio e l'invio di trigger MIDI per la progressione delle scene. TouchDesigner riceve i dati per controllare in tempo reale sia l'attivazione dei ventilatori che muovono il telo, sia il colore e il movimento delle luci (via DMX), creando un'esperienza immersiva e coesa dove suono, luce e materia sono indissolubilmente legati.",
    // MODIFICATO: gallery
    gallery: [
        { type: 'pdf', src: "/images/cards/KOLLATERAL.pdf" },
        { type: 'image', src: "/images/cards/kollateral1.png" },
        { type: 'image', src: "/images/cards/kollateral4.png" },
        { type: 'image', src: "/images/cards/kollateral2.png" },
        { type: 'image', src: "/images/cards/kollateral.png" },
        { type: 'image', src: "/images/cards/kollateral3.png" }
    ]
},
{
    id: 'beyond-the-frame',
    title: ":Beyond the Frame",
    year: 2024,
    categories: ["Installazione Interattiva", "Arte Digitale"],
    description: "Questa installazione interattiva invita lo spettatore a un viaggio sensoriale che esplora il rapporto tra percezione e distanza, giocando sul confine tra l'astratto e il riconoscibile. Ciò che da lontano appare come una texture indefinita si trasforma, avvicinandosi, in un oggetto reale che riacquista il suo contesto. È un invito a rallentare, a scoprire la bellezza nascosta nell'ordinario e a guardare oltre l'apparenza, ricordandoci che per vedere davvero, occorre fermarsi.",
    shortDescription: "Un'installazione interattiva dove la distanza dello spettatore cambia la percezione visiva, trasformando texture astratte in immagini riconoscibili.",
    image: "/images/cards/beyond-the-frame.jpg",
    link: "/works/beyond-the-frame",
    // MODIFICATO: heroMedia
    heroMedia:  { type: 'image', src: "/images/hero/beyond-the-frame.jpg" },
    technologies: [
        "TouchDesigner",
        "Arduino",
        "Sensori di prossimità a ultrasuoni",
        "LED Wall / Proiettori"
    ],
    keyFeatures: [
        "Interazione basata sulla distanza dello spettatore, rilevata da sensori di prossimità.",
        "Transizione visiva da texture fluida a soggetto riconoscibile programmata in TouchDesigner.",
        "Concept espositivo non vincolato a uno spazio specifico, ma riproducibile e adattabile.",
        "Utilizzo di hardware specifico come sensori a ultrasuoni collegati ad Arduino per ogni opera.",
        "Possibilità di aggiungere un elemento sonoro interattivo che si lega al campo visivo dello spettatore."
    ],
    challenge: "La sfida consisteva nel creare una transizione fluida e tecnicamente stabile tra la texture astratta e il soggetto finale, basata sulla posizione esatta dello spettatore. Questo ha richiesto un'attenta fase di test e ottimizzazione per calibrare la risposta del sensore, la reattività del video e assicurare una transizione senza ritardi o scatti.",
    solution: "È stato sviluppato un sistema in TouchDesigner che gestisce l'interazione video-prossimità. Utilizzando sensori a ultrasuoni collegati ad Arduino, il sistema rileva la distanza dello spettatore e la mappa a uno specifico momento del video, che è stato post-prodotto per creare una transizione progressiva. L'installazione è stata progettata per essere modulare, utilizzando schermi o proiettori incorniciati per mantenere un'estetica fotografica.",
    // MODIFICATO: gallery
    gallery: [
        { type: 'image', src: "/images/gallery/btf/immagine1.jpg" },
        { type: 'image', src: "/images/gallery/btf/immagine2.jpg" },
        { type: 'image', src: "/images/gallery/btf/immagine3.jpg" }
    ]
},
    {
        id: 'av-performance',
        title: "AV Performance",
        year: 2023,
        categories: ["Performance", "Arte Digitale"],
        description: "An immersive audiovisual performance exploring the intersection of sound and visual art, pushing the boundaries of multimedia expression.",
        shortDescription: "Immersive audiovisual experience blending sound and visuals.",
        image: "/images/cards/avperformace.jpg",
        link: "/works/av-performance",
        // MODIFICATO: heroMedia
        heroMedia:  { type: 'image', src: "/images/cards/avperformace.jpg" },
        technologies: ["Ableton Live", "Max/MSP", "TouchDesigner"],
        keyFeatures: [
            "Real-time audio-visual synthesis",
            "Interactive generative graphics",
            "Adaptive sound landscapes"
        ],
        challenge: "Creating a seamless interaction between audio and visual elements in real-time.",
        solution: "Developed a custom performance system using modular software that allows dynamic audio-visual mapping.",
        // MODIFICATO: gallery
        gallery: [
            { type: 'image', src: "/images/cards/avperformace.jpg" },
            { type: 'image', src: "/images/cards/avperformace.jpg" },
            { type: 'image', src: "/images/cards/avperformace.jpg" }
        ]
    },
    {
        id: 'brand-identity',
        title: "Brand Identity Design",
        year: 2022,
        categories: ["Branding", "Design"],
        description: "Comprehensive brand identity design for an innovative tech startup, focusing on modern minimalism and cutting-edge visual communication.",
        shortDescription: "Minimalist brand identity for a forward-thinking tech company.",
        image: "/images/cards/branding.png",
        link: "/works/brand-identity",
        // MODIFICATO: heroMedia
        heroMedia: { type: 'image', src: "/images/cards/branding.png" },
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
        keyFeatures: [
            "Cohesive visual language",
            "Adaptable logo system",
            "Modern color palette"
        ],
        challenge: "Creating a unique visual identity that stands out in a competitive tech landscape.",
        solution: "Developed a flexible branding system with a clean, futuristic aesthetic.",
        // MODIFICATO: gallery
        gallery: [
            { type: 'image', src: "/images/cards/branding.png" },
            { type: 'image', src: "/images/cards/branding.png" },
            { type: 'image', src: "/images/cards/branding.png" }
        ]
    },
    {
        id: 'interactive-installation',
        title: "Interactive Digital Installation",
        year: 2023,
        categories: ["Installazione Interattiva", "Arte Digitale"],
        description: "An interactive digital art installation that responds to audience movement and engagement, creating a dynamic and immersive experience.",
        shortDescription: "Responsive digital art installation with audience interaction.",
        image: "/images/cards/interactive.png",
        link: "/works/interactive-installation",
        // MODIFICATO: heroMedia
        heroMedia: { type: 'image', src: "/assets/img/1730732511970-Untitled design 2 2.png" },
        technologies: ["openFrameworks", "Kinect", "Arduino"],
        keyFeatures: [
            "Motion-responsive visuals",
            "Real-time audience interaction",
            "Generative art system"
        ],
        challenge: "Creating an intuitive and engaging interactive experience.",
        solution: "Developed a responsive system using motion tracking and generative graphics.",
        // MODIFICATO: gallery
        gallery: [
            { type: 'image', src: "/images/cards/interactive.png" },
            { type: 'image', src: "/images/cards/interactive.png" },
            { type: 'image', src: "/images/cards/interactive.png" }
        ]
    },
    // Nuovo progetto SymbioGlitch con la nuova struttura
    {
        id: 'symbioglitch',
        title: "SymbioGlitch",
        year: 2024,
        categories: ["Live Visuals", "Installazione Immersiva", "Arte Digitale"],
        description: "Symbioglitch è un'esplorazione artistica profonda del rapporto tra l'umanità e il mondo naturale. Attraverso un collage visivo e sonoro, il progetto si propone di denunciare le contraddizioni e le tensioni di questo dialogo, cercando di trasmettere emozioni complesse e stimolanti allo spettatore. Il montaggio delle immagini sarà randomico, sfruttando la casualità per creare qualcosa di unico e inaspettato, proprio come fa la natura stessa. Contrapponendo riprese di cose apparentemente distanti e non comunicanti, si creano nuovi significati e rivelazioni disturbanti sul rapporto tra l'uomo e la natura. L'estetica di 'Symbioglitch' è caratterizzata da un mix di glitch, oscurità e pessimismo. Utilizzando cambi di scena incalzanti, effetti di movimento distorti e manipolazioni visive, il progetto crea un'esperienza visiva disturbante e incerta, che mira a provocare reazioni viscerali nello spettatore. Si caratterizza per modifiche pesanti e quasi distruttive applicate ai video originali. Attraverso un processo che mira a denaturalizzare e modificare drasticamente il footage originale, si crea un effetto visivo e sonoro che sfida le percezioni convenzionali ed esplora nuove dimensioni del rapporto fra l'uomo e la natura. Questo approccio enfatizza la casualità nel montaggio delle immagini, aggiungendo un ulteriore strato di complessità e imprevedibilità alla narrazione visiva del progetto.",
        shortDescription: "Un'immersiva performance audiovisiva live che esplora le connessioni distorte tra umanità e natura attraverso estetiche glitch e un montaggio casuale, controllata via TouchDesigner, Resolume Arena, e MIDI controllers, e proiettata su una parete di 25 metri a Videocittà 2024.",
        image: "/images/cards/symbioglitch.jpg", // Placeholder - fornire il percorso reale
        link: "/works/symbioglitch",
        // NUOVO CAMPO: heroMedia per supportare immagini, video o pdf come elemento principale
        heroMedia: { type: 'image', src: "/images/hero/symbioglitch-hero.jpg" }, // Esempio: { type: 'video', src: "/videos/symbioglitch-hero.mp4" }
        technologies: [
            "TouchDesigner",
            "Resolume Arena",
            "MIDI Controller",
            "Audio Reactive Systems",
            "Generative Art"
        ],
        keyFeatures: [
            "Generazione e manipolazione live di contenuti visuali tramite TouchDesigner.",
            "Projection mapping e fusione dei contenuti in tempo reale con Resolume Arena su una parete di 25 metri.",
            "Controllo interattivo dei parametri visuali tramite MIDI controller.",
            "Montaggio casuale di immagini e suoni per output unici e inaspettati.",
            "Accostamento di elementi disparati per creare nuovi significati.",
            "Esperienza visiva disturbante e incerta volta a provocare reazioni viscerali.",
            "Modifiche visive pesanti e distruttive del footage originale."
        ],
        challenge: "La sfida principale era trasmettere efficacemente le 'connessioni distorte tra umanità e natura' attraverso un'estetica di glitch, oscurità e pessimismo, richiedendo significative modifiche e un montaggio casuale degli elementi visivi e sonori per sfidare le percezioni convenzionali. Tecnicamente, l'integrazione di TouchDesigner per i visual generativi con Resolume Arena per il projection mapping su una grande parete di 25 metri, il tutto controllato in tempo reale via MIDI, ha richiesto una robusta sincronizzazione e ottimizzazione.",
        solution: "Il progetto ha utilizzato una pipeline visuale live robusta. TouchDesigner è stato impiegato per creare il contenuto visuale generativo e pesantemente modificato, che è stato poi inviato a Resolume Arena per una fusione e un projection mapping senza soluzione di continuità sulla parete di 25 metri. Il controllo in tempo reale e la manipolazione dinamica dei parametri visuali sono stati ottenuti tramite controller MIDI, consentendo una performance live fluida e reattiva. La collaborazione con sound designer ha assicurato un'esperienza audiovisiva coesa.",
        // NUOVO CAMPO: gallery che è un array di oggetti per supportare immagini, video o pdf
        gallery: [
            { type: 'image', src: "/images/gallery/symbioglitch/image1.jpg" }, // Esempio: { type: 'video', src: "/videos/symbioglitch-clip1.mp4" }
            { type: 'video', src: "/videos/symbioglitch-clip2.mp4" }, // Esempio di video nella galleria
            { type: 'image', src: "/images/gallery/symbioglitch/image3.jpg" },
            { type: 'pdf', src: "/documents/symbioglitch-overview.pdf" } // Esempio di PDF nella galleria
        ]
    }
];

// Function to get a work by its ID
export function getWorkById(id) {
    return worksData.find(work => work.id === id);
}