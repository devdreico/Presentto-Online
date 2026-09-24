(function() {
  'use strict';
  var nav = document.getElementById('nav'), navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('nav-toggle--active');
      nav.classList.toggle('nav--open');
      document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav__link').forEach(function(l) {
      l.addEventListener('click', function() { nav.classList.remove('nav--open'); navToggle.classList.remove('nav-toggle--active'); document.body.style.overflow = ''; });
    });
  }

  // ===== AMBIENT PARTICLES CANVAS - Animación Firma =====
  var canvas = document.getElementById('particleCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = 0, mouseY = 0;
    var heroEl = document.getElementById('hero');

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var ripples = [];
    var lotusFlowers = [];
    var zenTime = 0;

    function addRipple(x, y) {
      ripples.push({ x: x, y: y, radius: 0, maxRadius: Math.min(canvas.width, canvas.height) * 0.5, alpha: 0.2 });
    }

    function getCanvasCoords(e) {
      var rect = canvas.getBoundingClientRect();
      var clientX = e.clientX || (e.touches && e.touches[0].clientX);
      var clientY = e.clientY || (e.touches && e.touches[0].clientY);
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    (heroEl || canvas).addEventListener('mousemove', function(e) {
      var coords = getCanvasCoords(e);
      mouseX = coords.x;
      mouseY = coords.y;
    });
    (heroEl || canvas).addEventListener('click', function(e) {
      var coords = getCanvasCoords(e);
      addRipple(coords.x, coords.y);
    });
    (heroEl || canvas).addEventListener('touchstart', function(e) {
      var coords = getCanvasCoords(e);
      addRipple(coords.x, coords.y);
    }, { passive: true });

    for (var i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.5 + Math.random() * 2.5,
        alpha: 0.02 + Math.random() * 0.08
      });
    }

    for (var li = 0; li < 4; li++) {
      lotusFlowers.push({
        x: 0.1 + Math.random() * 0.8,
        y: 0.1 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        scale: 0.3 + Math.random() * 0.3,
        rotSpeed: (Math.random() - 0.5) * 0.002
      });
    }

    function drawLotus(cx, cy, sc, rot, time) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sc, sc);
      ctx.rotate(rot);
      var bobY = Math.sin(time * 0.5) * 4;
      ctx.translate(0, bobY);
      var petalCount = 5;
      var colors = ['rgba(196, 166, 196, 0.06)', 'rgba(164, 196, 164, 0.05)', 'rgba(255, 255, 255, 0.04)'];
      for (var p = 0; p < petalCount; p++) {
        var angle = (p / petalCount) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -12, 6, 16, 0, 0, Math.PI * 2);
        ctx.fillStyle = colors[p % colors.length];
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 196, 176, 0.06)';
      ctx.fill();
      ctx.restore();
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      zenTime += 0.01;

      var bpAlpha = 0.03 + Math.sin(zenTime * 0.5) * 0.015;
      var bpGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width * 0.5);
      bpGrad.addColorStop(0, 'rgba(196, 166, 196, ' + bpAlpha + ')');
      bpGrad.addColorStop(1, 'rgba(164, 196, 164, 0)');
      ctx.fillStyle = bpGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (var r = ripples.length - 1; r >= 0; r--) {
        var rip = ripples[r];
        rip.radius += 2;
        rip.alpha *= 0.98;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(196, 166, 196, ' + Math.max(0, rip.alpha) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(164, 196, 164, ' + Math.max(0, rip.alpha * 0.6) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        if (rip.alpha < 0.001) ripples.splice(r, 1);
      }

      for (var l = 0; l < lotusFlowers.length; l++) {
        var lt = lotusFlowers[l];
        var lx = lt.x * canvas.width + Math.sin(zenTime * lt.speed + lt.phase) * 20;
        var ly = lt.y * canvas.height + Math.cos(zenTime * lt.speed * 0.7 + lt.phase) * 15;
        var lrot = zenTime * lt.rotSpeed;
        drawLotus(lx, ly, lt.scale, lrot, zenTime);
      }

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) { p.vx *= -1; }
        if (p.y < 0 || p.y > canvas.height) { p.vy *= -1; }

        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 196, 176, ' + p.alpha + ')';
        ctx.fill();
      }
      zenFrameId = requestAnimationFrame(animateParticles);
    }
    var zenFrameId = requestAnimationFrame(animateParticles);
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { if (zenFrameId) cancelAnimationFrame(zenFrameId); }
      else { zenFrameId = requestAnimationFrame(animateParticles); }
    });
  }

  // ===== Gallery =====
  var filterBtns = document.querySelectorAll('.gallery-filter');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('gallery-filter--active'); });
        this.classList.add('gallery-filter--active');
        var filter = this.getAttribute('data-filter');
        galleryItems.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) { item.style.display = 'block'; setTimeout(function() { item.style.opacity = '1'; }, 10); }
          else { item.style.opacity = '0'; setTimeout(function() { item.style.display = 'none'; }, 300); }
        });
      });
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var msg = document.getElementById('formMsg').value.trim();
      window.open('https://wa.me/573213344556?text=' + encodeURIComponent('Hola! Soy ' + name + ', teléfono ' + phone + '. ' + msg), '_blank');
    });
  }

  var animateEls = document.querySelectorAll('.srv-card, .test-card, .stat');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } });
    }, { threshold: 0.1 });
    animateEls.forEach(function(el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; observer.observe(el); });
  }

// ===== Dynamic Copyright Year =====
var copyrightEl = document.querySelector('.footer__copy');
if (copyrightEl) {
  var year = new Date().getFullYear();
  copyrightEl.textContent = copyrightEl.textContent.replace('2026', year);
}
})();


// ===== WhatsApp Centralizado =====
const WA_NUMBER = '573912345687';
const WA_MSG = 'Hola%20Zen%20Spa%2C%20quiero%20agendar%20una%20cita';
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

