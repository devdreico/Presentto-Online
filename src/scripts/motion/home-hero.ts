import { gsap, prefersReduced } from './reveal';

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
  width: number;
}

function initOrangeRain(canvas: HTMLCanvasElement, reduced: boolean): () => void {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return () => {};

  const angle = (75 * Math.PI) / 180;
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  let width = 0;
  let height = 0;
  let drops: Raindrop[] = [];
  let frame = 0;
  let lastTime = 0;
  let inView = false;

  const makeDrop = (randomY = true): Raindrop => ({
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -Math.random() * 80,
    speed: 150 + Math.random() * 260,
    length: 10 + Math.random() * 22,
    alpha: 0.12 + Math.random() * 0.24,
    width: 0.6 + Math.random() * 0.8,
  });

  const paint = (delta: number) => {
    context.clearRect(0, 0, width, height);
    drops.forEach((drop) => {
      if (delta > 0) {
        drop.x += directionX * drop.speed * delta;
        drop.y += directionY * drop.speed * delta;
        if (drop.y - directionY * drop.length > height || drop.x - directionX * drop.length > width) {
          Object.assign(drop, makeDrop(false));
        }
      }

      context.beginPath();
      context.moveTo(drop.x, drop.y);
      context.lineTo(drop.x - directionX * drop.length, drop.y - directionY * drop.length);
      context.strokeStyle = `rgba(241, 90, 36, ${drop.alpha})`;
      context.lineWidth = drop.width;
      context.stroke();
    });
  };

  const tick = (time: number) => {
    frame = 0;
    if (!inView || document.hidden) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 0;
    lastTime = time;
    paint(delta);
    frame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (!reduced && inView && !document.hidden && !frame) {
      lastTime = 0;
      frame = window.requestAnimationFrame(tick);
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(96, Math.max(28, Math.round((width * height) / 14500)));
    drops = Array.from({ length: count }, () => makeDrop());
    paint(0);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  window.addEventListener('resize', resize);
  resize();

  const visibilityObserver = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    if (inView) start();
    else {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }
  });
  visibilityObserver.observe(canvas);

  const onVisibilityChange = () => {
    if (document.hidden) {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else start();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

export function initHomeHero(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-home-scroll]');
  const header = document.querySelector<HTMLElement>('[data-home-header]');
  if (!hero) return () => {};

  const reduced = prefersReduced();
  const rainCanvas = hero.querySelector<HTMLCanvasElement>('[data-home-rain]');
  const stopRain = rainCanvas ? initOrangeRain(rainCanvas, reduced) : () => {};
  if (!header || reduced) return stopRain;

  const brand = hero.querySelector<HTMLElement>('[data-home-brand]');
  const cue = hero.querySelector<HTMLElement>('[data-home-cue]');
  const lead = hero.querySelector<HTMLElement>('[data-home-lead]');
  const tail = hero.querySelector<HTMLElement>('[data-home-tail]');
  const actions = hero.querySelector<HTMLElement>('[data-home-actions]');
  const device = hero.querySelector<HTMLElement>('[data-home-device]');
  const leadWords = gsap.utils.toArray<HTMLElement>('[data-home-lead] .home-hero-word');
  const tailWords = gsap.utils.toArray<HTMLElement>('[data-home-tail] .home-hero-word');
  if (!brand || !cue || !lead || !tail || !actions || !device || !leadWords.length || !tailWords.length) {
    return () => {};
  }

  const root = document.documentElement;
  const previousInert = header.inert;
  const previousAriaHidden = header.getAttribute('aria-hidden');
  const previousPointerEvents = header.style.pointerEvents;
  const setHeaderAvailable = (available: boolean) => {
    header.inert = !available;
    header.style.pointerEvents = available ? 'auto' : 'none';
    if (available) header.removeAttribute('aria-hidden');
    else header.setAttribute('aria-hidden', 'true');
  };

  hero.classList.add('is-scroll-scene');
  root.classList.add('home-hero-scroll-active');
  setHeaderAvailable(false);

  const context = gsap.context(() => {
    gsap.set([lead, tail, actions], { autoAlpha: 0 });
    gsap.set([...leadWords, ...tailWords], { autoAlpha: 0, y: 24 });
    gsap.set(cue, { autoAlpha: 1, y: 0 });
    gsap.set(device, { autoAlpha: 0, y: 32, scale: 0.96 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: () => {
          const mobile = window.matchMedia('(max-width: 719px)').matches;
          return `+=${Math.round(window.innerHeight * (mobile ? 1.05 : 1.3))}`;
        },
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          setHeaderAvailable(progress >= 0.94);
          if (progress >= 0.94) header.classList.add('is-visible');
          else header.classList.remove('is-visible');
        },
        onLeave: () => {
          setHeaderAvailable(true);
          header.classList.add('is-visible');
        },
        onEnterBack: () => setHeaderAvailable(true),
        onLeaveBack: () => {
          setHeaderAvailable(false);
          header.classList.remove('is-visible');
        },
      },
    });

    timeline
      .to(cue, { autoAlpha: 0, y: 12, duration: 0.1 }, 0.04)
      .to(
        brand,
        {
          y: () => -window.innerHeight * 0.31,
          scale: 0.62,
          duration: 0.32,
          ease: 'power2.inOut',
        },
        0.1,
      )
      .to(lead, { autoAlpha: 1, duration: 0.01 }, 0.18)
      .to(
        leadWords,
        { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.045, ease: 'power2.out' },
        0.2,
      )
      .to(tail, { autoAlpha: 1, duration: 0.01 }, 0.38)
      .to(
        tailWords,
        { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.05, ease: 'power2.out' },
        0.4,
      )
      .to(device, { autoAlpha: 1, y: 0, scale: 1, duration: 0.2 }, 0.44)
      .to(
        leadWords,
        {
          x: (index) => -Math.min(window.innerWidth * (0.08 + index * 0.035), 240),
          autoAlpha: 0,
          duration: 0.12,
          stagger: 0.035,
          ease: 'power2.in',
        },
        0.61,
      )
      .to(lead, { height: 0, marginBottom: 0, overflow: 'hidden', duration: 0.14 }, 0.78)
      .to(tail, { y: -28, scale: 1.04, duration: 0.16, ease: 'power2.inOut' }, 0.64)
      .to(actions, { autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.75);
  }, hero);

  return () => {
    context.revert();
    hero.classList.remove('is-scroll-scene');
    root.classList.remove('home-hero-scroll-active');
    header.classList.remove('is-visible');
    header.inert = previousInert;
    header.style.pointerEvents = previousPointerEvents;
    if (previousAriaHidden === null) header.removeAttribute('aria-hidden');
    else header.setAttribute('aria-hidden', previousAriaHidden);
    stopRain();
  };
}