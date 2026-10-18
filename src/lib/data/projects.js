// Every project in the portfolio. Text fields are bilingual: { en, it }.
// Media paths are relative to /static/media (see scripts/optimize-media.mjs).
//   image: 'projects/forum/1'        -> /media/projects/forum/1.webp (+ -sm.webp)
//   video: 'projects/forum/video1'   -> /media/projects/forum/video1.mp4 (+ -poster.webp)
// To add a project: drop originals in media-src/images/projects/<slug>/, run `npm run media`,
// then add an entry below. Order here = order on the site.
// Optional fields: challenge, solution, highlights, tools, figma, preview; hero.ratio / hero.position
// crop an image hero; gallery videos with `sound` or `title` get the Film player.

export const disciplines = {
	ai: {
		en: 'AI Film',
		it: 'AI Film'
	},
	film: {
		en: 'Film & Direction',
		it: 'Film & Regia'
	},
	installation: {
		en: 'Installations & Live',
		it: 'Installazioni & Live'
	},
	campaign: {
		en: 'Campaigns',
		it: 'Campagne'
	},
	brand: {
		en: 'Brand & Identity',
		it: 'Brand & Identità'
	},
	digital: {
		en: 'Digital & Web',
		it: 'Digital & Web'
	},
	photo: {
		en: 'Photography',
		it: 'Fotografia'
	},
	cgi: {
		en: '3D & CGI',
		it: '3D & CGI'
	}
};

