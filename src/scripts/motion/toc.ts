import { prefersReduced } from './reveal';

/** TOC generado desde los h2 del artículo + estado activo por scroll. */
export function initToc(): () => void {
  const nav = document.querySelector<HTMLElement>('[data-toc]');
  if (!nav) return () => {};

  const main = document.querySelector<HTMLElement>('.article-main .prose, .prose');
  if (!main) return () => {};

  const headings = Array.from(main.querySelectorAll<HTMLElement>('h2[id]'));
  if (headings.length < 2) {
    nav.remove();
    return () => {};
  }

  const ol = document.createElement('ol');
  const links = headings.map((h) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent || '';
    li.appendChild(a);
    ol.appendChild(li);
    return a;
  });
  nav.appendChild(ol);

  if (prefersReduced() || !('IntersectionObserver' in window)) return () => nav.remove();

  let current = -1;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = headings.indexOf(entry.target as HTMLElement);
        if (idx < 0 || idx === current) return;
        links[current]?.classList.remove('is-current');
        links[idx]?.classList.add('is-current');
        current = idx;
      });
    },
    { rootMargin: '-18% 0px -70% 0px', threshold: 0 },
  );
  headings.forEach((h) => io.observe(h));
  return () => io.disconnect();
}
