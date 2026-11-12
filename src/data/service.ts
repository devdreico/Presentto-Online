/**
 * Fuente única de la oferta: Administración de Presencia Digital.
 * Precios en COP con IVA incluido (IVA a cargo de Presentto).
 * Mantener en sincronía con docs/servicio-administracion.md.
 */

export type PlanId = 'presencia' | 'crecimiento' | 'sistemas' | 'empresa';
export type BillingCycle = 'mensual' | 'anual';

export interface ServicePlan {
  id: PlanId;
  name: string;
  tagline: string;
  forWho: string;
  /** Precio mensual en COP. En Empresa es el mínimo ("desde"). */
  monthly: number;
  /** Precio anual en COP. null = cotización. */
  annual: number | null;
  /** Implementación inicial en COP. null = cotizada. */
  setup: number | null;
  fromPrice?: boolean;
  featured?: boolean;
  includes: string[];
  tools: string[];
  sla: {
    firstResponse: string;
    resolution: string;
  };
}

export const service = {
  name: 'Administración de Presencia Digital',
  tagline: 'La agencia todo en 1 para crecer digitalmente.',
  shortName: 'Presencia Digital',
  description:
    'Administramos tu web, tu ficha de Google, tu analítica y tus sistemas. Construimos lo que falta y usamos IA para que cada apartado digital de tu negocio mejore.',
  audience: 'Negocios locales, pymes y empresas medianas o grandes.',
  hours: 'Atención humana 7:00–19:00 (America/Bogota), todos los días. WhatsApp 24/7.',
  currency: 'COP',
  vat: 'IVA incluido. IVA a cargo de Presentto.',
} as const;

export const plans: ServicePlan[] = [
  {
    id: 'presencia',
    name: 'Presencia',
    tagline: 'Tu negocio en línea, bien presentado y sin preocupaciones.',
    forWho: 'Negocios locales y profesionales que necesitan existir bien y no quieren administrar lo técnico.',
    monthly: 100000,
    annual: 1020000,
    setup: 250000,
    includes: [
      'Web administrada: hosting, dominio o subdominio, SSL, backups y monitoreo',
      'Web nueva base si no existe: landing o sitio de hasta 5 secciones',
      'Correo profesional con 1 buzón',
      '2 cambios de contenido al mes (textos, fotos, precios, horarios)',
      'Ficha de Google creada o corregida: categorías, horarios, servicios y fotos',
      'Analítica base instalada: GA4, Search Console y Clarity',
      'Reporte trimestral en PDF con tráfico, clics y estado del sitio',
      'Soporte por WhatsApp 24/7 y respuesta humana en horario hábil',
    ],
    tools: ['Astro', 'Vercel', 'Cloudflare DNS', 'Google Workspace / Zoho', 'GA4', 'Search Console', 'Clarity', 'UptimeRobot'],
    sla: { firstResponse: '8 h hábiles', resolution: '48 h hábiles' },
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    tagline: 'Más demanda: SEO local, reseñas, contenido y automatización.',
    forWho: 'Pymes que ya tienen presencia y necesitan que esa presencia genere consultas.',
    monthly: 299000,
    annual: 3050000,
    setup: 250000,
    featured: true,
    includes: [
      'Todo lo de Presencia',
      '6 cambios de contenido al mes',
      'SEO local mensual: títulos, metas, enlaces internos, datos estructurados y Core Web Vitals',
      '4 publicaciones mensuales en la ficha de Google',
      'Gestión de reseñas: solicitud a clientes y respuesta a todas',
      '1 landing de campaña al año (hasta 3 secciones)',
      'Reporte mensual en Looker Studio con conversiones y tareas del mes',
      '1 flujo de automatización con IA (WhatsApp, cotizaciones o seguimiento)',
      'Reunión trimestral de 30 minutos',
    ],
    tools: ['Todo lo anterior', 'Looker Studio', 'Keyword Planner', 'n8n / Make', 'WhatsApp Business', 'Canva'],
    sla: { firstResponse: '4 h hábiles', resolution: '48 h hábiles' },
  },
  {
    id: 'sistemas',
    name: 'Sistemas',
    tagline: 'Tu operación digital hace trabajo real.',
    forWho: 'Negocios con reservas, catálogos, cotizaciones o portales que hoy se hacen a mano.',
    monthly: 640000,
    annual: 6530000,
    setup: 750000,
    includes: [
      'Todo lo de Crecimiento',
      '10 cambios de contenido al mes',
      'Implementación de sistemas web: reservas, catálogos, formularios avanzados, portales y cotizadores',
      'Base de datos y autenticación con Supabase',
      '3 flujos de automatización con IA y 1 integración por trimestre (Sheets, CRM, correo o pagos)',
      'Panel de indicadores a medida en Looker Studio',
      'Soporte prioritario: primera respuesta en 2 horas hábiles',
      'Inducción IA extendida para el equipo (4 sesiones)',
    ],
    tools: ['Todo lo anterior', 'Supabase', 'Vercel Functions', 'Google Sheets API', 'Mercado Pago', 'Sentry'],
    sla: { firstResponse: '2 h hábiles', resolution: '24 h hábiles' },
  },
  {
    id: 'empresa',
    name: 'Empresa',
    tagline: 'Un equipo digital dedicado, con SLA contractual.',
    forWho: 'Empresas medianas o grandes con varias sedes, marcas o integraciones críticas.',
    monthly: 1450000,
    annual: null,
    setup: null,
    fromPrice: true,
    includes: [
      'Todo lo de Sistemas',
      'Equipo dedicado: dirección digital, implementación y soporte',
      'Multi-sede y multi-marca',
      'Integraciones con ERP/CRM y automatizaciones a medida',
      'Seguridad: revisión de accesos, roles, respaldos y política de datos',
      'Reunión mensual de 45 minutos y plan de crecimiento trimestral',
      'Capacitación IA para equipos de hasta 10 personas',
    ],
    tools: ['Stack a medida', 'Integraciones ERP/CRM', 'Automatizaciones a medida', 'Soporte contractual'],
    sla: { firstResponse: 'Contractual', resolution: 'Contractual' },
  },
];

