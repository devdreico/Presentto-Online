// Planes prepago — fuente única (render, schema de ofertas y página /precios/).

export interface Plan {
  id: string;
  name: string;
  price: string;
  unit: string;
  per: string;
  url: string;
  badge: string;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    id: 'plan-1-mes',
    name: '1 mes',
    price: '$40.000',
    unit: 'COP / mes',
    per: 'Pago único del mes · sin suscripción',
    url: 'https://mpago.li/2j4gTPj',
    badge: '',
    featured: false,
  },
  {
    id: 'plan-3-meses',
    name: '3 meses',
    price: '$100.000',
    unit: 'COP / 3 meses',
    per: 'Pago único · equivale a $33.333/mes',
    url: 'https://mpago.li/17JYVwX',
    badge: 'Ahorras $20.000',
    featured: false,
  },
  {
    id: 'plan-6-meses',
    name: '6 meses',
    price: '$190.000',
    unit: 'COP / 6 meses',
    per: 'Pago único · equivale a $31.667/mes',
    url: 'https://mpago.li/1j4eF1j',
    badge: 'Popular · Ahorras $50.000',
    featured: true,
  },
  {
    id: 'plan-1-anio',
    name: '1 año',
    price: '$350.000',
    unit: 'COP / año',
    per: 'Pago único · equivale a $29.167/mes',
    url: 'https://mpago.li/344eu17',
    badge: 'Mejor valor · Ahorras $130.000',
    featured: false,
  },
];
