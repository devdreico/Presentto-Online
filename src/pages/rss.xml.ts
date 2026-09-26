import { datesFor } from '../data/content-dates';
import { siteIndex } from '../data/site-index';

const SITE = 'https://www.presentto.online';

const items = siteIndex.map((e) => ({
  title: e.rssTitle ?? e.title,
  path: e.href,
  desc: e.desc,
}));

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
