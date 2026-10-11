import { ScrollTrigger } from './reveal';

/** Tabs segmentados de la sección de planes (MVO / Dominio propio). */
export function initPlanTabs(): () => void {
  const tabsWrap = document.querySelector<HTMLElement>('[data-plans-tabs]');
  if (!tabsWrap) return () => {};

  const buttons = Array.from(tabsWrap.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));
  const indicator = tabsWrap.querySelector<HTMLElement>('.seg-indicator');

  const activeIndex = () => Number(tabsWrap.dataset.active || 0);

  const moveIndicator = (index: number) => {
    const btn = buttons[index];
    if (!indicator || !btn) return;
    indicator.style.left = `${btn.offsetLeft}px`;
    indicator.style.width = `${btn.offsetWidth}px`;
  };

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const key = btn.dataset.tab;
    buttons.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    panels.forEach((p) => {
      p.hidden = p.dataset.panel !== key;
    });
    const index = buttons.indexOf(btn);
    tabsWrap.dataset.active = String(index);
    moveIndicator(index);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  moveIndicator(activeIndex());
  const onResize = () => moveIndicator(activeIndex());
  window.addEventListener('resize', onResize);

  buttons.forEach((b) => b.addEventListener('click', onClick));
  return () => {
    window.removeEventListener('resize', onResize);
    buttons.forEach((b) => b.removeEventListener('click', onClick));
  };
}
