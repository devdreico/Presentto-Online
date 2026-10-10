import { ScrollTrigger } from './reveal';

/** Tabs segmentados de la sección de planes (MVO / Dominio propio). */
export function initPlanTabs(): () => void {
  const tabsWrap = document.querySelector<HTMLElement>('[data-plans-tabs]');
  if (!tabsWrap) return () => {};

  const buttons = Array.from(tabsWrap.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const key = btn.dataset.tab;
    buttons.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    panels.forEach((p) => {
      p.hidden = p.dataset.panel !== key;
    });
    tabsWrap.dataset.active = String(buttons.indexOf(btn));
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  buttons.forEach((b) => b.addEventListener('click', onClick));
  return () => buttons.forEach((b) => b.removeEventListener('click', onClick));
}
