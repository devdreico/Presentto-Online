/** Envío del formulario de contacto a Formspree (AJAX + estados). */
export function initContactForm(): () => void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const status = document.getElementById('formStatus');
  if (!form || !status) return () => {};

  const track = (window as unknown as { __presenttoTrack?: (n: string, p?: Record<string, string>) => void })
    .__presenttoTrack;

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.classList.add('is-loading');
    }
    status.className = '';
    status.textContent = 'Enviando…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('send');
      form.reset();
      status.className = 'form-status';
      status.innerHTML =
        '<span class="success-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>¡Listo! Te escribimos por WhatsApp o correo en horario hábil para coordinar tu sesión.';
      track?.('lead_submitted', { page_path: location.pathname, form: 'contacto' });
    } catch {
      status.className = 'form-status form-error';
      status.textContent = 'No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.';
      track?.('form_error', { page_path: location.pathname, form: 'contacto' });
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('is-loading');
      }
    }
  };

  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}
