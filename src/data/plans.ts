// Planes prepago — fuente única (render, schema de ofertas y página /precios/).
import { usd } from './business';

export interface Plan {
  id: string;
  name: string;
  price: string;
  /** Equivalente aproximado en USD del precio total del plan */
  priceUsd: string;
  cop: number;
  unit: string;
  per: string;
  url: string;
  badge: string;
  featured: boolean;
}

const rawPlans: Array<Omit<Plan, 'price' | 'priceUsd'>> = [
  {
    id: 'plan-mvo-mensual',
    name: 'MVO Mensual',
    cop: 15000,
    unit: 'COP / mes',
    per: 'Subdominio cliente.presentto.online · Sin permanencia',
    url: 'https://mpago.li/1iJFAwE',
    badge: 'MVO · Subdominio',
    featured: false,
  },
  {
    id: 'plan-mvo-anual',
    name: 'MVO Anual',
    cop: 120000,
    unit: 'COP / año',
    per: 'Equivale a $10.000/mes · Ahorras $60.000',
    url: 'https://mpago.li/113CYVC',
    badge: 'Mejor valor MVO',
    featured: true,
  },
  {
    id: 'plan-1-mes',
    name: '1 mes (Dominio propio)',
    cop: 40000,
    unit: 'COP / mes',
    per: 'Dominio propio y correo · sin suscripción',
    url: 'https://mpago.li/2j4gTPj',
    badge: 'Dominio propio',
    featured: false,
  },
  {
    id: 'plan-3-meses',
    name: '3 meses (Dominio propio)',
    cop: 100000,
    unit: 'COP / 3 meses',
    per: 'Equivale a $33.333/mes',
    url: 'https://mpago.li/17JYVwX',
    badge: 'Ahorras $20.000',
    featured: false,
  },
  {
    id: 'plan-6-meses',
    name: '6 meses (Dominio propio)',
    cop: 190000,
    unit: 'COP / 6 meses',
    per: 'Equivale a $31.667/mes',
    url: 'https://mpago.li/1j4eF1j',
    badge: 'Popular · Ahorras $50.000',
    featured: false,
  },
  {
    id: 'plan-1-anio',
    name: '1 año (Dominio propio)',
    cop: 350000,
    unit: 'COP / año',
    per: 'Equivale a $29.167/mes',
    url: 'https://mpago.li/344eu17',
    badge: 'Mejor valor',
    featured: false,
  },
];

export const plans: Plan[] = rawPlans.map((p) => ({
  ...p,
  price: `${p.cop.toLocaleString('es-CO')}`,
  priceUsd: usd(p.cop),
}));
