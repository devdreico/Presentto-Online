// Fuente única del índice de contenidos editoriales.
// La consumen: rss.xml.ts, /guias/, /comparativas/ y la validación de
// scripts/seo/validate-seo.mjs (que comprueba que public/llms.txt esté al día).
// Al añadir una guía o comparativa: añádela aquí y réstala en llms.txt.

export interface ContentEntry {
  href: string;
  /** Título visible en listados (H2 enlazado) */
  title: string;
  /** Título alternativo para RSS si difiere del listado */
  rssTitle?: string;
  desc: string;
  tag: string;
  hubs: Array<'guias' | 'comparativas'>;
}

export const siteIndex: ContentEntry[] = [
  {
    href: '/guias/que-es-presencia-digital/',
    title: '¿Qué es la presencia digital?',
    rssTitle: 'Presencia digital para negocios colombianos',
    desc: 'Definición, piezas mínimas y errores frecuentes al llevar un negocio a internet.',
    tag: 'Presencia digital',
    hubs: ['guias'],
  },
  {
    href: '/guias/ficha-de-google-mi-negocio/',
    title: 'Ficha de Google para tu negocio',
    rssTitle: 'Crear y optimizar la ficha de Google',
    desc: 'Categorías, fotos, servicios y coherencia de datos con tu web.',
    tag: 'Google Mi Negocio',
    hubs: ['guias'],
  },
  {
    href: '/guias/aparecer-en-google-maps/',
    title: 'Cómo aparecer en Google Maps',
    rssTitle: 'Aparecer en Google Maps para tu negocio',
    desc: 'Qué necesita tu ficha y tu web para entrar al pack local y errores que lo bloquean.',
    tag: 'Google Maps',
    hubs: ['guias'],
  },
  {
    href: '/guias/resenas-google/',
    title: 'Reseñas de Google sin riesgos',
    rssTitle: 'Reseñas Google: cómo pedirlas y responder',
    desc: 'Cómo pedirlas, responderlas y evitar penalizaciones.',
    tag: 'Reseñas',
    hubs: ['guias'],
  },
  {
    href: '/guias/web-propia-vs-anuncios/',
    title: 'Web propia vs anuncios de Google',
    rssTitle: 'Web propia vs Google Ads para negocios',
    desc: 'Comparativa de coste, velocidad y cuándo usar cada canal.',
    tag: 'Comparativa',
    hubs: ['guias', 'comparativas'],
  },
  {
    href: '/guias/cuanto-cuesta-pagina-web-colombia/',
    title: '¿Cuánto cuesta una web en Colombia 2026?',
    rssTitle: 'Precio de página web en Colombia 2026',
    desc: 'Precios reales por tipo de sitio y qué suele quedar fuera de la cotización.',
    tag: 'Precios',
    hubs: ['guias', 'comparativas'],
  },
  {
    href: '/comparativas/web-administrada-vs-agencia/',
    title: 'Web administrada vs agencia vs DIY',
    rssTitle: 'Web administrada vs agencia vs DIY',
    desc: 'Tabla comparativa para decidir con claridad: costes, tiempos y control.',
    tag: 'Comparativa',
    hubs: ['comparativas'],
  },
];

export const guideIndex = siteIndex.filter((e) => e.hubs.includes('guias'));
export const comparisonIndex = siteIndex.filter((e) => e.hubs.includes('comparativas'));
