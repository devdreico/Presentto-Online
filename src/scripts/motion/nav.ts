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
  };

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
    if (open) setOpen(false);
  };
}
