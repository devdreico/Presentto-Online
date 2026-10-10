/** Checkout de planes: dialog Formspree → Mercado Pago. */
export function initCheckout(): () => void {
  const FORMSPREE = 'https://formspree.io/f/xeaokwly';
  const dialog = document.getElementById('planCheckout') as HTMLDialogElement | null;
  const form = document.getElementById('planCheckoutForm') as HTMLFormElement | null;
  const statusEl = document.getElementById('planCheckoutStatus');
  if (!dialog || !form || !statusEl) return () => {};

  const planLabel = dialog.querySelector('[data-checkout-plan]');
  const priceLabel = dialog.querySelector('[data-checkout-price]');
  const fPlan = form.querySelector<HTMLInputElement>('[data-field="plan"]');
  const fPrecio = form.querySelector<HTMLInputElement>('[data-field="precio"]');
  const fHora = form.querySelector<HTMLInputElement>('[data-field="hora"]');
  const fTz = form.querySelector<HTMLInputElement>('[data-field="zona_horaria"]');
  const fPagina = form.querySelector<HTMLInputElement>('[data-field="pagina"]');
  const fRef = form.querySelector<HTMLInputElement>('[data-field="referrer"]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  let payUrl = '';
  let busy = false;

  const track = (window as unknown as { __presenttoTrack?: (n: string, p?: Record<string, string>) => void })
    .__presenttoTrack;

  const setStatus = (msg: string, isError = false) => {
    statusEl.textContent = msg || '';
    statusEl.className = 'plan-checkout-status' + (msg ? (isError ? ' form-error' : ' form-status') : '');
  };

  const localHora = () => {
    try {
      return new Date().toLocaleString('es-CO', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZoneName: 'short',
      });
    } catch {
      return new Date().toString();
    }
  };
  const timezone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch {
      return '';
    }
  };

  const closeDialog = () => {
    if (dialog.open) dialog.close();
    document.body.classList.remove('is-locked');
  };

  const openCheckout = (btn: HTMLElement) => {
    payUrl = btn.getAttribute('data-pay') || '';
    const plan = btn.getAttribute('data-plan') || '';
    const price = btn.getAttribute('data-price') || '';
    if (planLabel) planLabel.textContent = plan;
    if (priceLabel) priceLabel.textContent = price;
    form.reset();
    if (fPlan) fPlan.value = plan;
    if (fPrecio) fPrecio.value = price;
    setStatus('');
    document.body.classList.add('is-locked');
    track?.('checkout_start', { plan, price, page_path: location.pathname });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      const first = form.querySelector<HTMLInputElement>('input[name="nombre"]');
      first?.focus();
    } else {
      location.href = payUrl;
    }
  };

  const buttons = Array.from(document.querySelectorAll<HTMLElement>('[data-plan-checkout]'));
  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLElement;
    if (typeof dialog.showModal !== 'function') return;
    e.preventDefault();
    openCheckout(btn);
  };
  buttons.forEach((btn) => btn.addEventListener('click', onClick));

  const onClose = () => document.body.classList.remove('is-locked');
  const onBackdrop = (e: MouseEvent) => {
    if (e.target === dialog) closeDialog();
  };
  const cancelBtn = dialog.querySelector<HTMLElement>('[data-checkout-cancel]');
  const onCancel = () => closeDialog();
  dialog.addEventListener('close', onClose);
  dialog.addEventListener('click', onBackdrop);
  cancelBtn?.addEventListener('click', onCancel);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (busy) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!payUrl) {
      setStatus('No encontramos el enlace de pago. Cierra e intenta de nuevo.', true);
      return;
    }
    busy = true;
    if (submitBtn) submitBtn.disabled = true;
    setStatus('Enviando tus datos…');

    if (fHora) fHora.value = `${new Date().toISOString()} | ${localHora()}`;
    if (fTz) fTz.value = timezone();
    if (fPagina) fPagina.value = location.href;
    if (fRef) fRef.value = document.referrer || '';

    const data = {
      nombre: (form.namedItem('nombre') as HTMLInputElement | null)?.value.trim() || '',
      whatsapp: (form.namedItem('whatsapp') as HTMLInputElement | null)?.value.trim() || '',
      plan: fPlan?.value || '',
      precio: fPrecio?.value || '',
      hora: fHora?.value || '',
      zona_horaria: fTz?.value || '',
      pagina: fPagina?.value || '',
      referrer: fRef?.value || '',
      _subject: `Pago plan ${fPlan?.value || ''} — Presentto`,
      _gotcha: (form.namedItem('_gotcha') as HTMLInputElement | null)?.value || '',
    };

    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('send');
      setStatus('¡Listo! Te llevamos al pago seguro de Mercado Pago…');
      track?.('checkout_lead_sent', {
        plan: fPlan?.value || '',
        price: fPrecio?.value || '',
        page_path: location.pathname,
      });
      window.setTimeout(() => {
        location.href = payUrl;
      }, 400);
    } catch {
      setStatus('No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.', true);
      track?.('checkout_error', { plan: fPlan?.value || '', page_path: location.pathname });
      busy = false;
      if (submitBtn) submitBtn.disabled = false;
    }
  };
  form.addEventListener('submit', onSubmit);

  return () => {
    buttons.forEach((btn) => btn.removeEventListener('click', onClick));
    dialog.removeEventListener('close', onClose);
    dialog.removeEventListener('click', onBackdrop);
    cancelBtn?.removeEventListener('click', onCancel);
    form.removeEventListener('submit', onSubmit);
  };
}
