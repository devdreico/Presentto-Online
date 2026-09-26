// Fuente única de datos del negocio (NAP, enlaces, personas y moneda).
// IMPORTANTE: rellenar `address`, `geo` y `gbpUrl` con los datos REALES de la ficha
// de Google Business Profile. No inventar: Google penaliza el NAP falso.
// scripts/seo/validate-seo.mjs avisa cuando siguen en null (no bloquea el build).

export interface PostalAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Person {
  name: string;
  jobTitle: string;
  url?: string;
}

export const business = {
  name: 'Presentto Online',
  legalName: 'Soverath Holding S.A.S.',
  parentOrganization: 'Soverath Holding S.A.S.',
  url: 'https://www.presentto.online/',
  email: 'inbox@presentto.online',
  telephone: '+57-323-648-7336',
  priceRange: '$40000-$350000 COP',
  inLanguage: 'es-CO',
  slogan:
    'Web administrada con SEO local y posicionamiento en Google desde $40.000 COP/mes — demo gratis',

  // NAP — dirección física/fiscal visible en GBP y schema (service-area business).
  address: null as PostalAddress | null,
  geo: null as GeoPoint | null,

  // URL de la ficha de Google Business Profile (si la pública es de dominio propio,
  // usa el enlace corto tipo https://g.page/r/... o https://maps.app.goo.gl/...).
  gbpUrl: null as string | null,

  // Redes/perfiles verificables (se añaden al `sameAs` de Organization y LocalBusiness).
  sameAs: ['https://wa.me/573236487336'] as string[],

  // Persona responsable editorial (visible en artículos + schema Person).
  // Debe ser una persona real: añadir nombre y URL de bio en /nosotros/.
  editor: null as Person | null,

  areaServed: [
    { '@type': 'Place', name: 'Funza, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Mosquera, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Madrid, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Facatativá, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Sabana Occidental, Colombia' },
  ],
};

// Tipo de cambio de referencia para mostrar equivalente USD junto a los precios COP.
// Actualizar mensualmente (fuente: Banco de la República o rate.administrativo).
export const COP_PER_USD = 4050;

// Equivalente aproximado en USD de un monto en COP (redondeado a la decena).
export function usd(cop: number): string {
  const value = Math.round(cop / COP_PER_USD / 10) * 10;
  return `US$${value}`;
}
