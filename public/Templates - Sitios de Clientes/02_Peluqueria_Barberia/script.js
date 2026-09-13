/*
 * KING STYLE BARBER · Funza
 * Script: Nav, 3D Carousel, Gallery Filter, Counters, Form
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== 1. NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active');
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
      }
    });
  }

  /* ===== 2. 3D CAROUSEL ===== */
  var track = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  if (track && prevBtn && nextBtn) {
    var scrollAmount = 0;

    nextBtn.addEventListener('click', function () {
      var card = track.querySelector('.carousel__card');
      if (card) {
        var cardWidth = card.offsetWidth + 16; // card + gap
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', function () {
      var card = track.querySelector('.carousel__card');
      if (card) {
        var cardWidth = card.offsetWidth + 16;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    });
  }

  /* ===== 3. GALLERY FILTER ===== */
  var filterBtns = document.querySelectorAll('.gallery-filter');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Active button
        filterBtns.forEach(function (b) { b.classList.remove('gallery-filter--active'); });
        btn.classList.add('gallery-filter--active');

        var filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(function () { item.style.opacity = '1'; }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ===== 4. COUNTER ANIMATION ===== */
  var counters = document.querySelectorAll('.stat__num');

  if (counters.length) {
    var countersAnimated = false;

    function animateCounters() {
      if (countersAnimated) return;
      countersAnimated = true;

      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = Math.ceil(target / 60);
        var duration = 2000; // 2s
        var stepTime = Math.floor(duration / 60);

        var timer = setInterval(function () {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = current.toLocaleString();
          }
        }, stepTime);
      });
    }

    // Intersection Observer for counters
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector('.about__stats');
    if (statsSection) observer.observe(statsSection);
  }

  /* ===== 5. CONTACT FORM -> WHATSAPP ===== */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var msg = document.getElementById('formMsg').value.trim();

      if (!name || !phone || !msg) {
        alert('Por favor completa todos los campos.');
        return;
      }

      var waNumber = getComputedStyle(document.documentElement)
        .getPropertyValue('--wa-number')
        .replace(/["\s]/g, '');

      var text = 'Hola! Soy ' + encodeURIComponent(name) + 
                 ' (tel: ' + encodeURIComponent(phone) + 
                 '). ' + encodeURIComponent(msg);

      var waUrl = 'https://wa.me/' + waNumber + '?text=' + text;
      window.open(waUrl, '_blank');
    });
  }

  /* ===== 6. HEADER SCROLL EFFECT ===== */
  var header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.borderBottomColor = 'rgba(212, 168, 83, 0.1)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.7)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
      }
    });
  }

  console.log('King Style Barber — sitio cargado correctamente.');
});


// ===== WhatsApp Centralizado =====
const WA_NUMBER = '573112345679';
const WA_MSG = 'Hola%20King%20Style%20Barber%2C%20quiero%20agendar%20una%20cita';
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
// ===== Dynamic Copyright Year =====
var copyrightEl = document.querySelector('.footer__copy');
if (copyrightEl) {
  var year = new Date().getFullYear();
  copyrightEl.textContent = copyrightEl.textContent.replace('2026', year);
}

