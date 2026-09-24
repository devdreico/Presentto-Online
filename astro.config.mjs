import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

function priorityFor(url) {
  if (url.endsWith('https://www.presentto.online/')) return 1.0;
  if (url.includes('/servicios/')) return 0.9;
  if (url.includes('/guias/seo-local/') && url.endsWith('/guias/seo-local/')) return 0.9;
  if (url.includes('/contacto/')) return 0.8;
  if (url.includes('/funza/') || url.includes('/mosquera/') || url.includes('/madrid/') || url.includes('/facatativa/'))
    return 0.8;
  if (url.includes('/preguntas/') || url.includes('/guias/') || url.includes('/comparativas/')) return 0.7;
  if (url.includes('/portfolio/') || url.includes('/nosotros/') || url.includes('/sitios/')) return 0.6;
  return 0.5;
}

export default defineConfig({
  site: 'https://www.presentto.online',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) =>
        !page.includes('/privacidad') &&
        !page.includes('/terminos') &&
        !page.includes('/cookies') &&
        !page.includes('/404'),
      serialize(item) {
        return {
          ...item,
          priority: priorityFor(item.url),
          changefreq: item.url.endsWith('https://www.presentto.online/') ? 'daily' : 'weekly',
        };
      },
    }),
  ],
  compressHTML: true,
});
