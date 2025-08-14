// rok vo footeri, burger, progress, reveal
document.addEventListener('DOMContentLoaded', () => {
  // Rok
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Burger
  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && header) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      if (open && menu) menu.focus({ preventScroll: true });
    });
  }

  // Scroll progress
  const bar = document.querySelector('.progress');
  const updateBar = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
  };
  updateBar();
  document.addEventListener('scroll', updateBar, { passive: true });

  // Reveal animácia (karty, fotky)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.card, .thumbs img').forEach(el => io.observe(el));
});
