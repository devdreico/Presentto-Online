// Organization + WebSite schema shared by all pages (stable @id anchors)
const site = 'https://www.presentto.online/';

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
  slogan: 'Presencia online profesional desde $40.000 COP/mes',
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
  priceRange: '$40000-$389000 COP',
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
        description: 'Sitio web con dominio, correo y SEO local — plan de 1 mes.',
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
      itemOffered: { '@type': 'Service', name: 'Presenttación Digital' },
      price: '210000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/1j4eF1j',
    },
    {
      '@type': 'Offer',
      name: 'Presenttación Digital — 1 año',
      itemOffered: { '@type': 'Service', name: 'Presenttación Digital' },
      price: '389000',
      priceCurrency: 'COP',
      url: 'https://mpago.li/344eu17',
    },
  ],
};
