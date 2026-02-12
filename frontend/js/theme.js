document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       THEME LOGIC (LOAD + TOGGLE)
    ================================ */

    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        updateThemeIcon(isDark);

        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            toggleBtn.setAttribute(
                'aria-label',
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }

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
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
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
            const isActive = linkPath === currentPath;

            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

    };

    highlightActiveLink();

    /* ===============================
       SCROLL TO TOP
    ================================ */

    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
                scrollTopBtn.removeAttribute('aria-hidden');
            } else {
                scrollTopBtn.style.display = 'none';
                scrollTopBtn.setAttribute('aria-hidden', 'true');
            }

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
================================ */

const cursor = document.getElementById('cursor-highlight');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}
