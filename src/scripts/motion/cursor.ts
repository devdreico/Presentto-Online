import { isFinePointer, prefersReduced } from './reveal';

/** Cursor custom + botones magnéticos (solo puntero fino, sin reduced motion). */
export function initCursor(): () => void {
  if (!isFinePointer() || prefersReduced()) return () => {};

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -100;
  let my = -100;
  let rx = -100;
  let ry = -100;
  let raf = 0;

  const onMove = (e: PointerEvent) => {
    mx = e.clientX;
    my = e.clientY;
    document.documentElement.classList.add('cursor-active');
  };
  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null;
    const interactive = t?.closest?.('a, button, [data-cursor], summary, input, select, textarea');
    document.documentElement.classList.toggle('cursor-hover', Boolean(interactive));
  };
  const loop = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate3d(${mx - 3.5}px, ${my - 3.5}px, 0)`;
    ring.style.transform = `translate3d(${rx - ring.offsetWidth / 2}px, ${ry - ring.offsetHeight / 2}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerover', onOver, { passive: true });
  raf = requestAnimationFrame(loop);

  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerover', onOver);
    cancelAnimationFrame(raf);
    dot.remove();
    ring.remove();
    document.documentElement.classList.remove('cursor-active', 'cursor-hover');
  };
}

/** Botones magnéticos: [data-magnetic] */
export function initMagnetic(): () => void {
  if (!isFinePointer() || prefersReduced()) return () => {};

  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
  const cleanups: Array<() => void> = [];

  els.forEach((el) => {
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
    };
    const onLeave = () => {
      el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      el.style.transform = '';
      window.setTimeout(() => {
        el.style.transition = '';
      }, 500);
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
