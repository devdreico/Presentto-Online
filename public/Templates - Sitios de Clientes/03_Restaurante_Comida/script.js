/*
 * SABOR CASERO MOSQUERA · Restaurante / Comida
 * Script: Nav, Floating 3D Parallax, Gallery Filters, Counters, Form
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

  /* ===== 2. FLOATING 3D PARALLAX ===== */
  var floatPlatos = document.querySelectorAll('.hero__float-plato');
  var hero = document.getElementById('hero');

  if (floatPlatos.length && hero) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      var heroRect = hero.getBoundingClientRect();
      var heroTop = heroRect.top;

      if (heroTop < window.innerHeight && heroTop > -hero.offsetHeight) {
        var progress = (window.innerHeight - heroTop) / (window.innerHeight + hero.offsetHeight);
        var offset = (progress - 0.5) * 50;

        floatPlatos.forEach(function (item) {
          var speed = parseFloat(item.getAttribute('data-speed') || '0.5');
          var yOffset = offset * speed;
          var rotY = parseFloat(item.style.transform.replace(/[^0-9\-.]/g, '') || 0);
          item.style.transform = 'translateY(' + yOffset + 'px) rotateY(' + (rotY || -8) + 'deg) translateZ(' + (speed * 30) + 'px)';
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
        .getPropertyValue('--wa-number')
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
        header.style.background = 'rgba(255, 248, 240, 0.95)';
        header.style.borderBottomColor = 'rgba(229, 57, 53, 0.1)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.03)';
      } else {
        header.style.background = 'rgba(255, 248, 240, 0.85)';
        header.style.borderBottomColor = 'rgba(229, 57, 53, 0.06)';
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ===== 7. MENU FLOATING SCROLL ANIMATION ===== */
  var floatItems = document.querySelectorAll('.menu-item--float');

  if (floatItems.length) {
    var menuObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    floatItems.forEach(function (item) {
      item.style.animationPlayState = 'paused';
      menuObserver.observe(item);
    });
  }

  console.log('Sabor Casero Mosquera — sitio cargado correctamente.');
});


// ===== WhatsApp Centralizado =====
const WA_NUMBER = '573212345680';
const WA_MSG = 'Hola%20Sabor%20Casero%2C%20quiero%20hacer%20un%20pedido';
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

