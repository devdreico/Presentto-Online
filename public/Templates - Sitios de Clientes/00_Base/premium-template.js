/*
 * Presentto premium layer for client templates.
 * Visual-only behavior: no content, CTA, form or business logic changes.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    document.body.classList.add('premium-template-ready');

    if (!reduceMotion && finePointer) {
      var pointerFrame = 0;
      var pointerX = 0;
      var pointerY = 0;
      window.addEventListener('pointermove', function (event) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame) return;
        pointerFrame = requestAnimationFrame(function () {
          root.style.setProperty('--premium-cursor-x', pointerX + 'px');
          root.style.setProperty('--premium-cursor-y', pointerY + 'px');
          pointerFrame = 0;
        });
      }, { passive: true });
    }

    if (!reduceMotion) initScrollMetrics();
    initAmbient();
    initHeroLayers();
    initReveal();
    if (!reduceMotion && finePointer) initTilt();
    initButtonPress();
    initCounters();
    initImagePerformance();

    function initScrollMetrics() {
      var lastY = window.scrollY || document.documentElement.scrollTop;
      var lastT = performance.now();
      var velocity = 0;
      var ticking = false;
      var progress = document.createElement('div');
      progress.className = 'premium-scroll-progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.appendChild(progress);

      function update() {
        var now = performance.now();
        var y = window.scrollY || document.documentElement.scrollTop;
        var dt = Math.max(16, now - lastT);
        var raw = Math.max(-18, Math.min(18, (y - lastY) / dt * 16));
        velocity = velocity * 0.72 + raw * 0.28;
        var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / docHeight)).toFixed(4) + ')';
        root.style.setProperty('--premium-scroll-velocity', velocity.toFixed(3));
        root.style.setProperty('--premium-scroll-progress', (y / docHeight).toFixed(4));
        lastY = y;
        lastT = now;
        ticking = false;
      }

      function request() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      }

      window.addEventListener('scroll', request, { passive: true });
      request();
    }

    function initAmbient() {
      if (reduceMotion || document.querySelector('.premium-template-ambient')) return;

      var grid = document.createElement('div');
      grid.className = 'premium-template-grid';
      grid.setAttribute('aria-hidden', 'true');

      var ambient = document.createElement('div');
      ambient.className = 'premium-template-ambient';
      ambient.setAttribute('aria-hidden', 'true');

      var count = Math.min(22, Math.max(10, Math.round(window.innerWidth / 72)));
      for (var i = 0; i < count; i += 1) {
        var dot = document.createElement('span');
        dot.className = 'premium-template-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.setProperty('--premium-x', (Math.random() * 52 - 26).toFixed(1) + 'px');
        dot.style.setProperty('--premium-y', (Math.random() * 52 - 26).toFixed(1) + 'px');
        dot.style.setProperty('--premium-scale', (0.6 + Math.random() * 1.25).toFixed(2));
        dot.style.setProperty('--premium-duration', (8 + Math.random() * 14).toFixed(1) + 's');
        dot.style.animationDelay = (-Math.random() * 12).toFixed(2) + 's';
        ambient.appendChild(dot);
      }

      document.body.prepend(ambient);
      document.body.prepend(grid);
    }

    function initImagePerformance() {
      var images = document.querySelectorAll('img');
      images.forEach(function (image, index) {
        image.decoding = 'async';
        if (!image.hasAttribute('loading') && index > 0 && !image.closest('.hero, .page-hero')) {
          image.loading = 'lazy';
        }
        image.addEventListener('error', function () {
          image.classList.add('premium-image-fallback');
          image.setAttribute('alt', (image.getAttribute('alt') || 'Imagen') + ' no disponible');
        }, { once: true });
      });
    }

    function initHeroLayers() {
      if (reduceMotion) return;

      document.querySelectorAll('.hero, .page-hero').forEach(function (hero) {
        if (hero.querySelector('.premium-hero-grid')) return;

        var grid = document.createElement('span');
        grid.className = 'premium-hero-grid';
        grid.setAttribute('aria-hidden', 'true');

        var light = document.createElement('span');
        light.className = 'premium-hero-light';
        light.setAttribute('aria-hidden', 'true');

        var spotlight = document.createElement('span');
        spotlight.className = 'premium-hero-spotlight';
        spotlight.setAttribute('aria-hidden', 'true');

        hero.insertBefore(spotlight, hero.firstChild);
        hero.insertBefore(light, hero.firstChild);
        hero.insertBefore(grid, hero.firstChild);
      });
    }

    function initReveal() {
      var selector = [
        '.section > .container',
        '.about',
        '.contact-grid',
        '.contact-info',
        '.contact-form-wrap',
        '.map-container',
        '.gallery-grid',
        '.gallery-filters',
        '.testimonials-grid',
        '.services-grid',
        '.flip-grid',
        '.menu-grid',
        '.products-grid',
        '.service-card',
        '.srv-card',
        '.prod-card',
        '.product-card',
        '.menu-card',
        '.test-card',
        '.testimonial-card',
        '.carousel__card',
        '.contact-card',
        '.svc-item',
        '.metric-card'
      ].join(',');

      var items = Array.prototype.slice.call(document.querySelectorAll(selector));
      items.forEach(function (item) {
        if (!item.classList.contains('reveal')) {
          item.classList.add('premium-template-reveal');
        }
      });

      if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(function (item) {
          item.classList.add('premium-visible');
          item.classList.add('is-visible');
        });
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('premium-visible');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      items.forEach(function (item) {
        observer.observe(item);
      });
    }

    function initTilt() {
      if (reduceMotion) return;

      var selectors = [
        '.glass',
        '.stat',
        '.service-card',
        '.srv-card',
        '.prod-card',
        '.product-card',
        '.menu-card',
        '.flip-card',
        '.testimonial-card',
        '.test-card',
        '.carousel__card',
        '.gallery-item',
        '.contact-card',
        '.contact-form-wrap',
        '.map-container',
        '.metric-card',
        '.svc-item',
        '.about__img'
      ].join(',');

      document.querySelectorAll(selectors).forEach(function (card) {
        card.classList.add('premium-template-tilt');

        var frame = 0;
        var currentX = 0;
        var currentY = 0;
        var targetX = 0;
        var targetY = 0;
        var lifted = false;

        function render() {
          currentX += (targetX - currentX) * 0.16;
          currentY += (targetY - currentY) * 0.16;
          var z = lifted ? 12 : 0;
          var y = lifted ? -6 : 0;
          card.style.transform = 'perspective(920px) rotateX(' + currentX.toFixed(3) + 'deg) rotateY(' + currentY.toFixed(3) + 'deg) translate3d(0,' + y + 'px,' + z + 'px)';

          if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01 || lifted) {
            frame = requestAnimationFrame(render);
          } else {
            frame = 0;
          }
        }

        function requestRender() {
          if (!frame) frame = requestAnimationFrame(render);
        }

        card.addEventListener('pointermove', function (event) {
          var rect = card.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          var x = (event.clientX - rect.left) / rect.width;
          var y = (event.clientY - rect.top) / rect.height;
          targetX = (0.5 - y) * 7;
          targetY = (x - 0.5) * 8;
          lifted = true;
          card.style.setProperty('--premium-glow-x', (x * 100).toFixed(1) + '%');
          card.style.setProperty('--premium-glow-y', (y * 100).toFixed(1) + '%');
          card.style.setProperty('--premium-glow-opacity', '0.82');
          requestRender();
        }, { passive: true });

        card.addEventListener('pointerleave', function () {
          targetX = 0;
          targetY = 0;
          lifted = false;
          card.style.setProperty('--premium-glow-opacity', '0');
          requestRender();
        });
      });
    }

    function initButtonPress() {
      document.querySelectorAll('.btn, .gallery-filter, .carousel__btn, .wa-float').forEach(function (el) {
        el.addEventListener('pointerdown', function () {
          el.classList.add('premium-pressed');
        }, { passive: true });

        ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach(function (eventName) {
          el.addEventListener(eventName, function () {
            el.classList.remove('premium-pressed');
          }, { passive: true });
        });
      });
    }

    function initCounters() {
      var counters = Array.prototype.slice.call(document.querySelectorAll('.stat__num, .metric-card__value'));
      counters = counters.filter(function (el) {
        return !el.hasAttribute('data-target') && /\d/.test(el.textContent || '');
      });

      if (!counters.length) return;

      function parseCounter(text) {
        var match = String(text).trim().match(/^([^0-9-]*)([-]?\d+(?:[.,]\d+)?)(.*)$/);
        if (!match) return null;
        return {
          prefix: match[1] || '',
          value: parseFloat(match[2].replace(',', '.')),
          suffix: match[3] || '',
          decimals: match[2].indexOf(',') >= 0 || match[2].indexOf('.') >= 0 ? 1 : 0
        };
      }

      function formatCounter(parsed, value) {
        var number = parsed.decimals ? value.toFixed(parsed.decimals).replace('.', ',') : Math.round(value).toLocaleString('es-CO');
        return parsed.prefix + number + parsed.suffix;
      }

      function animate(el) {
        if (el.dataset.premiumCounted === 'true') return;
        var parsed = parseCounter(el.textContent);
        if (!parsed) return;
        el.dataset.premiumCounted = 'true';
        el.classList.add('premium-counting');

        var start = performance.now();
        var duration = 1500;
        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatCounter(parsed, parsed.value * eased);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = parsed.prefix + (parsed.decimals ? parsed.value.toFixed(parsed.decimals).replace('.', ',') : parsed.value.toLocaleString('es-CO')) + parsed.suffix;
            el.classList.remove('premium-counting');
          }
        }
        requestAnimationFrame(step);
      }

      if (reduceMotion || !('IntersectionObserver' in window)) {
        counters.forEach(animate);
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    }
  });
})();
