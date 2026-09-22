import { useEffect, useRef, useState } from 'react';
import indexPage from './content/index.html?raw';
import serviciosPage from './content/servicios.html?raw';
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
  'portfolio.html',
  'contacto.html',
  'nosotros.html',
  'preguntas.html',
  'privacidad.html',
  'terminos.html',
  'cookies.html',
  'mapa.html',
  'funza.html',
  'mosquera.html',
  'madrid.html',
  'facatativa.html',
]);

function buildCityPage(city: string, municipality: string, focus: string) {
  const title = `Páginas web para ${city} | Presentto Online`;
  const description = `Presentto crea presencia online profesional para ${city} con SEO local, diseño moderno y estrategia digital por $40.000 COP en la Sabana Occidental.`;
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://presentto.online/?page=${municipality}.html">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://presentto.online/?page=${municipality}.html">
  <meta property="og:image" content="https://presentto.online/assets/img/Presentto-Icono-Fondo-Transparente.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://presentto.online/assets/img/Presentto-Icono-Fondo-Transparente.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <header class="site-header"><div class="wrap nav-wrap"><a class="brand" href="index.html"><img src="assets/img/Presentto-Icono-Fondo-Transparente.png" alt="Presentto Online"></a><nav aria-label="Navegación principal"><a href="index.html">Inicio</a><a href="servicios.html">Servicios</a><a href="portfolio.html">Portafolio</a><a class="nav-cta" href="contacto.html">Comprar <b>↗</b></a></nav></div></header>
  <main>
    <section class="section wrap page-hero">
      <p class="eyebrow">SEO LOCAL • ${city.toUpperCase()}</p>
      <h1>Tu negocio en ${city}<br><em>visible en Google.</em></h1>
      <p class="lead">Diseñamos una presencia online profesional para ${city}, con estrategia de SEO local y contenido orientado a captar clientes reales en la Sabana Occidental.</p>
      <div class="actions"><a class="button primary" href="contacto.html">Comprar ahora <span>↗</span></a><a class="button ghost" href="servicios.html">Ver servicio <span>↓</span></a></div>
    </section>
    <section class="section wrap">
      <div class="section-heading">
        <p class="eyebrow">BENEFICIO REAL</p>
        <h2>Una web para ${city}<br><em>que trabaja por ti.</em></h2>
        <p>Si tu negocio está en ${city}, la presencia digital debe ser clara, útil y fácil de encontrar en búsquedas locales y búsquedas por servicio.</p>
      </div>
      <div class="feature-grid feature-grid-four">
        <article><b>01</b><h3>SEO local</h3><p>Organizamos contenido, estructura y palabras clave para que aparezcas mejor en búsquedas de ${focus}.</p></article>
        <article><b>02</b><h3>Dominio y presencia</h3><p>Incluye identidad digital, dominio propio, perfil de negocio y una navegación hecha para convertir visitas en clientes.</p></article>
        <article><b>03</b><h3>Diseño profesional</h3><p>Representas tu marca con una web moderna, clara y fácil de usar desde móvil, tablet o PC.</p></article>
        <article><b>04</b><h3>Compra directa</h3><p>Usas el mismo flujo de compra coordinado con formulario + pago para iniciar el proyecto sin fricción.</p></article>
      </div>
    </section>
    <section class="section offer-section">
      <div class="wrap offer-card">
        <div>
          <p class="eyebrow">PRESENTACIÓN DIGITAL</p>
          <h2>Tu negocio listo<br><em>para crecer online.</em></h2>
          <p>Pagas $40.000 COP por una presencia digital completa con diseño, contenido, dominio, correo profesional, SEO local y ajustes hasta dejarla lista para tu negocio.</p>
        </div>
        <div class="offer-price"><strong>$40.000</strong><span>COP · IVA incluido</span><small>Diseño personalizado · SEO local · Dominio y presencia digital</small><a class="button primary" href="contacto.html">Comprar plan <span>↗</span></a></div>
      </div>
    </section>
    <section class="final-cta"><div class="wrap"><p class="eyebrow">¿LISTO PARA EMPEZAR?</p><h2>Hagamos visible<br><em>tu negocio en ${city}.</em></h2><a class="button light" href="contacto.html">Comprar ahora <span>↗</span></a></div></section>
  </main>
  <footer>... </footer>
</body>
</html>`;
}

const cityPages: Record<string, string> = {
  'funza.html': buildCityPage('Funza', 'funza.html', 'empresas y negocios en Funza'),
  'mosquera.html': buildCityPage('Mosquera', 'mosquera.html', 'servicios y negocios en Mosquera'),
  'madrid.html': buildCityPage('Madrid', 'madrid.html', 'comercios y emprendimientos en Madrid'),
  'facatativa.html': buildCityPage('Facatativá', 'facatativa.html', 'empresas y negocios en Facatativá'),
};

const pageSources: Record<string, string> = {
  'index.html': indexPage,
  'servicios.html': serviciosPage,
  'portfolio.html': portfolioPage,
  'contacto.html': contactoPage,
  'nosotros.html': nosotrosPage,
  'preguntas.html': preguntasPage,
  'privacidad.html': privacidadPage,
  'terminos.html': terminosPage,
  'cookies.html': cookiesPage,
  'mapa.html': mapaPage,
  ...cityPages,
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
    .replaceAll('subdominio', 'dominio propio')
    .replaceAll('menú digital para restaurantes', 'Presenttación Digital para negocios')
    .replaceAll('menú digital', 'presencia digital')
    .replaceAll('menú interactivo', 'sitio web completo')
    .replaceAll('servicio a mesa', 'presencia digital')
    .replaceAll('pedidos a domicilio', 'solicitudes de clientes')
    .replaceAll('comandas', 'solicitudes')
    .replaceAll('Conocer más', 'Comprar')
    .replaceAll('Conocer la oferta', 'Comprar')
    .replaceAll('Habla por WhatsApp', 'Comprar ahora')
    .replaceAll('Páginas web desde $25.000 COP en la Sabana Occidental', 'Presencia online profesional desde $40.000 COP con SEO local en la Sabana Occidental')
    .replaceAll('Presentto crea y administra páginas web profesionales desde $25.000 COP mensuales para negocios, emprendimientos y empresas de la Sabana Occidental.', 'Presentto diseña y publica una presencia online profesional por $40.000 COP, con SEO local pensado para negocios y empresas de la Sabana Occidental.')
    .replaceAll('Páginas web profesionales desde $25.000 COP | Presentto Online', 'Presencia online profesional desde $40.000 COP | Presentto Online')
    .replaceAll('Creamos, alojamos y administramos tu web en la Sabana Occidental.', 'Diseñamos, publicamos y posicionamos tu presencia online en la Sabana Occidental con estrategia SEO local y presentación profesional.')
    .replaceAll('Web profesional administrada desde $25.000 COP mensuales.', 'Presencia online profesional por $40.000 COP con SEO local y estructura pensada para captar clientes en la Sabana Occidental.')
    .replaceAll('Tu negocio presente online.', 'Tu negocio, visible y posicionado en la Sabana Occidental.')
    .replaceAll('Creamos, alojamos y administramos una web hecha para mostrar lo que haces y ayudarte a llegar a más clientes.', 'Diseñamos una presencia online clara, elegante y posicionada para que tu negocio se encuentre, se conozca y convierta más clientes en la Sabana Occidental.')
    .replaceAll('sin cobros ocultos', 'con estrategia SEO local incluida')
    .replaceAll('Pagas $25.000 COP mensuales y nosotros creamos, alojamos y mantenemos tu sitio según las indicaciones de tu negocio.', 'Pagas $40.000 COP por una presencia online profesional con dominio propio, contenido estratégico, diseño y SEO local para la Sabana Occidental.')
    .replaceAll('Configuración para que negocios de Funza, Mosquera, Madrid, Facatativá y la Sabana te encuentren.', 'Estructura SEO local para que negocios de Funza, Mosquera, Madrid, Facatativá y la Sabana Occidental te encuentren mejor en Google.')
    .replaceAll('QR y demos', 'SEO local y Google Business')
    .replaceAll('Comprobantes de uso real, códigos QR y ejemplos para compartir tu presencia digital.', 'Estrategia de posicionamiento, perfil de negocio y estructura para fortalecer tu presencia en Google y la Sabana Occidental.')
    .replaceAll('SEO local', 'SEO local profesional')
    .replaceAll('Todo lo necesario\npara <em>estar en internet.</em>', 'Todo lo necesario\npara <em>ganar visibilidad.</em>');
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

      const demoReferences = documentFragment.querySelectorAll('a[href="demos.html"], [data-demo], .demo-card, .demo-filters');
      demoReferences.forEach((element) => element.remove());

      const trustSection = documentFragment.createElement('section');
      trustSection.className = 'section trust-section';
      trustSection.innerHTML = '<div class="wrap"><p class="eyebrow">RESULTADOS DE REFERENCIA</p><div class="section-heading"><h2>Una web que se siente<br><em>hecha para tu negocio.</em></h2><p>Escenarios habituales que una Presenttación Digital bien construida ayuda a resolver desde el primer día.</p></div><div class="trust-grid"><article class="trust-card"><span class="trust-icon">01</span><h3>Más confianza</h3><p>Una presencia clara para que nuevos clientes entiendan quién eres, qué ofreces y cómo contactarte.</p><small>Resultado esperado · No es una reseña publicada</small></article><article class="trust-card"><span class="trust-icon">02</span><h3>Más oportunidades</h3><p>Información ordenada, llamadas a la acción visibles y una experiencia pensada para convertir visitas en conversaciones.</p><small>Resultado esperado · Se adapta a tus objetivos</small></article><article class="trust-card"><span class="trust-icon">03</span><h3>Más autonomía</h3><p>Un sitio propio con dominio, correo profesional y una base digital lista para acompañar el crecimiento del negocio.</p><small>Resultado esperado · Alcance acordado contigo</small></article></div></div></section>';
      featureSection.insertAdjacentElement('afterend', trustSection);

      const stackSection = documentFragment.createElement('section');
      stackSection.className = 'section stack-section';
      stackSection.innerHTML = '<div class="wrap"><p class="eyebrow">RESPALDO TÉCNICO</p><div class="section-heading"><h2>Tecnología útil,<br><em>sin complicaciones.</em></h2><p>Trabajamos con tecnologías y estándares profesionales para construir una presencia rápida, accesible y preparada para crecer.</p></div><div class="stack-grid"><article class="stack-card"><img src="https://cdn.simpleicons.org/html5/E34F26" alt="Icono HTML5"><strong>HTML5</strong><span>Estructura semántica</span></article><article class="stack-card"><img src="https://cdn.simpleicons.org/css3/1572B6" alt="Icono CSS3"><strong>CSS3</strong><span>Diseño responsive</span></article><article class="stack-card"><img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="Icono JavaScript"><strong>JavaScript</strong><span>Interacciones útiles</span></article><article class="stack-card"><img src="https://cdn.simpleicons.org/react/61DAFB" alt="Icono React"><strong>React</strong><span>Componentes escalables</span></article><article class="stack-card"><span class="stack-badge">SEO</span><strong>SEO local</strong><span>Encontrabilidad técnica</span></article><article class="stack-card"><span class="stack-badge">A11Y</span><strong>Accesibilidad</strong><span>Experiencia inclusiva</span></article></div><p class="stack-note">Tecnologías y estándares de trabajo. No representa certificaciones oficiales de terceros.</p></div></section>';
      trustSection.insertAdjacentElement('afterend', stackSection);
    }
    const heroCta = documentFragment.querySelector('.hero .button.primary');
    if (heroCta) heroCta.innerHTML = 'Comprar ahora <span>↗</span>';
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
      if (features) features.innerHTML = '<li>Creación personalizada con imágenes, estilo y contenido de tu empresa.</li><li>Dominio propio incluido: <strong>tuempresa.online</strong>.</li><li>1 correo profesional: <strong>@tuempresa.online</strong>.</li><li>Implementaciones tecnológicas y ajustes necesarios hasta tu satisfacción.</li><li>SEO y estructura preparada para búsquedas locales.</li><li>Códigos QR y comprobante de uso real.</li><li>La renovación es flexible: puedes dejar de pagar cuando quieras.</li>';
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
    const menuQuestion = questions.find((card) => card.textContent?.toLowerCase().includes('presencia digital'));
    if (menuQuestion) {
      menuQuestion.setAttribute('data-question', '¿Qué incluye la Presenttación Digital?');
      menuQuestion.setAttribute('data-answer', 'Incluye un sitio web completo, dominio propio, correo profesional, implementaciones tecnológicas, ajustes hasta tu satisfacción, SEO, imágenes y funcionalidades necesarias para tu negocio.');
      const title = menuQuestion.querySelector('h2');
      if (title) title.textContent = '¿Qué incluye la Presenttación Digital?';
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
    const contactDescription = documentFragment.querySelector('.contact-aside > p:not(.eyebrow):not(.muted)');
    if (contactDescription) contactDescription.textContent = 'Cuéntanos qué quieres lograr y convertimos tu idea en una presencia digital clara, útil y lista para crecer.';
    const form = documentFragment.querySelector<HTMLFormElement>('#contactForm');
    if (form) {
      form.action = 'https://formspree.io/f/xvkgarev';
      form.innerHTML = '<label>¿Cómo te llamas?<input name="nombre" required autocomplete="name" placeholder="Tu nombre"></label><label>Nombre de tu negocio<input name="negocio" required autocomplete="organization" placeholder="Nombre del negocio"></label><label>Agendar reunión<input name="reunion" type="datetime-local" required></label><fieldset><legend>Objetivos digitales</legend><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Vender más"> Vender más</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Más profesionalismo"> Más profesionalismo</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Llegar a nuevos clientes"> Llegar a nuevos clientes</label><label class="checkbox-option"><input name="objetivos" type="checkbox" value="Mostrar servicios o productos"> Mostrar servicios o productos</label></fieldset><label>Necesidades extra<textarea name="necesidades_extra" rows="5" placeholder="Cuéntanos peticiones puntuales o necesidades digitales"></textarea></label><button class="button primary" type="submit">Enviar solicitud <span>↗</span></button><a class="button payment-button" href="https://mpago.li/2j4gTPj" target="_blank" rel="noopener"><span class="payment-icon">$</span> Pagar $40.000 COP <span>↗</span></a><p class="form-note">El valor de $40.000 COP incluye IVA. Primero envía tu solicitud y luego realiza el pago.</p><p id="formStatus" role="status" aria-live="polite"></p>';
    }
  }
  document.title = documentFragment.title || 'Presentto Online';
  document.documentElement.lang = documentFragment.documentElement.lang || 'es';
  if (!document.head.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = 'https://presentto.online/assets/img/Presentto-Icono-Fondo-Transparente.png';
    document.head.appendChild(favicon);
  }
  if (!document.head.querySelector('link[rel="apple-touch-icon"]')) {
    const appleTouch = document.createElement('link');
    appleTouch.rel = 'apple-touch-icon';
    appleTouch.href = 'https://presentto.online/assets/img/Presentto-Icono-Fondo-Transparente.png';
    document.head.appendChild(appleTouch);
  }
  const metaTheme = document.head.querySelector('meta[name="theme-color"]') || document.createElement('meta');
  if (!metaTheme.hasAttribute('name')) {
    metaTheme.setAttribute('name', 'theme-color');
  }
  metaTheme.setAttribute('content', '#0b1020');
  if (!metaTheme.parentNode) document.head.appendChild(metaTheme);
  const robotsMeta = document.head.querySelector('meta[name="robots"]') || document.createElement('meta');
  if (!robotsMeta.hasAttribute('name')) robotsMeta.setAttribute('name', 'robots');
  robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  if (!robotsMeta.parentNode) document.head.appendChild(robotsMeta);
  document.head.querySelectorAll('[data-react-page-head]').forEach((element) => element.remove());
  documentFragment.head.querySelectorAll('meta, link[rel="canonical"], script[type="application/ld+json"]').forEach((element) => {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.setAttribute('data-react-page-head', 'true');
    document.head.appendChild(clonedElement);
  });
  documentFragment.querySelectorAll('script').forEach((script) => script.remove());
  documentFragment.body.querySelectorAll('a[href="demos.html"]').forEach((link) => link.remove());
  documentFragment.body.querySelectorAll('[data-demo], .demo-card, .demo-filters').forEach((element) => element.remove());
  const navigation = documentFragment.querySelector('.site-header nav');
  navigation?.querySelectorAll('a[href="demos.html"]').forEach((link) => link.remove());
  navigation?.querySelectorAll('a[href="contacto.html"]').forEach((link) => {
    const text = documentFragment.createElement('span');
    text.textContent = 'Comprar';
    link.textContent = '';
    link.appendChild(text);
    const arrow = documentFragment.createElement('b');
    arrow.textContent = '↗';
    link.appendChild(arrow);
  });
  if (navigation && !navigation.querySelector('a[href="mapa.html"]')) {
    const mapLink = documentFragment.createElement('a');
    mapLink.href = 'mapa.html';
    mapLink.textContent = 'Sitios';
    navigation.insertBefore(mapLink, navigation.querySelector('.nav-cta'));
  }
  if (navigation && !navigation.querySelector('a[href="funza.html"]')) {
    const cityLinks = ['funza.html', 'mosquera.html', 'madrid.html', 'facatativa.html'];
    cityLinks.forEach((cityPage) => {
      const cityLink = documentFragment.createElement('a');
      cityLink.href = cityPage;
      cityLink.textContent = cityPage.replace('.html', '').charAt(0).toUpperCase() + cityPage.replace('.html', '').slice(1);
      navigation.insertBefore(cityLink, navigation.querySelector('.nav-cta'));
    });
  }
  navigation?.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === pageFromUrl());
  });
  const footer = documentFragment.querySelector('footer');
  footer?.querySelectorAll('a[href="demos.html"]').forEach((link) => link.remove());
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
      '.section, .proof, .final-cta, .work-card, .demo-card, .service-card, .faq-card, .process-card, .reference-grid article, .trust-card, .stack-card',
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
