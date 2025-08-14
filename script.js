document.addEventListener('DOMContentLoaded', () => {
  /* Reveal animácia pre karty + sekcie */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.card, section h2').forEach(el => io.observe(el));

  /* Hamburger menu + tieň nav pri scrolle */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });
  }
  const onScrollNav = () => {
    if (window.scrollY > 6) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* Jemný parallax/tilt na hero nadpise */
  const hero = document.querySelector('.hero');
  if (hero) {
    const h1 = hero.querySelector('h1');
    const p  = hero.querySelector('p');
    const btn = hero.querySelector('.btn');
    const items = [h1, p, btn].filter(Boolean);

    // parallax pri scrolle
    let lastY = window.scrollY;
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;
      const y = window.scrollY;
      const delta = (y - lastY) * 0.05;
      items.forEach((el, i) => {
        el.style.transform = `translateY(${delta * (i + 1)}px)`;
      });
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // jemný tilt na myš
    const onMove = (ev) => {
      const r = hero.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (ev.clientX - cx) / r.width;   // -0.5..0.5
      const dy = (ev.clientY - cy) / r.height;
      hero.style.transform = `perspective(900px) rotateX(${dy * -2.5}deg) rotateY(${dx * 3}deg)`;
    };
    const resetTilt = () => { hero.style.transform = 'none'; };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', resetTilt);
  }
});

/* --- BOZP floating icons (svetlejšie + rýchlejšie) --- */
(function () {
  const sky = document.querySelector('.safety-sky');
  if (!sky) return;

  // Ikony (CC0) – priame URL
  const sources = [
    'https://www.svgrepo.com/show/432603/traffic-cone.svg',     // kužeľ
    'https://www.svgrepo.com/show/7161/fire-extinguisher.svg',  // hasiaci prístroj
    'https://www.svgrepo.com/show/449380/hard-hat.svg',         // prilba
    'https://www.svgrepo.com/show/347938/shield.svg'            // štít
  ];

  const count = 20; // o niečo viac objektov
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'safety-item';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = sources[Math.floor(Math.random() * sources.length)];
    img.alt = '';

    // rýchlejšia animácia a širšie rozloženie
    const x = Math.round((Math.random() * 110 - 5)) + 'vw';
    const scale = (0.75 + Math.random() * 0.95).toFixed(2);
    const durNum = 7 + Math.random() * 6;              // ⬅ rýchlejšie (7–13s)
    const dur = durNum.toFixed(1) + 's';
    const delay = (-Math.random() * durNum).toFixed(1) + 's';
    const wiggle = Math.round(50 + Math.random() * 100) + 'px';

    el.style.setProperty('--x', x);
    el.style.setProperty('--scale', scale);
    el.style.setProperty('--dur', dur);
    el.style.setProperty('--delay', delay);
    el.style.setProperty('--wiggle', wiggle);

    el.appendChild(img);
    sky.appendChild(el);
  }
})();
