/**
 * components.js
 * Dynamically loads the Navbar and Footer into placeholders.
 */



// Helper to determine the correct path prefix based on current location
function getPath(path) {
  const isPagesDir = window.location.pathname.includes('/pages/');
  // If we are in 'pages/', we need to go up two levels (../../) to get to root for index.html
  // or use relative paths for siblings.
  if (path.startsWith('index.html')) {
    return isPagesDir ? '../../' + path : './' + path;
  }
  // For assets in frontend/
  if (path.startsWith('frontend/')) {
    return isPagesDir ? '../../' + path : './' + path;
  }
  return path;
}

const navbarHTML = `
<header>
    <div class="navbar-container">
        <h1>
           <i class="fas fa-compass" aria-hidden="true" style="color: var(--primary-gold); margin-right: 0.4rem;"></i>
OpenSource Compass

        </h1>
        <button class="hamburger-menu" aria-label="Toggle navigation" aria-expanded="false">
             <i class="fas fa-bars"></i>
        </button>
        <div class="nav-links">
            <a href="${getPath('index.html')}">Home</a>
            <a href="${getPath('frontend/pages/guides.html')}">Guides</a>
            <a href="${getPath('frontend/pages/programs.html')}">Programs</a>
            <a href="${getPath('frontend/pages/Resources.html')}">Resources</a>
            <a href="${getPath('frontend/pages/contributors.html')}">Contributors</a>
            <a href="${getPath('frontend/pages/faq.html')}">FAQ</a>
            <a href="${getPath('frontend/pages/Contribute.html')}">Contribute</a>
            <a href="${getPath('frontend/pages/feedback.html')}">Feedback</a>
           <button
  id="themeToggle"
  aria-label="Toggle dark mode"
  title="Toggle dark mode"
  style="background: none; border: none; color: var(--primary-gold); cursor: pointer; font-size: 1.1rem; margin-left: 0.5rem; transition: transform 0.3s ease;"
>
  <i class="fas fa-moon" aria-hidden="true"></i>
</button>

        </div>
    </div>
</header>
`;

const footerHTML = `
<footer class="site-footer">

  <div class="footer-container">

    <!-- Left: Brand -->
    <div class="footer-brand">

      <div class="footer-logo">
        <i class="fas fa-compass"></i>
        <span>OpenSource Compass</span>
      </div>

      <p class="footer-description">
        Beginner-friendly platform guiding students and first-time contributors
        in open source with structured paths, programs, and community support.
      </p>

      <div class="footer-badges">
        <span class="footer-pill">Community-safe</span>
        <span class="footer-pill">Beginner-ready</span>
        <span class="footer-pill">Open source</span>
      </div>

    </div>


    <!-- Middle: Explore -->
    <div class="footer-column">

      <h4>Explore</h4>

      <a href="${getPath('index.html')}">Home</a>
      <a href="${getPath('frontend/pages/guides.html')}">Guides</a>
      <a href="${getPath('frontend/pages/programs.html')}">Programs</a>
      <a href="${getPath('frontend/pages/Resources.html')}">Resources</a>

    </div>


    <!-- Right: Project -->
    <div class="footer-column">

      <h4>Project</h4>

      <a href="${getPath('frontend/pages/contributors.html')}">Contributors</a>
      <a href="${getPath('frontend/pages/Contribute.html')}">Contribute</a>
      <a href="${getPath('frontend/pages/faq.html')}">FAQ</a>

      <a href="https://github.com/sayeeg-11/OpenSource-Compass" target="_blank">
        GitHub
      </a>

    </div>

  </div>


  <!-- Bottom -->
  <div class="footer-bottom">

    © <span id="footer-year"></span> OpenSource Compass

    <span class="footer-dot">•</span>

    <a href="https://github.com/sayeeg-11/OpenSource-Compass" target="_blank">
      ⭐ Star on GitHub
    </a>

  </div>

</footer>
`;

// Inject components immediately
const navbarContainer = document.getElementById('navbar');
const footerContainer = document.getElementById('footer');

if (navbarContainer) {
  navbarContainer.innerHTML = navbarHTML;

  // Hamburger Menu Logic
  const hamburgerBtn = navbarContainer.querySelector('.hamburger-menu');
  const navLinks = navbarContainer.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      // Toggle icon between bars and times (X)
      hamburgerBtn.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

      // Accessibility update
      hamburgerBtn.setAttribute('aria-expanded', isActive);
    });
  }
}
if (footerContainer) {
  footerContainer.innerHTML = footerHTML;
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

