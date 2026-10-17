import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const browser = typeof window !== 'undefined';
if (browser) gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

// `ready` flips to true when the preloader / page curtain uncovers the page.
// Pages wait for it before playing their intro.
export const app = $state({ ready: false, menuOpen: false, firstLoad: true });

// Resolves once the page is uncovered (after preloader or page curtain).
let waiters = [];
export function setReady(value) {
	app.ready = value;
	if (value) {
		waiters.forEach((resolve) => resolve());
		waiters = [];
	}
}
export function whenReady() {
	return app.ready ? Promise.resolve() : new Promise((resolve) => waiters.push(resolve));
}

export const reducedMotion = () =>
	browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => browser && window.matchMedia('(pointer: fine)').matches;

let lenis;
export function initScroll() {
	if (reducedMotion()) return null;
	lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
	return lenis;
}
export const getLenis = () => lenis;
export function scrollTo(target, opts = {}) {
	if (lenis) lenis.scrollTo(target, { duration: 1.4, ...opts });
	else if (typeof target === 'number')
		window.scrollTo({ top: target, behavior: opts.immediate ? 'instant' : 'smooth' });
	else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
export function lockScroll(lock) {
	if (lenis) lock ? lenis.stop() : lenis.start();
	document.documentElement.style.overflow = lock ? 'hidden' : '';
}

/* ───────────── Svelte actions ───────────── */

// Fade/slide in once when the element enters the viewport.
export function reveal(node, { y = 40, delay = 0, duration = 1.2, start = 'top 88%' } = {}) {
	node.setAttribute('data-reveal', '');
	if (reducedMotion()) {
		gsap.set(node, { opacity: 1 });
		return;
	}
	const tween = gsap.fromTo(
		node,
		{ opacity: 0, y },
		{
			opacity: 1,
			y: 0,
			duration,
			delay,
			ease: 'expo.out',
			scrollTrigger: { trigger: node, start, once: true }
		}
	);
	return { destroy: () => tween.scrollTrigger?.kill() };
}

// Split text into masked lines that slide up on enter (or immediately when `immediate`).
export function splitLines(
	node,
	{ delay = 0, stagger = 0.08, start = 'top 90%', immediate = false } = {}
) {
	node.setAttribute('data-reveal', '');
	if (reducedMotion()) {
		gsap.set(node, { opacity: 1 });
		return;
	}
	let split, tween, trigger;
	const build = () => {
		split = SplitText.create(node, { type: 'lines', mask: 'lines', linesClass: 'line-inner' });
		gsap.set(node, { opacity: 1 });
		tween = gsap.from(split.lines, {
			yPercent: 110,
			duration: 1.3,
			ease: 'expo.out',
			stagger,
			delay,
			paused: true
		});
		if (immediate) tween.play();
		else
			trigger = ScrollTrigger.create({
				trigger: node,
				start,
				once: true,
				onEnter: () => tween.play()
			});
	};
	let alive = true;
	Promise.all([document.fonts.ready, immediate ? whenReady() : null]).then(() => alive && build());
	return {
		destroy() {
			alive = false;
			trigger?.kill();
			tween?.kill();
			split?.revert();
		}
	};
}

// Image/video inner parallax: the child moves slower than the frame.
export function parallax(node, { amount = 12 } = {}) {
	if (reducedMotion()) return;
	const target = node.firstElementChild;
	if (!target) return;
	gsap.set(target, { scale: 1 + amount / 50 });
	const tween = gsap.fromTo(
		target,
		{ yPercent: -amount / 2 },
		{
			yPercent: amount / 2,
			ease: 'none',
			scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true }
		}
	);
	return { destroy: () => (tween.scrollTrigger?.kill(), tween.kill()) };
}

// Clip-path wipe reveal for media frames.
export function clipReveal(node, { delay = 0, from = 'bottom' } = {}) {
	if (reducedMotion()) return;
	const clip = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
	const tween = gsap.fromTo(
		node,
		{ clipPath: clip },
		{
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: 1.6,
			delay,
			ease: 'expo.inOut',
			scrollTrigger: { trigger: node, start: 'top 92%', once: true }
		}
	);
	return { destroy: () => tween.scrollTrigger?.kill() };
}

// Magnetic hover for buttons (fine pointers only).
export function magnetic(node, { strength = 0.35 } = {}) {
	if (!finePointer() || reducedMotion()) return;
	const xTo = gsap.quickTo(node, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
	const yTo = gsap.quickTo(node, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
	const move = (e) => {
		const r = node.getBoundingClientRect();
		xTo((e.clientX - r.left - r.width / 2) * strength);
		yTo((e.clientY - r.top - r.height / 2) * strength);
	};
	const leave = () => (xTo(0), yTo(0));
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}

// Play muted videos only while visible (saves battery and bandwidth).
export function autoplay(node) {
	const io = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) node.play().catch(() => {});
			else node.pause();
		},
		{ rootMargin: '100px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}
