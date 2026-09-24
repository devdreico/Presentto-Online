import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.presentto.online';

// lastmod por familia de rutas (fechas de contenido / build)
function lastmodFor(url) {
  if (
    url.includes('/guias/') ||
    url.includes('/comparativas/web-administrada-vs-agencia/')
  ) {
    return '2026-09-24';
  }
  return '2026-09-24';
}

function priorityFor(url) {
  if (url.endsWith(`${SITE}/`)) return 1.0;
  if (url.includes('/servicios/')) return 0.9;
  if (url.endsWith('/guias/seo-local/')) return 0.9;
  if (url.includes('/contacto/')) return 0.8;
  if (
    url.includes('/funza/') ||
    url.includes('/mosquera/') ||
    url.includes('/madrid/') ||
    url.includes('/facatativa/')
  )
    return 0.8;
  if (url.includes('/preguntas/') || url.includes('/guias/') || url.includes('/comparativas/'))
    return 0.7;
  if (url.includes('/portfolio/') || url.includes('/nosotros/') || url.includes('/sitios/'))
    return 0.6;
  if (url.includes('/privacidad/') || url.includes('/terminos/') || url.includes('/cookies/'))
    return 0.3;
  return 0.5;
}

function changefreqFor(url) {
  if (url.endsWith(`${SITE}/`)) return 'daily';
  if (
    url.includes('/privacidad/') ||
    url.includes('/terminos/') ||
    url.includes('/cookies/')
  )
    return 'yearly';
  return 'weekly';
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        return {
          ...item,
          priority: priorityFor(item.url),
          changefreq: changefreqFor(item.url),
          lastmod: lastmodFor(item.url),
        };
      },
    }),
  ],
  compressHTML: true,
});
