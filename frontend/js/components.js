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
<footer>
    <p>
        <i class="fas fa-heart" style="color: var(--primary-gold); margin-right: 0.4rem;"></i>
        © 2026 OpenSource Compass   
        <a href="https://github.com/sayeeg-11/OpenSource-Compass" target="_blank" rel="noopener noreferrer">GitHub</a>
    </p>
</footer>
`;

// Inject components immediately
const navbarContainer = document.getElementById('navbar');
const footerContainer = document.getElementById('footer');

if (navbarContainer) navbarContainer.innerHTML = navbarHTML;
if (footerContainer) footerContainer.innerHTML = footerHTML;

