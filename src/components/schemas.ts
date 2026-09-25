// Organization + WebSite schema shared by all pages (stable @id anchors)
import { plans } from '../data/plans';

const site = 'https://www.presentto.online/';

export interface Crumb {
  label: string;
  href?: string;
}

export interface Faq {
  q: string;
  a: string;
}

// BreadcrumbList — se inyecta en el <head> vía la prop `breadcrumbs` de BaseLayout
export function breadcrumbSchema(items: Crumb[], path: string) {
  const pageUrl = new URL(path, site).href;
  const absolute = (href?: string) => (href ? new URL(href, site).href : undefined);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absolute(item.href) } : {}),
    })),
  };
}

// FAQPage — se inyecta en el <head> vía la prop `faqs` de BaseLayout
export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ItemList de ofertas — se inyecta en el <head> vía la prop `plansOffers` de BaseLayout
export function plansItemListSchema(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Planes Presenttación Digital',
    url: new URL(path, site).href,
    itemListElement: plans.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Offer',
        name: `Presenttación Digital — ${p.name}`,
        url: p.url,
        priceCurrency: 'COP',
        price: p.price.replace(/[^\d]/g, ''),
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${site}#organization` },
      },
    })),
  };
}


export const organizationSchema = {
  '@context': 'https://schema.org',
  '@id': `${site}#organization`,
  '@type': 'Organization',
  name: 'Presentto Online',
  url: site,
  logo: {
    '@type': 'ImageObject',
    url: `${site}assets/img/Presentto-Icono-Fondo-Transparente.webp`,
  },
  email: 'inbox@presentto.online',
  telephone: '+57-323-648-7336',
  slogan: 'Web administrada con SEO local y posicionamiento en Google desde $40.000 COP/mes — demo gratis',
  knowsLanguage: 'es-CO',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'inbox@presentto.online',
    telephone: '+57-323-648-7336',
    areaServed: 'CO',
    availableLanguage: 'Spanish',
  },
  areaServed: [
    { '@type': 'Place', name: 'Funza, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Mosquera, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Madrid, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Facatativá, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Sabana Occidental, Colombia' },
  ],
  sameAs: ['https://wa.me/573236487336'],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Soverath Holding S.A.S.',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@id': `${site}#website`,
  '@type': 'WebSite',
  name: 'Presentto Online',
  url: site,
  inLanguage: 'es-CO',
  publisher: { '@id': `${site}#organization` },
};

// Service-area business (no public storefront): LocalBusiness + areaServed
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site}#localbusiness`,
  name: 'Presentto Online',
  url: site,
  image: `${site}assets/img/og-presentto.webp`,
  email: 'inbox@presentto.online',
  telephone: '+57-323-648-7336',
  priceRange: '$40000-$350000 COP',
  currencyAccepted: 'COP',
  paymentAccepted: 'Mercado Pago, transferencia',
  areaServed: [
    { '@type': 'Place', name: 'Funza, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Mosquera, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Madrid, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Facatativá, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Sabana Occidental, Colombia' },
  ],
  parentOrganization: { '@id': `${site}#organization` },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Presenttación Digital — 1 mes',
      itemOffered: {
        '@type': 'Service',
        name: 'Presenttación Digital',
        description: 'Sitio web con SEO on-page, SEO local, schema y dominio — plan de 1 mes.',
      },
      price: '40000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/2j4gTPj',
    },
    {
      '@type': 'Offer',
      name: 'Presenttación Digital — 3 meses',
      itemOffered: { '@type': 'Service', name: 'Presenttación Digital' },
      price: '100000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/17JYVwX',
    },
    {
      '@type': 'Offer',
      name: 'Presenttación Digital — 6 meses',
      description: 'IVA incluido',
      price: '190000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/1j4eF1j',
    },
    {
      '@type': 'Offer',
      name: 'Presenttación Digital — 1 año',
      description: 'IVA incluido',
      price: '350000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/344eu17',
    },
  ],
};
