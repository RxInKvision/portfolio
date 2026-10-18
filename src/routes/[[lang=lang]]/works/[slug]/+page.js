import { error } from '@sveltejs/kit';
import { projects, getProject, nextProject } from '$lib/data/projects.js';

export const entries = () =>
	projects.flatMap((p) => [{ slug: p.slug }, { slug: p.slug, lang: 'it' }]);

export function load({ params }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Not found');
	return { project, next: nextProject(params.slug) };
}
