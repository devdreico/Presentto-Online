import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from './reveal';

type Cleanup = () => void;

let cleanup: Cleanup | null = null;

export function initSmoothScroll(): Cleanup {
  if (prefersReduced()) return () => {};
  destroySmoothScroll();

  const lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
  });

  const onScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onScroll);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  cleanup = () => {
    gsap.ticker.remove(tick);
    lenis.off('scroll', onScroll);
    lenis.destroy();
    cleanup = null;
  };
  return cleanup;
}

export function destroySmoothScroll(): void {
  cleanup?.();
}
