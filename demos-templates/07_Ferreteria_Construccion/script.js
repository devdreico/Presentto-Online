/* ==========================================================
   FERRECONSTRUYE MOSQUERA · Script
   Masonry 3D Tilt + Border Glow
   ========================================================== */

(function() {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

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

  // ===== 3D TILT + BORDER GLOW - Animación Firma =====
  var tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = this.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -6;
      var rotateY = ((x - centerX) / centerX) * 6;

      this.style.transform =
        'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(4px)';
      this.style.boxShadow =
        (-rotateY * 2) + 'px ' + (-rotateX * 2) + 'px 30px rgba(212,115,42,0.1)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      this.style.boxShadow = 'none';
    });
  });

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

  // ===== Formulario → WhatsApp =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var msg = document.getElementById('formMsg').value.trim();
      var text = 'Hola! Soy ' + name + ', teléfono ' + phone + '. ' + msg;
      window.open('https://wa.me/573155667788?text=' + encodeURIComponent(text), '_blank');
    });
  }

  // ===== Intersection Observer =====
  var animateEls = document.querySelectorAll('.cat-card, .feat-card, .test-card, .stat, .srv-item');
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
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
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
const WA_NUMBER = '573612345684';
const WA_MSG = 'Hola%20FerreConstruye%2C%20quiero%20cotizar%20materiales';
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

