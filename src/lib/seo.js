// Structured data (schema.org JSON-LD) so search engines understand who the site is about.
import { site } from './i18n.svelte.js';

const ld = (data) =>
	`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const person = {
	'@type': 'Person',
	'@id': `${site.url}/#person`,
	name: site.name,
	givenName: 'Riccardo',
	familyName: 'Pichi',
	alternateName: site.aka,
	url: site.url,
	image: `${site.url}/media/profile/riccardo-pichi-portrait.webp`,
	email: `mailto:${site.email}`,
	jobTitle: ['Art Director', 'Creative Technologist'],
	description:
		'Art Director and Creative Technologist at Arsenale 23 in Rome. VFX and AI film direction, photography, immersive installations and creative technology.',
	worksFor: { '@type': 'Organization', name: site.agency.name, url: site.agency.url },
	alumniOf: {
		'@type': 'CollegeOrUniversity',
		name: 'IED Istituto Europeo di Design — Roma',
		url: 'https://www.ied.it/sedi/roma'
	},
	address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' },
	knowsLanguage: ['it', 'en'],
	knowsAbout: [
		'Art Direction',
		'Creative Technology',
		'VFX direction',
		'AI filmmaking',
		'Generative video',
		'Film direction',
		'Video editing',
		'Photography',
		'Interactive installations',
		'Immersive experiences',
		'Virtual reality',
		'Projection mapping',
		'Live visuals',
		'TouchDesigner',
		'Motion design',
		'Brand identity'
	],
	sameAs: site.socials.map((s) => s.url)
};

const website = {
	'@type': 'WebSite',
	'@id': `${site.url}/#website`,
	url: site.url,
	name: 'RXINK — Riccardo Pichi',
	alternateName: ['rxink', 'Riccardo Pichi portfolio'],
	inLanguage: ['en', 'it'],
	publisher: { '@id': `${site.url}/#person` }
};

export const personJsonLd = () =>
	ld({ '@context': 'https://schema.org', '@graph': [person, website] });

// One project page: a creative work by Riccardo Pichi.
export function projectJsonLd(p, url, lang) {
	const tr = (v) => (v && typeof v === 'object' ? (v[lang] ?? v.en) : v);
	const isPhoto = p.disciplines.includes('photo');
	return ld({
		'@context': 'https://schema.org',
		'@type': isPhoto ? 'ImageGallery' : 'CreativeWork',
		name: p.title,
		headline: p.title,
		description: tr(p.summary),
		url,
		image: `${site.url}/media/${p.cover}.webp`,
		dateCreated: String(p.year),
		inLanguage: lang,
		genre: p.disciplines,
		keywords: [...(p.tools ?? []), ...p.disciplines].join(', '),
		creator: { '@id': `${site.url}/#person` },
		author: { '@id': `${site.url}/#person` }
	});
}
