// Sets <html lang> per page (also during prerender).
export const handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.params.lang === 'it' ? 'it' : 'en')
	});
