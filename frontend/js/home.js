document.addEventListener('DOMContentLoaded', () => {
  // Fade-in sections/cards
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fadeEls = Array.from(document.querySelectorAll('.fade-in'));
  if (fadeEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      fadeEls.forEach((el) => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
      );
      fadeEls.forEach((el) => observer.observe(el));
    }
  }

  // Lightweight parallax: move only the visual block (not the whole hero)
  if (!prefersReducedMotion) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      let ticking = false;
      window.addEventListener(
        'scroll',
        () => {
          if (ticking) return;
          ticking = true;
          window.requestAnimationFrame(() => {
            const y = window.scrollY || window.pageYOffset || 0;
            heroVisual.style.transform = `translateY(${Math.min(28, y * 0.06)}px)`;
            ticking = false;
          });
        },
        { passive: true }
      );
    }
  }

  // Newsletter demo
  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      if (!email) return;
      alert(`Thanks! You'll get updates at ${email}.`);
      form.reset();
    });
  }
});
