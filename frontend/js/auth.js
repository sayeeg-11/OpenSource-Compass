// Authentication logic using localStorage

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', function() {
    updateProfileIcon(); // Initialize nav on every page load
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});

// --- Auth Handlers ---
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    clearErrors();
    let isValid = true;
    
    if (name.length < 2) { showError('nameError', 'Name must be at least 2 characters'); isValid = false; }
    if (!isValidEmail(email)) { showError('emailError', 'Please enter a valid email address'); isValid = false; }
    if (password.length < 6) { showError('passwordError', 'Password must be at least 6 characters'); isValid = false; }
    if (password !== confirmPassword) { showError('confirmPasswordError', 'Passwords do not match'); isValid = false; }
    
    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email === email)) {
        showError('emailError', 'An account with this email already exists');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));
    
    alert('Account created successfully!');
    window.location.href = 'index.html';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    clearErrors();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('loginPasswordError', 'Invalid email or password');
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    window.location.href = 'index.html';
}

// --- Profile Icon & Dropdown Logic ---
function updateProfileIcon() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const existingProfile = nav.querySelector('.profile-dropdown');
    if (existingProfile) existingProfile.remove();

    const currentUser = getCurrentUser();
    
    if (currentUser) {
        const profileDropdown = document.createElement('div');
        profileDropdown.className = 'profile-dropdown';
        
        const profileIcon = document.createElement('div');
        profileIcon.className = 'profile-icon';
        profileIcon.textContent = currentUser.name.charAt(0).toUpperCase();
        profileIcon.onclick = toggleProfileMenu;
        
        const profileMenu = document.createElement('div');
        profileMenu.className = 'profile-menu';
        profileMenu.id = 'profileMenu';
        
        profileMenu.innerHTML = `
            <div class="profile-menu-item" style="font-weight:600; color:var(--primary-blue)">${currentUser.name}</div>
            <div class="profile-menu-item" style="font-size:12px; color:#666; margin-bottom:5px;">${currentUser.email}</div>
            <a href="../pages/profile.html" class="profile-menu-item">👤 Profile Settings</a>
            <hr>
            <a href="#" class="profile-menu-item logout" id="logoutBtn">Logout</a>
        `;
        
        profileDropdown.appendChild(profileIcon);
        profileDropdown.appendChild(profileMenu);
        nav.appendChild(profileDropdown);

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = '../pages/login.html';
        loginLink.textContent = 'Login';
        loginLink.style.marginLeft = '24px';
        nav.appendChild(loginLink);
    }
}

function toggleProfileMenu(e) {
    e.stopPropagation();
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            document.addEventListener('click', function closeMenu(event) {
                if (!event.target.closest('.profile-dropdown')) {
                    menu.classList.remove('active');
                    document.removeEventListener('click', closeMenu);
                }
            });
        }
    }
}

// --- Utilities ---
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function showError(elementId, message) {
    const err = document.getElementById(elementId);
    if (err) { err.textContent = message; err.style.display = 'block'; }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
}