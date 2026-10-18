// Tiny bilingual layer. `t(value)` accepts a plain string or an { en, it } object.
export const i18n = $state({ lang: 'en' });

// Language follows the URL: English at /..., Italian at /it/...
export function setLang(lang) {
	i18n.lang = lang;
	if (typeof document !== 'undefined') document.documentElement.lang = lang;
}

// Path without the language prefix ('/it/works' -> '/works').
export const basePath = (pathname) => pathname.replace(/^\/it(?=\/|$)/, '') || '/';

// Path for a given language ('/works', 'it' -> '/it/works').
export const pathFor = (path, lang = i18n.lang) => {
	const base = basePath(path);
	return lang === 'it' ? (base === '/' ? '/it' : `/it${base}`) : base;
};

// Shorthand for internal links in the current language.
export const href = (path) => pathFor(path);

export const t = (value) =>
	value && typeof value === 'object' ? (value[i18n.lang] ?? value.en) : value;

export const ui = {
	nav: {
		works: { en: 'Work', it: 'Lavori' },
		about: { en: 'About', it: 'Profilo' },
		contact: { en: 'Contact', it: 'Contatti' },
		menu: { en: 'Menu', it: 'Menu' },
		close: { en: 'Close', it: 'Chiudi' }
	},
	hero: {
		role: {
			en: 'Art Director & Creative Technologist',
			it: 'Art Director & Creative Technologist'
		},
		line: {
			en: 'I make films, photographs and installations, and try to make them well.',
			it: 'Faccio film, fotografie e installazioni, e cerco di farli bene.'
		},
		scroll: { en: 'Scroll', it: 'Scorri' },
		at: { en: 'Currently at', it: 'Attualmente in' }
	},
	intro: {
		en: 'I’m Riccardo, Art Director and Creative Technologist at Arsenale 23 in Rome. I work across direction, photography and technology, and I care about the craft behind each of them: preparation, light, editing, detail. I use AI where it helps the work.',
		it: 'Sono Riccardo, Art Director e Creative Technologist in Arsenale 23, a Roma. Lavoro tra regia, fotografia e tecnologia, e mi interessa il mestiere che c’è dietro a ognuna: la preparazione, la luce, il montaggio, i dettagli. Uso l’AI dove aiuta il lavoro.'
	},
	selected: { en: 'Selected work', it: 'Lavori selezionati' },
	allWork: { en: 'All work', it: 'Tutti i lavori' },
	view: { en: 'View', it: 'Guarda' },
	viewProject: { en: 'View project', it: 'Vedi progetto' },
	play: { en: 'Play', it: 'Play' },
	capabilities: { en: 'What I do', it: 'Cosa faccio' },
	services: [
		{
			title: { en: 'VFX Direction', it: 'Regia VFX' },
			text: {
				en: 'Planning and directing shots that combine live action and effects, from previs to final compositing.',
				it: 'Progettazione e regia di inquadrature che uniscono girato ed effetti, dalla previs al compositing.'
			}
		},
		{
			title: { en: 'AI Filmmaking', it: 'Regia AI' },
			text: {
				en: 'Generative video and images used within a normal production process: script, references, edit.',
				it: 'Video e immagini generative usati dentro un normale processo di produzione: sceneggiatura, reference, montaggio.'
			}
		},
		{
			title: { en: 'Art Direction', it: 'Art Direction' },
			text: {
				en: 'Concepts and visual direction for campaigns, films and spaces.',
				it: 'Concept e direzione visiva per campagne, film e spazi.'
			}
		},
		{
			title: { en: 'Creative Technology', it: 'Creative Technology' },
			text: {
				en: 'Immersive rooms, VR, installations and custom software. Also training for teams who want to use AI in their work.',
				it: 'Sale immersive, VR, installazioni e software su misura. Anche formazione per i team che vogliono usare l’AI nel lavoro.'
			}
		}
	],
	cta: {
		title: { en: 'Working on something?', it: 'Stai lavorando a qualcosa?' },
		button: { en: 'Write me', it: 'Scrivimi' }
	},
	footer: {
		based: { en: 'Based in Rome', it: 'Base a Roma' },
		top: { en: 'Back to top', it: 'Torna su' }
	},
	works: {
		title: { en: 'Work', it: 'Lavori' },
		intro: {
			en: 'Films, installations, campaigns and photographs, for clients and personal.',
			it: 'Film, installazioni, campagne e fotografie, per clienti e personali.'
		},
		all: { en: 'All', it: 'Tutti' },
		list: { en: 'List', it: 'Lista' },
		grid: { en: 'Grid', it: 'Griglia' },
		project: { en: 'Project', it: 'Progetto' },
		count: { en: 'projects', it: 'progetti' },
		client: { en: 'Client', it: 'Cliente' },
		discipline: { en: 'Discipline', it: 'Disciplina' },
		year: { en: 'Year', it: 'Anno' }
	},
	project: {
		role: { en: 'Role', it: 'Ruolo' },
		tools: { en: 'Tools', it: 'Strumenti' },
		overview: { en: 'The project', it: 'Il progetto' },
		challenge: { en: 'Context', it: 'Contesto' },
		approach: { en: 'Process', it: 'Processo' },
		highlights: { en: 'Details', it: 'Dettagli' },
		gallery: { en: 'Gallery', it: 'Galleria' },
		prototype: { en: 'Interactive prototype', it: 'Prototipo interattivo' },
		loadPrototype: { en: 'Load prototype', it: 'Carica prototipo' },
		next: { en: 'Next project', it: 'Prossimo progetto' },
		sound: { en: 'Sound on', it: 'Audio on' },
		mute: { en: 'Sound off', it: 'Audio off' }
	},
	about: {
		title: { en: 'About', it: 'Profilo' },
		statement: {
			en: 'I try to do things properly: understand the idea, prepare, and take care of every step.',
			it: 'Cerco di fare le cose per bene: capire l’idea, prepararmi e curare ogni passaggio.'
		},
		bio: [
			{
				en: 'I’m Art Director and Creative Technologist at Arsenale 23, a creative agency in Rome, where I follow projects from concept to delivery.',
				it: 'Sono Art Director e Creative Technologist in Arsenale 23, agenzia creativa a Roma, dove seguo i progetti dal concept alla consegna.'
			},
			{
				en: 'Lately I’ve been focusing on VFX and AI direction. I start from the basics of the trade — writing, light, framing, editing — and use generative tools where they help the idea.',
				it: 'Ultimamente mi sto concentrando sulla regia VFX e AI. Parto dalle basi del mestiere (scrittura, luce, inquadratura, montaggio) e uso gli strumenti generativi dove aiutano l’idea.'
			},
			{
				en: 'At the moment I’m working on an immersive film for four LED walls in a museum room, an immersive VR film for Eni, custom software for companies and AI training for teams.',
				it: 'In questo periodo lavoro a un video immersivo per quattro ledwall nella sala di un museo, a un video VR per Eni, a software su misura per aziende e a percorsi di formazione sull’AI per i team.'
			},
			{
				en: 'Also: a degree in Media Design and New Technologies for Art at IED Rome (110/110), the live performance of Érotiq at Romaeuropa Festival 2025, a six-month Art Director internship at Intertouch, live visuals for Videocittà 2024 and Spazio900, and a few installations.',
				it: 'Inoltre: laurea in Media Design e Nuove Tecnologie per l’Arte allo IED di Roma (110/110), la performance live di Érotiq al Romaeuropa Festival 2025, sei mesi di stage come Art Director in Intertouch, visual live per Videocittà 2024 e Spazio900, e alcune installazioni.'
			}
		],
		now: { en: 'Now', it: 'Oggi' },
		experience: { en: 'Experience', it: 'Esperienza' },
		toolkit: { en: 'Toolkit', it: 'Strumenti' },
		focus: { en: 'Focus', it: 'Focus' }
	},
	contact: {
		title: { en: 'Write me.', it: 'Scrivimi.' },
		text: {
			en: 'For projects or collaborations. I usually reply within a couple of days.',
			it: 'Per progetti o collaborazioni. Di solito rispondo in un paio di giorni.'
		},
		copy: { en: 'Copy email', it: 'Copia email' },
		copied: { en: 'Copied', it: 'Copiata' },
		social: { en: 'Social', it: 'Social' },
		location: { en: 'Location', it: 'Dove' },
		available: { en: 'Taking on projects', it: 'Disponibile per progetti' }
	},
	seo: {
		home: {
			title: {
				en: 'Riccardo Pichi (RXINK) — Art Director & Creative Technologist in Rome',
				it: 'Riccardo Pichi (RXINK) — Art Director e Creative Technologist a Roma'
			},
			description: {
				en: 'Portfolio of Riccardo Pichi (RXINK, rxink.png), Art Director and Creative Technologist at Arsenale 23 in Rome. VFX and AI film direction, photography, immersive installations and creative technology. IED Rome graduate.',
				it: 'Portfolio di Riccardo Pichi (RXINK, rxink.png), Art Director e Creative Technologist in Arsenale 23 a Roma. Regia VFX e AI, fotografia, installazioni immersive e creative technology. Laureato allo IED di Roma.'
			},
			h1: {
				en: 'Riccardo Pichi (RXINK) — Art Director and Creative Technologist in Rome',
				it: 'Riccardo Pichi (RXINK) — Art Director e Creative Technologist a Roma'
			}
		},
		works: {
			title: { en: 'Work — Riccardo Pichi | RXINK', it: 'Lavori — Riccardo Pichi | RXINK' },
			description: {
				en: 'Projects by Riccardo Pichi (RXINK): films, VFX and AI direction, installations, campaigns, photography and brand identities.',
				it: 'Progetti di Riccardo Pichi (RXINK): film, regia VFX e AI, installazioni, campagne, fotografia e brand identity.'
			}
		},
		about: {
			title: {
				en: 'About Riccardo Pichi — Art Director & Creative Technologist | RXINK',
				it: 'Profilo di Riccardo Pichi — Art Director e Creative Technologist | RXINK'
			},
			description: {
				en: 'Riccardo Pichi (RXINK, rikipiki) is an Art Director and Creative Technologist at Arsenale 23 in Rome, focused on VFX and AI direction. Media Design graduate from IED Rome.',
				it: 'Riccardo Pichi (RXINK, rikipiki) è Art Director e Creative Technologist in Arsenale 23 a Roma, con un focus sulla regia VFX e AI. Laureato in Media Design allo IED di Roma.'
			}
		},
		contact: {
			title: { en: 'Contact — Riccardo Pichi | RXINK', it: 'Contatti — Riccardo Pichi | RXINK' },
			description: {
				en: 'Contact Riccardo Pichi, Art Director and Creative Technologist in Rome, for direction, VFX, AI film and creative technology projects.',
				it: 'Contatta Riccardo Pichi, Art Director e Creative Technologist a Roma, per progetti di regia, VFX, AI e creative technology.'
			}
		},
		byline: {
			en: 'Riccardo Pichi, Art Director & Creative Technologist',
			it: 'Riccardo Pichi, Art Director e Creative Technologist'
		}
	},
	notFound: {
		title: { en: 'Page not found.', it: 'Pagina non trovata.' },
		back: { en: 'Back home', it: 'Torna alla home' }
	}
};

export const site = {
	// Public address of the site: keep in sync with SITE_URL in svelte.config.js.
	url: 'https://portfolio-liard-delta-52.vercel.app',
	name: 'Riccardo Pichi',
	aka: ['RXINK', 'rxink.png', 'rikipiki', 'rink'],
	brand: 'RXINK',
	email: 'rxink.designer@gmail.com',
	city: 'Rome, IT',
	agency: { name: 'Arsenale 23', url: 'https://www.arsenale23.com' },
	socials: [
		{ label: 'Instagram', url: 'https://www.instagram.com/rxink.png/' },
		{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/riccardopichi/' },
		{ label: 'GitHub', url: 'https://github.com/RxInKvision' }
	]
};
