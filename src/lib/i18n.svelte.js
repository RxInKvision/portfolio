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
			en: 'Directing VFX and AI-driven films where craft, code and imagination meet.',
			it: 'Regia di film VFX e AI, dove mestiere, codice e immaginazione si incontrano.'
		},
		scroll: { en: 'Scroll to explore', it: 'Scorri per esplorare' },
		at: { en: 'Currently at', it: 'Attualmente in' }
	},
	intro: {
		en: 'I’m Riccardo Pichi, an Art Director and Creative Technologist based in Rome. I direct images that live between the real and the synthetic — VFX, AI filmmaking and interactive experiences built to be felt.',
		it: 'Sono Riccardo Pichi, Art Director e Creative Technologist a Roma. Dirigo immagini che vivono tra il reale e il sintetico: VFX, AI filmmaking ed esperienze interattive costruite per essere sentite.'
	},
	selected: { en: 'Selected work', it: 'Lavori selezionati' },
	allWork: { en: 'All work', it: 'Tutti i lavori' },
	view: { en: 'View', it: 'Guarda' },
	viewProject: { en: 'View project', it: 'Vedi progetto' },
	play: { en: 'Play', it: 'Play' },
	capabilities: { en: 'Capabilities', it: 'Competenze' },
	services: [
		{
			title: { en: 'VFX Direction', it: 'Regia VFX' },
			text: {
				en: 'From previs to final comp: directing shots where practical footage and digital effects become one seamless image.',
				it: "Dalla previs al compositing finale: regia di inquadrature in cui girato e effetti digitali diventano un'unica immagine."
			}
		},
		{
			title: { en: 'AI Filmmaking', it: 'Regia AI' },
			text: {
				en: 'Generative video and image pipelines, directed with intent — art direction, consistency and story first, tools second.',
				it: 'Pipeline generative per video e immagini, dirette con intenzione: prima art direction, coerenza e racconto, poi gli strumenti.'
			}
		},
		{
			title: { en: 'Art Direction', it: 'Art Direction' },
			text: {
				en: 'Concepts, visual languages and campaigns across film, digital and physical touchpoints.',
				it: 'Concept, linguaggi visivi e campagne attraverso film, digitale e touchpoint fisici.'
			}
		},
		{
			title: { en: 'Creative Technology', it: 'Creative Technology' },
			text: {
				en: 'Immersive LED and VR experiences, real-time visuals, installations and custom software for companies — plus tutoring to bring AI into everyday workflows.',
				it: 'Esperienze immersive su ledwall e in VR, visual in tempo reale, installazioni e software su misura per aziende, oltre al tutoring per portare l’AI nei flussi di lavoro.'
			}
		}
	],
	cta: {
		title: { en: 'Have a story worth directing?', it: 'Hai una storia da dirigere?' },
		button: { en: 'Let’s talk', it: 'Parliamone' }
	},
	footer: {
		based: { en: 'Based in Rome, working worldwide', it: 'Base a Roma, lavoro ovunque' },
		top: { en: 'Back to top', it: 'Torna su' }
	},
	works: {
		title: { en: 'Work', it: 'Lavori' },
		intro: {
			en: 'Films, installations, campaigns and identities — a selection of projects from 2023 to today.',
			it: 'Film, installazioni, campagne e identità: una selezione di progetti dal 2023 a oggi.'
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
		overview: { en: 'Overview', it: 'Overview' },
		challenge: { en: 'Challenge', it: 'Sfida' },
		approach: { en: 'Approach', it: 'Approccio' },
		highlights: { en: 'Highlights', it: 'Punti chiave' },
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
			en: 'I design and direct images that blur the line between what was filmed and what was made. Craft, code and curiosity — in that order.',
			it: 'Progetto e dirigo immagini che sfumano il confine tra ciò che è stato girato e ciò che è stato creato. Mestiere, codice e curiosità, in quest’ordine.'
		},
		bio: [
			{
				en: 'I’m Art Director and Creative Technologist at Arsenale 23, a creative agency in Rome. There I lead concepts from the first idea to the final frame, bridging creative direction and the technology needed to build it.',
				it: 'Sono Art Director e Creative Technologist in Arsenale 23, agenzia creativa a Roma. Lì guido i concept dalla prima idea all’ultimo frame, facendo da ponte tra direzione creativa e tecnologia necessaria a realizzarli.'
			},
			{
				en: 'My focus today is VFX direction and AI filmmaking: building pipelines where live action, 3D and generative tools serve one clear vision — with the same care for light, rhythm and story you’d expect from traditional film.',
				it: 'Oggi mi sto specializzando nella regia VFX e nella regia AI: costruisco pipeline in cui riprese dal vero, 3D e strumenti generativi servono un’unica visione, con la stessa cura per luce, ritmo e racconto del cinema tradizionale.'
			},
			{
				en: 'Right now I’m creating immersive multimedia experiences — a room-scale immersive film across four LED walls for a museum, and an immersive VR film for Eni. I also design and code custom tools and software for large companies, and run tutoring sessions that help people bring AI into their everyday workflows.',
				it: 'In questo momento sto creando esperienze multimediali immersive: un video immersivo su quattro ledwall in una sala per un museo e un video immersivo in VR per Eni. Progetto e sviluppo inoltre tool e software su misura per grandi aziende, e faccio tutoring per aiutare le persone a integrare l’AI nei propri flussi di lavoro.'
			},
			{
				en: 'I graduated with full marks (110/110) in Media Design and New Technologies for Art at IED Rome. Along the way I curated the live performance of Érotiq at Romaeuropa Festival 2025, spent six months as Art Director intern at the digital retail company Intertouch, performed live audio-reactive visuals for Videocittà 2024 and Spazio900, and built installations where space, sound and image become a single experience.',
				it: 'Mi sono laureato con 110/110 in Media Design e Nuove Tecnologie per l’Arte allo IED di Roma. Nel mio percorso ho curato la performance live di Érotiq al Romaeuropa Festival 2025, ho fatto uno stage di sei mesi come Art Director in Intertouch, azienda di digital retail, ho performato visual audio-reattivi live per Videocittà 2024 e Spazio900, e ho costruito installazioni in cui spazio, suono e immagine diventano un’unica esperienza.'
			}
		],
		now: { en: 'Now', it: 'Oggi' },
		experience: { en: 'Experience', it: 'Esperienza' },
		toolkit: { en: 'Toolkit', it: 'Strumenti' },
		focus: { en: 'Focus', it: 'Focus' }
	},
	contact: {
		title: { en: 'Let’s make something unreal.', it: 'Facciamo qualcosa di irreale.' },
		text: {
			en: 'For commissions, collaborations or just to say hi — write me. I usually reply within 48 hours.',
			it: 'Per progetti, collaborazioni o anche solo per un saluto, scrivimi. Di solito rispondo entro 48 ore.'
		},
		copy: { en: 'Copy email', it: 'Copia email' },
		copied: { en: 'Copied', it: 'Copiata' },
		social: { en: 'Social', it: 'Social' },
		location: { en: 'Location', it: 'Dove' },
		available: { en: 'Open to new projects', it: 'Disponibile per nuovi progetti' }
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
