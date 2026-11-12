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
  priceRange: '$100000-$1450000 COP',
  inLanguage: 'es-CO',
  slogan: 'La agencia todo en 1 para crecer digitalmente.',

  // NAP — dirección física/fiscal visible en GBP y schema (service-area business).
  address: null as PostalAddress | null,
  geo: null as GeoPoint | null,

  // URL de la ficha de Google Business Profile (si la pública es de dominio propio,
  // usa el enlace corto tipo https://g.page/r/... o https://maps.app.goo.gl/...).
  gbpUrl: null as string | null,

  // Redes/perfiles verificables (se añaden al `sameAs` de Organization y LocalBusiness).
  sameAs: [
    'https://wa.me/573236487336',
    'https://www.tiktok.com/@presenttonline',
    'https://www.instagram.com/presenttonline',
    'https://www.facebook.com/PresenttoOnline',
  ] as string[],

  // Persona responsable editorial (visible en artículos + schema Person).
  // Debe ser una persona real: añadir nombre y URL de bio en /nosotros/.
  editor: {
    name: 'Dilan Andrei Cifuentes Ortiz',
    jobTitle: 'Fundador y responsable editorial',
    url: '/nosotros/',
  } as Person | null,

  areaServed: [
    { '@type': 'Place', name: 'Colombia' },
    { '@type': 'Place', name: 'Funza, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Mosquera, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Madrid, Cundinamarca, Colombia' },
    { '@type': 'Place', name: 'Facatativá, Cundinamarca, Colombia' },
  ],
};

/* --------------------------------------------------------------------------
   CTAs — fuente única de WhatsApp.
   Jerarquía: diagnóstico gratis (primario) · ver planes (secundario).
   -------------------------------------------------------------------------- */
export const WA_NUMBER = '573236487336';

export const WA_MESSAGES = {
  diagnostico: 'Hola Presentto, quiero mi diagnóstico digital gratuito',
  soporte: 'Hola Presentto, necesito soporte de mi servicio de presencia digital',
  planes: 'Hola Presentto, quiero información sobre los planes de presencia digital',
} as const;

export function wa(message: string = WA_MESSAGES.diagnostico): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** CTA primario de todo el sitio. */
export const ctaDiagnostico = wa(WA_MESSAGES.diagnostico);
/** Número visible / enlace directo (sin mensaje). */
export const waDirect = `https://wa.me/${WA_NUMBER}`;
/** Soporte para clientes activos. */
export const waSoporte = wa(WA_MESSAGES.soporte);

export const serviceHours = {
  /** Uso en frases: «Atención humana lunes a domingo…». */
  humanInline: 'lunes a domingo, 7:00–19:00 (America/Bogota)',
  human: 'Lunes a domingo, 7:00–19:00 (America/Bogota)',
  whatsapp: '24/7',
} as const;
