/*
 * MUNDO HOGAR FUNZA · Tienda / Comercio
 * Script: Nav, Parallax, Card Flip, Gallery Filters, Counters, Form
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== 1. NAV TOGGLE ===== */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
      }
    });
  }

  /* ===== 2. HERO PARALLAX (floating items) ===== */
  var floatItems = document.querySelectorAll('.hero__float-item');
  var hero = document.getElementById('hero');

  if (floatItems.length && hero) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      var heroRect = hero.getBoundingClientRect();
      var heroTop = heroRect.top;
      var heroHeight = heroRect.height;

      // Only apply parallax while hero is visible
      if (heroTop < window.innerHeight && heroTop > -heroHeight) {
        var progress = (window.innerHeight - heroTop) / (window.innerHeight + heroHeight);
        var offset = (progress - 0.5) * 40;

        floatItems.forEach(function (item, index) {
          var speed = 0.3 + (index * 0.15);
          var yOffset = offset * speed * 2;
          item.style.transform = 'translateY(' + yOffset + 'px) rotate(' + (index * 10 - 8) + 'deg)';
        });
      }
    });
  }

  /* ===== 3. GALLERY FILTER ===== */
  var filterBtns = document.querySelectorAll('.gallery-filter');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
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
        var stepTime = Math.floor(2000 / 60);

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
        .getPropertyValue('--whatsapp')
        .replace(/["\s]/g, '');

      var text = 'Hola! Soy ' + encodeURIComponent(name) +
                 ' (tel: ' + encodeURIComponent(phone) +
                 '). ' + encodeURIComponent(msg);

      window.open('https://wa.me/' + waNumber + '?text=' + text, '_blank');
    });
  }

  /* ===== 6. HEADER SCROLL EFFECT ===== */
  var header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottomColor = 'rgba(245, 124, 0, 0.08)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottomColor = 'rgba(0, 0, 0, 0.04)';
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ===== 7. SHOPPING PARTICLES ===== */
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    var particleColors = ['#f57c00', '#ffffff'];
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = 4 + Math.random() * 12;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
      p.style.opacity = 0.03 + Math.random() * 0.05;
      p.style.animationDuration = (6 + Math.random() * 8) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particlesContainer.appendChild(p);
    }
  }

  console.log('Mundo Hogar Funza — sitio cargado correctamente.');
});


// ===== WhatsApp Centralizado =====
const WA_NUMBER = getComputedStyle(document.documentElement)
  .getPropertyValue('--whatsapp')
  .replace(/["\s]/g, '');

const WA_MSG = 'Hola!%20Quiero%20informaci%C3%B3n%20sobre%20productos';

document.addEventListener('DOMContentLoaded', function() {
    var waLinks = document.querySelectorAll('a[href*="wa.me"]');
    for (var i = 0; i < waLinks.length; i++) {
        waLinks[i].href = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MSG;
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

