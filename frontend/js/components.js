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
<footer class="site-footer" role="contentinfo" aria-label="Site footer">
  <div class="footer-shell">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-mark" aria-hidden="true">
          <i class="fas fa-compass"></i>
        </div>
        <div>
          <div class="footer-title">OpenSource Compass</div>
          <div class="footer-tagline">
            Curated routes, real programs, and community-first growth.
          </div>
        </div>
      </div>

      <div class="footer-columns" aria-label="Footer links">
        <nav class="footer-col" aria-label="Explore">
          <div class="footer-col-title">Explore</div>
          <ul class="footer-links">
            <li><a href="${getPath('index.html')}">Home</a></li>
            <li><a href="${getPath('frontend/pages/guides.html')}">Guides</a></li>
            <li><a href="${getPath('frontend/pages/programs.html')}">Programs</a></li>
            <li><a href="${getPath('frontend/pages/Resources.html')}">Resources</a></li>
          </ul>
        </nav>

        <nav class="footer-col" aria-label="Community">
          <div class="footer-col-title">Community</div>
          <ul class="footer-links">
            <li><a href="${getPath('frontend/pages/contributors.html')}">Contributors</a></li>
            <li><a href="${getPath('frontend/pages/Contribute.html')}">Contribute</a></li>
            <li><a href="${getPath('frontend/pages/faq.html')}">FAQ</a></li>
          </ul>
        </nav>

        <nav class="footer-col" aria-label="Project">
          <div class="footer-col-title">Project</div>
          <ul class="footer-links">
            <li>
              <a href="https://github.com/sayeeg-11/OpenSource-Compass" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://github.com/sayeeg-11/OpenSource-Compass/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                Contributing
              </a>
            </li>
            <li>
              <a href="https://github.com/sayeeg-11/OpenSource-Compass/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">
                Code of Conduct
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="footer-divider" aria-hidden="true"></div>

    <div class="footer-bottom">
      <div class="footer-badges" aria-label="Footer highlights">
        <span class="footer-pill"><i class="fas fa-shield"></i> Community-safe</span>
        <span class="footer-pill"><i class="fas fa-bolt"></i> Beginner-ready</span>
        <span class="footer-pill"><i class="fas fa-code-branch"></i> Open source</span>
        <button id="pwa-install-btn" class="footer-pill" style="display: none; cursor: pointer; border: none; font-family: inherit; font-size: inherit; margin-left:10px;">
            <i class="fas fa-download"></i> Install App
        </button>
      </div>

      <div class="footer-meta">
        <span>© <span id="footer-year"></span> OpenSource Compass</span>
        <span class="footer-sep" aria-hidden="true">•</span>
        <a class="footer-inline"
           href="https://github.com/sayeeg-11/OpenSource-Compass"
           target="_blank"
           rel="noopener noreferrer">
          <i class="fab fa-github"></i> Star on GitHub
        </a>
      </div>
    </div>
  </div>
</footer>
`;

// Inject components immediately
const navbarContainer = document.getElementById('navbar');
const footerContainer = document.getElementById('footer');

if (navbarContainer) navbarContainer.innerHTML = navbarHTML;
if (footerContainer) {
  footerContainer.innerHTML = footerHTML;
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

