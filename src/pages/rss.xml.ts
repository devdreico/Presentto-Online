export function GET() {
  const site = 'https://www.presentto.online';
  const items = [
    {
      title: 'Guía de SEO local para negocios (2026)',
      link: `${site}/guias/seo-local/`,
      desc: 'Pack local, Google Maps, reseñas y checklist para negocios en tu ciudad.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Qué es el SEO local y cómo funciona',
      link: `${site}/guias/seo-local/que-es-seo-local/`,
      desc: 'Definición, pack de Google, factores de ranking y ejemplos locales.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Optimizar Google Business Profile',
      link: `${site}/guias/seo-local/google-business-profile/`,
      desc: 'Categorías, servicios, fotos, horarios y coherencia NAP con tu web.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Aparecer en Google Maps para tu negocio',
      link: `${site}/guias/seo-local/aparecer-en-google-maps/`,
      desc: 'Ficha verificada, categorías, reseñas y schema local.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Reseñas Google: cómo pedirlas y responder',
      link: `${site}/guias/seo-local/resenas-google/`,
      desc: 'Plantillas, reseñas negativas y errores que penalizan tu reputación.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'SEO local vs Google Ads para negocios',
      link: `${site}/guias/seo-local/seo-vs-anuncios-google/`,
      desc: 'Coste, velocidad y cuándo usar cada canal local.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Precio de página web en Colombia 2026',
      link: `${site}/guias/cuanto-cuesta-pagina-web-colombia/`,
      desc: 'Landing, corporativo y e-commerce: tabla de costes 2026.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
    {
      title: 'Web administrada vs agencia vs DIY',
      link: `${site}/comparativas/web-administrada-vs-agencia/`,
      desc: 'Costes reales en COP, control, tiempos y a quién conviene cada opción.',
      pubDate: 'Tue, 23 Sep 2026 00:00:00 +0000',
    },
  ];

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Presentto Online — Guías</title>
    <link>${site}/guias/</link>
    <description>Guías de SEO local, Google Business y precios de páginas web en Colombia.</description>
    <language>es-CO</language>
    <lastBuildDate>Wed, 24 Sep 2026 00:00:00 +0000</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `    <item>
      <title>${escape(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.link}</guid>
      <description>${escape(i.desc)}</description>
      <pubDate>${i.pubDate}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
