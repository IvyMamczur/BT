document.addEventListener('DOMContentLoaded', () => {
  // Rok vo footeri
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Burger menu
  const header = document.querySelector('header.hero');
  const burger = document.getElementById('burger');
  if (burger && header) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
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

  // Reveal animácia kariet a fotiek
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
