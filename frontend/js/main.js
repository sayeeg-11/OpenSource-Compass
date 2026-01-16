/**
 * OpenSource Compass - Interactions
 * Scroll animations, smooth scrolling, and dynamic data loading
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSmoothScroll();
  loadHomePrograms();
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* =========================
   SMOOTH SCROLL (NAV)
========================= */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('nav a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
}

/* =========================
   HOME PAGE PROGRAMS
========================= */
function loadHomePrograms() {
  const container = document.getElementById('programs-container');
  if (!container) return;

  fetchPrograms()
    .then(programs => renderPrograms(programs, container))
    .catch(() => {
      container.innerHTML = `
        <div class="error-message">
          <p>Unable to load programs right now.</p>
        </div>
      `;
    });
}

function fetchPrograms() {
  return fetch('../data/programs.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    });
}

function renderPrograms(programs, container) {
  container.innerHTML = programs
    .map(
      p => `
      <div class="card fade-in-up">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <span class="badge">${p.difficulty}</span>
      </div>
    `
    )
    .join('');
}
