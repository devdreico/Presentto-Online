import { ScrollTrigger } from './reveal';

/** Tabs segmentados de la sección de planes (mensual / anual). */
export function initPlanTabs(): () => void {
  const tabsWrap = document.querySelector<HTMLElement>('[data-plans-tabs]');
  if (!tabsWrap) return () => {};

  const buttons = Array.from(tabsWrap.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));
  const indicator = tabsWrap.querySelector<HTMLElement>('.seg-indicator');

  const activeIndex = () => Number(tabsWrap.dataset.active || 0);

  const select = (index: number, focus = false) => {
    const btn = buttons[index];
    if (!btn) return;
    const key = btn.dataset.tab;
    buttons.forEach((b, i) => {
      const on = i === index;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.dataset.panel !== key;
    });
    tabsWrap.dataset.active = String(index);
    moveIndicator(index);
    if (focus) btn.focus();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const moveIndicator = (index: number) => {
    const btn = buttons[index];
    if (!indicator || !btn) return;
    indicator.style.left = `${btn.offsetLeft}px`;
    indicator.style.width = `${btn.offsetWidth}px`;
  };

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    select(buttons.indexOf(btn));
  };

  // Teclado según WAI-ARIA: flechas, Home y End.
  const onKeydown = (e: KeyboardEvent) => {
    const current = buttons.indexOf(e.target as HTMLButtonElement);
    if (current === -1) return;
    const last = buttons.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = current === last ? 0 : current + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = current === 0 ? last : current - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === -1) return;
    e.preventDefault();
    select(next, true);
  };

  select(activeIndex());
  document.fonts?.ready.then(() => moveIndicator(activeIndex())).catch(() => {});
  const onResize = () => moveIndicator(activeIndex());
  window.addEventListener('resize', onResize);

  buttons.forEach((b) => b.addEventListener('click', onClick));
  tabsWrap.addEventListener('keydown', onKeydown);
  return () => {
    window.removeEventListener('resize', onResize);
    tabsWrap.removeEventListener('keydown', onKeydown);
    buttons.forEach((b) => b.removeEventListener('click', onClick));
  };
}
