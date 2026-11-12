import { getSupabase } from '../lib/supabase';
import { dashboardUrl, normalizePhone } from '../lib/slug';

type Access = { slug: string; active: boolean; display_name: string };

function setStatus(el: HTMLElement | null, message: string, isError = false): void {
  if (!el) return;
  el.textContent = message;
  el.className = 'account-status' + (message ? (isError ? ' is-error' : ' is-ok') : '');
  // Los errores se anuncian de inmediato; el progreso, de forma cortés.
  el.setAttribute('role', isError ? 'alert' : 'status');
}

async function readAccess(): Promise<Access | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('my_access')
    .select('slug, active, display_name')
    .single();
  if (error || !data) return null;
  return data as Access;
}

async function initAccount(): Promise<void> {
  const form = document.getElementById('accountLogin') as HTMLFormElement | null;
  if (!form || form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  const status = document.getElementById('accountStatus');
  const continueBox = document.getElementById('accountContinue');
  const continueLink = document.getElementById('accountContinueLink') as HTMLAnchorElement | null;
  const logout = document.getElementById('accountLogout');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const pinToggle = document.getElementById('accountPinToggle');
  const pinForm = document.getElementById('accountPinForm') as HTMLFormElement | null;
  const pinStatus = document.getElementById('accountPinStatus');

  const supabase = getSupabase();
  if (!supabase) {
    setStatus(status, 'El acceso de clientes estará disponible muy pronto. Escríbenos por WhatsApp mientras tanto.', true);
    if (submit) submit.disabled = true;
    return;
  }

  const showContinue = async (access: Access) => {
    if (!continueLink || !continueBox) return;
    continueLink.href = dashboardUrl(access.slug);
    continueLink.textContent = `Ir a ${access.display_name}`;
    continueBox.hidden = false;
    form.hidden = true;
    setStatus(status, '', false);
  };

  // Sesión ya abierta
  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData.session) {
    const access = await readAccess();
    if (access?.active) {
      await showContinue(access);
    } else {
      // Sesión abierta sin perfil o con el plan vencido: no dejar el formulario mudo.
      await supabase.auth.signOut();
      setStatus(
        status,
        access
          ? 'Tu plan está vencido o suspendido. Escríbenos por WhatsApp para reactivarlo.'
          : 'No encontramos tu perfil. Escríbenos por WhatsApp y lo revisamos.',
        true,
      );
    }
  }

  logout?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
  });

  // Cambio de PIN con la sesión ya abierta (el PIN llega por WhatsApp).
  pinToggle?.addEventListener('click', () => {
    if (!pinForm) return;
    const open = pinForm.hidden;
    pinForm.hidden = !open;
    pinToggle.setAttribute('aria-expanded', String(open));
    if (open) pinForm.querySelector<HTMLInputElement>('input')?.focus();
  });

  pinForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const next = (pinForm.namedItem('newPin') as HTMLInputElement | null)?.value ?? '';
    const repeat = (pinForm.namedItem('repeatPin') as HTMLInputElement | null)?.value ?? '';
    if (!/^\d{6}$/.test(next)) {
      setStatus(pinStatus, 'El PIN debe tener 6 dígitos.', true);
      return;
    }
    if (next !== repeat) {
      setStatus(pinStatus, 'Los dos PIN no coinciden.', true);
      return;
    }
    if (/^(\d)\1{5}$/.test(next) || /^(012345|123456|654321|987654)$/.test(next)) {
      setStatus(pinStatus, 'Ese PIN es demasiado fácil de adivinar. Elige otro.', true);
      return;
    }
    setStatus(pinStatus, 'Guardando…');
    const { error } = await supabase.auth.updateUser({ password: next });
    if (error) {
      setStatus(pinStatus, 'No pudimos cambiar el PIN. Inténtalo más tarde.', true);
      return;
    }
    pinForm.reset();
    pinForm.hidden = true;
    pinToggle?.setAttribute('aria-expanded', 'false');
    setStatus(pinStatus, 'PIN actualizado.', false);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneRaw = (form.namedItem('phone') as HTMLInputElement | null)?.value ?? '';
    const pin = (form.namedItem('pin') as HTMLInputElement | null)?.value ?? '';
    const phone = normalizePhone(phoneRaw);

    if (!phone || !/^\d{6}$/.test(pin)) {
      setStatus(status, 'Escribe un teléfono válido y un PIN de 6 dígitos.', true);
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.classList.add('is-loading');
    }
    setStatus(status, 'Verificando…');

    const { error } = await supabase.auth.signInWithPassword({
      email: `${phone}@auth.presentto.online`,
      password: pin,
    });

    if (error) {
      const network =
        error.name === 'AuthRetryableFetchError' ||
        !('status' in error) ||
        /fetch|network|conexi/i.test(error.message);
      setStatus(
        status,
        network
          ? 'No pudimos conectar. Revisa tu conexión e inténtalo otra vez.'
          : 'Teléfono o PIN incorrectos. Inténtalo de nuevo.',
        true,
      );
      if (submit) {
        submit.disabled = false;
        submit.classList.remove('is-loading');
      }
      return;
    }

    const access = await readAccess();

    if (!access) {
      await supabase.auth.signOut();
      setStatus(status, 'No encontramos tu perfil. Escríbenos por WhatsApp y lo revisamos.', true);
      if (submit) {
        submit.disabled = false;
        submit.classList.remove('is-loading');
      }
      return;
    }

    if (!access.active) {
      await supabase.auth.signOut();
      setStatus(status, 'Tu plan está vencido o suspendido. Escríbenos por WhatsApp para reactivarlo.', true);
      if (submit) {
        submit.disabled = false;
        submit.classList.remove('is-loading');
      }
      return;
    }

    setStatus(status, 'Acceso correcto. Abriendo tu dashboard…');
    location.assign(dashboardUrl(access.slug));
  });
}

document.addEventListener('astro:page-load', initAccount);
if (document.readyState !== 'loading') void initAccount();
