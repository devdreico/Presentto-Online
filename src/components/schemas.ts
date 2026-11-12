// Organization + WebSite schema shared by all pages (stable @id anchors)
import { plans, service } from '../data/service';
import { paymentLink } from '../data/payments';
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

// Service + OfferCatalog — se inyecta en el <head> vía la prop `plansOffers` de BaseLayout.
// Si un precio aún no existe (Empresa anual), se omite la oferta en lugar de inventarla.
export function serviceOffersSchema(path: string) {
  const offers = plans.flatMap((plan) => {
    const cycles = [
      { cycle: 'mensual' as const, price: plan.monthly, duration: 'P1M', unit: 'mensual' },
      { cycle: 'anual' as const, price: plan.annual, duration: 'P1Y', unit: 'anual' },
    ];

    return cycles
      .filter((c) => c.price !== null)
      .map((c) => {
        const url = paymentLink(plan.id, c.cycle);
        return {
          '@type': 'Offer',
          name: `${service.name} — ${plan.name} (${c.unit})`,
          ...(url ? { url } : {}),
          priceCurrency: 'COP',
          price: String(c.price),
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${site}#organization` },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(c.price),
            priceCurrency: 'COP',
            billingDuration: c.duration,
            billingIncrement: 1,
          },
        };
      });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${new URL(path, site).href}#service`,
    name: service.name,
    description: service.description,
    serviceType: 'Administración web y presencia digital',
    provider: { '@id': `${site}#organization` },
    areaServed: business.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Planes de Administración de Presencia Digital',
      itemListElement: offers.map((offer, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: offer,
      })),
    },
  };
}


export const organizationSchema = {
  '@context': 'https://schema.org',
  '@id': `${site}#organization`,
  '@type': 'Organization',
  name: business.name,
  alternateName: ['Presentto', 'Presento', 'Present To'],
  url: site,
  description: service.description,
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
  alternateName: ['Presentto', 'Presento', 'Present To'],
  url: site,
  inLanguage: 'es-CO',
  publisher: { '@id': `${site}#organization` },
  brand: { '@type': 'Brand', name: business.name },
};

// Service-area business (no public storefront): ProfessionalService + areaServed
const monthlyOffers = plans.map((plan) => ({
  '@type': 'Offer',
  name: `${service.name} — ${plan.name}`,
  itemOffered: {
    '@type': 'Service',
    name: `${service.name} — ${plan.name}`,
    description: plan.tagline,
  },
  ...(plan.fromPrice ? {} : { price: String(plan.monthly) }),
  ...(plan.fromPrice
    ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: String(plan.monthly), priceCurrency: 'COP' } }
    : {}),
  priceCurrency: 'COP',
  availability: 'https://schema.org/InStock',
}));

export const localBusinessSchema = (business.address || business.gbpUrl)
  ? {
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
      makesOffer: monthlyOffers,
    }
  : null;

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
