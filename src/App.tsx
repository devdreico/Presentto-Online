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
import mapaPage from './content/mapa.html?raw';

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
  'mapa.html',
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
  'mapa.html': mapaPage,
};

function pageFromUrl() {
  const requestedPage = new URLSearchParams(window.location.search).get('page');
  return requestedPage && rootPages.has(requestedPage) ? requestedPage : 'index.html';
}

function pageMarkup(html: string) {
  const documentFragment = new DOMParser().parseFromString(html, 'text/html');
  const page = pageFromUrl();
  const replaceText = (value: string) => value
    .replaceAll('$25.000', '$40.000')
    .replaceAll('$120.000', '$40.000')
    .replaceAll('25.000 COP', '40.000 COP')
    .replaceAll('120.000 COP', '40.000 COP')
    .replaceAll('presentthost.online', 'tuempresa.online')
    .replaceAll('subdominio', 'dominio propio');
  documentFragment.body.innerHTML = replaceText(documentFragment.body.innerHTML);
  documentFragment.head.innerHTML = replaceText(documentFragment.head.innerHTML);

  if (page === 'index.html') {
    const heroPrice = documentFragment.querySelector('.hero-price');
    if (heroPrice) heroPrice.innerHTML = '<strong>$40.000</strong><span>COP<br>IVA incluido</span>';
    const proofPrice = documentFragment.querySelector('.proof-grid div');
    if (proofPrice) proofPrice.innerHTML = '<strong>$40.000</strong><span>IVA incluido</span>';
    const offer = documentFragment.querySelector('.offer-section');
    if (offer) {
      offer.innerHTML = '<div class="wrap offer-card"><div><p class="eyebrow">PACK PRESENTTACIÓN DIGITAL</p><h2>Tu negocio listo<br><em>para crecer online.</em></h2><p>Recibes un sitio web que suple completamente las necesidades digitales de tu negocio, con la información, imágenes, datos y funcionalidades necesarias. Hacemos las implementaciones tecnológicas necesarias y ajustamos la solución hasta que quedes satisfecho con la versión digitalizada de tu negocio.</p></div><div class="offer-price"><strong>$40.000</strong><span>COP · IVA incluido</span><small>Creación personalizada · Hosting · SEO local<br>Contenido e identidad de tu negocio</small><a class="button primary" href="contacto.html">Comprar plan <span>↗</span></a></div></div>';
    }
    const windowAddress = documentFragment.querySelector('.window-bar span');
    if (windowAddress) windowAddress.textContent = 'tuempresa.online';
    const hostingFeature = documentFragment.querySelector('.feature-grid article:nth-child(2)');
    if (hostingFeature) hostingFeature.innerHTML = '<b>02</b><h3>Dominio y correo profesional</h3><p>Recibe tu dominio propio <strong>tuempresa.online</strong> y 1 correo profesional <strong>@tuempresa.online</strong>.</p>';
    const featureSection = documentFragment.querySelector('#como-funciona');
    const featureGrid = featureSection?.querySelector('.feature-grid');
    if (featureSection && featureGrid) {
      const featureActions = documentFragment.createElement('div');
      featureActions.className = 'actions plan-cta';
      featureActions.innerHTML = '<a class="button primary" href="contacto.html">Comprar Presenttación Digital <span>↗</span></a>';
      featureGrid.insertAdjacentElement('afterend', featureActions);
    }
    const heroCta = documentFragment.querySelector('.hero .button.primary');
    if (heroCta) heroCta.innerHTML = 'Comprar plan <span>↗</span>';
    const finalCta = documentFragment.querySelector('.final-cta .button');
    if (finalCta) finalCta.innerHTML = 'Comprar Presenttación Digital <span>↗</span>';
  }

  if (page === 'servicios.html') {
    documentFragment.querySelector('.service-special')?.remove();
    const mainService = documentFragment.querySelector('.service-main');
    if (mainService) {
      const title = mainService.querySelector('h2');
      const description = mainService.querySelector('p:not(.eyebrow)');
      const price = mainService.querySelector('.service-price strong');
      const period = mainService.querySelector('.service-price span');
      const action = mainService.querySelector('.service-price .button');
      if (title) title.innerHTML = 'Presenttación<br><em>Digital</em>';
      if (description) description.textContent = 'Recibes un sitio web que suple completamente las necesidades digitales de tu negocio, con la información, imágenes, datos y funcionalidades necesarias. Hacemos las implementaciones tecnológicas necesarias y ajustamos la solución hasta que quedes satisfecho con la versión digitalizada de tu negocio.';
      const features = mainService.querySelector('ul');
      if (features) features.innerHTML = '<li>Creación personalizada con imágenes, estilo y contenido de tu empresa.</li><li>Dominio propio incluido: <strong>tuempresa.online</strong>.</li><li>1 correo profesional: <strong>@tuempresa.online</strong>.</li><li>Implementaciones tecnológicas y ajustes necesarios hasta tu satisfacción.</li><li>SEO y estructura preparada para búsquedas locales.</li><li>Códigos QR, demos y comprobante de uso real.</li><li>La renovación es flexible: puedes dejar de pagar cuando quieras.</li>';
      if (price) price.textContent = '$40.000';
      if (period) period.textContent = 'COP · IVA incluido';
      if (action) action.innerHTML = 'Comprar plan <span>↗</span>';
    }
    const heading = documentFragment.querySelector('.page-hero h1');
    if (heading) heading.innerHTML = 'Una solución.<br><em>Una presencia real.</em>';
    const lead = documentFragment.querySelector('.page-hero .lead');
    if (lead) lead.textContent = 'Presenttación Digital: un sitio web útil, accesible y completo para tu negocio.';
  }

  if (page === 'preguntas.html') {
    const questions = [...documentFragment.querySelectorAll('[data-faq]')];
    const menuQuestion = questions.find((card) => card.textContent?.toLowerCase().includes('menú digital'));
    if (menuQuestion) {
      menuQuestion.setAttribute('data-question', '¿El precio incluye IVA?');
      menuQuestion.setAttribute('data-answer', 'Sí. El valor de la Presenttación Digital es de $40.000 COP con IVA incluido.');
      const title = menuQuestion.querySelector('h2');
      if (title) title.textContent = '¿El precio incluye IVA?';
    }
    const hostingQuestion = questions.find((card) => card.textContent?.toLowerCase().includes('tuempresa.online'));
    if (hostingQuestion) {
      hostingQuestion.setAttribute('data-question', '¿Qué incluye el dominio y correo profesional?');
      hostingQuestion.setAttribute('data-answer', 'La Presenttación Digital incluye el dominio propio tuempresa.online y 1 correo profesional @tuempresa.online.');
      const title = hostingQuestion.querySelector('h2');
      if (title) title.textContent = '¿Qué incluye el dominio y correo profesional?';
    }
  }

  if (page === 'terminos.html') {
    const infoBlock = documentFragment.querySelector('.info-block');
    if (infoBlock) infoBlock.innerHTML = '<h2>La Presenttación Digital tiene un valor de $40.000 COP, IVA incluido, e integra la creación de un sitio web con la información, imágenes, datos y funcionalidades necesarias para el negocio.</h2><p>El alcance, los contenidos y las integraciones se definen con el cliente antes de publicar.</p>';
  }

  if (page === 'contacto.html') {
    const form = documentFragment.querySelector<HTMLFormElement>('#contactForm');
    if (form) {
      form.action = 'https://formspree.io/f/xvkgarev';
      form.innerHTML = '<label>¿Cómo te llamas?<input name="nombre" required autocomplete="name" placeholder="Tu nombre"></label><label>Nombre de tu negocio<input name="negocio" required autocomplete="organization" placeholder="Nombre del negocio"></label><label>Agendar reunión<input name="reunion" type="datetime-local" required></label><fieldset><legend>Objetivos digitales</legend><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Vender más"> Vender más</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Más profesionalismo"> Más profesionalismo</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Llegar a nuevos clientes"> Llegar a nuevos clientes</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Mostrar servicios o productos"> Mostrar servicios o productos</label></fieldset><label>Necesidades extra<textarea name="necesidades_extra" rows="5" placeholder="Cuéntanos peticiones puntuales o necesidades digitales"></textarea></label><button class="button primary" type="submit">Enviar solicitud <span>↗</span></button><a class="button payment-button" href="https://mpago.li/2j4gTPj" target="_blank" rel="noopener"><span class="payment-icon">$</span> Pagar $40.000 COP <span>↗</span></a><p class="form-note">El valor de $40.000 COP incluye IVA. Primero envía tu solicitud y luego realiza el pago.</p><p id="formStatus" role="status" aria-live="polite"></p>';
    }
  }
  document.title = documentFragment.title || 'Presentto Online';
  document.documentElement.lang = documentFragment.documentElement.lang || 'es';
  document.head.querySelectorAll('[data-react-page-head]').forEach((element) => element.remove());
  documentFragment.head.querySelectorAll('meta, link[rel="canonical"], script[type="application/ld+json"]').forEach((element) => {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.setAttribute('data-react-page-head', 'true');
    document.head.appendChild(clonedElement);
  });
  documentFragment.querySelectorAll('script').forEach((script) => script.remove());
  const navigation = documentFragment.querySelector('.site-header nav');
  if (navigation && !navigation.querySelector('a[href="mapa.html"]')) {
    const mapLink = documentFragment.createElement('a');
    mapLink.href = 'mapa.html';
    mapLink.textContent = 'Sitios';
    navigation.insertBefore(mapLink, navigation.querySelector('.nav-cta'));
  }
  navigation?.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === pageFromUrl());
  });
  const footer = documentFragment.querySelector('footer');
  if (footer && !footer.querySelector('.managed-by')) {
    const managedBy = documentFragment.createElement('p');
    managedBy.className = 'managed-by';
    managedBy.textContent = 'Servicio administrado por Soverath Holding S.A.S. · Desarrollo respaldado por Aeperion Systems.';
    footer.prepend(managedBy);
  }
  return documentFragment.body.innerHTML;
}

