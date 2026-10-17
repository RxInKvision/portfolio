// Every project in the portfolio. Text fields are bilingual: { en, it }.
// Media paths are relative to /static/media (see scripts/optimize-media.mjs).
//   image: 'projects/forum/1'        -> /media/projects/forum/1.webp (+ -sm.webp)
//   video: 'projects/forum/video1'   -> /media/projects/forum/video1.mp4 (+ -poster.webp)
// To add a project: drop originals in media-src/images/projects/<slug>/, run `npm run media`,
// then add an entry below. Order here = order on the site.

export const disciplines = {
	ai: { en: 'AI Film', it: 'AI Film' },
	film: { en: 'Film & Direction', it: 'Film & Regia' },
	installation: { en: 'Installations & Live', it: 'Installazioni & Live' },
	campaign: { en: 'Campaigns', it: 'Campagne' },
	brand: { en: 'Brand & Identity', it: 'Brand & Identità' },
	digital: { en: 'Digital & Web', it: 'Digital & Web' },
	photo: { en: 'Photography', it: 'Fotografia' }
};

export const projects = [
	{
		slug: 'unicum-spec',
		title: 'Unicum',
		client: { en: 'Spec ads', it: 'Spot spec' },
		year: 2026,
		featured: true,
		disciplines: ['ai', 'campaign'],
		role: { en: 'Concept, AI Direction, Edit', it: 'Concept, Regia AI, Montaggio' },
		cover: 'projects/unicum/stills/piscina',
		preview: 'projects/unicum/molto-piu',
		hero: {
			type: 'video',
			src: 'projects/unicum/molto-piu',
			poster: 'projects/unicum/stills/piscina',
			sound: true,
			index: 1,
			title: { en: 'Molto + di un amaro', it: 'Molto + di un amaro' }
		},
		summary: {
			en: 'Two spec commercials for Unicum, generated entirely with AI — concept, direction and edit.',
			it: "Due spot spec per Unicum, interamente generati con l'AI: concept, regia e montaggio."
		},
		description: {
			en: 'Two unsolicited spots for Unicum, built around one question: can an AI-generated commercial hold up next to a shot one? “Molto + di un amaro” turns a supermarket aisle into a journey through places and moments; “L’unico che non avanza mai” plays on a house party where every bottle gets left over — except one. Characters, product and locations stay consistent shot after shot, and the edit, rhythm and end card are built exactly like a real campaign.',
			it: "Due spot non commissionati per Unicum, costruiti attorno a una domanda: uno spot generato con l'AI può reggere il confronto con uno girato? “Molto + di un amaro” trasforma la corsia di un supermercato in un viaggio tra luoghi e momenti; “L’unico che non avanza mai” gioca su una festa in casa dove ogni bottiglia avanza, tranne una. Personaggi, prodotto e location restano coerenti inquadratura dopo inquadratura, e montaggio, ritmo ed end card sono costruiti esattamente come in una campagna vera."
		},
		challenge: {
			en: 'Keep the product faithful — bottle shape, label, colour — and the characters consistent across many shots and locations, while avoiding the generic “AI look” that breaks trust in a commercial.',
			it: 'Mantenere il prodotto fedele (forma della bottiglia, etichetta, colore) e i personaggi coerenti tra molte inquadrature e location, evitando il “look AI” generico che in uno spot rompe la fiducia.'
		},
		solution: {
			en: 'Directed shot by shot like a live-action job: script and shot list first, reference-driven generation for product and cast, then a real post pipeline — edit, sound and end card — to give each spot the rhythm of broadcast advertising.',
			it: 'Diretto inquadratura per inquadratura come un set vero: prima script e shot list, poi generazione guidata da reference per prodotto e cast, infine una vera post-produzione (montaggio, suono, end card) per dare a ogni spot il ritmo della pubblicità broadcast.'
		},
		highlights: {
			en: [
				'Two complete spots: 40 s and 30 s',
				'Consistent product and characters across locations',
				'Concept, copy and end card',
				'Edit and sound designed like a broadcast commercial'
			],
			it: [
				'Due spot completi: 40 s e 30 s',
				'Prodotto e personaggi coerenti tra location diverse',
				'Concept, copy ed end card',
				'Montaggio e suono pensati come uno spot broadcast'
			]
		},
		tools: ['Generative AI video', 'Reference-driven prompting', 'Editing & sound'],
		gallery: [
			{ type: 'image', src: 'projects/unicum/stills/scaffale' },
			{ type: 'image', src: 'projects/unicum/stills/giungla' },
			{ type: 'image', src: 'projects/unicum/stills/bicchiere', span: 'full' },
			{
				type: 'video',
				src: 'projects/unicum/non-avanza',
				poster: 'projects/unicum/stills/rossa',
				span: 'full',
				sound: true,
				index: 2,
				title: { en: 'L’unico che non avanza mai', it: 'L’unico che non avanza mai' }
			},
			{ type: 'image', src: 'projects/unicum/stills/ingresso' },
			{ type: 'image', src: 'projects/unicum/stills/bottiglia' },
			{ type: 'image', src: 'projects/unicum/stills/rossa', span: 'full' }
		]
	},
	{
		slug: 'director-studies',
		title: 'Director Studies',
		client: { en: 'AI R&D — Seedance 2.5', it: 'R&D AI — Seedance 2.5' },
		year: 2026,
		featured: true,
		disciplines: ['ai', 'film'],
		role: { en: 'AI Direction, Writing, Edit', it: 'Regia AI, Scrittura, Montaggio' },
		cover: 'projects/ai-studies/stills/duello-a',
		preview: 'projects/ai-studies/notte',
		hero: {
			type: 'video',
			src: 'projects/ai-studies/vespa',
			poster: 'projects/ai-studies/stills/vespa-a',
			sound: true,
			index: 1,
			title: { en: 'Vespa', it: 'Vespa' },
			ref: 'Guy Ritchie'
		},
		summary: {
			en: 'Eight AI short films on Seedance 2.5, emulating the photography and editing of great directors — starring me and my colleagues.',
			it: 'Otto cortometraggi AI su Seedance 2.5 che emulano la fotografia e il montaggio di grandi registi, con me e i miei colleghi come protagonisti.'
		},
		description: {
			en: 'An ongoing research series. Each study recreates the visual grammar of a great director — framing, lenses, light, palette and cutting rhythm — across very different genres: a western showdown, a black-and-white boxing drama, a noir with a single colour, a war trench, a night drive in the rain, a medieval joust. The cast is real: me and my colleagues, kept recognisable from shot to shot and from genre to genre.',
			it: "Una serie di ricerca in corso. Ogni studio ricrea la grammatica visiva di un grande regista (inquadrature, ottiche, luce, palette e ritmo di montaggio) attraverso generi molto diversi: un duello western, un dramma sulla boxe in bianco e nero, un noir con un solo colore, una trincea di guerra, una guida notturna sotto la pioggia, un torneo medievale. Il cast è reale: io e i miei colleghi, riconoscibili da un'inquadratura all'altra e da un genere all'altro."
		},
		challenge: {
			en: 'Make a generative model obey directorial intent — lens choice, blocking, coverage, the cut — instead of producing a generic AI aesthetic, while keeping real faces consistent across shots and genres.',
			it: "Far rispettare a un modello generativo l'intenzione registica (scelta delle ottiche, blocking, copertura, stacco) invece di un'estetica AI generica, mantenendo coerenti volti reali tra inquadrature e generi."
		},
		solution: {
			en: 'Multi-shot prompts written like a shot list, reference images of the cast, and iteration shot by shot until each sequence reads like the director it studies. Every test is a lesson that goes straight into client work.',
			it: 'Prompt multi-shot scritti come una shot list, immagini di riferimento del cast e iterazione inquadratura per inquadratura, finché ogni sequenza non “parla” come il regista che studia. Ogni test è una lezione che finisce direttamente nei lavori per i clienti.'
		},
		highlights: {
			en: [
				'Eight studies, 10–30 s each',
				'Western, noir, war, boxing, period, night thriller',
				'Real cast kept consistent across shots',
				'Photography and editing modelled on great directors'
			],
			it: [
				'Otto studi da 10–30 s',
				'Western, noir, guerra, boxe, film in costume, thriller notturno',
				'Cast reale coerente tra le inquadrature',
				'Fotografia e montaggio modellati sui grandi registi'
			]
		},
		tools: ['Seedance 2.5', 'Higgsfield', 'Reference-driven prompting'],
		gallery: [
			{ type: 'image', src: 'projects/ai-studies/stills/vespa-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/vespa-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/bar',
				poster: 'projects/ai-studies/stills/bar-a',
				span: 'full',
				sound: true,
				index: 2,
				title: { en: 'Smoke Break', it: 'Pausa sigaretta' },
				ref: 'Fallen Angels — Wong Kar-wai'
			},
			{ type: 'image', src: 'projects/ai-studies/stills/bar-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/bar-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/torneo',
				poster: 'projects/ai-studies/stills/torneo-a',
				span: 'full',
				sound: true,
				index: 3,
				title: { en: 'The Joust', it: 'Il Torneo' },
				ref: { en: 'A Knight of the Seven Kingdoms', it: 'Il cavaliere dei Sette Regni' }
			},
			{ type: 'image', src: 'projects/ai-studies/stills/torneo-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/torneo-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/notte',
				poster: 'projects/ai-studies/stills/notte-a',
				span: 'full',
				sound: true,
				index: 4,
				title: { en: 'Night Drive', it: 'Guida notturna' },
				ref: 'Drive — Nicolas Winding Refn'
			},
			{ type: 'image', src: 'projects/ai-studies/stills/notte-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/notte-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/ring',
				poster: 'projects/ai-studies/stills/ring-a',
				span: 'full',
				sound: true,
				index: 5,
				title: { en: 'The Ring', it: 'Il Ring' },
				ref: { en: 'Raging Bull — Martin Scorsese', it: 'Toro scatenato — Martin Scorsese' }
			},
			{ type: 'image', src: 'projects/ai-studies/stills/ring-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/ring-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/trincea',
				poster: 'projects/ai-studies/stills/trincea-a',
				span: 'full',
				sound: true,
				index: 6,
				title: { en: 'The Trench', it: 'La Trincea' },
				ref: {
					en: 'Saving Private Ryan — Steven Spielberg',
					it: 'Salvate il soldato Ryan — Steven Spielberg'
				}
			},
			{ type: 'image', src: 'projects/ai-studies/stills/trincea-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/trincea-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/duello',
				poster: 'projects/ai-studies/stills/duello-a',
				span: 'full',
				sound: true,
				index: 7,
				title: { en: 'Showdown', it: 'Il Duello' },
				ref: {
					en: 'The Good, the Bad and the Ugly — Sergio Leone',
					it: 'Il buono, il brutto, il cattivo — Sergio Leone'
				}
			},
			{ type: 'image', src: 'projects/ai-studies/stills/duello-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/duello-b' },
			{
				type: 'video',
				src: 'projects/ai-studies/noir',
				poster: 'projects/ai-studies/stills/noir-a',
				span: 'full',
				sound: true,
				index: 8,
				title: { en: 'Noir in Pink', it: 'Noir in rosa' },
				ref: 'Sin City — Robert Rodriguez & Frank Miller'
			},
			{ type: 'image', src: 'projects/ai-studies/stills/noir-a' },
			{ type: 'image', src: 'projects/ai-studies/stills/noir-b' }
		]
	},
	{
		slug: 'china-diaries',
		title: 'China Diaries',
		client: { en: 'Personal — short films', it: 'Personale — cortometraggi' },
		year: 2026,
		featured: true,
		disciplines: ['film'],
		role: {
			en: 'Direction, Cinematography, Edit, Colour',
			it: 'Regia, Fotografia, Montaggio, Color'
		},
		cover: 'projects/china/stills/donna-rosso',
		preview: 'projects/china/mercato',
		hero: {
			type: 'video',
			src: 'projects/china/fiume-giallo',
			poster: 'projects/china/stills/cascata',
			sound: true,
			index: 1,
			title: { en: 'Yellow River', it: 'Fiume Giallo' }
		},
		summary: {
			en: 'Six short films shot on location in China — rivers, markets, workshops and bamboo forests.',
			it: 'Sei cortometraggi girati in Cina: fiumi, mercati, botteghe e foreste di bambù.'
		},
		description: {
			en: 'A visual diary in six chapters. Each film is a short, self-contained piece built around a single place and its rhythm: the roar of the Yellow River, the crowd of a market, the stillness of a potter’s wheel, the light through a bamboo forest. Real people, real light, no set — the direction lives in where the camera waits and what the edit lets breathe.',
			it: 'Un diario visivo in sei capitoli. Ogni film è un pezzo breve e autonomo, costruito attorno a un solo luogo e al suo ritmo: il fragore del Fiume Giallo, la folla di un mercato, la quiete di un tornio, la luce tra i bambù. Persone vere, luce vera, nessun set: la regia sta in dove la camera aspetta e in cosa il montaggio lascia respirare.'
		},
		challenge: {
			en: 'Find the story inside real, uncontrolled situations — moments and light that can’t be repeated — and keep one coherent visual language across six very different places.',
			it: 'Trovare il racconto dentro situazioni reali e non controllate, con momenti e luce che non si possono ripetere, e mantenere un linguaggio visivo coerente tra sei luoghi molto diversi.'
		},
		solution: {
			en: 'Shot in 4K open gate to keep framing free for both horizontal and vertical delivery. A consistent warm, filmic grade and sound-led editing in DaVinci Resolve give the series a single voice.',
			it: 'Girato in 4K open gate per lasciare libera l’inquadratura sia in orizzontale sia in verticale. Un grading caldo e cinematografico e un montaggio guidato dal suono in DaVinci Resolve danno alla serie un’unica voce.'
		},
		highlights: {
			en: [
				'Six standalone short films',
				'4K open-gate capture (4096 × 3112)',
				'Edited and colour graded in DaVinci Resolve Studio',
				'Framed for social and horizontal delivery',
				'Documentary direction with real people and places'
			],
			it: [
				'Sei cortometraggi autonomi',
				'Ripresa 4K open gate (4096 × 3112)',
				'Montaggio e color grading in DaVinci Resolve Studio',
				'Inquadrature pensate per social e formato orizzontale',
				'Regia documentaria con persone e luoghi reali'
			]
		},
		tools: ['DaVinci Resolve Studio', '4K open gate'],
		gallery: [
			{ type: 'image', src: 'projects/china/stills/donna-rosso' },
			{ type: 'image', src: 'projects/china/stills/cascata' },
			{
				type: 'video',
				src: 'projects/china/mercato',
				poster: 'projects/china/stills/torre',
				span: 'full',
				sound: true,
				index: 2,
				title: { en: 'Market', it: 'Mercato' }
			},
			{ type: 'image', src: 'projects/china/stills/bambina' },
			{ type: 'image', src: 'projects/china/stills/strada' },
			{
				type: 'video',
				src: 'projects/china/piazza-chong',
				poster: 'projects/china/stills/pagoda',
				span: 'full',
				sound: true,
				index: 3,
				title: { en: 'Chong Square', it: 'Piazza Chong' }
			},
			{ type: 'image', src: 'projects/china/stills/pagoda' },
			{ type: 'image', src: 'projects/china/stills/scatole' },
			{
				type: 'video',
				src: 'projects/china/fiume',
				poster: 'projects/china/stills/skyline',
				span: 'full',
				sound: true,
				index: 4,
				title: { en: 'Riverside', it: 'Lungofiume' }
			},
			{ type: 'image', src: 'projects/china/stills/skyline' },
			{ type: 'image', src: 'projects/china/stills/operai' },
			{
				type: 'video',
				src: 'projects/china/argilla',
				poster: 'projects/china/stills/tornio',
				span: 'full',
				sound: false,
				index: 5,
				title: { en: 'Clay', it: 'Argilla' }
			},
			{ type: 'image', src: 'projects/china/stills/scaffali' },
			{ type: 'image', src: 'projects/china/stills/tornio' },
			{
				type: 'video',
				src: 'projects/china/bamboo',
				poster: 'projects/china/stills/padiglione',
				span: 'full',
				sound: true,
				index: 6,
				title: { en: 'Bamboo', it: 'Bambù' }
			},
			{ type: 'image', src: 'projects/china/stills/padiglione' },
			{ type: 'image', src: 'projects/china/stills/bosco' }
		]
	},
	{
		slug: 'forum-archive-reverie',
		title: 'Archive Reverie',
		client: 'Forum Studios',
		year: 2025,
		featured: true,
		disciplines: ['installation', 'digital'],
		role: {
			en: 'Creative Direction, Creative Technology',
			it: 'Direzione Creativa, Creative Technology'
		},
		cover: 'projects/forum/titolo',
		preview: 'projects/forum/video4',
		hero: { type: 'youtube', id: '1CkQn1mbHck', poster: 'projects/forum/titolo' },
		summary: {
			en: "An interactive ecosystem that turns Forum Studios' 55-year archive into an explorable 3D memory landscape.",
			it: 'Un ecosistema interattivo che trasforma i 55 anni di archivio dei Forum Studios in un paesaggio memoriale 3D esplorabile.'
		},
		description: {
			en: "For the 55th anniversary of Forum Studios, Archive Reverie reimagines a historic archive beyond the logic of the static database. The studio's heritage becomes a memory landscape to wander freely — an evocative space where sound and image fragments echo a living memory, rewarding chance discovery and turning every visitor into the author of their own experience.",
			it: "Per il 55° anniversario dei Forum Studios, Archive Reverie ripensa l'archivio storico oltre la logica del database statico. Il patrimonio dello studio diventa un paesaggio memoriale da esplorare liberamente: un ambiente evocativo dove frammenti sonori e visivi diventano echi di una memoria viva, che premia la scoperta casuale e rende ogni visitatore autore della propria esperienza."
		},
		challenge: {
			en: 'Revitalise a historic archive without reducing it to a catalogue — and, technically, treat three unsynchronised video surfaces as one continuous canvas, while building a flexible, performable system for manipulating the content live.',
			it: "Rivitalizzare un archivio storico senza ridurlo a un catalogo e, tecnicamente, trattare tre superfici video non sincronizzate come un'unica tela continua, costruendo un sistema flessibile e performativo per manipolare i contenuti dal vivo."
		},
		solution: {
			en: "An interconnected ecosystem with five outputs. At its core, a 3D web app presents the archive as a constellation of content. A custom creation tool and an offline rendering pipeline turn the archive into an instrument — 'Archive-as-Instrument' — keeping the web experience, the video installation and the live performances in one coherent language.",
			it: "Un ecosistema interconnesso con cinque output. Al centro, una web app 3D presenta l'archivio come una costellazione di contenuti. Un tool di creazione custom e una pipeline di rendering offline trasformano l'archivio in uno strumento — 'Archive-as-Instrument' — mantenendo esperienza web, video-installazione e performance live in un unico linguaggio coerente."
		},
		highlights: {
			en: [
				'Browser-based, navigable 3D archive',
				'Visual creation tool for content generation and live performance',
				'Immersive video installation on a single 9600×1080 px canvas',
				'Dynamic 3D spatial soundscape (Web Audio API)',
				'Remote control via smartphone and physical MIDI controllers (WebSocket)',
				'AI co-creation development workflow'
			],
			it: [
				'Archivio 3D navigabile direttamente da browser',
				'Tool di creazione visiva per contenuti e performance live',
				'Video-installazione immersiva su una tela unica di 9600×1080 px',
				'Paesaggio sonoro dinamico con audio spaziale 3D (Web Audio API)',
				'Controllo remoto da smartphone e controller MIDI fisici (WebSocket)',
				'Workflow di sviluppo basato sulla co-creazione con AI'
			]
		},
		tools: [
			'React',
			'Three.js',
			'WebGL / GLSL',
			'Supabase',
			'TouchDesigner',
			'After Effects',
			'Figma',
			'Web Audio API',
			'WebSocket'
		],
		figma:
			'https://embed.figma.com/proto/UmqXbICxnNZsk3brOajAHn/FORUM?page-id=1741%3A20&node-id=2027-126&viewport=1269%2C60631%2C0.51&scaling=min-zoom&content-scaling=fixed&embed-host=share',
		gallery: [
			{ type: 'video', src: 'projects/forum/video1', span: 'full' },
			{ type: 'image', src: 'projects/forum/1' },
			{ type: 'image', src: 'projects/forum/still1' },
			{ type: 'video', src: 'projects/forum/video2' },
			{ type: 'video', src: 'projects/forum/video3' },
			{ type: 'image', src: 'projects/forum/2', span: 'full' },
			{ type: 'image', src: 'projects/forum/still2' },
			{ type: 'image', src: 'projects/forum/3' },
			{ type: 'video', src: 'projects/forum/video4', span: 'full' },
			{ type: 'image', src: 'projects/forum/still3' },
			{ type: 'image', src: 'projects/forum/4' },
			{ type: 'image', src: 'projects/forum/still4' },
			{ type: 'image', src: 'projects/forum/5' },
			{ type: 'image', src: 'projects/forum/6' },
			{ type: 'image', src: 'projects/forum/7' }
		]
	},
	{
		slug: 'vinted-non-mi-metti',
		title: 'Non mi metti?',
		client: 'Vinted',
		year: 2025,
		featured: true,
		disciplines: ['film', 'campaign'],
		role: {
			en: 'Direction, Art Direction, Copywriting, Edit',
			it: 'Regia, Art Direction, Copywriting, Montaggio'
		},
		cover: 'projects/vinted/card',
		hero: { type: 'youtube', id: 'y5pSa9Mp-qg', poster: 'projects/vinted/card' },
		summary: {
			en: 'A spot told from the wardrobe: a forgotten garment looks back at the person who left it behind.',
			it: "Uno spot raccontato dall'armadio: un capo dimenticato guarda chi lo ha lasciato indietro."
		},
		description: {
			en: "The project flips the point of view of the classic Vinted campaign — away from the seller, towards what gets left behind. With an affectionate, ironic and slightly melancholic tone, the garment becomes a character, building an emotional bond with the viewer. To make its gaze visible, the direction uses an object POV: the camera hides inside the wardrobe, turning the clothes' point of view into a quiet, intimate testimony.",
			it: "Il progetto ribalta il punto di vista delle classiche campagne Vinted, spostando l'attenzione da chi vende a ciò che viene lasciato indietro. Con un tono affettuoso, ironico e leggermente malinconico, il capo d'abbigliamento diventa un personaggio e crea una connessione emotiva con lo spettatore. Per rendere visibile il suo sguardo, la regia adotta l'object POV: la camera è nascosta nell'armadio e trasforma lo sguardo del vestito in una testimonianza intima e silenziosa."
		},
		challenge: {
			en: 'Stand apart from seller-centred Vinted campaigns and build an original, memorable narrative from the unusual perspective of an inanimate object.',
			it: "Distinguersi dalle campagne Vinted incentrate sul venditore e costruire una narrazione originale e memorabile attraverso l'insolita prospettiva di un oggetto inanimato."
		},
		solution: {
			en: 'Moving the narrative focus onto the garment gave the campaign a unique voice. Object POV and copy balancing irony and melancholy tell a universal story of abandonment and desire — turning a listing into a small emotional film.',
			it: "Spostare il focus sul vestito ha dato alla campagna una voce unica. L'object POV e un copy in equilibrio tra ironia e malinconia raccontano una storia universale di abbandono e desiderio, trasformando un annuncio in un piccolo film emotivo."
		},
		highlights: {
			en: [
				'Object point-of-view direction',
				'Emotional, ironic copywriting that humanises the product',
				'End-to-end: from script to final edit',
				'Campaign communication concept'
			],
			it: [
				"Regia basata sull'object point-of-view",
				'Copywriting emotivo e ironico che umanizza il prodotto',
				'Direzione completa: dallo script al montaggio finale',
				'Concept di comunicazione della campagna'
			]
		},
		tools: ['Premiere Pro', 'After Effects', 'Photoshop', 'Figma', 'Sony A7S II'],
		figma:
			'https://embed.figma.com/proto/bCQ5r2B4hhs3sL12B7zodE/Untitled?page-id=213%3A2&node-id=213-303&viewport=384%2C172%2C0.02&scaling=contain&content-scaling=fixed&embed-host=share',
		gallery: [
			{ type: 'image', src: 'projects/vinted/1', span: 'full' },
			{ type: 'image', src: 'projects/vinted/2' },
			{ type: 'image', src: 'projects/vinted/3' },
			{ type: 'image', src: 'projects/vinted/4' },
			{ type: 'image', src: 'projects/vinted/5' },
			{ type: 'image', src: 'projects/vinted/6', span: 'full' }
		]
	},
	{
		slug: 'kollateral',
		title: 'Kollateral',
		client: 'Subviral',
		year: 2025,
		featured: true,
		disciplines: ['installation'],
		role: {
			en: 'Concept, Light & Sound Design, Creative Technology',
			it: 'Concept, Light & Sound Design, Creative Technology'
		},
		cover: 'cards/kollateral1',
		preview: 'cards/MAIN_16-9',
		hero: { type: 'youtube', id: 'VYWhh3v2-LU', poster: 'cards/kollateral1' },
		summary: {
			en: 'A torn sheet, moved by sound, becomes a breathing body — and light pours out of its wounds.',
			it: 'Un telo lacerato, mosso dal suono, diventa un corpo che respira — e la luce emerge dalle sue ferite.'
		},
		description: {
			en: 'Kollateral explores light as a vital force that persists beyond trauma. A suspended sheet, scarred by burns and tears, becomes the place where that energy appears. Driven by sound, the fabric contracts and breathes — a body animated by a vital impulse that turns the tear into possibility. Light is not blocked by the wound: that is exactly where it comes from.',
			it: 'Kollateral esplora la luce come forza vitale che persiste oltre il trauma. Un telo sospeso, segnato da bruciature e lacerazioni, diventa il punto in cui questa energia si manifesta. Mosso dal suono, il tessuto si contrae e respira: un corpo animato da un impulso vitale che trasforma la lacerazione in possibilità. La luce non è ostacolata dalla ferita: è proprio da lì che emerge.'
		},
		challenge: {
			en: "Give life to the idea of a 'breathing body' using an inanimate sheet — perfectly syncing original music, the physical movement of the fabric and dynamic lighting.",
			it: "Dare vita all'idea di un 'corpo che respira' attraverso un telo inanimato, sincronizzando perfettamente musica originale, movimento fisico del tessuto e illuminazione dinamica."
		},
		solution: {
			en: 'An integrated system linking Ableton Live and TouchDesigner. Ableton plays the score and sends MIDI triggers for each act; TouchDesigner drives the fans that move the sheet and the moving heads via DMX in real time — sound, light and matter as one organism.',
			it: 'Un sistema integrato che collega Ableton Live a TouchDesigner. Ableton gestisce la traccia e invia trigger MIDI per ogni atto; TouchDesigner controlla in tempo reale i ventilatori che muovono il telo e le teste mobili via DMX: suono, luce e materia come un unico organismo.'
		},
		highlights: {
			en: [
				'Sound-reactive fabric moved by real-time controlled fans',
				'Original score composed for the piece',
				'Ableton ↔ TouchDesigner audio-reactive pipeline',
				'Moving-head lighting via DMX',
				'Acts sequenced through MIDI triggers'
			],
			it: [
				'Telo audio-reattivo mosso da ventilatori controllati in tempo reale',
				"Composizione audio originale creata per l'opera",
				'Pipeline audio-reattiva Ableton ↔ TouchDesigner',
				'Illuminazione con teste mobili via DMX',
				'Atti sequenziati tramite trigger MIDI'
			]
		},
		tools: ['TouchDesigner', 'Ableton Live', 'MIDI', 'DMX', 'Generative AI (concept)'],
		figma:
			'https://embed.figma.com/proto/k0GTgBcvxZax45PHgdhmGG/KOLLATERAL-%7C-SUBVIRAL?page-id=128%3A221&node-id=128-312&embed-host=share',
		gallery: [
			{ type: 'video', src: 'cards/MAIN_16-9', span: 'full', sound: true },
			{ type: 'image', src: 'cards/kollateral4' },
			{ type: 'image', src: 'cards/kollateral2' },
			{ type: 'image', src: 'cards/kollateral', span: 'full' },
			{ type: 'image', src: 'cards/kollateral3' },
			{ type: 'image', src: 'cards/kollateral1' }
		]
	},
	{
		slug: 'bmw-reignite-the-pleasure',
		title: 'RE:IGNITE the Pleasure',
		client: 'BMW — concept',
		year: 2025,
		featured: true,
		disciplines: ['campaign', 'digital'],
		role: {
			en: 'Creative Direction, Art Direction, 3D, Web Development',
			it: 'Direzione Creativa, Art Direction, 3D, Sviluppo Web'
		},
		cover: 'projects/bmw/hero',
		preview: 'projects/bmw/landing',
		hero: { type: 'video', src: 'projects/bmw/landing' },
		summary: {
			en: 'A cross-platform campaign that brings the iconic BMW M3 E30 back to life for a new generation.',
			it: "Una campagna cross-platform che riporta in vita l'iconica BMW M3 E30 per una nuova generazione."
		},
		description: {
			en: "A cross-platform campaign reviving an '80s icon, the BMW M3 E30, for today's audience. Built on the 'RE:' wordplay — RE:IGNITE, RE:DISCOVER, RE:TRACE — the communication evokes shared life moments to create a strong emotional bond. At its heart, an interactive website: landing page, an animated 3D render of the car, a life timeline and a sales page for a hypothetical electric re-edition.",
			it: "Una campagna cross-platform che riporta in vita un'icona degli anni '80, la BMW M3 E30, per il pubblico di oggi. Costruita sul gioco di parole 'RE:' — RE:IGNITE, RE:DISCOVER, RE:TRACE — la comunicazione evoca momenti di vita condivisi per creare un forte legame emotivo. Al centro, un sito interattivo: landing page, render 3D animato dell'auto, timeline delle tappe della vita e pagina di vendita per un'ipotetica riedizione elettrica."
		},
		challenge: {
			en: 'Make a past icon desirable again for a contemporary audience, balancing nostalgia and innovation — and integrate a fluid 3D experience into a fast website across several channels.',
			it: "Rendere di nuovo desiderabile un'icona del passato per un pubblico contemporaneo, bilanciando nostalgia e innovazione, e integrare un'esperienza 3D fluida in un sito performante su più canali."
		},
		solution: {
			en: 'Storytelling that leans on universal memories builds a bridge between past and present. The website is the hub: modern design plus an explorable 3D render introduce an electric E30 as the natural evolution of a legend.',
			it: "Uno storytelling che fa leva su ricordi universali crea un ponte tra passato e presente. Il sito è l'hub dell'esperienza: design contemporaneo e un render 3D esplorabile presentano la E30 elettrica come evoluzione naturale di un mito."
		},
		highlights: {
			en: [
				'Emotion-led cross-platform concept',
				'Interactive website built in Svelte',
				'Animated 3D car rendered in Blender',
				"'RE:' copy system",
				'Interactive brand & life timeline',
				'OOH and social adaptations'
			],
			it: [
				'Concept cross-platform basato sullo storytelling emotivo',
				'Sito interattivo sviluppato in Svelte',
				'Auto 3D animata e renderizzata in Blender',
				"Sistema di copy 'RE:'",
				'Timeline interattiva del brand e della vita',
				'Declinazioni OOH e social'
			]
		},
		tools: [
			'Svelte',
			'JavaScript',
			'Blender',
			'After Effects',
			'Illustrator',
			'Photoshop',
			'Figma'
		],
		figma:
			'https://embed.figma.com/proto/VJKiZCYc869sU3yl3mW5a0/BMW?page-id=370%3A249&node-id=286-8&scaling=min-zoom&content-scaling=fixed&embed-host=share',
		gallery: [
			{ type: 'image', src: 'projects/bmw/ooh', span: 'full' },
			{ type: 'video', src: 'projects/bmw/scroll' },
			{ type: 'video', src: 'projects/bmw/story' },
			{ type: 'image', src: 'projects/bmw/hero', span: 'full' }
		]
	},
	{
		slug: 'symbioglitch',
		title: 'Symbioglitch',
		client: 'Videocittà 2024',
		year: 2024,
		featured: true,
		disciplines: ['installation', 'film'],
		role: { en: 'Live Visuals, Real-time Direction', it: 'Live Visuals, Regia in tempo reale' },
		cover: 'projects/videocitta/hero',
		preview: 'projects/videocitta/video6',
		hero: { type: 'video', src: 'projects/videocitta/video6' },
		summary: {
			en: 'A live audiovisual performance on a 25-metre wall, where humanity and nature collide in glitch.',
			it: 'Una performance audiovisiva live su una parete di 25 metri, dove umanità e natura si scontrano nel glitch.'
		},
		description: {
			en: 'Symbioglitch explores the conflicted relationship between humanity and nature through a dark, glitch aesthetic. Projected on a 25-metre wall at Videocittà 2024 with Alice Felloni, the performance uses random editing and an almost destructive manipulation of footage to create a disturbing visual experience. Pairing seemingly distant images and sounds, it produces new, unsettling meanings about that relationship.',
			it: "Symbioglitch esplora il rapporto conflittuale tra umanità e natura attraverso un'estetica glitch e oscura. Proiettata su una parete di 25 metri a Videocittà 2024 insieme ad Alice Felloni, la performance usa un montaggio casuale e una manipolazione quasi distruttiva del footage per creare un'esperienza visiva disturbante. Accostando immagini e suoni apparentemente distanti, genera nuovi e inquietanti significati su questa relazione."
		},
		challenge: {
			en: 'Convey distorted connections between humanity and nature through glitch, darkness and randomness — and drive generative visuals across a 25-metre wall in real time, reliably.',
			it: 'Trasmettere le connessioni distorte tra umanità e natura attraverso glitch, oscurità e casualità, e guidare visual generativi su una parete di 25 metri in tempo reale, in modo affidabile.'
		},
		solution: {
			en: 'A robust live pipeline: TouchDesigner generates and destroys the footage, Resolume Arena blends and maps it across the wall, and MIDI controllers make every parameter playable — tight collaboration with the sound designers made it one audiovisual body.',
			it: 'Una pipeline live solida: TouchDesigner genera e destruttura il footage, Resolume Arena lo fonde e lo mappa sulla parete, i controller MIDI rendono ogni parametro suonabile. La collaborazione con i sound designer ha reso tutto un unico corpo audiovisivo.'
		},
		highlights: {
			en: [
				'Live generative visuals in TouchDesigner',
				'Projection mapping on a 25 m wall with Resolume Arena',
				'MIDI-controlled performance',
				'Random editing for unique, unrepeatable outputs'
			],
			it: [
				'Visual generativi live in TouchDesigner',
				'Projection mapping su parete di 25 m con Resolume Arena',
				'Performance controllata via MIDI',
				'Montaggio casuale per output unici e irripetibili'
			]
		},
		tools: ['TouchDesigner', 'Resolume Arena', 'MIDI', 'Audio-reactive systems', 'Generative art'],
		gallery: [
			{ type: 'video', src: 'projects/videocitta/video5', span: 'full' },
			{ type: 'video', src: 'projects/videocitta/video1' },
			{ type: 'image', src: 'cards/avperformace' },
			{ type: 'video', src: 'projects/videocitta/video4', span: 'full' },
			{ type: 'video', src: 'projects/videocitta/video2' },
			{ type: 'video', src: 'projects/videocitta/video3' }
		]
	},
	{
		slug: 'beyond-the-frame',
		title: 'Beyond the Frame',
		client: 'Interactive installation',
		year: 2024,
		featured: true,
		disciplines: ['installation'],
		role: {
			en: 'Concept, Creative Technology, Post-production',
			it: 'Concept, Creative Technology, Post-produzione'
		},
		cover: 'cards/beyond2',
		preview: 'projects/beyond/demo',
		hero: { type: 'video', src: 'projects/beyond/demo' },
		summary: {
			en: 'An installation where your distance from the frame turns abstract textures into recognisable images.',
			it: "Un'installazione in cui la distanza dalla cornice trasforma texture astratte in immagini riconoscibili."
		},
		description: {
			en: 'A sensory journey about perception and distance, playing on the border between the abstract and the recognisable. What looks like an undefined texture from afar becomes, as you step closer, a real object that regains its context. An invitation to slow down, to find beauty in the ordinary and look past appearances — to really see, you have to stop.',
			it: "Un viaggio sensoriale sul rapporto tra percezione e distanza, al confine tra l'astratto e il riconoscibile. Ciò che da lontano appare come una texture indefinita si trasforma, avvicinandosi, in un oggetto reale che riacquista il suo contesto. Un invito a rallentare, a scoprire la bellezza nascosta nell'ordinario e a guardare oltre l'apparenza: per vedere davvero, occorre fermarsi."
		},
		challenge: {
			en: "Create a seamless, stable transition from abstract texture to subject, driven by the viewer's exact position — without lag or stutter.",
			it: 'Creare una transizione fluida e stabile dalla texture astratta al soggetto, guidata dalla posizione esatta dello spettatore, senza ritardi né scatti.'
		},
		solution: {
			en: 'Ultrasonic proximity sensors on Arduino feed TouchDesigner, which maps distance to a precise moment of a post-produced transition. The modular setup uses framed screens or projectors to keep a photographic feel in any space.',
			it: "Sensori di prossimità a ultrasuoni su Arduino inviano i dati a TouchDesigner, che mappa la distanza su un momento preciso di una transizione post-prodotta. L'allestimento modulare usa schermi o proiettori incorniciati per mantenere un'estetica fotografica in qualsiasi spazio."
		},
		highlights: {
			en: [
				'Distance-driven interaction via proximity sensors',
				'Texture-to-subject transitions programmed in TouchDesigner',
				'Modular, site-independent exhibition concept',
				'Optional interactive sound layer'
			],
			it: [
				'Interazione guidata dalla distanza tramite sensori di prossimità',
				'Transizioni texture-soggetto programmate in TouchDesigner',
				'Concept espositivo modulare e adattabile',
				'Possibile layer sonoro interattivo'
			]
		},
		tools: [
			'TouchDesigner',
			'Arduino',
			'Ultrasonic sensors',
			'LED wall / Projectors',
			'After Effects'
		],
		figma:
			'https://embed.figma.com/proto/0uWNVAvqtuqKGO1g3as7jJ/Beyond-the-Frame?page-id=0%3A1&node-id=0-3&embed-host=share',
		gallery: [
			{ type: 'image', src: 'cards/beyond2', span: 'full' },
			{ type: 'video', src: 'projects/beyond/side1' },
			{ type: 'video', src: 'projects/beyond/_side1' },
			{ type: 'video', src: 'projects/beyond/side2' },
			{ type: 'video', src: 'projects/beyond/_side2' },
			{ type: 'video', src: 'projects/beyond/side3' },
			{ type: 'video', src: 'projects/beyond/_side3' },
			{ type: 'video', src: 'projects/beyond/side4' },
			{ type: 'video', src: 'projects/beyond/_side4' },
			{ type: 'video', src: 'projects/beyond/side5' },
			{ type: 'video', src: 'projects/beyond/_side5' },
			{ type: 'video', src: 'projects/beyond/side6' },
			{ type: 'video', src: 'projects/beyond/_side6' }
		]
	},
	{
		slug: 'friends-in-my-head',
		title: 'Friends in My Head',
		client: 'Short film',
		year: 2025,
		disciplines: ['film'],
		role: { en: 'Direction, Cinematography, Edit', it: 'Regia, Fotografia, Montaggio' },
		cover: 'projects/friendsinmyhead/still4',
		hero: { type: 'vimeo', id: '1097622993', poster: 'projects/friendsinmyhead/still4' },
		summary: {
			en: 'A one-hour short film born from four random words: hunt, voices, water, madness.',
			it: "Un cortometraggio girato in un'ora partendo da quattro parole casuali: caccia, voci, acqua, follia."
		},
		description: {
			en: "A short film directed and shot in a single hour as a creative challenge, built from four randomly generated words: hunt, voices, water, madness. It follows a young man with schizophrenia sliding into psychosis as he ventures into a hunting reserve. The deliberately raw, delirious black-and-white language and the relentless edit mirror the protagonist's collapse, up to a tragic ending.",
			it: 'Un cortometraggio diretto e girato in una sola ora come sfida creativa, partendo da quattro parole generate casualmente: caccia, voci, acqua, follia. Segue la discesa nella psicosi di un ragazzo affetto da schizofrenia che si avventura in una riserva di caccia. Il linguaggio in bianco e nero, volutamente grezzo e delirante, e il montaggio serrato riflettono il crollo del protagonista fino al tragico epilogo.'
		},
		challenge: {
			en: 'Build a coherent, impactful narrative from unrelated concepts in an extremely short production window — and make madness felt through the camera and the cut, not just the story.',
			it: "Costruire una narrazione coerente e d'impatto da concetti slegati, con un tempo di produzione minimo, e far percepire la follia attraverso camera e montaggio, non solo con la storia."
		},
		solution: {
			en: 'Embracing constraints as style: handheld camera, rapid cuts and low-contrast black and white create an oppressive, chaotic atmosphere that pulls the viewer into the protagonist’s disturbed perspective.',
			it: 'Trasformare i vincoli in stile: camera a mano, montaggio rapido e bianco e nero a basso contrasto creano un’atmosfera opprimente e caotica che immerge lo spettatore nella prospettiva disturbata del protagonista.'
		},
		highlights: {
			en: [
				'Shot and directed under a 1-hour constraint',
				'Narrative built from random creative inputs',
				'Direction and edit that mirror an altered mind',
				'Raw black-and-white visual language'
			],
			it: [
				'Girato e diretto con un vincolo di 1 ora',
				'Narrazione costruita da input creativi casuali',
				'Regia e montaggio che riflettono una mente alterata',
				'Linguaggio visivo in bianco e nero, grezzo'
			]
		},
		tools: ['DaVinci Resolve', 'After Effects'],
		gallery: [
			{ type: 'image', src: 'projects/friendsinmyhead/still1', span: 'full' },
			{ type: 'image', src: 'projects/friendsinmyhead/still2' },
			{ type: 'image', src: 'projects/friendsinmyhead/still3' },
			{ type: 'image', src: 'projects/friendsinmyhead/still5' },
			{ type: 'image', src: 'projects/friendsinmyhead/still6' },
			{ type: 'image', src: 'projects/friendsinmyhead/still7', span: 'full' }
		]
	},
	{
		slug: 'one-of-these-days',
		title: 'One of These Days',
		client: 'Music video tribute',
		year: 2023,
		disciplines: ['film'],
		role: { en: 'Motion Design, Animation, Edit', it: 'Motion Design, Animazione, Montaggio' },
		cover: 'projects/oneofthesedays/10',
		hero: { type: 'youtube', id: 'MS6i-Be5YXg', poster: 'projects/oneofthesedays/10' },
		summary: {
			en: "A flat, rhythmic animated tribute to Pink Floyd's track, cut obsessively to the music.",
			it: 'Un tributo animato, flat e ritmico, al brano dei Pink Floyd, montato in modo ossessivo sulla musica.'
		},
		description: {
			en: "A visual tribute to Pink Floyd's classic, animated entirely in After Effects from drawings made in Illustrator. The video explores a flat aesthetic built on graphic repetition, layered blend modes such as 'difference' and a tight edit that follows the rhythm and structure of the music almost obsessively.",
			it: "Un tributo visivo al celebre brano dei Pink Floyd, animato interamente in After Effects a partire da disegni creati in Illustrator. Il video esplora un'estetica flat fatta di ripetizioni grafiche, sovrapposizioni con metodi di fusione come 'differenza' e un montaggio serrato che segue in modo quasi ossessivo ritmo e struttura della musica."
		},
		challenge: {
			en: 'Translate the power and atmosphere of the track into a coherent visual language without being literal, keeping attention high through repetition and variation.',
			it: "Tradurre la potenza e l'atmosfera del brano in un linguaggio visivo coerente senza essere didascalici, mantenendo alta l'attenzione con ripetizione e variazione."
		},
		solution: {
			en: "Simple geometric forms and a limited palette put the focus on motion and rhythm. Audio-visual sync builds tension, while 'difference' layers create unexpected variations that echo the experimental nature of the track.",
			it: "Forme geometriche semplici e una palette ridotta spostano il focus su movimento e ritmo. La sincronia audio-video costruisce tensione, mentre i livelli in 'differenza' generano variazioni inattese che rispecchiano la natura sperimentale del brano."
		},
		highlights: {
			en: [
				'Vector-based 2D animation',
				'Flat visual style with creative layer blending',
				'Edit tightly synced to the track'
			],
			it: [
				'Animazione 2D basata su grafica vettoriale',
				'Stile flat con uso creativo dei livelli',
				'Montaggio strettamente sincronizzato con la traccia'
			]
		},
		tools: ['After Effects', 'Illustrator'],
		gallery: [
			{ type: 'image', src: 'projects/oneofthesedays/1' },
			{ type: 'image', src: 'projects/oneofthesedays/2' },
			{ type: 'image', src: 'projects/oneofthesedays/3' },
			{ type: 'image', src: 'projects/oneofthesedays/4' },
			{ type: 'image', src: 'projects/oneofthesedays/5' },
			{ type: 'image', src: 'projects/oneofthesedays/6' },
			{ type: 'image', src: 'projects/oneofthesedays/7' },
			{ type: 'image', src: 'projects/oneofthesedays/8' },
			{ type: 'image', src: 'projects/oneofthesedays/9' },
			{ type: 'image', src: 'projects/oneofthesedays/10' }
		]
	},
	{
		slug: 'rxink-personal-brand',
		title: 'RXINK',
		client: 'Personal brand',
		year: 2024,
		disciplines: ['brand'],
		role: { en: 'Brand Identity, Logo Animation', it: 'Brand Identity, Logo Animation' },
		cover: 'projects/rxink/yellow1',
		preview: 'projects/rxink/LOGOANIMATION10',
		hero: { type: 'video', src: 'projects/rxink/LOGOANIMATION10' },
		summary: {
			en: 'A complete personal identity system — logo, pictogram, palette, type and motion.',
			it: 'Un sistema di identità personale completo: logo, pittogramma, palette, tipografia e motion.'
		},
		description: {
			en: 'RXINK is my personal brand book — a branding case study where every aspect of the identity was explored in depth: logo and pictogram design, colour palette, typography, and logo animations and motion elements that define the brand’s visual language. Think in ink.',
			it: "RXINK è il mio brandbook personale: un caso studio in cui ogni aspetto dell'identità visiva è stato esplorato in profondità. Logo e pittogramma, palette colori, tipografia, animazioni del logo ed elementi di motion design che definiscono il linguaggio del brand. Think in ink."
		},
		challenge: {
			en: 'Create a versatile, recognisable identity that represents design and motion skills, avoiding clichés with a truly distinctive visual language.',
			it: 'Creare un’identità versatile e riconoscibile che rappresenti competenze di design e motion, evitando i cliché con un linguaggio visivo davvero distintivo.'
		},
		solution: {
			en: 'A modular system built on a strong wordmark and a versatile three-bar pictogram. Strategic use of colour and motion lets the brand adapt to any context while staying coherent.',
			it: 'Un sistema modulare basato su un logotipo forte e un pittogramma versatile a tre barre. L’uso strategico di colore e motion permette al brand di adattarsi a ogni contesto restando coerente.'
		},
		highlights: {
			en: [
				'Logo, pictogram and identity system',
				'Colour palette and typography',
				'Logo animation and motion graphics',
				'Complete brand book'
			],
			it: [
				'Logo, pittogramma e sistema di identità',
				'Palette colori e tipografia',
				'Logo animation e motion graphics',
				'Brandbook completo'
			]
		},
		tools: ['Illustrator', 'After Effects', 'Figma'],
		figma:
			'https://embed.figma.com/proto/bCQ5r2B4hhs3sL12B7zodE/Untitled?page-id=120%3A1332&node-id=120-1333&starting-point-node-id=120%3A1333&scaling=scale-down&content-scaling=fixed&embed-host=share',
		gallery: [
			{ type: 'image', src: 'projects/rxink/construction', span: 'full' },
			{ type: 'image', src: 'projects/rxink/black' },
			{ type: 'image', src: 'projects/rxink/green' },
			{ type: 'image', src: 'projects/rxink/pattern', span: 'full' },
			{ type: 'video', src: 'projects/rxink/logoanimationverticale' },
			{ type: 'image', src: 'projects/rxink/think' },
			{ type: 'image', src: 'projects/rxink/BannerLinkedin', span: 'full' }
		]
	},
	{
		slug: 'roma-crater-mundi',
		title: 'Roma Crater Mundi',
		client: 'Photo book',
		year: 2024,
		disciplines: ['photo'],
		role: {
			en: 'Photography, Art Direction, Editorial Design',
			it: 'Fotografia, Art Direction, Editorial Design'
		},
		cover: 'projects/romacratermundi/card',
		hero: { type: 'image', src: 'projects/romacratermundi/hero' },
		summary: {
			en: "Rome's potholes, reframed as lunar landscapes and abstract craters.",
			it: 'Le buche di Roma, reinterpretate come paesaggi lunari e crateri astratti.'
		},
		description: {
			en: "An art and photography project that turns a notorious urban problem — Rome's potholes — into a subject of unexpected beauty. Decontextualised by the lens, cracks and holes in the asphalt become lunar landscapes and abstract craters, inviting reflection on resilience and on finding aesthetic value even in decay. Completed with a photo book laid out in InDesign and printed on fine paper.",
			it: "Un progetto artistico e fotografico che trasforma un noto problema urbano — le buche di Roma — in un soggetto di inaspettata bellezza. Decontestualizzate dall'obiettivo, crepe e voragini nell'asfalto diventano paesaggi lunari e crateri astratti, invitando a riflettere sulla resilienza e sulla bellezza anche nel degrado. Completato da un libro fotografico impaginato in InDesign e stampato su carta di alta qualità."
		},
		challenge: {
			en: 'Elevate a subject associated with decay to an artistic level, finding angles, light and compositions that reveal a hidden, abstract beauty.',
			it: 'Elevare un soggetto associato al degrado a un livello artistico, trovando angolazioni, luci e composizioni capaci di rivelarne una bellezza nascosta e astratta.'
		},
		solution: {
			en: "Each pothole treated as a landscape of its own through composition and post-production. The book's sequencing guides the reader on a journey through these 'urban craters'.",
			it: "Ogni buca trattata come un paesaggio a sé attraverso composizione e post-produzione. La sequenza del libro guida il lettore in un viaggio attraverso questi 'crateri urbani'."
		},
		highlights: {
			en: [
				'Concept that elevates urban decay',
				'Coherent photographic series',
				'Photo book design and layout',
				'Fine-art print'
			],
			it: [
				'Concept che valorizza il degrado urbano',
				'Serie fotografica coerente',
				'Progettazione e impaginazione del libro',
				'Stampa fine-art'
			]
		},
		tools: ['Canon 700D', 'Photoshop', 'InDesign'],
		gallery: [
			{ type: 'image', src: 'projects/romacratermundi/still1', span: 'full' },
			...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((n) => ({
				type: 'image',
				src: `projects/romacratermundi/${n}`
			})),
			{ type: 'image', src: 'projects/romacratermundi/still2', span: 'full' },
			{ type: 'image', src: 'projects/romacratermundi/still3' },
			{ type: 'image', src: 'projects/romacratermundi/still4' },
			{ type: 'image', src: 'projects/romacratermundi/still5' },
			{ type: 'image', src: 'projects/romacratermundi/still6' },
			{ type: 'image', src: 'projects/romacratermundi/still7', span: 'full' }
		]
	},
	{
		slug: 'circularthub',
		title: 'CirculArtHub',
		client: 'Digital platform',
		year: 2024,
		disciplines: ['digital', 'brand'],
		role: { en: 'Brand Identity, UX/UI Design', it: 'Brand Identity, UX/UI Design' },
		cover: 'projects/circularthub/card',
		hero: { type: 'image', src: 'projects/circularthub/hero' },
		summary: {
			en: 'A marketplace for upcycled art and design — brand identity, UX and a navigable prototype.',
			it: 'Un marketplace per arte e design upcycled: brand identity, UX e prototipo navigabile.'
		},
		description: {
			en: 'CirculArtHub is a digital platform for selling art and design made from reclaimed materials. The project covers the full brand identity, the user journey (platform action chart) and the prototyping of every screen and flow in Figma — to support the circular economy and give visibility to emerging makers working with creative reuse.',
			it: "CirculArtHub è una piattaforma digitale per la vendita di prodotti artistici e di design realizzati con materiali di recupero. Il progetto comprende la brand identity completa, la user journey (platform action chart) e la prototipazione di tutte le schermate e dei flussi in Figma, per incentivare l'economia circolare e dare visibilità ad artisti e designer emergenti."
		},
		challenge: {
			en: 'Design an interface that is beautiful, intuitive for both makers and buyers, and able to communicate sustainability and uniqueness.',
			it: 'Progettare un’interfaccia bella, intuitiva per artisti e compratori e capace di comunicare sostenibilità e unicità dei prodotti.'
		},
		solution: {
			en: 'A clean, image-first design with simplified navigation for discovery and purchase. The Figma prototype validated the flows before development.',
			it: 'Un design pulito e image-first, con navigazione semplificata per scoperta e acquisto. Il prototipo Figma ha permesso di validare i flussi prima dello sviluppo.'
		},
		highlights: {
			en: [
				'Brand identity (logo, colour, type)',
				'UX/UI design',
				'Interactive Figma prototype',
				'Platform logic and interactions'
			],
			it: [
				'Brand identity (logo, colori, tipografia)',
				'Progettazione UX/UI',
				'Prototipo interattivo in Figma',
				'Logica della piattaforma e interazioni'
			]
		},
		tools: ['Figma', 'Illustrator'],
		figma:
			'https://embed.figma.com/proto/DUOOxYSzLFFt4C49mpZXUK/CirculArtHub_RxInK?page-id=&node-id=418-372&viewport=-27%2C-97%2C0.02&scaling=contain&content-scaling=fixed&embed-host=share',
		gallery: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
			type: 'image',
			src: `projects/circularthub/${n}`,
			span: n === 1 ? 'full' : undefined
		}))
	}
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export function nextProject(slug) {
	const i = projects.findIndex((p) => p.slug === slug);
	return projects[(i + 1) % projects.length];
}
