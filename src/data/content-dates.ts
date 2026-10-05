// Fuente única de fechas editoriales (YYYY-MM-DD).
// La usan: sitemap lastmod (astro.config.mjs), RSS pubDate (rss.xml.ts)
// y las metas article:* / TechArticle de las guías.
// Actualizar `modified` cada vez que se edite contenido de la ruta.

export interface ContentDates {
  published: string;
  modified: string;
}

export const contentDates: Record<string, ContentDates> = {
  '/guias/que-es-presencia-digital/': { published: '2026-10-01', modified: '2026-10-01' },
  '/guias/ficha-de-google-mi-negocio/': { published: '2026-10-01', modified: '2026-10-01' },
  '/guias/aparecer-en-google-maps/': { published: '2026-10-01', modified: '2026-10-01' },
  '/guias/resenas-google/': { published: '2026-10-01', modified: '2026-10-01' },
  '/guias/web-propia-vs-anuncios/': { published: '2026-10-01', modified: '2026-10-01' },
  '/guias/cuanto-cuesta-pagina-web-colombia/': { published: '2026-09-23', modified: '2026-10-01' },
  '/comparativas/web-administrada-vs-agencia/': { published: '2026-09-23', modified: '2026-09-24' },
  '/preguntas/': { published: '2026-10-01', modified: '2026-10-05' },
};

// Última revisión del sitio (páginas evergreen sin fecha editorial propia).
export const SITE_MODIFIED = '2026-10-01';

export function datesFor(path: string): ContentDates {
  const normalized = path.endsWith('/') || path === '' ? path : `${path}/`;
  return contentDates[normalized] ?? { published: SITE_MODIFIED, modified: SITE_MODIFIED };
}
