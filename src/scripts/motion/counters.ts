import { gsap, ScrollTrigger, prefersReduced } from './reveal';

/** Contadores animados: <strong data-count="15000" data-prefix="$"> */
export function initCounters(): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!els.length) return () => {};

  const format = (el: HTMLElement, value: number) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = Number(el.dataset.decimals || 0);
    const body = value.toLocaleString('es-CO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    el.textContent = `${prefix}${body}${suffix}`;
  };

  if (prefersReduced()) {
    els.forEach((el) => format(el, Number(el.dataset.count)));
    return () => {};
  }

  const triggers = els.map((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    format(el, 0);
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => format(el, obj.v),
    });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tween.play(),
    });
    return { trigger, tween };
  });

  return () => {
    triggers.forEach(({ trigger, tween }) => {
      trigger.kill();
      tween.kill();
    });
  };
}
