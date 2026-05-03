document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       THEME LOGIC (LOAD + TOGGLE)
    ================================ */

    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark');

    // Click toggle (event delegation)
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#themeToggle');
        if (!toggleBtn) return;

        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
    });

    // Keyboard shortcut: Press "D"
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key.toLowerCase() !== 'd') return;

        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
    });

    /* ===============================
       NAVBAR ACTIVE LINK
    ================================ */

    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            link.classList.toggle('active', linkPath === currentPath);
        });
    };

    highlightActiveLink();

    /* ===============================
       SCROLL TO TOP
    ================================ */

    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/* ===============================
   THEME ICON HELPER
================================ */

function updateThemeIcon(isDark) {
    const icon = document.querySelector('#themeToggle i');
    if (!icon) return;

    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
}

/* ===============================
   CURSOR HIGHLIGHT
   FIX: Renamed variable from 'cursor' to 'themeCursor' to avoid
   conflict with the 'cursor' variable declared in home.js
================================ */

const themeCursor = document.getElementById('cursor-highlight');

if (themeCursor) {
    document.addEventListener('mousemove', (e) => {
        themeCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        themeCursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        themeCursor.style.opacity = '0';
    });
}