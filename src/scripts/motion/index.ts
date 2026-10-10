import { ScrollTrigger, prefersReduced, initReveals } from './reveal';
import { initSmoothScroll, destroySmoothScroll } from './lenis';
import { initKinetic } from './kinetic';
import { initCounters } from './counters';
import { initCursor, initMagnetic } from './cursor';
import { initTilt } from './tilt';
import { initNav } from './nav';
import { initPinned } from './pin';
import { initContactForm } from './forms';
import { initCheckout } from './checkout';
import { initPlanTabs } from './plans';
import { initToc } from './toc';

let cleanups: Array<() => void> = [];
let cursorReady = false;

/* Preloader: solo primera visita (flag del script inline) ------------------ */
function handlePreloader(): void {
  const el = document.querySelector<HTMLElement>('[data-preloader]');
  if (!el) return;
  const playing = document.documentElement.classList.contains('play-preloader');
  if (!playing) {
    el.remove();
    return;
  }
  const done = () => {
    document.documentElement.classList.remove('play-preloader');
    el.classList.add('is-done');
    window.setTimeout(() => el.remove(), 700);
  };
  const minTime = new Promise<void>((r) => window.setTimeout(r, 1150));
  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));
  Promise.all([minTime, loaded]).then(done);
}

/* Tracking global de conversiones (una sola vez) --------------------------- */
function initTracking(): void {
  const track = (window as unknown as { __presenttoTrack?: (n: string, p?: Record<string, string>) => void })
    .__presenttoTrack;
  document.addEventListener('click', (e) => {
    const t = e.target as Element | null;
    const a = t?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    if (href.includes('wa.me')) {
      track?.('whatsapp_click', { link_text: label, page_path: location.pathname });
    } else if (href.includes('mpago.li')) {
      track?.('checkout_click', {
        plan: a.getAttribute('data-plan') || '',
        price: a.getAttribute('data-price') || '',
        page_path: location.pathname,
      });
    } else if (a.target === '_blank' && !href.startsWith('mailto:') && href.startsWith('http')) {
      track?.('outbound_click', { link_text: label, link_url: href });
    }
  });
}

/* Fallback de imágenes rotas ---------------------------------------------- */
function initImageFallbacks(): void {
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        img.classList.add('image-fallback');
        img.alt = `${img.alt || 'Imagen'} no disponible`;
      },
      { once: true },
    );
  });
}

let safetyTimer = 0;

function runPage(): void {
  cleanups.forEach((fn) => fn());
  cleanups = [];

  // Red de seguridad: el contenido nunca puede quedarse oculto si un
  // módulo falla, y re-armamos el timer en cada navegación.
  const html = document.documentElement;
  html.classList.add('has-motion');
  html.classList.remove('motion-timeout');
  window.clearTimeout(safetyTimer);
  safetyTimer = window.setTimeout(() => html.classList.add('motion-timeout'), 3500);

  handlePreloader();
  initNav();
  initReveals();
  initKinetic();
  initCounters();
  initPinned();
  initContactForm();
  initCheckout();
  initPlanTabs();
  initToc();
  initImageFallbacks();

  if (!cursorReady) {
    cursorReady = true;
    initTracking();
  }
  cleanups.push(initCursor(), initMagnetic(), initTilt());

  if (!prefersReduced()) initSmoothScroll();

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function teardown(): void {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  destroySmoothScroll();
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

document.addEventListener('astro:page-load', runPage);
document.addEventListener('astro:before-swap', teardown);

// Fallback si la página se sirve sin ClientRouter (sin view-transitions).
if (!document.querySelector('meta[name="astro-view-transitions-enabled"]')) {
  window.addEventListener('load', runPage, { once: true });
}
