document.addEventListener('DOMContentLoaded', () => {
  // animácia kariet pri scrolle
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.card').forEach(card => observer.observe(card));

  // burger menu toggle (pôvodné správanie)
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});
