/**
 * sitemap.js
 * Handles sitemap search filtering and scroll-to-top behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearchFilter();
  initScrollToTop();
});

/* ---------------------------
   Sitemap Search Filter
---------------------------- */
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const sections = document.querySelectorAll('.section');

  if (!searchInput || !sections.length) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    sections.forEach(section => {
      const content = section.textContent.toLowerCase();
      section.style.display = content.includes(query) ? 'block' : 'none';
    });
  });
}

/* ---------------------------
   Scroll To Top Button
---------------------------- */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
