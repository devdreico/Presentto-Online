/**
 * Prueba social del servicio.
 *
 * REGLA: nada se publica sin `approved: true`. No inventar métricas,
 * testimonios ni resultados. Mientras un arreglo esté vacío, su sección
 * no se renderiza (ver components/ProofSection.astro).
 *
 * Para publicar un caso necesitas, como mínimo:
 *   - permiso escrito del cliente para nombrarlo;
 *   - una cifra verificable (Search Console, Analytics, reservas, ventas);
 *   - el periodo al que corresponde esa cifra.
 */

export interface CaseStudy {
  id: string;
  /** Nombre público del negocio (el mismo de /sitios/). */
  client: string;
  sector: string;
  /** Qué problema tenía, en una frase. */
  challenge: string;
  /** Qué hicimos, en 2–3 acciones concretas. */
  work: string[];
  /** Cifras verificables. Sin unidad inventada: valor + etiqueta + periodo. */
  metrics: Array<{ value: string; label: string }>;
  /** Enlace al sitio en producción. */
  url?: string;
  approved: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** Solo si el cliente autorizó ser nombrado. */
  client?: string;
  approved: boolean;
}

export interface VideoItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  duration: string;
  /** null = todavía no grabado: la tarjeta muestra "Próximamente". */
  url: string | null;
}

export const caseStudies: CaseStudy[] = [
  // Ejemplo de forma (no publicar hasta tener datos reales y `approved: true`):
  // {
  //   id: 'panaderia-x',
  //   client: 'Panadería X',
  //   sector: 'Panadería',
  //   challenge: 'Aparecía en Google Maps sin horarios ni fotos actualizadas.',
  //   work: ['Ficha corregida y verificada', 'Web con catálogo', 'GA4 + Search Console'],
  //   metrics: [
  //     { value: '+38%', label: 'clics desde Google' },
  //     { value: '12', label: 'consultas por WhatsApp / mes' },
  //   ],
  //   url: 'https://ejemplo.presentto.online/',
  //   approved: false,
  // },
];

export const testimonials: Testimonial[] = [
  // {
  //   quote: 'Texto literal autorizado por el cliente.',
  //   author: 'Nombre Apellido',
  //   role: 'Dueño, Negocio',
  //   client: 'Negocio',
  //   approved: false,
  // },
];

export const videos: VideoItem[] = [
  {
    id: 'presencia-local',
    tag: 'WEBINAR · 45 MIN',
    title: 'Presencia digital que se nota',
    description:
      'Qué revisa Google antes de mostrar tu negocio, cómo dejar la ficha lista y qué medir cada mes para saber si funciona.',
    duration: '45 min',
    url: null,
  },
  {
    id: 'ia-aplicada',
    tag: 'WEBINAR · 40 MIN',
    title: 'IA aplicada sin exponer tus datos',
    description:
      'Qué tareas delegar, qué información no debe salir de tu negocio y cómo revisar lo que produce un modelo antes de publicarlo.',
    duration: '40 min',
    url: null,
  },
];

export const approvedCases = () => caseStudies.filter((c) => c.approved);
export const approvedTestimonials = () => testimonials.filter((t) => t.approved);
export const hasProof = () => approvedCases().length > 0 || approvedTestimonials().length > 0;
