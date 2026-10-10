import { ScrollTrigger, prefersReduced } from './reveal';

/** Sección anclada (storytelling) + parallax ligero. */
export function initPinned(): () => void {
  if (prefersReduced()) return () => {};

  const cleanups: Array<() => void> = [];

  document.querySelectorAll<HTMLElement>('[data-pin]').forEach((stage) => {
    const steps = Array.from(stage.querySelectorAll<HTMLElement>('.pin-step'));
    if (!steps.length) return;
    steps.forEach((step, i) => {
      const t = ScrollTrigger.create({
        trigger: step,
        start: 'top 70%',
        end: 'bottom 45%',
        onToggle: (self) => step.classList.toggle('is-active', self.isActive),
      });
      if (i === 0) step.classList.add('is-active');
      cleanups.push(() => t.kill());
    });
  });

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 12);
    const t = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      animation: undefined,
      onUpdate: (self) => {
        const offset = (self.progress - 0.5) * amount * 2;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      },
    });
    cleanups.push(() => {
      t.kill();
      el.style.transform = '';
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
