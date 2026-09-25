import { datesFor } from '../data/content-dates';

const SITE = 'https://www.presentto.online';

const items = [
  {
    title: 'Guía de SEO local para negocios (2026)',
    path: '/guias/seo-local/',
    desc: 'Pack local, Google Maps, reseñas y checklist para negocios en tu ciudad.',
  },
  {
    title: 'Qué es el SEO local y cómo funciona',
    path: '/guias/seo-local/que-es-seo-local/',
    desc: 'Definición, pack de Google, factores de ranking y ejemplos locales.',
  },
  {
    title: 'Optimizar Google Business Profile',
    path: '/guias/seo-local/google-business-profile/',
    desc: 'Categorías, servicios, fotos, horarios y coherencia NAP con tu web.',
  },
  {
    title: 'Aparecer en Google Maps para tu negocio',
    path: '/guias/seo-local/aparecer-en-google-maps/',
    desc: 'Ficha verificada, categorías, reseñas y schema local.',
  },
  {
    title: 'Reseñas Google: cómo pedirlas y responder',
    path: '/guias/seo-local/resenas-google/',
    desc: 'Plantillas, reseñas negativas y errores que penalizan tu reputación.',
  },
  {
    title: 'SEO local vs Google Ads para negocios',
    path: '/guias/seo-local/seo-vs-anuncios-google/',
    desc: 'Coste, velocidad y cuándo usar cada canal local.',
  },
  {
    title: 'Precio de página web en Colombia 2026',
    path: '/guias/cuanto-cuesta-pagina-web-colombia/',
    desc: 'Landing, corporativo y e-commerce: tabla de costes 2026.',
  },
  {
    title: 'Web administrada vs agencia vs DIY',
    path: '/comparativas/web-administrada-vs-agencia/',
    desc: 'Costes reales en COP, control, tiempos y a quién conviene cada opción.',
  },
];

export function GET() {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const rfc822 = (isoDate: string) =>
    new Date(`${isoDate}T00:00:00Z`).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Presentto Online — Guías</title>
    <link>${SITE}/guias/</link>
    <description>Guías de SEO local, Google Business y precios reales de páginas web en Colombia — de Presentto, web administrada desde $40.000 COP.</description>
    <language>es-CO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map((i) => {
    const link = `${SITE}${i.path}`;
    return `    <item>
      <title>${escape(i.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(i.desc)}</description>
      <pubDate>${rfc822(datesFor(i.path).published)}</pubDate>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