export const projects = [
	{
		slug: 'unicum-spec',
		title: 'Unicum',
		client: {
			en: 'Spec ads',
			it: 'Spot spec'
		},
		year: 2026,
		featured: true,
		disciplines: ['ai', 'campaign'],
		role: {
			en: 'Concept, AI Direction, Edit',
			it: 'Concept, Regia AI, Montaggio'
		},
		cover: 'projects/unicum/stills/piscina',
		preview: 'projects/unicum/molto-piu',
		hero: {
			type: 'video',
			src: 'projects/unicum/molto-piu',
			poster: 'projects/unicum/stills/piscina',
			sound: true,
			index: 1,
			title: {
				en: 'Molto + di un amaro',
				it: 'Molto + di un amaro'
			}
		},
		summary: {
			en: 'Two spec spots for Unicum, made with generative video.',
			it: 'Due spot spec per Unicum, realizzati con video generativo.'
		},
		description: {
			en: 'Two unsolicited spots, made to understand how far AI can go in a real advertising workflow. I wrote the scripts and shot lists first, then generated each shot and edited the spots with sound and end card.',
			it: 'Due spot non commissionati, per capire fin dove l’AI può entrare in un vero flusso di lavoro pubblicitario. Prima ho scritto sceneggiature e shot list, poi ho generato le inquadrature una per una e montato gli spot con suono ed end card.'
		},
		challenge: {
			en: 'Keeping the product accurate and the characters consistent across many shots.',
			it: 'Tenere il prodotto fedele e i personaggi coerenti in molte inquadrature.'
		},
		solution: {
			en: 'Product and cast references, shot-by-shot generation and a conventional edit.',
			it: 'Reference di prodotto e cast, generazione inquadratura per inquadratura e un montaggio tradizionale.'
		},
		highlights: {
			en: [
				'Two complete spots: 40 s and 30 s',
				'Consistent product and characters across locations',
				'Concept and copy',
				'Edit, sound and end card'
			],
			it: [
				'Due spot completi: 40 s e 30 s',
				'Prodotto e personaggi coerenti tra location diverse',
				'Concept e copy',
				'Montaggio, suono ed end card'
			]
		},
		tools: ['Generative AI video', 'Reference-driven prompting', 'Editing & sound'],
		gallery: [
			{
				type: 'image',
				src: 'projects/unicum/stills/scaffale'
			},
			{
				type: 'image',
				src: 'projects/unicum/stills/giungla'
			},
			{
				type: 'image',
				src: 'projects/unicum/stills/bicchiere',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/unicum/non-avanza',
				poster: 'projects/unicum/stills/rossa',
				span: 'full',
				sound: true,
				index: 2,
				title: {
					en: 'L’unico che non avanza mai',
					it: 'L’unico che non avanza mai'
				}
			},
			{
				type: 'image',
				src: 'projects/unicum/stills/ingresso'
			},
			{
				type: 'image',
				src: 'projects/unicum/stills/bottiglia'
			},
			{
				type: 'image',
				src: 'projects/unicum/stills/rossa',
				span: 'full'
			}
		]
	},
	{
		slug: 'director-studies',
		title: 'Director Studies',
		client: {
			en: 'AI R&D — Seedance 2.5',
			it: 'R&D AI — Seedance 2.5'
		},
		year: 2026,
		featured: true,
		disciplines: ['ai', 'film'],
		role: {
			en: 'AI Direction, Writing, Edit',
			it: 'Regia AI, Scrittura, Montaggio'
		},
		cover: 'projects/ai-studies/stills/duello-a',
		preview: 'projects/ai-studies/notte',
		hero: {
			type: 'video',
			src: 'projects/ai-studies/vespa',
			poster: 'projects/ai-studies/stills/vespa-a',
			sound: true,
			index: 1,
			title: {
				en: 'Vespa',
				it: 'Vespa'
			},
			ref: 'Guy Ritchie'
		},
		summary: {
			en: 'Eight short tests on Seedance 2.5, studying the camera work and editing of directors I admire. The cast is my colleagues and me.',
			it: 'Otto test brevi su Seedance 2.5, studiando camera e montaggio di registi che ammiro. Il cast siamo io e i miei colleghi.'
		},
		description: {
			en: 'Each test looks at one director: where the camera is, which lens, how long a shot lasts, when it cuts. It is a way to study their work, and to learn what generative tools can and cannot do.',
			it: 'Ogni test guarda a un regista: dove sta la camera, che ottica usa, quanto dura un’inquadratura, quando stacca. È un modo per studiare il loro lavoro e capire cosa gli strumenti generativi sanno fare e cosa no.'
		},
		challenge: {
			en: 'Getting the model to respect framing, blocking and rhythm, and keeping faces consistent.',
			it: 'Far rispettare al modello inquadrature, blocking e ritmo, e tenere i volti coerenti.'
		},
		solution: {
			en: 'Prompts written as shot lists, reference images of the cast, many attempts.',
			it: 'Prompt scritti come shot list, immagini di riferimento del cast, molti tentativi.'
		},
		highlights: {
			en: [
				'Eight studies, 10–30 s each',
				'Western, noir, war, boxing, period, night thriller',
				'Real cast kept consistent across shots',
				'Camera work and editing studied from directors I admire'
			],
			it: [
				'Otto studi da 10–30 s',
				'Western, noir, guerra, boxe, film in costume, thriller notturno',
				'Cast reale coerente tra le inquadrature',
				'Camera e montaggio studiati da registi che ammiro'
			]
		},
		tools: ['Seedance 2.5', 'Higgsfield', 'Reference-driven prompting'],
		gallery: [
			{
				type: 'image',
				src: 'projects/ai-studies/stills/vespa-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/vespa-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/bar',
				poster: 'projects/ai-studies/stills/bar-a',
				span: 'full',
				sound: true,
				index: 2,
				title: {
					en: 'Smoke Break',
					it: 'Pausa sigaretta'
				},
				ref: 'Fallen Angels — Wong Kar-wai'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/bar-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/bar-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/torneo',
				poster: 'projects/ai-studies/stills/torneo-a',
				span: 'full',
				sound: true,
				index: 3,
				title: {
					en: 'The Joust',
					it: 'Il Torneo'
				},
				ref: {
					en: 'A Knight of the Seven Kingdoms',
					it: 'Il cavaliere dei Sette Regni'
				}
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/torneo-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/torneo-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/notte',
				poster: 'projects/ai-studies/stills/notte-a',
				span: 'full',
				sound: true,
				index: 4,
				title: {
					en: 'Night Drive',
					it: 'Guida notturna'
				},
				ref: 'Drive — Nicolas Winding Refn'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/notte-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/notte-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/ring',
				poster: 'projects/ai-studies/stills/ring-a',
				span: 'full',
				sound: true,
				index: 5,
				title: {
					en: 'The Ring',
					it: 'Il Ring'
				},
				ref: {
					en: 'Raging Bull — Martin Scorsese',
					it: 'Toro scatenato — Martin Scorsese'
				}
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/ring-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/ring-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/trincea',
				poster: 'projects/ai-studies/stills/trincea-a',
				span: 'full',
				sound: true,
				index: 6,
				title: {
					en: 'The Trench',
					it: 'La Trincea'
				},
				ref: {
					en: 'Saving Private Ryan — Steven Spielberg',
					it: 'Salvate il soldato Ryan — Steven Spielberg'
				}
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/trincea-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/trincea-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/duello',
				poster: 'projects/ai-studies/stills/duello-a',
				span: 'full',
				sound: true,
				index: 7,
				title: {
					en: 'Showdown',
					it: 'Il Duello'
				},
				ref: {
					en: 'The Good, the Bad and the Ugly — Sergio Leone',
					it: 'Il buono, il brutto, il cattivo — Sergio Leone'
				}
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/duello-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/duello-b'
			},
			{
				type: 'video',
				src: 'projects/ai-studies/noir',
				poster: 'projects/ai-studies/stills/noir-a',
				span: 'full',
				sound: true,
				index: 8,
				title: {
					en: 'Noir in Pink',
					it: 'Noir in rosa'
				},
				ref: 'Sin City — Robert Rodriguez & Frank Miller'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/noir-a'
			},
			{
				type: 'image',
				src: 'projects/ai-studies/stills/noir-b'
			}
		]
	},
	{
		slug: 'china-diaries',
		title: 'China Diaries',
		client: {
			en: 'Personal — short films',
			it: 'Personale — cortometraggi'
		},
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
			title: {
				en: 'Yellow River',
				it: 'Fiume Giallo'
			}
		},
		summary: {
			en: 'Six short films shot while travelling in China.',
			it: 'Sei corti girati durante un viaggio in Cina.'
		},
		description: {
			en: 'One place per film: the Yellow River, a market, a square, a riverside, a ceramics workshop, a bamboo forest. No script: I filmed what was happening and built each piece in the edit.',
			it: 'Un luogo per film: il Fiume Giallo, un mercato, una piazza, un lungofiume, un laboratorio di ceramica, un bosco di bambù. Nessun copione: ho ripreso quello che succedeva e costruito ogni pezzo al montaggio.'
		},
		challenge: {
			en: 'Working with real situations that happen only once, and keeping six places coherent as a series.',
			it: 'Lavorare con situazioni reali che succedono una volta sola, e tenere sei luoghi coerenti come serie.'
		},
		solution: {
			en: '4K open gate for both horizontal and vertical formats, one grade for all six films, an edit led by sound. In DaVinci Resolve.',
			it: '4K open gate per formati orizzontali e verticali, un unico grading per tutti e sei, montaggio guidato dal suono. In DaVinci Resolve.'
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
			{
				type: 'image',
				src: 'projects/china/stills/donna-rosso'
			},
			{
				type: 'image',
				src: 'projects/china/stills/cascata'
			},
			{
				type: 'video',
				src: 'projects/china/mercato',
				poster: 'projects/china/stills/torre',
				span: 'full',
				sound: true,
				index: 2,
				title: {
					en: 'Market',
					it: 'Mercato'
				}
			},
			{
				type: 'image',
				src: 'projects/china/stills/bambina'
			},
			{
				type: 'image',
				src: 'projects/china/stills/strada'
			},
			{
				type: 'video',
				src: 'projects/china/piazza-chong',
				poster: 'projects/china/stills/pagoda',
				span: 'full',
				sound: true,
				index: 3,
				title: {
					en: 'Chong Square',
					it: 'Piazza Chong'
				}
			},
			{
				type: 'image',
				src: 'projects/china/stills/pagoda'
			},
			{
				type: 'image',
				src: 'projects/china/stills/scatole'
			},
			{
				type: 'video',
				src: 'projects/china/fiume',
				poster: 'projects/china/stills/skyline',
				span: 'full',
				sound: true,
				index: 4,
				title: {
					en: 'Riverside',
					it: 'Lungofiume'
				}
			},
			{
				type: 'image',
				src: 'projects/china/stills/skyline'
			},
			{
				type: 'image',
				src: 'projects/china/stills/operai'
			},
			{
				type: 'video',
				src: 'projects/china/argilla',
				poster: 'projects/china/stills/tornio',
				span: 'full',
				sound: false,
				index: 5,
				title: {
					en: 'Clay',
					it: 'Argilla'
				}
			},
			{
				type: 'image',
				src: 'projects/china/stills/scaffali'
			},
			{
				type: 'image',
				src: 'projects/china/stills/tornio'
			},
			{
				type: 'video',
				src: 'projects/china/bamboo',
				poster: 'projects/china/stills/padiglione',
				span: 'full',
				sound: true,
				index: 6,
				title: {
					en: 'Bamboo',
					it: 'Bambù'
				}
			},
			{
				type: 'image',
				src: 'projects/china/stills/padiglione'
			},
			{
				type: 'image',
				src: 'projects/china/stills/bosco'
			}
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
		hero: {
			type: 'youtube',
			id: '1CkQn1mbHck',
			poster: 'projects/forum/titolo'
		},
		summary: {
			en: 'An interactive 3D archive for the 55th anniversary of Forum Studios.',
			it: 'Un archivio 3D interattivo per i 55 anni dei Forum Studios.'
		},
		description: {
			en: 'Images and sounds from the studio’s archive placed in a 3D space you can explore. The same material is used in a web app, a 9600 px wide video installation and live performances.',
			it: 'Immagini e suoni dell’archivio dello studio disposti in uno spazio 3D da esplorare. Lo stesso materiale è usato in una web app, in un’installazione video larga 9600 px e in performance live.'
		},
		challenge: {
			en: 'Presenting an archive as something to explore rather than search, and treating three unsynchronised screens as one canvas.',
			it: 'Presentare l’archivio come qualcosa da esplorare più che da cercare, e trattare tre schermi non sincronizzati come un’unica tela.'
		},
		solution: {
			en: 'A single system with five outputs: web app, creation tool, render pipeline, installation and live set.',
			it: 'Un unico sistema con cinque output: web app, tool di creazione, pipeline di rendering, installazione e set live.'
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
			{
				type: 'video',
				src: 'projects/forum/video1',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/forum/1'
			},
			{
				type: 'image',
				src: 'projects/forum/still1'
			},
			{
				type: 'video',
				src: 'projects/forum/video2'
			},
			{
				type: 'video',
				src: 'projects/forum/video3'
			},
			{
				type: 'image',
				src: 'projects/forum/2',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/forum/still2'
			},
			{
				type: 'image',
				src: 'projects/forum/3'
			},
			{
				type: 'video',
				src: 'projects/forum/video4',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/forum/still3'
			},
			{
				type: 'image',
				src: 'projects/forum/4'
			},
			{
				type: 'image',
				src: 'projects/forum/still4'
			},
			{
				type: 'image',
				src: 'projects/forum/5'
			},
			{
				type: 'image',
				src: 'projects/forum/6'
			},
			{
				type: 'image',
				src: 'projects/forum/7'
			}
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
		hero: {
			type: 'youtube',
			id: 'y5pSa9Mp-qg',
			poster: 'projects/vinted/card'
		},
		summary: {
			en: 'A Vinted spot told from the point of view of a forgotten garment.',
			it: 'Uno spot Vinted raccontato dal punto di vista di un capo dimenticato.'
		},
		description: {
			en: 'Instead of the seller, the story follows what is left in the wardrobe. The camera sits among the clothes, with a tone between ironic and melancholic.',
			it: 'Invece del venditore, la storia segue ciò che resta nell’armadio. La camera è posizionata tra i vestiti, con un tono tra l’ironico e il malinconico.'
		},
		challenge: {
			en: 'Finding a different angle from seller-focused campaigns.',
			it: 'Trovare un punto di vista diverso dalle campagne centrate sul venditore.'
		},
		solution: {
			en: 'Object POV, simple copy and a short edit. From script to final cut.',
			it: 'Object POV, un copy semplice e un montaggio breve. Dallo script al montaggio finale.'
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
			{
				type: 'image',
				src: 'projects/vinted/1',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/vinted/2'
			},
			{
				type: 'image',
				src: 'projects/vinted/3'
			},
			{
				type: 'image',
				src: 'projects/vinted/4'
			},
			{
				type: 'image',
				src: 'projects/vinted/5'
			},
			{
				type: 'image',
				src: 'projects/vinted/6',
				span: 'full'
			}
		]
	},
	{
		slug: 'rome-15k',
		title: 'Rome 15K',
		client: {
			en: 'Rome 15K × Ford Italia',
			it: 'Rome 15K × Ford Italia'
		},
		year: 2025,
		featured: true,
		disciplines: ['film'],
		role: {
			en: 'Shooting, Edit',
			it: 'Riprese, Montaggio'
		},
		cover: 'projects/rome-15k/stills/04',
		preview: 'projects/rome-15k/reel',
		hero: {
			type: 'video',
			src: 'projects/rome-15k/reel',
			poster: 'projects/rome-15k/stills/04',
			sound: true
		},
		summary: {
			en: 'The event reel for the Rome 15K, supported by Ford Italia.',
			it: 'Il video reel della Rome 15K, con il supporto di Ford Italia.'
		},
		description: {
			en: 'I shot the race on the day and edited the reel: the start, the runners, the finish, and the Ford cars along the route.',
			it: 'Ho girato la gara durante la giornata e montato il reel: la partenza, i corridori, l’arrivo e le auto Ford lungo il percorso.'
		},
		challenge: {
			en: 'Covering a whole race on my own, on the day, without missing the moments that matter.',
			it: 'Coprire un’intera gara da solo, in giornata, senza perdere i momenti importanti.'
		},
		solution: {
			en: 'Positions planned in advance, handheld camera, and an edit built on the rhythm of the race.',
			it: 'Posizioni pianificate in anticipo, camera a mano e un montaggio costruito sul ritmo della gara.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/rome-15k/stills/01'
			},
			{
				type: 'image',
				src: 'projects/rome-15k/stills/02'
			},
			{
				type: 'image',
				src: 'projects/rome-15k/stills/03'
			},
			{
				type: 'image',
				src: 'projects/rome-15k/stills/05'
			},
			{
				type: 'image',
				src: 'projects/rome-15k/stills/06'
			},
			{
				type: 'image',
				src: 'projects/rome-15k/stills/04',
				span: 'full'
			}
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
		hero: {
			type: 'youtube',
			id: 'VYWhh3v2-LU',
			poster: 'cards/kollateral1'
		},
		summary: {
			en: 'An installation prototype: a torn sheet moved by sound, with light coming through.',
			it: 'Un prototipo di installazione: un telo strappato mosso dal suono, attraversato dalla luce.'
		},
		description: {
			en: 'A burnt, torn sheet hangs in the dark. Fans driven by the music move it, and moving lights pass through the tears.',
			it: 'Un telo bruciato e strappato è appeso al buio. Ventilatori pilotati dalla musica lo muovono, e le luci passano attraverso gli strappi.'
		},
		challenge: {
			en: 'Synchronising music, fabric movement and lights.',
			it: 'Sincronizzare musica, movimento del telo e luci.'
		},
		solution: {
			en: 'Ableton for the score and MIDI cues, TouchDesigner for the fans and DMX lights.',
			it: 'Ableton per la musica e i cue MIDI, TouchDesigner per ventilatori e luci DMX.'
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
			{
				type: 'video',
				src: 'cards/MAIN_16-9',
				span: 'full',
				sound: true
			},
			{
				type: 'image',
				src: 'cards/kollateral4'
			},
			{
				type: 'image',
				src: 'cards/kollateral2'
			},
			{
				type: 'image',
				src: 'cards/kollateral',
				span: 'full'
			},
			{
				type: 'image',
				src: 'cards/kollateral3'
			},
			{
				type: 'image',
				src: 'cards/kollateral1'
			}
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
		hero: {
			type: 'video',
			src: 'projects/bmw/landing'
		},
		summary: {
			en: 'A concept campaign for an electric re-edition of the BMW M3 E30.',
			it: 'Una campagna concept per una riedizione elettrica della BMW M3 E30.'
		},
		description: {
			en: 'A spec campaign built around the word “RE:”. The main piece is a website with a landing page, an animated 3D model of the car, a timeline and a sales page.',
			it: 'Una campagna spec costruita attorno alla parola “RE:”. Il pezzo principale è un sito con landing, modello 3D animato dell’auto, timeline e pagina di vendita.'
		},
		challenge: {
			en: 'Presenting an ’80s car to today’s audience, and keeping a 3D-heavy site fast.',
			it: 'Presentare un’auto degli anni ’80 al pubblico di oggi, e tenere veloce un sito con molto 3D.'
		},
		solution: {
			en: 'Copy based on shared memories, the car rendered in Blender, a Svelte site, OOH and social adaptations.',
			it: 'Copy basato su ricordi comuni, auto renderizzata in Blender, sito in Svelte, adattamenti OOH e social.'
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
			{
				type: 'image',
				src: 'projects/bmw/ooh',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/bmw/scroll'
			},
			{
				type: 'video',
				src: 'projects/bmw/story'
			},
			{
				type: 'image',
				src: 'projects/bmw/hero',
				span: 'full'
			}
		]
	},
	{
		slug: 'glo-hilo',
		title: 'glo Hilo',
		client: {
			en: 'glo — 3D renders',
			it: 'glo — render 3D'
		},
		year: 2025,
		featured: true,
		disciplines: ['cgi'],
		role: {
			en: 'Modelling, Texturing, Lighting, Rendering',
			it: 'Modellazione, Texturing, Luci, Rendering'
		},
		cover: 'projects/glo/hilo-5',
		hero: {
			type: 'image',
			src: 'projects/glo/banner'
		},
		summary: {
			en: 'Product renders for glo Hilo, modelled from scratch in Blender.',
			it: 'Render di prodotto per glo Hilo, modellati da zero in Blender.'
		},
		description: {
			en: 'The whole process done by hand, in two series of images: modelling, materials, lighting and final render.',
			it: 'Tutto il processo fatto a mano, in due serie di immagini: modellazione, materiali, luci e render finale.'
		},
		challenge: {
			en: 'Getting materials and reflections right, so the object reads as real.',
			it: 'Rendere bene materiali e riflessi, perché l’oggetto sembri reale.'
		},
		solution: {
			en: 'Modelled from references, physically based materials and a simple studio lighting setup.',
			it: 'Modellazione da reference, materiali fisicamente corretti e un set di luci da studio essenziale.'
		},
		tools: ['Blender'],
		gallery: [
			{
				type: 'image',
				src: 'projects/glo/hilo-1'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-3'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-2'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-4'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-5'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-7'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-6'
			},
			{
				type: 'image',
				src: 'projects/glo/hilo-8'
			}
		]
	},
	{
		slug: 'symbioglitch',
		title: 'Symbioglitch',
		client: 'Videocittà 2024',
		year: 2024,
		featured: true,
		disciplines: ['installation', 'film'],
		role: {
			en: 'Live Visuals, Real-time Direction',
			it: 'Live Visuals, Regia in tempo reale'
		},
		cover: 'projects/videocitta/hero',
		preview: 'projects/videocitta/video6',
		hero: {
			type: 'video',
			src: 'projects/videocitta/video6'
		},
		summary: {
			en: 'Live visuals on a 25-metre wall at Videocittà 2024, with Alice Felloni.',
			it: 'Visual live su una parete di 25 metri a Videocittà 2024, con Alice Felloni.'
		},
		description: {
			en: 'An audiovisual performance about the relationship between people and nature, using randomly edited and heavily processed footage.',
			it: 'Una performance audiovisiva sul rapporto tra persone e natura, con footage montato in modo casuale e molto processato.'
		},
		challenge: {
			en: 'Running generative visuals live across a 25-metre wall, reliably.',
			it: 'Far girare visual generativi dal vivo su 25 metri di parete, in modo affidabile.'
		},
		solution: {
			en: 'TouchDesigner for generation, Resolume Arena for mapping, MIDI controllers for live control.',
			it: 'TouchDesigner per la generazione, Resolume Arena per il mapping, controller MIDI per il controllo live.'
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
			{
				type: 'video',
				src: 'projects/videocitta/video5',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/videocitta/video1'
			},
			{
				type: 'image',
				src: 'cards/avperformace'
			},
			{
				type: 'video',
				src: 'projects/videocitta/video4',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/videocitta/video2'
			},
			{
				type: 'video',
				src: 'projects/videocitta/video3'
			}
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
		hero: {
			type: 'video',
			src: 'projects/beyond/demo'
		},
		summary: {
			en: 'An interactive installation that changes as you get closer.',
			it: 'Un’installazione interattiva che cambia man mano che ti avvicini.'
		},
		description: {
			en: 'From a distance the image is an abstract texture; up close it becomes a recognisable object.',
			it: 'Da lontano l’immagine è una texture astratta; da vicino diventa un oggetto riconoscibile.'
		},
		challenge: {
			en: 'A smooth transition tied to the viewer’s distance.',
			it: 'Una transizione fluida legata alla distanza dello spettatore.'
		},
		solution: {
			en: 'Ultrasonic sensors on Arduino, and TouchDesigner mapping distance to a pre-rendered transition.',
			it: 'Sensori a ultrasuoni su Arduino e TouchDesigner, che lega la distanza a una transizione pre-renderizzata.'
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
			{
				type: 'image',
				src: 'cards/beyond2',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/beyond/side1'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side1'
			},
			{
				type: 'video',
				src: 'projects/beyond/side2'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side2'
			},
			{
				type: 'video',
				src: 'projects/beyond/side3'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side3'
			},
			{
				type: 'video',
				src: 'projects/beyond/side4'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side4'
			},
			{
				type: 'video',
				src: 'projects/beyond/side5'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side5'
			},
			{
				type: 'video',
				src: 'projects/beyond/side6'
			},
			{
				type: 'video',
				src: 'projects/beyond/_side6'
			}
		]
	},
	{
		slug: 'friends-in-my-head',
		title: 'Friends in My Head',
		client: 'Short film',
		year: 2025,
		disciplines: ['film'],
		role: {
			en: 'Direction, Cinematography, Edit',
			it: 'Regia, Fotografia, Montaggio'
		},
		cover: 'projects/friendsinmyhead/still4',
		hero: {
			type: 'vimeo',
			id: '1097622993',
			poster: 'projects/friendsinmyhead/still4'
		},
		summary: {
			en: 'A short film shot in one hour from four random words.',
			it: 'Un corto girato in un’ora partendo da quattro parole casuali.'
		},
		description: {
			en: 'Hunt, voices, water, madness: a young man with schizophrenia in a hunting reserve. Black and white, handheld, fast editing.',
			it: 'Caccia, voci, acqua, follia: un ragazzo schizofrenico in una riserva di caccia. Bianco e nero, camera a mano, montaggio veloce.'
		},
		challenge: {
			en: 'Building a coherent story from unrelated words in very little time.',
			it: 'Costruire una storia coerente da parole slegate in pochissimo tempo.'
		},
		solution: {
			en: 'Using the constraints as the style.',
			it: 'Usare i vincoli come stile.'
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
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still1',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still2'
			},
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still3'
			},
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still5'
			},
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still6'
			},
			{
				type: 'image',
				src: 'projects/friendsinmyhead/still7',
				span: 'full'
			}
		]
	},
	{
		slug: 'one-of-these-days',
		title: 'One of These Days',
		client: 'Music video tribute',
		year: 2023,
		disciplines: ['film'],
		role: {
			en: 'Motion Design, Animation, Edit',
			it: 'Motion Design, Animazione, Montaggio'
		},
		cover: 'projects/oneofthesedays/10',
		hero: {
			type: 'youtube',
			id: 'MS6i-Be5YXg',
			poster: 'projects/oneofthesedays/10'
		},
		summary: {
			en: 'An animated tribute to the Pink Floyd track.',
			it: 'Un tributo animato al brano dei Pink Floyd.'
		},
		description: {
			en: 'Drawings made in Illustrator and animated in After Effects, edited closely to the music.',
			it: 'Disegni fatti in Illustrator e animati in After Effects, montati a stretto contatto con la musica.'
		},
		challenge: {
			en: 'Following the music without illustrating it literally.',
			it: 'Seguire la musica senza illustrarla alla lettera.'
		},
		solution: {
			en: 'Simple shapes, a limited palette, rhythm.',
			it: 'Forme semplici, palette ridotta, ritmo.'
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
			{
				type: 'image',
				src: 'projects/oneofthesedays/1'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/2'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/3'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/4'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/5'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/6'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/7'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/8'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/9'
			},
			{
				type: 'image',
				src: 'projects/oneofthesedays/10'
			}
		]
	},
	{
		slug: 'edinburgh',
		title: 'Edinburgh',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2026,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		featured: true,
		cover: 'projects/photography/tramonto',
		hero: {
			type: 'image',
			src: 'projects/photography/notte',
			ratio: '16 / 9',
			position: '50% 65%'
		},
		summary: {
			en: 'Street photographs from Edinburgh.',
			it: 'Fotografie di strada a Edimburgo.'
		},
		description: {
			en: 'Mostly late light: people on the pavement, workers on scaffolding, a lit niche, an alley, a stone column.',
			it: 'Soprattutto luce di fine giornata: persone sul marciapiede, operai sull’impalcatura, una nicchia illuminata, un vicolo, una colonna di pietra.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography/tramonto'
			},
			{
				type: 'image',
				src: 'projects/photography/gabbia'
			},
			{
				type: 'image',
				src: 'projects/photography/impalcatura'
			},
			{
				type: 'image',
				src: 'projects/photography/torre'
			},
			{
				type: 'image',
				src: 'projects/photography/vicolo-1'
			},
			{
				type: 'image',
				src: 'projects/photography/vicolo-2'
			}
		]
	},
	{
		slug: 'xian',
		title: 'Xi’an',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2026,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography-transit/02',
		hero: {
			type: 'image',
			src: 'projects/photography-transit/11',
			ratio: '16 / 9',
			position: '50% 40%'
		},
		summary: {
			en: 'Xi’an from a car window, and Mount Hua.',
			it: 'Xi’an dal finestrino di un’auto, e il monte Hua.'
		},
		description: {
			en: 'Taken from a moving car: traffic, overpasses, neon and towers, left blurred on purpose. The last frame is from Mount Hua.',
			it: 'Scattate da un’auto in movimento: traffico, cavalcavia, neon e palazzi, lasciati mossi di proposito. L’ultima foto è dal monte Hua.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography-transit/01'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/02'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/03'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/04'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/05'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/06'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/07'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/08'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/09'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/10'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/11'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/12'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/13'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/14'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/15'
			},
			{
				type: 'image',
				src: 'projects/photography-transit/montagna'
			}
		]
	},
	{
		slug: 'marrakech',
		title: 'Marrakech',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2024,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography-marrakech/minareto',
		hero: {
			type: 'image',
			src: 'projects/photography/atrio',
			ratio: '16 / 9',
			position: '50% 72%'
		},
		summary: {
			en: 'A few photographs from Marrakech.',
			it: 'Qualche fotografia da Marrakech.'
		},
		description: {
			en: 'Cleaning in an entrance hall, a ceiling of lanterns, a minaret seen through a blue frame, a fountain.',
			it: 'Le pulizie in un atrio, un soffitto di lanterne, un minareto visto attraverso una cornice blu, una fontana.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography-marrakech/minareto'
			},
			{
				type: 'image',
				src: 'projects/photography-marrakech/lanterne'
			},
			{
				type: 'image',
				src: 'projects/photography-marrakech/fontana'
			},
			{
				type: 'image',
				src: 'projects/photography/atrio'
			}
		]
	},
	{
		slug: 'acquedotti',
		title: 'Acquedotti',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2024,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography-acquedotti/05',
		hero: {
			type: 'image',
			src: 'projects/photography-acquedotti/01'
		},
		summary: {
			en: 'Parco degli Acquedotti, Rome, early on a foggy morning.',
			it: 'Parco degli Acquedotti, Roma, una mattina presto con la nebbia.'
		},
		description: {
			en: 'A walk at dawn among the aqueducts, the trees and the fog.',
			it: 'Una passeggiata all’alba tra gli acquedotti, gli alberi e la nebbia.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography-acquedotti/02'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/03'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/05',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/04'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/06'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/07'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/08'
			},
			{
				type: 'image',
				src: 'projects/photography-acquedotti/09',
				span: 'full'
			}
		]
	},
	{
		slug: 'ordinary-days',
		title: 'Ordinary Days',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2026,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography-everyday/operaio',
		hero: {
			type: 'image',
			src: 'projects/photography/vetro',
			ratio: '16 / 9',
			position: '50% 40%'
		},
		summary: {
			en: 'Photographs from ordinary days.',
			it: 'Fotografie di giorni qualunque.'
		},
		description: {
			en: 'No particular place or project: a race, a wall, a worker, a pool ladder, a train seat, a few evenings.',
			it: 'Nessun luogo o progetto in particolare: una corsa, un muro, un operaio, la scaletta di una piscina, il sedile di un treno, qualche sera.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography-everyday/corsa-1'
			},
			{
				type: 'image',
				src: 'projects/photography-everyday/corsa-2'
			},
			{
				type: 'image',
				src: 'projects/photography/muro-giallo',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/photography-everyday/operaio'
			},
			{
				type: 'image',
				src: 'projects/photography-everyday/piscina'
			},
			{
				type: 'image',
				src: 'projects/photography-everyday/treno'
			},
			{
				type: 'image',
				src: 'projects/photography/spiaggia'
			},
			{
				type: 'image',
				src: 'projects/photography/strada-notte'
			},
			{
				type: 'image',
				src: 'projects/photography/nuvole'
			}
		]
	},
	{
		slug: 'people',
		title: 'People',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2026,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography-people/tetto-2',
		hero: {
			type: 'image',
			src: 'projects/photography-people/neve-1',
			ratio: '16 / 9',
			position: '50% 25%'
		},
		summary: {
			en: 'Portraits on a rooftop and in the snow.',
			it: 'Ritratti su un tetto e sulla neve.'
		},
		description: {
			en: 'Portraits made without a studio, while people were doing something else.',
			it: 'Ritratti fatti senza studio, mentre le persone facevano altro.'
		},
		gallery: [
			{
				type: 'image',
				src: 'projects/photography-people/neve-1'
			},
			{
				type: 'image',
				src: 'projects/photography-people/neve-2'
			},
			{
				type: 'image',
				src: 'projects/photography-people/neve-3'
			},
			{
				type: 'image',
				src: 'projects/photography-people/tetto-1'
			},
			{
				type: 'image',
				src: 'projects/photography-people/tetto-2'
			},
			{
				type: 'image',
				src: 'projects/photography-people/tetto-3'
			}
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
		hero: {
			type: 'image',
			src: 'projects/romacratermundi/hero'
		},
		summary: {
			en: 'A photo series and book on Rome’s potholes.',
			it: 'Una serie fotografica e un libro sulle buche di Roma.'
		},
		description: {
			en: 'Potholes photographed out of context, where they start to look like craters and abstract surfaces. Laid out in InDesign and printed.',
			it: 'Buche fotografate fuori contesto, dove iniziano a sembrare crateri e superfici astratte. Impaginato in InDesign e stampato.'
		},
		challenge: {
			en: 'Finding something worth looking at in an everyday problem.',
			it: 'Trovare qualcosa da guardare in un problema quotidiano.'
		},
		solution: {
			en: 'Careful framing, light and post-production, and a sequence that works as a book.',
			it: 'Cura di inquadratura, luce e post-produzione, e una sequenza che funzioni come libro.'
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
			{
				type: 'image',
				src: 'projects/romacratermundi/still1',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/1'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/2'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/3'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/4'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/5'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/6'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/7'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/8'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/9'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/10'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/11'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/12'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/13'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/14'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/15'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/16'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still2',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still3'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still4'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still5'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still6'
			},
			{
				type: 'image',
				src: 'projects/romacratermundi/still7',
				span: 'full'
			}
		]
	},
	{
		slug: 'rxink-personal-brand',
		title: 'RXINK',
		client: 'Personal brand',
		year: 2024,
		disciplines: ['brand'],
		role: {
			en: 'Brand Identity, Logo Animation',
			it: 'Brand Identity, Logo Animation'
		},
		cover: 'projects/rxink/yellow1',
		preview: 'projects/rxink/LOGOANIMATION10',
		hero: {
			type: 'video',
			src: 'projects/rxink/LOGOANIMATION10'
		},
		summary: {
			en: 'My personal identity: logo, pictogram, colours, type and motion.',
			it: 'La mia identità personale: logo, pittogramma, colori, font e motion.'
		},
		description: {
			en: 'A wordmark made of slanted bars, a three-bar pictogram, a black, yellow and green palette and a few motion rules.',
			it: 'Un logotipo fatto di barre inclinate, un pittogramma a tre barre, una palette nero, giallo e verde e qualche regola di motion.'
		},
		challenge: {
			en: 'Recognisable and flexible across print, screen and motion.',
			it: 'Riconoscibile e flessibile tra stampa, schermo e motion.'
		},
		solution: {
			en: 'Few elements, used consistently.',
			it: 'Pochi elementi, usati con coerenza.'
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
			{
				type: 'image',
				src: 'projects/rxink/construction',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/rxink/black'
			},
			{
				type: 'image',
				src: 'projects/rxink/green'
			},
			{
				type: 'image',
				src: 'projects/rxink/pattern',
				span: 'full'
			},
			{
				type: 'video',
				src: 'projects/rxink/logoanimationverticale'
			},
			{
				type: 'image',
				src: 'projects/rxink/think'
			},
			{
				type: 'image',
				src: 'projects/rxink/BannerLinkedin',
				span: 'full'
			}
		]
	},
	{
		slug: 'circularthub',
		title: 'CirculArtHub',
		client: 'Digital platform',
		year: 2024,
		disciplines: ['digital', 'brand'],
		role: {
			en: 'Brand Identity, UX/UI Design',
			it: 'Brand Identity, UX/UI Design'
		},
		cover: 'projects/circularthub/card',
		hero: {
			type: 'image',
			src: 'projects/circularthub/hero'
		},
		summary: {
			en: 'Brand, UX and prototype for a marketplace of upcycled art and design.',
			it: 'Brand, UX e prototipo per un marketplace di arte e design upcycled.'
		},
		description: {
			en: 'A platform for selling pieces made from reclaimed materials. Brand identity, user journey and every screen prototyped in Figma.',
			it: 'Una piattaforma per vendere pezzi fatti con materiali di recupero. Brand identity, user journey e tutte le schermate prototipate in Figma.'
		},
		challenge: {
			en: 'An interface that works for both makers and buyers.',
			it: 'Un’interfaccia che funzioni sia per chi crea sia per chi compra.'
		},
		solution: {
			en: 'Image-led layouts, simple navigation, flows tested in Figma.',
			it: 'Layout guidati dalle immagini, navigazione semplice, flussi testati in Figma.'
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
		gallery: [
			{
				type: 'image',
				src: 'projects/circularthub/1',
				span: 'full'
			},
			{
				type: 'image',
				src: 'projects/circularthub/2'
			},
			{
				type: 'image',
				src: 'projects/circularthub/3'
			},
			{
				type: 'image',
				src: 'projects/circularthub/4'
			},
			{
				type: 'image',
				src: 'projects/circularthub/5'
			},
			{
				type: 'image',
				src: 'projects/circularthub/6'
			},
			{
				type: 'image',
				src: 'projects/circularthub/7'
			}
		]
	}
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export function nextProject(slug) {
	const i = projects.findIndex((p) => p.slug === slug);
	return projects[(i + 1) % projects.length];
}
