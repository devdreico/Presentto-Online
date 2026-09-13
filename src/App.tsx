import { useEffect, useRef, useState } from 'react';
import indexPage from './content/index.html?raw';
import serviciosPage from './content/servicios.html?raw';
import demosPage from './content/demos.html?raw';
import portfolioPage from './content/portfolio.html?raw';
import contactoPage from './content/contacto.html?raw';
import nosotrosPage from './content/nosotros.html?raw';
import preguntasPage from './content/preguntas.html?raw';
import privacidadPage from './content/privacidad.html?raw';
import terminosPage from './content/terminos.html?raw';
import cookiesPage from './content/cookies.html?raw';

const rootPages = new Set([
  'index.html',
  'servicios.html',
  'demos.html',
  'portfolio.html',
  'contacto.html',
  'nosotros.html',
  'preguntas.html',
  'privacidad.html',
  'terminos.html',
  'cookies.html',
]);

const pageSources: Record<string, string> = {
  'index.html': indexPage,
  'servicios.html': serviciosPage,
  'demos.html': demosPage,
  'portfolio.html': portfolioPage,
  'contacto.html': contactoPage,
  'nosotros.html': nosotrosPage,
  'preguntas.html': preguntasPage,
  'privacidad.html': privacidadPage,
  'terminos.html': terminosPage,
  'cookies.html': cookiesPage,
};

function pageFromUrl() {
  const requestedPage = new URLSearchParams(window.location.search).get('page');
  return requestedPage && rootPages.has(requestedPage) ? requestedPage : 'index.html';
}

function pageMarkup(html: string) {
  const documentFragment = new DOMParser().parseFromString(html, 'text/html');
  document.title = documentFragment.title || 'Presentto Online';
  document.documentElement.lang = documentFragment.documentElement.lang || 'es';
  document.head.querySelectorAll('[data-react-page-head]').forEach((element) => element.remove());
  documentFragment.head.querySelectorAll('meta, link[rel="canonical"], script[type="application/ld+json"]').forEach((element) => {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.setAttribute('data-react-page-head', 'true');
    document.head.appendChild(clonedElement);
  });
  documentFragment.querySelectorAll('script').forEach((script) => script.remove());
  return documentFragment.body.innerHTML;
}