export const prepaid = {
  cycles: ['mensual', 'anual'] as const,
  annualDiscount: '15% (2 meses)',
  note: 'Sin suscripción automática ni permanencia más allá del plazo pagado.',
};

export const addons = [
  {
    name: 'Curso de aplicación IA',
    price: 350000,
    unit: 'único',
    detail: '4 sesiones de 60 min para el equipo, con un flujo real implementado.',
  },
  {
    name: 'Landing adicional',
    price: 450000,
    unit: 'único',
    detail: 'Hasta 5 secciones, integrada a la analítica y al CRM del cliente.',
  },
  {
    name: 'Campaña paga gestionada',
    price: 400000,
    unit: 'mes + inversión',
    detail: 'Google Ads o Meta Ads. La inversión publicitaria se paga aparte.',
  },
  {
    name: 'Migración de web existente',
    price: 350000,
    unit: 'único',
    detail: 'Inventario, traslado, redirecciones 301 y verificación de indexación.',
  },
];

export const aiOnboarding = {
  name: 'Inducción IA',
  duration: '45 minutos',
  includedIn: 'Todos los planes',
  modules: [
    'Qué puede y qué no puede hacer la IA en un negocio real',
    'Diagnóstico: tres tareas que hoy consumen tiempo',
    'Prácticas: atención, cotizaciones, servicios y contenido',
    'Seguridad y datos: qué nunca se pega en un chat de IA',
    'Plan de adopción de 30 días',
  ],
  deliverables: [
    'Grabación de la sesión',
    '20 prompts adaptados al negocio',
    'Checklist de seguridad',
    'Plan de 30 días',
  ],
};

const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function cop(value: number): string {
  return copFormatter.format(value).replace(/\s/g, '');
}

/* --------------------------------------------------------------------------
   Pilares, método y comparativa
   -------------------------------------------------------------------------- */

export interface Pillar {
  title: string;
  desc: string;
  items: string[];
}

