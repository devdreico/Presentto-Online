import { gsap, prefersReduced } from './reveal';

export function initHomeHero(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-home-scroll]');
  const header = document.querySelector<HTMLElement>('[data-home-header]');
  if (!hero || !header || prefersReduced()) return () => {};

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

  hero.classList.add('is-scroll-scene');
  root.classList.add('home-hero-scroll-active');
  header.inert = true;
  header.setAttribute('aria-hidden', 'true');

  const context = gsap.context(() => {
    gsap.set(header, { autoAlpha: 0, yPercent: -100 });
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
          const headerReady = progress >= 0.995;
          header.inert = !headerReady;
          if (headerReady) header.removeAttribute('aria-hidden');
          else header.setAttribute('aria-hidden', 'true');
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
      .to(actions, { autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.75)
      .to(header, { autoAlpha: 1, yPercent: 0, duration: 0.12, ease: 'power2.out' }, 0.88);
  }, hero);

  return () => {
    context.revert();
    hero.classList.remove('is-scroll-scene');
    root.classList.remove('home-hero-scroll-active');
    header.inert = previousInert;
    if (previousAriaHidden === null) header.removeAttribute('aria-hidden');
    else header.setAttribute('aria-hidden', previousAriaHidden);
  };
}