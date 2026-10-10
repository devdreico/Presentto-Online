import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Limpia y observa elementos reveal con stagger por contenedor. */
export function initReveals(): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal, [data-reveal]'));
  if (!els.length) return () => {};

  els.forEach((el) => {
    const parent = el.parentElement;
    if (parent && parent.hasAttribute('data-stagger')) {
      const siblings = Array.from(parent.children).filter((c) =>
        c.classList.contains('reveal') || c.hasAttribute('data-reveal'),
      );
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.setProperty('--d', `${Math.min(idx * 80, 400)}ms`);
    }
  });

  if (prefersReduced() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
