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
    href: '/guias/seo-local/',
    title: 'Guía completa de SEO local',
    rssTitle: 'Guía de SEO local para negocios (2026)',
    desc: 'Pilar: definición, factores, checklist y estrategia para negocios locales.',
    tag: 'Pilar',
    hubs: ['guias'],
  },
  {
    href: '/guias/seo-local/que-es-seo-local/',
    title: '¿Qué es el SEO local?',
    rssTitle: 'Qué es el SEO local y cómo funciona',
    desc: 'Definición operativa, ejemplos de búsqueda y los 3 pilares del ranking local.',
    tag: 'SEO local',
    hubs: ['guias'],
  },
  {
    href: '/guias/seo-local/google-business-profile/',
    title: 'Google Business Profile paso a paso',
    rssTitle: 'Optimizar Google Business Profile',
    desc: 'Categorías, fotos, servicios y coherencia NAP con tu web.',
    tag: 'SEO local',
    hubs: ['guias'],
  },
  {
    href: '/guias/seo-local/aparecer-en-google-maps/',
    title: 'Cómo aparecer en Google Maps',
    rssTitle: 'Aparecer en Google Maps para tu negocio',
    desc: 'Orden de factores para entrar al pack local y errores que lo bloquean.',
    tag: 'SEO local',
    hubs: ['guias'],
  },
  {
    href: '/guias/seo-local/resenas-google/',
    title: 'Reseñas de Google sin riesgos',
    rssTitle: 'Reseñas Google: cómo pedirlas y responder',
    desc: 'Cómo pedirlas, responderlas y evitar penalizaciones.',
    tag: 'SEO local',
    hubs: ['guias'],
  },
  {
    href: '/guias/seo-local/seo-vs-anuncios-google/',
    title: 'SEO local vs anuncios de Google',
    rssTitle: 'SEO local vs Google Ads para negocios',
    desc: 'Comparativa de coste, velocidad y cuándo usar cada canal.',
    tag: 'SEO local',
    hubs: ['guias'],
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
