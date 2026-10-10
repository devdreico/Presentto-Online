import { prefersReduced } from './reveal';

/** Divide títulos en palabras animables (respeta nodos inline como <em>). */
export function initKinetic(): () => void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-split]'));
  if (!targets.length) return () => {};

  let index = 0;
  const walk = (parent: Node) => {
    Array.from(parent.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent || '';
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement('span');
          word.className = 'k-word';
          const inner = document.createElement('i');
          inner.style.setProperty('--i', String(index++));
          inner.textContent = part;
          word.appendChild(inner);
          frag.appendChild(word);
        });
        parent.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    });
  };

  targets.forEach((el) => {
    if (el.dataset.splitDone) return;
    walk(el);
    el.dataset.splitDone = '1';
    el.classList.add('kinetic');
  });

  if (prefersReduced() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
