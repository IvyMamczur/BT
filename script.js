document.addEventListener('DOMContentLoaded', () => {
  // rok vo footeri (ak máš #year)
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // === Burger menu (mobil) ===
  const header = document.querySelector('header.hero'); // menu viaže 'open' na <header class="hero">
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (header && burger && menu) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    // po kliku na položku menu ho zatvoríme
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // progress bar
  const bar = document.querySelector('.progress');
  const updateBar = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
  };
  updateBar();
  document.addEventListener('scroll', updateBar, { passive: true });

  // odhalenie kariet/obrázkov
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.card, .thumbs img').forEach(el => io.observe(el));
});
