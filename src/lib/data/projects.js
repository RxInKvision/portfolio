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
			en: 'Two spec spots for Unicum, made with AI. The bottle had to look like the bottle.',
			it: "Due spot spec per Unicum, fatti con l'AI. La bottiglia doveva sembrare la bottiglia."
		},
		description: {
			en: 'Nobody asked for these. I wanted to see whether an AI-made commercial could sit next to a shot one without embarrassment. “Molto + di un amaro” follows a guy from a supermarket aisle into places that don’t exist; “L’unico che non avanza mai” is a party where every bottle is left over, except one. Script, shot list and edit came first. The AI came after.',
			it: "Non li ha chiesti nessuno. Volevo capire se uno spot fatto con l'AI può stare accanto a uno girato senza fare brutta figura. “Molto + di un amaro” segue un ragazzo dalla corsia del supermercato in posti che non esistono; “L’unico che non avanza mai” è una festa in cui avanza tutto, tranne una bottiglia. Prima script, shot list e montaggio. L'AI dopo."
		},
		challenge: {
			en: 'Keeping the product faithful (shape, label, colour) and the characters consistent shot after shot — and avoiding the glossy look that screams AI.',
			it: 'Tenere il prodotto fedele (forma, etichetta, colore) e i personaggi coerenti inquadratura dopo inquadratura, evitando il look patinato che urla AI.'
		},
		solution: {
			en: 'Treated it like a normal shoot: script, references, shot list, then generation shot by shot and a real edit with sound and end card.',
			it: 'L’ho trattato come un set normale: script, reference, shot list, poi generazione inquadratura per inquadratura e un montaggio vero, con suono ed end card.'
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
			en: 'Eight short tests on Seedance 2.5, copying the camera and the cutting of directors I like. The cast is me and my colleagues.',
			it: 'Otto test brevi su Seedance 2.5, copiando camera e montaggio di registi che amo. Il cast siamo io e i miei colleghi.'
		},
		description: {
			en: 'Homework, basically. The best way to understand a director is to try to copy them: where the camera sits, which lens, how long a shot holds, when it cuts. I did it with a generative model and real faces — mine and my colleagues’ — to see how far the tool follows intent, and where it gives up.',
			it: 'Compiti a casa, in sostanza. Il modo migliore per capire un regista è provare a copiarlo: dove sta la camera, che ottica, quanto dura un’inquadratura, quando stacca. L’ho fatto con un modello generativo e volti veri, il mio e quelli dei colleghi, per vedere fin dove lo strumento segue un’intenzione e dove si arrende.'
		},
		challenge: {
			en: 'Generative models love a generic, polished image. Getting them to respect blocking, coverage and rhythm — and to keep faces consistent — is the actual work.',
			it: 'I modelli generativi adorano l’immagine generica e lucida. Fargli rispettare blocking, copertura e ritmo, e tenere i volti coerenti, è il lavoro vero.'
		},
		solution: {
			en: 'Prompts written like shot lists, reference stills of the cast, and a lot of retakes. Whatever works here ends up in client work; whatever doesn’t stays a lesson.',
			it: 'Prompt scritti come shot list, foto di riferimento del cast e molti ciak. Quello che funziona finisce nei lavori per i clienti; quello che non funziona resta una lezione.'
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
			en: 'Six short films shot in China. Rivers, markets, clay, bamboo.',
			it: 'Sei corti girati in Cina. Fiumi, mercati, argilla, bambù.'
		},
		description: {
			en: 'Shot while travelling, with no script and no set: one place per film, cut to its own rhythm. Real people, available light, and a lot of waiting for the right moment.',
			it: 'Girati in viaggio, senza copione e senza set: un luogo per film, montato sul suo ritmo. Persone vere, luce disponibile e molta attesa del momento giusto.'
		},
		challenge: {
			en: 'Things happen once. You either get them or you don’t — and six different places still had to feel like one series.',
			it: 'Le cose succedono una volta sola. O le prendi o no, e sei luoghi diversi dovevano comunque sembrare una serie.'
		},
		solution: {
			en: '4K open gate to keep the frame free for horizontal and vertical, one consistent grade, and an edit led by sound. All in DaVinci Resolve.',
			it: '4K open gate per lasciare libero il formato, orizzontale e verticale, un grading unico e un montaggio guidato dal suono. Tutto in DaVinci Resolve.'
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
		slug: 'street-notes',
		title: 'Street Notes',
		client: {
			en: 'Personal — photography',
			it: 'Personale — fotografia'
		},
		year: 2026,
		featured: true,
		disciplines: ['photo'],
		role: {
			en: 'Photography',
			it: 'Fotografia'
		},
		cover: 'projects/photography/tramonto',
		hero: {
			type: 'image',
			src: 'projects/photography/atrio',
			ratio: '16 / 9',
			position: '50% 72%'
		},
		summary: {
			en: 'Street photographs, mostly Edinburgh. Low sun, silhouettes, people minding their own business.',
			it: 'Fotografie di strada, soprattutto Edimburgo. Sole basso, silhouette, gente che si fa i fatti suoi.'
		},
		description: {
			en: 'No project behind these, just a camera that’s usually with me. I tend to wait for the light, and for someone to walk into it.',
			it: 'Nessun progetto dietro, solo una macchina fotografica che di solito ho con me. Tendo ad aspettare la luce, e che qualcuno ci passi dentro.'
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
				src: 'projects/photography/notte'
			},
			{
				type: 'image',
				src: 'projects/photography/vicolo-1'
			},
			{
				type: 'image',
				src: 'projects/photography/vicolo-2'
			},
			{
				type: 'image',
				src: 'projects/photography/torre'
			},
			{
				type: 'image',
				src: 'projects/photography/spiaggia'
			},
			{
				type: 'image',
				src: 'projects/photography/vetro'
			},
			{
				type: 'image',
				src: 'projects/photography/muro-giallo'
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
		slug: 'in-transit',
		title: 'In Transit',
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
			en: 'A Chinese city seen through a moving car window. Blurry on purpose.',
			it: 'Una città cinese vista dal finestrino di un’auto in corsa. Mossa, di proposito.'
		},
		description: {
			en: 'A moving car and no attempt to keep anything sharp. Neon, traffic, overpasses and too many tower blocks — what a city looks like when you’re only passing through. It ends on a mountain, because sooner or later you get out of the car.',
			it: 'Un’auto in movimento e nessun tentativo di tenere qualcosa a fuoco. Neon, traffico, cavalcavia e troppi palazzoni: com’è una città quando ci passi soltanto. Finisce su una montagna, perché prima o poi dalla macchina si scende.'
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
			en: 'Portraits on a rooftop and in a snowstorm.',
			it: 'Ritratti su un tetto e sotto una nevicata.'
		},
		description: {
			en: 'Portraits without a studio: a rooftop on a hot afternoon, a slope in the middle of a snowstorm. I’d rather catch people while they’re doing something than ask them to pose.',
			it: 'Ritratti senza studio: un tetto in un pomeriggio caldo, una pista in mezzo a una nevicata. Preferisco prendere le persone mentre fanno qualcosa che chiedergli di mettersi in posa.'
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
			en: 'Forum Studios’ 55-year archive, turned into a 3D space you can wander through, play and perform with.',
			it: 'I 55 anni di archivio dei Forum Studios trasformati in uno spazio 3D da esplorare, suonare e usare dal vivo.'
		},
		description: {
			en: 'For Forum Studios’ 55th anniversary. Instead of yet another searchable database, the archive became a place: images and sounds floating in 3D, found more by accident than by search. The same material feeds a web app, a 9600 px wide video installation and live performances.',
			it: 'Per i 55 anni dei Forum Studios. Invece dell’ennesimo database con la barra di ricerca, l’archivio è diventato un luogo: immagini e suoni sospesi in 3D, che si trovano più per caso che cercandoli. Lo stesso materiale alimenta una web app, un’installazione video larga 9600 px e performance live.'
		},
		challenge: {
			en: 'Making an archive feel alive rather than catalogued — and treating three unsynchronised screens as one canvas.',
			it: 'Far sembrare vivo un archivio invece che catalogato, e trattare tre schermi non sincronizzati come un’unica tela.'
		},
		solution: {
			en: 'One system, five outputs: a 3D web app, a creation tool, an offline render pipeline, the installation and a live set. The archive becomes an instrument.',
			it: 'Un sistema, cinque output: web app 3D, tool di creazione, pipeline di rendering offline, installazione e set live. L’archivio diventa uno strumento.'
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
			en: 'A Vinted spot told by the clothes you never wear.',
			it: 'Uno spot Vinted raccontato dai vestiti che non metti mai.'
		},
		description: {
			en: 'Vinted ads usually talk about the seller. This one sides with what’s left at the back of the wardrobe: the camera hides among the clothes and waits. Slightly ironic, slightly sad, like most wardrobes.',
			it: 'Le pubblicità di Vinted di solito parlano di chi vende. Questa sta dalla parte di ciò che resta in fondo all’armadio: la camera si nasconde tra i vestiti e aspetta. Un po’ ironica, un po’ malinconica, come la maggior parte degli armadi.'
		},
		challenge: {
			en: 'Standing out from seller-centred campaigns with the story of an object.',
			it: 'Distinguersi dalle campagne centrate sul venditore con la storia di un oggetto.'
		},
		solution: {
			en: 'Object POV, copy that’s half joke and half confession, and an edit that doesn’t overstay. Script to final cut.',
			it: 'Object POV, un copy metà battuta e metà confessione, e un montaggio che non si dilunga. Dallo script al montaggio finale.'
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
			en: 'A torn sheet, fans, sound and light. It breathes.',
			it: 'Un telo strappato, ventilatori, suono e luce. Respira.'
		},
		description: {
			en: 'An installation prototype about light getting through damage. A burnt, torn sheet hangs in the dark; fans driven by the music make it swell and collapse, and the light comes through the tears.',
			it: 'Un prototipo di installazione sulla luce che passa attraverso il danno. Un telo bruciato e strappato è appeso al buio; ventilatori pilotati dalla musica lo gonfiano e lo sgonfiano, e la luce passa dagli strappi.'
		},
		challenge: {
			en: 'Syncing an original score, the physical movement of the fabric and moving lights so that it reads as one body.',
			it: 'Sincronizzare musica originale, movimento fisico del telo e luci mobili in modo che sembrino un unico corpo.'
		},
		solution: {
			en: 'Ableton runs the score and sends MIDI cues; TouchDesigner drives the fans and the DMX moving heads in real time.',
			it: 'Ableton gestisce la musica e manda cue MIDI; TouchDesigner pilota in tempo reale ventilatori e teste mobili via DMX.'
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
			en: 'A concept campaign to sell an electric BMW M3 E30 to people who remember the original.',
			it: 'Una campagna concept per vendere una BMW M3 E30 elettrica a chi si ricorda l’originale.'
		},
		description: {
			en: 'A spec campaign built on “RE:” — re:ignite, re:discover, re:trace — and on the fact that nostalgia sells. The hub is a website: landing page, an animated 3D model of the car, a timeline and a sales page for a hypothetical electric re-edition.',
			it: 'Una campagna spec costruita su “RE:” (re:ignite, re:discover, re:trace) e sul fatto che la nostalgia vende. Il centro è un sito: landing, modello 3D animato dell’auto, timeline e pagina di vendita di un’ipotetica riedizione elettrica.'
		},
		challenge: {
			en: 'Selling an ’80s icon to today’s buyers without turning it into a museum piece — and keeping a 3D-heavy site fast.',
			it: 'Vendere un’icona anni ’80 a chi compra oggi senza farla diventare un pezzo da museo, e tenere veloce un sito pieno di 3D.'
		},
		solution: {
			en: 'Copy built on shared memories, a car rendered in Blender, a Svelte site, plus OOH and social cut-downs.',
			it: 'Copy costruito su ricordi comuni, auto renderizzata in Blender, sito in Svelte e declinazioni OOH e social.'
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
			en: 'Live visuals on a 25-metre wall at Videocittà 2024. Nature, people and a lot of glitch.',
			it: 'Visual live su una parete di 25 metri a Videocittà 2024. Natura, persone e parecchio glitch.'
		},
		description: {
			en: 'An audiovisual performance with Alice Felloni about our not-so-healthy relationship with nature. Footage cut at random and pushed until it breaks, set against sounds that don’t belong to it, to see what new meanings come out.',
			it: 'Una performance audiovisiva con Alice Felloni sul nostro rapporto non proprio sano con la natura. Footage montato a caso e spinto fino a rompersi, accostato a suoni che non gli appartengono, per vedere che significati nuovi saltano fuori.'
		},
		challenge: {
			en: 'Running generative, heavily processed visuals across 25 metres of wall, live, without anything crashing.',
			it: 'Far girare visual generativi e molto processati su 25 metri di parete, dal vivo, senza che nulla crashi.'
		},
		solution: {
			en: 'TouchDesigner for generation, Resolume Arena for blending and mapping, MIDI controllers to play it. And rehearsals.',
			it: 'TouchDesigner per la generazione, Resolume Arena per blending e mapping, controller MIDI per suonarlo. E prove.'
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
			en: 'An installation that only makes sense if you walk up to it.',
			it: 'Un’installazione che ha senso solo se ti avvicini.'
		},
		description: {
			en: 'From a distance you see an abstract texture. Step closer and it turns into a recognisable object. A small argument for slowing down and actually looking.',
			it: 'Da lontano vedi una texture astratta. Ti avvicini e diventa un oggetto riconoscibile. Un piccolo argomento a favore del rallentare e guardare davvero.'
		},
		challenge: {
			en: 'A smooth, stable transition tied to the viewer’s exact distance — no lag, no jumps.',
			it: 'Una transizione fluida e stabile legata alla distanza esatta dello spettatore, senza ritardi né salti.'
		},
		solution: {
			en: 'Ultrasonic sensors on Arduino feed TouchDesigner, which maps distance to a point in a pre-rendered transition. Framed screens or projectors, adaptable to any space.',
			it: 'Sensori a ultrasuoni su Arduino mandano i dati a TouchDesigner, che mappa la distanza su un punto di una transizione pre-renderizzata. Schermi incorniciati o proiettori, adattabili a ogni spazio.'
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
			en: 'A short film shot in one hour from four random words: hunt, voices, water, madness.',
			it: 'Un corto girato in un’ora partendo da quattro parole a caso: caccia, voci, acqua, follia.'
		},
		description: {
			en: 'A creative exercise with a stopwatch. A young man with schizophrenia wanders into a hunting reserve, and things go badly. Black and white, handheld, cut fast — partly by choice, partly because there was one hour.',
			it: 'Un esercizio creativo con il cronometro. Un ragazzo schizofrenico entra in una riserva di caccia e le cose vanno male. Bianco e nero, camera a mano, montaggio serrato: un po’ per scelta, un po’ perché c’era un’ora.'
		},
		challenge: {
			en: 'Making something coherent out of unrelated words, with almost no time.',
			it: 'Fare qualcosa di coerente da parole slegate, con quasi zero tempo.'
		},
		solution: {
			en: 'Turning the limits into style: handheld camera, rough black and white, fast cuts.',
			it: 'Trasformare i limiti in stile: camera a mano, bianco e nero grezzo, stacchi veloci.'
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
			en: 'An animated tribute to Pink Floyd’s track, cut obsessively to the beat.',
			it: 'Un tributo animato al brano dei Pink Floyd, montato in modo ossessivo sul ritmo.'
		},
		description: {
			en: 'Illustrator drawings animated in After Effects: flat shapes, repetition, difference blend modes and an edit that follows the music almost too closely.',
			it: 'Disegni in Illustrator animati in After Effects: forme piatte, ripetizioni, metodi di fusione in differenza e un montaggio che segue la musica quasi troppo da vicino.'
		},
		challenge: {
			en: 'Not illustrating the song literally, while keeping attention up for its full length.',
			it: 'Non illustrare il brano alla lettera, tenendo alta l’attenzione per tutta la durata.'
		},
		solution: {
			en: 'Few shapes, few colours, a lot of rhythm.',
			it: 'Poche forme, pochi colori, molto ritmo.'
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
			en: 'My own identity: logo, pictogram, colours, type and a few animations.',
			it: 'La mia identità: logo, pittogramma, colori, font e qualche animazione.'
		},
		description: {
			en: 'The brand you’re looking at. A wordmark made of slanted bars, a three-bar pictogram, black, yellow and green, and a few motion rules so it doesn’t just sit there. Think in ink.',
			it: 'Il brand che stai guardando. Un logotipo fatto di barre inclinate, un pittogramma a tre barre, nero, giallo e verde, e qualche regola di motion perché non stia lì fermo. Think in ink.'
		},
		challenge: {
			en: 'Being recognisable without shouting, and flexible enough for print, screens and motion.',
			it: 'Essere riconoscibile senza urlare, e abbastanza flessibile per stampa, schermi e motion.'
		},
		solution: {
			en: 'A strong wordmark, a simple pictogram and a small palette. Most of the work was taking things out.',
			it: 'Un logotipo forte, un pittogramma semplice e una palette ridotta. La maggior parte del lavoro è stata togliere.'
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
			en: 'Rome’s potholes, photographed as if they were moon craters. They kind of are.',
			it: 'Le buche di Roma fotografate come crateri lunari. In effetti un po’ lo sono.'
		},
		description: {
			en: 'A photo series and a printed book about the most Roman of landscapes: the pothole. Out of context, cracks and holes in the asphalt become craters and abstract surfaces. Laid out in InDesign, printed on proper paper.',
			it: 'Una serie fotografica e un libro stampato sul paesaggio più romano che ci sia: la buca. Fuori contesto, crepe e voragini nell’asfalto diventano crateri e superfici astratte. Impaginato in InDesign, stampato su carta come si deve.'
		},
		challenge: {
			en: 'Finding something worth looking at in something everyone curses.',
			it: 'Trovare qualcosa da guardare in una cosa che tutti maledicono.'
		},
		solution: {
			en: 'Treating each pothole as a landscape: framing, light, post. The book’s sequence does the rest.',
			it: 'Trattare ogni buca come un paesaggio: inquadratura, luce, post. La sequenza del libro fa il resto.'
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
			en: 'A marketplace for art and design made from reclaimed materials: brand, UX and a clickable prototype.',
			it: 'Un marketplace per arte e design fatti con materiali di recupero: brand, UX e prototipo cliccabile.'
		},
		description: {
			en: 'A platform for selling upcycled pieces and giving the people who make them some visibility. Brand identity, user journey and every screen prototyped in Figma.',
			it: 'Una piattaforma per vendere pezzi upcycled e dare un po’ di visibilità a chi li fa. Brand identity, user journey e tutte le schermate prototipate in Figma.'
		},
		challenge: {
			en: 'An interface that works for makers and buyers, and talks about sustainability without preaching.',
			it: 'Un’interfaccia che funzioni per chi crea e per chi compra, e che parli di sostenibilità senza fare la predica.'
		},
		solution: {
			en: 'Image first, simple navigation, and flows tested in Figma before anyone wrote a line of code.',
			it: 'Immagini prima di tutto, navigazione semplice e flussi testati in Figma prima che qualcuno scrivesse una riga di codice.'
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
