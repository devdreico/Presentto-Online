/* ==========================================================
   DENTALCARE FACATATIVÁ · Script
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

  // ===== Blob morphing con mouse tracking =====
  const blobs = document.querySelectorAll('.hero__blob');
  const hero = document.querySelector('.hero');
  if (blobs.length > 0 && hero) {
    hero.addEventListener('mousemove', function(e) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      blobs.forEach(function(blob, i) {
        const factor = (i + 1) * 8;
        blob.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
      });
    });
  }

  // ===== Galería filtros =====
  const filterBtns = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('gallery-filter--active'); });
        this.classList.add('gallery-filter--active');
        const filter = this.getAttribute('data-filter');
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
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const msg = document.getElementById('formMsg').value.trim();
      var text = 'Hola! Soy ' + name + '. Mi número es ' + phone + '. Motivo: ' + msg;
      var waUrl = 'https://wa.me/573155566778?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }

  // ===== Healing Particles =====
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    var colors = ['#0d9488', '#d4a0a0', '#7a9a8a'];
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'hero__particle';
      var size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
      p.style.setProperty('--dy', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (6 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 12) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ===== Intersection Observer para animaciones suaves =====
  const animateEls = document.querySelectorAll('.glass, .srv-card, .test-card, .value-item');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    animateEls.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
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
const WA_NUMBER = '573412345682';
const WA_MSG = 'Hola%20DentalCare%2C%20quiero%20agendar%20una%20cita';
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

