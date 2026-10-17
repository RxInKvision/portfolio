import { error } from '@sveltejs/kit';
import { projects, getProject, nextProject } from '$lib/data/projects.js';

export const entries = () => projects.map((p) => ({ slug: p.slug }));

export function load({ params }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Not found');
	return { project, next: nextProject(params.slug) };
}
