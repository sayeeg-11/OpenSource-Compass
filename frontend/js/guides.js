// Toggle sidebar on mobile
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const codeBlock = button.closest('.code-block').querySelector('pre');
        const code = codeBlock.innerText;

        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        });
    });
});

// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.classList.remove('active');
            });

            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }

            if (window.innerWidth <= 992) {
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        }
    });
});

// Handle active sidebar item on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        }
    });
});

// --- Progress Tracking (Backend Integration) ---
const TRACK_API_URL = 'http://localhost:5000/api/auth/track-guide';
const STATUS_API_URL = 'http://localhost:5000/api/auth/me';

document.addEventListener('DOMContentLoaded', () => {
    checkCompletedGuides();

    document.querySelectorAll('.track-guide-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const guideId = btn.getAttribute('data-guide-id');
            const user = JSON.parse(localStorage.getItem('currentUser'));

            if (!user) {
                alert('Please sign in to save your learning progress!');
                window.location.href = 'login.html';
                return;
            }

            // UI Feedback
            const originalText = btn.textContent;
            btn.textContent = 'Saving...';
            btn.disabled = true;

            try {
                const response = await fetch(TRACK_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ guideId })
                });

                if (response.ok) {
                    const data = await response.json();
                    btn.textContent = '✓ Completed';
                    btn.classList.add('completed-style');
                    // Update local storage with new progress
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                } else {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    const data = await response.json();
                    alert(data.message || 'Error tracking progress');
                }
            } catch (error) {
                console.error('Failed to track progress:', error);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    });
});

async function checkCompletedGuides() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // For local first-load consistency, fetch fresh data if logged in
    if (currentUser) {
        try {
            const res = await fetch(STATUS_API_URL, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                markUI(data.user.completedGuides);
            } else {
                markUI(currentUser.completedGuides);
            }
        } catch (e) {
            markUI(currentUser.completedGuides);
        }
    }
}

function markUI(completedGuides) {
    if (!completedGuides) return;

    document.querySelectorAll('.track-guide-btn').forEach(btn => {
        const guideId = btn.getAttribute('data-guide-id');
        if (completedGuides.some(g => g.guideId === guideId)) {
            btn.textContent = '✓ Completed';
            btn.disabled = true;
            btn.classList.add('completed-style');
        }
    });
}