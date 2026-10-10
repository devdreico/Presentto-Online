import { isFinePointer, prefersReduced } from './reveal';

/** Glow que sigue al puntero en tarjetas + tilt 3D opcional ([data-tilt]). */
export function initTilt(): () => void {
  if (!isFinePointer() || prefersReduced()) return () => {};

  const glowEls = Array.from(
    document.querySelectorAll<HTMLElement>('.card, .bento-card, .plan-card, .client-card, .showcase-card'),
  );
  const tiltEls = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
  const cleanups: Array<() => void> = [];

  glowEls.forEach((el) => {
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener('pointermove', onMove);
    cleanups.push(() => el.removeEventListener('pointermove', onMove));
  });

  tiltEls.forEach((el) => {
    const strength = Number(el.dataset.tilt || 7);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
      el.style.transform = '';
      window.setTimeout(() => {
        el.style.transition = '';
      }, 620);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