export const pillars: Pillar[] = [
  {
    title: 'Administración web',
    desc: 'Tu web operada, no abandonada. Nosotros respondemos por el hosting, el correo y los cambios.',
    items: [
      'Hosting, dominio o subdominio, SSL y correo profesional',
      'Backups, monitoreo de uptime y actualizaciones',
      'Cambios de textos, fotos, precios y horarios',
      'Velocidad y Core Web Vitals cuidados mes a mes',
    ],
  },
  {
    title: 'Implementación y sistemas',
    desc: 'Lo que falta, construido con estructura real: web nueva, reservas, catálogos o portales.',
    items: [
      'Web nueva base cuando no existe',
      'Sistemas web: reservas, catálogos, cotizadores',
      'Formularios avanzados y portales de cliente',
      'Bases de datos y autenticación con Supabase',
    ],
  },
  {
    title: 'Presencia digital',
    desc: 'Donde te buscan: ficha de Google, reseñas, contenido y búsqueda local.',
    items: [
      'Ficha de Google creada, corregida y actualizada',
      'SEO local: títulos, metas, enlaces y datos estructurados',
      'Gestión de reseñas y publicaciones',
      'Contenido y redes según el plan',
    ],
  },
  {
    title: 'IA aplicada',
    desc: 'No vendemos humo de IA: instalamos flujos que ahorran tiempo en tareas reales.',
    items: [
      'Inducción para usar IA con criterio',
      'Automatizaciones de atención y seguimiento',
      'Contenido y respuestas asistidas',
      'Seguridad y datos: qué nunca se comparte',
    ],
  },
];

export interface WorkflowStep {
  title: string;
  desc: string;
  ai: string;
}

export const aiWorkflow: WorkflowStep[] = [
  {
    title: 'Diagnóstico',
    desc: 'Inventario de web, ficha, redes, analítica y accesos. Detectamos qué frena al negocio.',
    ai: 'Auditoría asistida: contenido, velocidad, indexación y coherencia de datos.',
  },
  {
    title: 'Priorización',
    desc: 'Plan de 30 días con impacto y esfuerzo. Nada de listas infinitas.',
    ai: 'Clasificación de tareas y borradores de contenido con revisión humana.',
  },
  {
    title: 'Implementación',
    desc: 'Web, ficha, analítica y sistemas. Cada entrega se prueba antes de publicarse.',
    ai: 'Estructura, textos base y datos estructurados revisados por una persona.',
  },
  {
    title: 'Automatización',
    desc: 'Flujos de atención, cotización y seguimiento conectados al negocio.',
    ai: 'Respuestas, resúmenes y alertas con límites y trazabilidad.',
  },
  {
    title: 'Medición',
    desc: 'Reporte con tráfico, consultas, clics y tareas del mes.',
    ai: 'Lectura de datos y detección de anomalías; decisiones humanas.',
  },
];

export const process = [
  {
    title: 'Diagnóstico',
    desc: 'Revisamos web, ficha de Google, redes y accesos. Identificamos qué mejorar primero.',
  },
  {
    title: 'Plan de 30 días',
    desc: 'Entregables, responsables y fechas. Sin promesas fuera de alcance.',
  },
  {
    title: 'Implementación',
    desc: 'Construimos o corregimos web, ficha, analítica, sistemas y automatizaciones.',
  },
  {
    title: 'Inducción IA',
    desc: '45 minutos para que tu equipo use IA con criterio y sin exponer datos.',
  },
  {
    title: 'Operación',
    desc: 'Cambios, monitoreo, soporte y reporte según el plan contratado.',
  },
  {
    title: 'Revisión',
    desc: 'Cada mes o trimestre ajustamos el plan con datos, no con opiniones.',
  },
];

export interface ComparisonRow {
  label: string;
  values: [string, string, string, string];
}

export const comparisonRows: ComparisonRow[] = [
  { label: 'Inversión mensual', values: ['$100.000', '$299.000', '$640.000', 'Desde $1.450.000'] },
  { label: 'Web administrada', values: ['✓', '✓', '✓', '✓'] },
  { label: 'Web nueva base', values: ['✓', '✓', '✓', '✓'] },
  { label: 'Dominio y correo profesional', values: ['✓', '✓', '✓', '✓'] },
  { label: 'Cambios de contenido al mes', values: ['2', '6', '10', 'A convenir'] },
  { label: 'Ficha de Google', values: ['Básica', 'Completa', 'Completa', 'Multi-sede'] },
  { label: 'SEO local', values: ['Auditoría', 'Mensual', 'Mensual', 'Estratégico'] },
  { label: 'Gestión de reseñas', values: ['—', '✓', '✓', '✓'] },
  { label: 'Sistemas web', values: ['—', '—', '✓', '✓'] },
  { label: 'Automatizaciones con IA', values: ['—', '1 flujo', '3 flujos', 'A medida'] },
  { label: 'Reporte', values: ['Trimestral', 'Mensual', 'Mensual', 'Contractual'] },
  { label: 'Primera respuesta', values: ['8 h', '4 h', '2 h', 'Contractual'] },
];
