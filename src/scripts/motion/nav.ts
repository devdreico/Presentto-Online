/** Chrome de navegación: estado scroll, barra de progreso, menú móvil. */
export function initNav(): () => void {
  const docEl = document.documentElement;

  const onScroll = () => {
    docEl.classList.toggle('scrolled', window.scrollY > 8);

    const bar = document.querySelector<HTMLElement>('[data-progress] i');
    if (bar) {
      const max = docEl.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const overlay = document.querySelector<HTMLElement>('[data-nav-overlay]');
  let open = false;

  const setOpen = (next: boolean) => {
    open = next;
    document.body.classList.toggle('nav-open', open);
    document.body.classList.toggle('is-locked', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    overlay?.setAttribute('aria-hidden', String(!open));
    document.querySelector('main')?.toggleAttribute('inert', open);
    document.querySelector('footer')?.toggleAttribute('inert', open);
    if (open) toggle?.focus();
  };

  // Desplegables de escritorio: aria-expanded refleja lo que ya hace el CSS.
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-item]'));
  const setExpanded = (item: HTMLElement, expanded: boolean) =>
    item.querySelector('[data-nav-trigger]')?.setAttribute('aria-expanded', String(expanded));
  const itemHandlers = items.map((item) => {
    const onEnter = () => setExpanded(item, true);
    const onLeave = () => setExpanded(item, false);
    item.addEventListener('pointerenter', onEnter);
    item.addEventListener('pointerleave', onLeave);
    item.addEventListener('focusin', onEnter);
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget as Node | null)) onLeave();
    });
    return () => {
      item.removeEventListener('pointerenter', onEnter);
      item.removeEventListener('pointerleave', onLeave);
      item.removeEventListener('focusin', onEnter);
    };
  });

  const onToggle = () => setOpen(!open);
  toggle?.addEventListener('click', onToggle);
  overlay?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) setOpen(false);
  };
  window.addEventListener('keydown', onKey);

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('keydown', onKey);
    toggle?.removeEventListener('click', onToggle);
    itemHandlers.forEach((off) => off());
    if (open) setOpen(false);
  };
}
