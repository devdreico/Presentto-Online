/**
 * Clientes de referencia. Muestra real, sin tipo de plan ni condiciones.
 * Los 15 sitios responden en *.presentto.online (verificado 2026-11-12).
 */
export interface ClientSite {
  name: string;
  slug: string;
  url: string;
}

export const clients: ClientSite[] = [
  { name: 'Botane', slug: 'botane', url: 'https://botane.presentto.online/' },
  { name: 'KSPR', slug: 'kspr', url: 'https://kspr.presentto.online/' },
  { name: 'Esturel', slug: 'esturel', url: 'https://esturel.presentto.online/' },
  { name: 'LYL', slug: 'lyl', url: 'https://lyl.presentto.online/' },
  { name: 'Viking Dogs', slug: 'vikingdogs', url: 'https://vikingdogs.presentto.online/' },
  { name: 'YA', slug: 'ya', url: 'https://ya.presentto.online/' },
  { name: 'Knifopics', slug: 'knifopics', url: 'https://knifopics.presentto.online/' },
  { name: 'Aeperion', slug: 'aeperion', url: 'https://aeperion.presentto.online/' },
  { name: 'USPKH', slug: 'uspkh', url: 'https://uspkh.presentto.online/' },
  { name: 'Gatitools', slug: 'gatitools', url: 'https://gatitools.presentto.online/' },
  { name: 'Paceform', slug: 'paceform', url: 'https://paceform.presentto.online/' },
  { name: 'Saniver', slug: 'saniver', url: 'https://saniver.presentto.online/' },
  { name: 'Korall BS', slug: 'korall-bs', url: 'https://korall-bs.presentto.online/' },
  { name: 'Miriads', slug: 'miriads', url: 'https://miriads.presentto.online/' },
  { name: 'Vexna', slug: 'vexna', url: 'https://vexna.presentto.online/' },
];
