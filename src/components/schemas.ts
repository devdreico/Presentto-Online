// Organization + WebSite schema shared by all pages (stable @id anchors)
import { plans } from '../data/plans';
import { business } from '../data/business';

const site = 'https://www.presentto.online/';

// Enlaces verificables (redes + ficha de GBP si existe)
const sameAs = business.gbpUrl ? [...business.sameAs, business.gbpUrl] : business.sameAs;

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
  name: business.name,
  url: site,
  logo: {
    '@type': 'ImageObject',
    url: `${site}assets/img/Presentto-Icono-Fondo-Transparente.webp`,
  },
  email: business.email,
  telephone: business.telephone,
  slogan: business.slogan,
  knowsLanguage: 'es-CO',
  ...(business.address ? { address: business.address } : {}),
  ...(business.geo ? { location: { '@type': 'GeoCoordinates', ...business.geo } } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: business.email,
    telephone: business.telephone,
    areaServed: 'CO',
    availableLanguage: 'Spanish',
  },
  areaServed: business.areaServed,
  sameAs,
  parentOrganization: {
    '@type': 'Organization',
    name: business.parentOrganization,
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
  name: business.name,
  url: site,
  image: `${site}assets/img/og-presentto.webp`,
  email: business.email,
  telephone: business.telephone,
  priceRange: business.priceRange,
  currencyAccepted: 'COP',
  paymentAccepted: 'Mercado Pago, transferencia',
  ...(business.address ? { address: business.address } : {}),
  ...(business.geo ? { geo: { '@type': 'GeoCoordinates', ...business.geo } } : {}),
  ...(business.gbpUrl ? { hasMap: business.gbpUrl } : {}),
  sameAs,
  areaServed: business.areaServed,
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

// Person (E-E-A-T) — se activa al configurar `business.editor` en src/data/business.ts.
// Mientras no haya persona real configurada, los artículos firman como Organization.
export const authorRef = business.editor
  ? {
      '@type': 'Person',
      '@id': `${site}#editor`,
      name: business.editor.name,
      jobTitle: business.editor.jobTitle,
      url: business.editor.url ?? `${site}nosotros/`,
      worksFor: { '@id': `${site}#organization` },
    }
  : {
      '@type': 'Organization',
      name: business.name,
      url: `${site}nosotros/`,
    };

export function personSchema() {
  if (!business.editor) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site}#editor`,
    name: business.editor.name,
    jobTitle: business.editor.jobTitle,
    worksFor: { '@id': `${site}#organization` },
    ...(business.editor.url ? { url: business.editor.url } : {}),
  };
}
