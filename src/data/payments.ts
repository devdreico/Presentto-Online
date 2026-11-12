/**
 * Links de pago de Mercado Pago — 4 planes × mensual/anual.
 * Pegar las 8 URLs aquí. Mientras estén vacías, la UI muestra
 * "Solicitar link de pago" (WhatsApp) y el schema omite la oferta.
 *
 * No cambiar los precios desde este archivo: viven en service.ts.
 */
import type { BillingCycle, PlanId } from './service';

export const paymentLinks: Record<PlanId, Record<BillingCycle, string>> = {
  presencia: { mensual: '', anual: '' },
  crecimiento: { mensual: '', anual: '' },
  sistemas: { mensual: '', anual: '' },
  empresa: { mensual: '', anual: '' },
};

export function paymentLink(plan: PlanId, cycle: BillingCycle): string {
  return paymentLinks[plan]?.[cycle] ?? '';
}

export function hasPaymentLinks(): boolean {
  return Object.values(paymentLinks).every((p) => p.mensual && p.anual);
}
