// Every page is static: prerender the whole site at build time.
export const prerender = true;
export const trailingSlash = 'never';

// English lives at /, Italian at /it. The language comes from the URL so both are indexable.
export const load = ({ params }) => ({ lang: params.lang === 'it' ? 'it' : 'en' });
