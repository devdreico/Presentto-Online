/* ==========================================================
   VIDAAGRO FUNZA · Script
   Navegación móvil + Scroll reveal (ola/hojas) + Filtros
   de galería + Validación de formulario + Año dinámico
   ========================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== 1. NAVIGACIÓN MÓVIL ===== */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('nav--open');
    navToggle.classList.remove('nav-toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open');
      this.classList.toggle('nav-toggle--active', open);
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 640) closeNav();
    });
  }

  /* ===== 2. AÑO DINÁMICO EN EL FOOTER ===== */
  var year = new Date().getFullYear();
  document.querySelectorAll('.footer__copy').forEach(function (el) {
    el.innerHTML = '&copy; ' + year + ' VidaAgro Funza';
  });

  /* ===== 3. SCROLL REVEAL ===== */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ===== 4. FILTROS DE GALERÍA ===== */
  var filters = document.querySelectorAll('.gallery-filter');
  var items = document.querySelectorAll('.gallery-item');

  if (filters.length && items.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = this.getAttribute('data-filter');

        filters.forEach(function (f) { f.classList.remove('gallery-filter--active'); });
        this.classList.add('gallery-filter--active');

        items.forEach(function (item) {
          var show = value === 'all' || item.getAttribute('data-category') === value;
          item.hidden = !show;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ===== 5. VALIDACIÓN DE FORMULARIO ===== */
  var form = document.getElementById('contactForm');
  var formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', function (e) {
      var fields = form.querySelectorAll('.form-input[required]');
      var invalid = [];

      fields.forEach(function (field) {
        var value = (field.value || '').trim();
        var bad = !value;
        if (!bad && field.type === 'email') {
          bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        }
        if (!bad && field.type === 'tel') {
          bad = (value.replace(/\D/g, '').length < 7);
        }
        field.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) invalid.push(field);
      });

      if (invalid.length) {
        e.preventDefault();
        if (formError) {
          formError.hidden = false;
          formError.textContent = invalid.length > 1
            ? 'Revisa los campos marcados: necesitamos tu nombre, un email válido y un WhatsApp de contacto.'
            : 'Completa correctamente el campo marcado para poder enviarte la cotización.';
        }
        if (invalid[0]) invalid[0].focus();
        return;
      }

      if (formError) formError.hidden = true;
    });

    form.querySelectorAll('.form-input').forEach(function (field) {
      field.addEventListener('input', function () {
        this.setAttribute('aria-invalid', 'false');
        if (formError) formError.hidden = true;
      });
    });
  }
})();
