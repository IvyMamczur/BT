// rok vo footeri + progress bar + interakcie
document.addEventListener('DOMContentLoaded', () => {
  // Rok
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Hamburger menu
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

  // Reveal animácia
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.card, .gallery img').forEach(el => io.observe(el));
});

// Jemný parallax na hero texte
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const items = [hero.querySelector('h1'), hero.querySelector('p'), hero.querySelector('.btn')].filter(Boolean);
  let lastY = window.scrollY;
  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    const y = window.scrollY;
    const delta = (y - lastY) * 0.05;
    items.forEach((el, i) => { el.style.transform = `translateY(${delta * (i + 1)}px)`; });
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Plávajúce BOZP ikony (svetlejšie + rýchlejšie)
(() => {
  const sky = document.querySelector('.safety-sky');
  if (!sky) return;

  const sources = [
    'https://www.svgrepo.com/show/432603/traffic-cone.svg',
    'https://www.svgrepo.com/show/7161/fire-extinguisher.svg',
    'https://www.svgrepo.com/show/449380/hard-hat.svg',
    'https://www.svgrepo.com/show/347938/shield.svg'
  ];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'safety-item';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = sources[Math.floor(Math.random() * sources.length)];
    img.alt = '';

    const durNum = 7 + Math.random() * 6; // 7–13s
    el.style.setProperty('--x', Math.round(Math.random() * 110 - 5) + 'vw');
    el.style.setProperty('--scale', (0.75 + Math.random() * 0.95).toFixed(2));
    el.style.setProperty('--dur', durNum.toFixed(1) + 's');
    el.style.setProperty('--delay', (-Math.random() * durNum).toFixed(1) + 's');
    el.style.setProperty('--wiggle', Math.round(50 + Math.random() * 100) + 'px');

    el.appendChild(img);
    sky.appendChild(el);
  }
})();
