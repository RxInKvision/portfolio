// Tiny bilingual layer. `t(value)` accepts a plain string or an { en, it } object.
export const i18n = $state({ lang: 'en' });

export function setLang(lang) {
	i18n.lang = lang;
	if (typeof document !== 'undefined') {
		document.documentElement.lang = lang;
		document.documentElement.dataset.lang = lang;
		try {
			localStorage.setItem('rxink-lang', lang);
		} catch {}
	}
}

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
			en: 'I make images. Mostly with a camera, now and then with AI — when it actually helps.',
			it: 'Faccio immagini. Quasi sempre con una camera, ogni tanto con l’AI, quando serve davvero.'
		},
		scroll: { en: 'Scroll', it: 'Scorri' },
		at: { en: 'Currently at', it: 'Attualmente in' }
	},
	intro: {
		en: 'I’m Riccardo, Art Director and Creative Technologist at Arsenale 23, in Rome. I like real cameras, old techniques and things done by hand. I use new tools too, AI included, as long as they serve an idea instead of replacing it.',
		it: 'Sono Riccardo, Art Director e Creative Technologist in Arsenale 23, a Roma. Mi piacciono le camere vere, le tecniche vecchie e le cose fatte a mano. Uso anche gli strumenti nuovi, AI compresa, finché servono a un’idea invece di sostituirla.'
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
				en: 'Shots where what was filmed and what was added hold together. Ideally, nobody notices.',
				it: 'Inquadrature in cui girato ed effetti stanno in piedi insieme. Idealmente, nessuno se ne accorge.'
			}
		},
		{
			title: { en: 'AI Filmmaking', it: 'Regia AI' },
			text: {
				en: 'AI as one tool in the kit, next to the camera and the edit. Good for research and for what you can’t shoot. Not a substitute for having something to say.',
				it: 'L’AI come uno strumento tra gli altri, accanto alla camera e al montaggio. Utile per la ricerca e per quello che non si può girare. Non sostituisce l’avere qualcosa da dire.'
			}
		},
		{
			title: { en: 'Art Direction', it: 'Art Direction' },
			text: {
				en: 'Concepts and visual languages for campaigns, films and spaces. Fewer adjectives, more decisions.',
				it: 'Concept e linguaggi visivi per campagne, film e spazi. Meno aggettivi, più scelte.'
			}
		},
		{
			title: { en: 'Creative Technology', it: 'Creative Technology' },
			text: {
				en: 'Immersive rooms, VR, installations and custom software for companies. Plus tutoring for people who want to use AI without being used by it.',
				it: 'Sale immersive, VR, installazioni e software su misura per aziende. Più tutoring per chi vuole usare l’AI senza farsi usare.'
			}
		}
	],
	cta: {
		title: { en: 'Something worth making?', it: 'Qualcosa che valga la pena fare?' },
		button: { en: 'Write me', it: 'Scrivimi' }
	},
	footer: {
		based: { en: 'Rome. Happy to travel.', it: 'Roma. Volentieri in trasferta.' },
		top: { en: 'Back to top', it: 'Torna su' }
	},
	works: {
		title: { en: 'Work', it: 'Lavori' },
		intro: {
			en: 'Films, installations, campaigns and photographs. Some for clients, some for myself.',
			it: 'Film, installazioni, campagne e fotografie. Alcuni per clienti, altri per me.'
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
		overview: { en: 'What it is', it: 'Cos’è' },
		challenge: { en: 'The problem', it: 'Il problema' },
		approach: { en: 'How', it: 'Come' },
		highlights: { en: 'In short', it: 'In breve' },
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
			en: 'Old techniques and new tools, in that order. What matters is the image, not how it was made.',
			it: 'Tecniche vecchie e strumenti nuovi, in quest’ordine. Conta l’immagine, non come è stata fatta.'
		},
		bio: [
			{
				en: 'I’m Art Director and Creative Technologist at Arsenale 23, a creative agency in Rome. In practice: I come up with ideas, then work out how to actually build them.',
				it: 'Sono Art Director e Creative Technologist in Arsenale 23, agenzia creativa a Roma. In pratica: penso le idee e poi capisco come realizzarle davvero.'
			},
			{
				en: 'I’m focusing on VFX and AI direction. I love traditional techniques — real cameras, real light, a proper edit — and that’s where I start. AI is useful for research and for what you can’t shoot, as long as there’s a message behind it. On its own it’s just a very expensive screensaver.',
				it: 'Mi sto concentrando sulla regia VFX e AI. Amo le tecniche tradizionali (camere vere, luce vera, un montaggio fatto bene) ed è da lì che parto. L’AI è utile per la ricerca e per quello che non si può girare, purché dietro ci sia un messaggio. Da sola è un salvaschermo molto costoso.'
			},
			{
				en: 'Right now: an immersive film across four LED walls for a museum, an immersive VR film for Eni, custom tools for companies, and tutoring for teams who want to bring AI into their work without losing their minds.',
				it: 'In questo momento: un video immersivo su quattro ledwall per un museo, un video VR per Eni, tool su misura per aziende e tutoring per chi vuole portare l’AI nel lavoro senza perdere la testa.'
			},
			{
				en: 'Along the way: a degree in Media Design and New Technologies for Art at IED Rome (110/110), the live performance of Érotiq at Romaeuropa Festival 2025, six months as Art Director intern at Intertouch, live visuals for Videocittà 2024 and Spazio900, and a few installations.',
				it: 'Strada facendo: una laurea in Media Design e Nuove Tecnologie per l’Arte allo IED di Roma (110/110), la performance live di Érotiq al Romaeuropa Festival 2025, sei mesi di stage come Art Director in Intertouch, visual live per Videocittà 2024 e Spazio900, e qualche installazione.'
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
			en: 'Projects, collaborations or just a question. I usually answer within a couple of days.',
			it: 'Progetti, collaborazioni o anche solo una domanda. Di solito rispondo in un paio di giorni.'
		},
		copy: { en: 'Copy email', it: 'Copia email' },
		copied: { en: 'Copied', it: 'Copiata' },
		social: { en: 'Social', it: 'Social' },
		location: { en: 'Location', it: 'Dove' },
		available: { en: 'Taking on projects', it: 'Disponibile per progetti' }
	},
	notFound: {
		title: { en: 'Lost in the edit.', it: 'Perso al montaggio.' },
		back: { en: 'Back home', it: 'Torna alla home' }
	}
};

export const site = {
	name: 'Riccardo Pichi',
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
