import { getWorkById } from '$lib/works-data';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const work = getWorkById(params.slug);

    if (!work) {
        throw error(404, {
            message: 'Work not found'
        });
    }

    return {
        work
    };
}