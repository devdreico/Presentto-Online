document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('is-open'));

  const filters = [...document.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('[data-category]')];
  filters.forEach((filter) => filter.addEventListener('click', () => {
    const selected = filter.dataset.filter || 'all';
    filters.forEach((button) => button.classList.toggle('gallery-filter--active', button === filter));
    items.forEach((item) => { item.hidden = selected !== 'all' && item.dataset.category !== selected; });
  }));
});
