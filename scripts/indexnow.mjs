// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver…) that pages changed.
// Run after a deploy: npm run indexnow
const KEY = 'e9fc3f522d21f9ff8d4ec3c5b86871c6';
const HOST = 'riccardopichi.com';

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList })
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs`);