function readCookie(name: string) {
  return document.cookie.split('; ').find((cookie) => cookie.startsWith(`${name}=`))?.split('=')[1] || null;
}

function writeCookie(name: string, value: string, maxAge = 31536000) {
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function CookieConsent() {
  const [consent, setConsent] = useState(readCookie('presentto-consent'));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  if (consent) return null;

  const saveConsent = (allowAnalytics: boolean) => {
    writeCookie('presentto-consent', allowAnalytics ? 'all' : 'necessary');
    writeCookie('presentto-analytics', allowAnalytics ? 'granted' : 'denied');
    setConsent(allowAnalytics ? 'all' : 'necessary');
    setSettingsOpen(false);
  };

  return (
    <>
      <aside className="cookie-box" role="dialog" aria-label="Preferencias de cookies">
        <div>
          <strong>Tu privacidad importa</strong>
          <p>Usamos cookies necesarias para que Presentto funcione y, solo con tu permiso, cookies opcionales para medir mejoras de navegación. <a href="/index.html?page=cookies.html">Ver política.</a></p>
        </div>
        <div className="cookie-actions">
          <button type="button" onClick={() => saveConsent(false)}>Solo necesarias</button>
          <button type="button" onClick={() => saveConsent(true)}>Aceptar todas</button>
          <button type="button" onClick={() => setSettingsOpen(true)}>Configurar</button>
        </div>
      </aside>
      {settingsOpen && (
        <div className="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <div className="cookie-settings-backdrop" onClick={() => setSettingsOpen(false)} />
          <section className="cookie-settings-panel">
            <button className="cookie-settings-close" type="button" aria-label="Cerrar preferencias" onClick={() => setSettingsOpen(false)}>×</button>
            <p className="eyebrow">PREFERENCIAS</p>
            <h2 id="cookie-settings-title">Controla tus cookies.</h2>
            <p>Las cookies necesarias mantienen la seguridad y el funcionamiento básico. Las opcionales nos ayudan a entender qué debemos mejorar.</p>
            <label className="cookie-option"><span><strong>Necesarias</strong><small>Siempre activas para navegación, seguridad y preferencias.</small></span><input type="checkbox" checked readOnly /></label>
            <label className="cookie-option"><span><strong>Analítica</strong><small>Opcional. No se activa hasta que la autorices.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
            <button className="button primary" type="button" onClick={() => saveConsent(analytics)}>Guardar preferencias <span>↗</span></button>
          </section>
        </div>
      )}
    </>
  );
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

    return () => {
      root.removeEventListener('click', navigate);
      observer?.disconnect();
      form?.removeEventListener('submit', submitForm);
      modal?.remove();
    };
  }, [markup]);

  return <><div ref={contentRef} dangerouslySetInnerHTML={{ __html: markup }} /><CookieConsent /></>;
}

export default App;
