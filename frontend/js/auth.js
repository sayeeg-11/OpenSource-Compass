const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function () {
    initAuth();
});

async function initAuth() {
    await checkAuthStatus();

    // Attach form listeners if they exist
    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
}

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // Required to send cookies cross-origin
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            updateUI(data.user);
        } else {
            localStorage.removeItem('currentUser');
            updateUI(null);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        updateUI(null);
    }
}

function updateUI(user) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Clean up existing auth elements
    const authElements = navLinks.querySelectorAll('.auth-item');
    authElements.forEach(el => el.remove());

    if (user) {
        // User is logged in - add Dashboard link as first item
        const dashboardLink = document.createElement('a');
        dashboardLink.href = getCorrectPath('frontend/pages/dashboard.html');
        dashboardLink.textContent = 'Dashboard';
        dashboardLink.className = 'auth-item';

        // Find first link to insert before
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
            navLinks.insertBefore(dashboardLink, firstLink);
        } else {
            navLinks.appendChild(dashboardLink);
        }

        const profileDropdown = document.createElement('div');
        profileDropdown.className = 'profile-dropdown auth-item';
        profileDropdown.innerHTML = `
            <div class="profile-icon">${user.name.charAt(0).toUpperCase()}</div>
            <div class="profile-menu">
                <div class="profile-menu-item" style="font-weight:600; color:var(--gold-bright); border-bottom: 1px solid var(--border); margin-bottom: 5px;">${user.name}</div>
                <a href="${getCorrectPath('frontend/pages/dashboard.html')}" class="profile-menu-item">📊 Dashboard</a>
                <a href="${getCorrectPath('frontend/pages/profile.html')}" class="profile-menu-item">👤 Profile</a>
                <hr style="border: 0.5px solid var(--border); margin: 5px 0;">
                <a href="#" class="profile-menu-item logout-btn" id="logoutBtn">Logout</a>
            </div>
        `;
        navLinks.appendChild(profileDropdown);

        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    } else {
        // User is logged out
        const loginLink = document.createElement('a');
        loginLink.href = getCorrectPath('frontend/pages/login.html');
        loginLink.textContent = 'Login';
        loginLink.className = 'btn-small auth-item';
        loginLink.style.marginLeft = '1rem';
        navLinks.appendChild(loginLink);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Required to receive cookies
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            // Success! Redirect to dashboard. Use absolute-adjacent path for reliability.
            window.location.href = 'dashboard.html';
        } else {
            errorEl.textContent = data.message || 'Login failed';
            errorEl.style.display = 'block';
        }
    } catch (error) {
        errorEl.textContent = 'Server error. Please try again later.';
        errorEl.style.display = 'block';
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorEl = document.getElementById('signupError');

    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match';
        errorEl.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created! Please login.');
            window.location.href = 'login.html';
        } else {
            errorEl.textContent = data.message || 'Signup failed';
            errorEl.style.display = 'block';
        }
    } catch (error) {
        errorEl.textContent = 'Server error. Please try again later.';
        errorEl.style.display = 'block';
    }
}

async function handleLogout(e) {
    if (e) e.preventDefault();
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('currentUser');
        // Redirect to home using correct pathing
        window.location.href = getCorrectPath('index.html');
    } catch (error) {
        console.error('Logout failed:', error);
        // Clean up even if request fails
        localStorage.removeItem('currentUser');
        window.location.href = getCorrectPath('index.html');
    }
}

function getCorrectPath(path) {
    const isPagesDir = window.location.pathname.includes('/pages/');

    if (!isPagesDir) {
        // We are at root or index.html level
        return path;
    } else {
        // We are inside /frontend/pages/
        if (path.startsWith('frontend/pages/')) {
            // Target is in the same directory as current file
            return path.replace('frontend/pages/', '');
        }
        // Target is at root, need to go up two levels
        return '../../' + path;
    }
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}