/**
 * theme.js
 * Handles dark mode toggle and scroll-to-top behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  setupThemeToggle();
  setupScrollToTop();
});

/* ---------------------------
   Theme Handling
---------------------------- */
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';

  document.body.classList.toggle('dark-mode', isDark);
  updateThemeIcon(isDark);
}

function setupThemeToggle() {
  // Event delegation: works even if navbar is injected dynamically
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#themeToggle');
    if (!toggleBtn) return;

    const isDark = document.body.classList.toggle('dark-mode');
    updateThemeIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function updateThemeIcon(isDark) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;

  icon.classList.toggle('fa-moon', !isDark);
  icon.classList.toggle('fa-sun', isDark);
}

/* ---------------------------
   Scroll To Top
---------------------------- */
function setupScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
