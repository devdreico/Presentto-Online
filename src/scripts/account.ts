import { getSupabase } from '../lib/supabase';
import { dashboardUrl, normalizePhone } from '../lib/slug';

type Access = { slug: string; active: boolean; display_name: string };

function setStatus(el: HTMLElement | null, message: string, isError = false): void {
  if (!el) return;
  el.textContent = message;
  el.className = 'account-status' + (message ? (isError ? ' is-error' : ' is-ok') : '');
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
    if (access?.active) await showContinue(access);
  }

  logout?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
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
      setStatus(status, 'Teléfono o PIN incorrectos. Inténtalo de nuevo.', true);
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