function App() {
  const [page, setPage] = useState(pageFromUrl);
  const [markup, setMarkup] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMarkup(pageMarkup(pageSources[page]));
  }, [page]);

  useEffect(() => {
    const handleBackForward = () => setPage(pageFromUrl());
    window.addEventListener('popstate', handleBackForward);
    return () => window.removeEventListener('popstate', handleBackForward);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || !markup) return;

    const navigate = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return;
      const nextPage = anchor.getAttribute('href');
      if (!nextPage || !rootPages.has(nextPage)) return;
      event.preventDefault();
      window.history.pushState({}, '', `/index.html?page=${nextPage}`);
      setPage(nextPage);
      window.scrollTo(0, 0);
    };
    root.addEventListener('click', navigate);

    const animated = root.querySelectorAll<HTMLElement>(
      '.section, .proof, .final-cta, .work-card, .demo-card, .service-card, .faq-card, .process-card, .reference-grid article',
    );
    animated.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;
    });
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer?.unobserve(entry.target);
        }
      }), { threshold: 0.12 })
      : null;
    animated.forEach((element) => observer?.observe(element));
    if (!observer) animated.forEach((element) => element.classList.add('visible'));

    root.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.addEventListener('error', () => {
        image.classList.add('image-fallback');
        image.alt = `${image.alt || 'Imagen'} no disponible`;
      }, { once: true });
    });

    const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
    const demos = [...root.querySelectorAll<HTMLElement>('[data-demo]')];
    const filterGroup = root.querySelector<HTMLElement>('.demo-filters');
    if (filters.length && demos.length && filterGroup) {
      const filterStatus = document.createElement('p');
      filterStatus.className = 'filter-status';
      filterStatus.setAttribute('aria-live', 'polite');
      filterGroup.appendChild(filterStatus);
      const updateFilter = (selected: string) => {
        const visibleCount = demos.filter((demo) => {
          const visible = selected === 'all' || demo.dataset.category === selected;
          demo.hidden = !visible;
          return visible;
        }).length;
        filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'demo disponible' : 'demos disponibles'}`;
      };
      filters.forEach((filter) => {
        filter.setAttribute('aria-pressed', filter.classList.contains('is-active') ? 'true' : 'false');
        filter.addEventListener('click', () => {
          filters.forEach((button) => {
            const active = button === filter;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          updateFilter(filter.dataset.filter || 'all');
        });
      });
      updateFilter(filterGroup.querySelector<HTMLButtonElement>('.is-active')?.dataset.filter || 'all');
    }

    const faqCards = [...root.querySelectorAll<HTMLElement>('[data-faq]')];
    let modal: HTMLElement | null = null;
    if (faqCards.length) {
      modal = document.createElement('div');
      modal.className = 'faq-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.hidden = true;
      modal.innerHTML = '<div class="faq-modal-backdrop" data-faq-close></div><div class="faq-modal-panel" role="document"><button class="faq-modal-close" type="button" aria-label="Cerrar respuesta" data-faq-close>×</button><span class="eyebrow">RESPUESTA RÁPIDA</span><h2 id="faqModalTitle"></h2><p id="faqModalAnswer"></p></div>';
      document.body.appendChild(modal);
      faqCards.forEach((card) => card.querySelector('.faq-trigger')?.addEventListener('click', () => {
        modal!.querySelector('#faqModalTitle')!.textContent = card.dataset.question || '';
        modal!.querySelector('#faqModalAnswer')!.textContent = card.dataset.answer || '';
        modal!.hidden = false;
        document.body.classList.add('modal-open');
        modal!.querySelector<HTMLButtonElement>('.faq-modal-close')?.focus();
      }));
      modal.querySelectorAll('[data-faq-close]').forEach((element) => element.addEventListener('click', () => {
        modal!.hidden = true;
        document.body.classList.remove('modal-open');
      }));
    }

    const form = root.querySelector<HTMLFormElement>('#contactForm');
    const status = root.querySelector<HTMLElement>('#formStatus');
    const submitButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    const submitForm = async (event: SubmitEvent) => {
      event.preventDefault();
      if (!form || !status || !submitButton) return;
      submitButton.disabled = true;
      status.className = '';
      status.textContent = 'Enviando…';
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('send');
        form.reset();
        status.className = 'form-status';
        status.textContent = 'En breve uno de nuestros asesores te va a contactar para solucionar tus dudas o entender más sobre Presentto.';
      } catch {
        status.className = 'form-status form-error';
        status.textContent = 'No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.';
      } finally {
        submitButton.disabled = false;
      }
    };
    form?.addEventListener('submit', submitForm);

    const cookieKey = 'presentto-cookie-consent';
    let cookieConsent: string | null = null;
    try { cookieConsent = window.localStorage.getItem(cookieKey); } catch { /* El sitio funciona sin almacenamiento local. */ }
    let cookieBox: HTMLElement | null = null;
    if (!cookieConsent) {
      cookieBox = document.createElement('aside');
      cookieBox.className = 'cookie-box';
      cookieBox.setAttribute('role', 'dialog');
      cookieBox.setAttribute('aria-label', 'Preferencias de cookies');
      cookieBox.innerHTML = '<p>Usamos cookies técnicas para recordar tus preferencias y mejorar tu navegación. <a href="cookies.html">Conoce más</a>.</p><div class="cookie-actions"><button type="button" data-cookie="accept">Aceptar</button><button type="button" data-cookie="reject">Rechazar</button></div>';
      document.body.appendChild(cookieBox);
      cookieBox.querySelectorAll<HTMLButtonElement>('[data-cookie]').forEach((button) => button.addEventListener('click', () => {
        try { window.localStorage.setItem(cookieKey, button.dataset.cookie || ''); } catch { /* Preferencia solo durante la sesión. */ }
        cookieBox?.remove();
      }));
    }

    return () => {
      root.removeEventListener('click', navigate);
      observer?.disconnect();
      form?.removeEventListener('submit', submitForm);
      modal?.remove();
      cookieBox?.remove();
    };
  }, [markup]);

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: markup }} />;
}

export default App;
