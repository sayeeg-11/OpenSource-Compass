/**
 * components.js
 * Injects Navbar and Footer dynamically
 * Keeps paths working from root and /pages/
 */

document.addEventListener('DOMContentLoaded', injectComponents);

/* =========================
   PATH HELPER
========================= */
function resolvePath(path) {
  const inPages = window.location.pathname.includes('/pages/');
  return inPages ? `../../${path}` : `./${path}`;
}

/* =========================
   NAVBAR TEMPLATE
========================= */
const navbarHTML = `
<header>
  <div class="navbar-container">
    <h1>
      <i class="fas fa-compass" style="color: var(--primary-gold); margin-right: 0.4rem;"></i>
      OpenSource Compass
    </h1>

    <div class="nav-links">
      <a href="${resolvePath('index.html')}">Home</a>
      <a href="${resolvePath('frontend/pages/guides.html')}">Guides</a>
      <a href="${resolvePath('frontend/pages/programs.html')}">Programs</a>
      <a href="${resolvePath('frontend/pages/Resources.html')}">Resources</a>
      <a href="${resolvePath('frontend/pages/contributors.html')}">Contributors</a>
      <a href="${resolvePath('frontend/pages/faq.html')}">FAQ</a>
      <a href="${resolvePath('frontend/pages/Contribute.html')}">Contribute</a>

      <button
        id="themeToggle"
        title="Toggle Dark Mode"
        aria-label="Toggle Dark Mode"
        style="
          background:none;
          border:none;
          color:var(--primary-gold);
          cursor:pointer;
          font-size:1.1rem;
          margin-left:0.5rem;
          transition:transform 0.3s ease;
        "
      >
        <i class="fas fa-moon"></i>
      </button>
    </div>
  </div>
</header>
`;

/* =========================
   FOOTER TEMPLATE
========================= */
const footerHTML = `
<footer>
  <p>
    <i class="fas fa-heart" style="color: var(--primary-gold); margin-right: 0.4rem;"></i>
    © 2026 OpenSource Compass
    ·
    <a href="https://github.com/sayeeg-11/opensource-compass" target="_blank" rel="noopener">
      GitHub
    </a>
  </p>
</footer>
`;

/* =========================
   INJECT COMPONENTS
========================= */
function injectComponents() {
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');

  if (navbar) navbar.innerHTML = navbarHTML;
  if (footer) footer.innerHTML = footerHTML;
}
