/* ==========================================================
   ESTUDIO VERTICAL MADRID · Script
   Perspective Scroll 3D + Smooth Interactions
   ========================================================== */

(function() {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('nav-toggle--active');
      nav.classList.toggle('nav--open');
      document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== PERSPECTIVE SCROLL 3D - Animación Firma =====
  var heroBg = document.getElementById('heroBg');
  var heroContent = document.getElementById('heroContent');
  var perspectiveEls = document.querySelectorAll('.perspective-reveal');

  if (heroBg && heroContent) {
    // Mouse tracking for hero perspective
    document.getElementById('hero').addEventListener('mousemove', function(e) {
      var rect = this.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      heroBg.style.transform =
        'translate3d(' + (x * -15) + 'px, ' + (y * -10) + 'px, 0) scale(1.05)';
      heroContent.style.transform =
        'translate3d(' + (x * 8) + 'px, ' + (y * 5) + 'px, 0)';
    });

    // Scroll-based perspective
    window.addEventListener('scroll', function() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var heroH = document.getElementById('hero').offsetHeight;
      var progress = Math.min(scrollY / heroH, 1);

      heroBg.style.transform =
        'translate3d(0, ' + (progress * 30) + 'px, 0) scale(' + (1.05 - progress * 0.05) + ')';
      heroContent.style.opacity = 1 - progress * 1.2;
    });
  }

  // Perspective reveal items on scroll
  if (perspectiveEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) rotateX(0deg)';
        }
      });
    }, { threshold: 0.15 });

    perspectiveEls.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) rotateX(5deg)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transformStyle = 'preserve-3d';
      observer.observe(el);
    });
  }

  // ===== Galería filtros =====
  var filterBtns = document.querySelectorAll('.gallery-filter');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('gallery-filter--active'); });
        this.classList.add('gallery-filter--active');
        var filter = this.getAttribute('data-filter');
        galleryItems.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(function() { item.style.opacity = '1'; }, 10);
          } else {
            item.style.opacity = '0';
            setTimeout(function() { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ===== Formulario contacto → WhatsApp =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var msg = document.getElementById('formMsg').value.trim();
      var text = 'Hola! Soy ' + name + '. Mi teléfono es ' + phone + '. Motivo: ' + msg;
      var waUrl = 'https://wa.me/573204445566?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }

  // ===== Intersection Observer para animaciones suaves =====
  var animateEls = document.querySelectorAll('.glass, .srv-card, .test-card, .proj-card');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    animateEls.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      animObserver.observe(el);
    });
  }


// ===== Dynamic Copyright Year =====
var copyrightEl = document.querySelector('.footer__copy');
if (copyrightEl) {
  var year = new Date().getFullYear();
  copyrightEl.textContent = copyrightEl.textContent.replace('2026', year);
}
})();


// ===== WhatsApp Centralizado =====
const WA_NUMBER = '573512345683';
const WA_MSG = 'Hola%20Estudio%20Vertical%2C%20quiero%20solicitar%20una%20cotizaci%C3%B3n';
const WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MSG;

document.addEventListener('DOMContentLoaded', function() {
    var waLinks = document.querySelectorAll('a[href*="wa.me"]');
    for (var i = 0; i < waLinks.length; i++) {
        waLinks[i].href = WA_URL;
    }
});
// ===== Scroll Reveal =====
(function() {
  if (!('IntersectionObserver' in window)) return;
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });
})();

