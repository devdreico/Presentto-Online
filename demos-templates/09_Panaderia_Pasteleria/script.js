/*
 * PANADERÍA EL TRIGAL MADRID · Panadería & Pastelería
 * Script: nav móvil, filtros, reveal on scroll, año dinámico, formulario
 * (Sin duplicar premium-template.js: capa visual, tilt, contadores y cookie banner)
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== 1. MENÚ MÓVIL ===== */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('nav--open');
    navToggle.classList.remove('nav-toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ===== 2. FILTROS (galería y catálogo) ===== */
  var filterBtns = document.querySelectorAll('[data-filter]');

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('.filter-bar');
        if (group) {
          group.querySelectorAll('[data-filter]').forEach(function (b) {
            b.classList.remove('filter-btn--active');
            b.setAttribute('aria-pressed', 'false');
          });
        }
        btn.classList.add('filter-btn--active');
        btn.setAttribute('aria-pressed', 'true');

        var filter = btn.getAttribute('data-filter');
        var scope = document.getElementById(btn.getAttribute('data-filter-scope')) || document;

        scope.querySelectorAll('[data-category]').forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) item.classList.add('is-visible');
        });
      });
    });
  }

  /* ===== 3. REVEAL ON SCROLL ===== */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* ===== 4. AÑO DINÁMICO EN EL FOOTER ===== */
  var copyrightEl = document.querySelector('.footer__copy');
  if (copyrightEl) {
    var year = new Date().getFullYear();
    copyrightEl.textContent = copyrightEl.textContent.replace('2026', String(year));
  }

  /* ===== 5. VALIDACIÓN BÁSICA DEL FORMULARIO ===== */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    var validators = {
      formName: function (v) { return v.length >= 2 || 'Escribe tu nombre (mínimo 2 letras).'; },
      formPhone: function (v) { return (v.replace(/\D/g, '').length >= 7) || 'Escribe un teléfono válido (mínimo 7 dígitos).'; },
      formEmail: function (v) { return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Revisa el correo electrónico.'; },
      formType: function (v) { return v !== '' || 'Selecciona el tipo de pedido.'; },
      formMsg: function (v) { return v.length >= 8 || 'Cuéntanos un poco más (mínimo 8 caracteres).'; }
    };

    function validateField(id) {
      var field = document.getElementById(id);
      if (!field || !validators[id]) return true;
      var result = validators[id](field.value.trim());
      var group = field.closest('.form-group');
      if (result === true) {
        if (group) group.classList.remove('form-group--invalid');
        field.removeAttribute('aria-invalid');
        return true;
      }
      if (group) group.classList.add('form-group--invalid');
      field.setAttribute('aria-invalid', 'true');
      var error = group ? group.querySelector('.form-error') : null;
      if (error) error.textContent = result;
      return false;
    }

    Object.keys(validators).forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      field.addEventListener('blur', function () { validateField(id); });
      field.addEventListener('input', function () {
        var group = field.closest('.form-group');
        if (group && group.classList.contains('form-group--invalid')) validateField(id);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      var firstInvalid = null;
      Object.keys(validators).forEach(function (id) {
        var ok = validateField(id);
        if (!ok && !firstInvalid) firstInvalid = document.getElementById(id);
      });

      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
      }
    });
  }
})();
