// Profile icon functionality
document.addEventListener('DOMContentLoaded', function() {
    updateProfileIcon();
});

function updateProfileIcon() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Remove existing profile icon if any
    const existingProfile = nav.querySelector('.profile-dropdown');
    if (existingProfile) {
        existingProfile.remove();
    }

    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // User is logged in - show profile icon with dropdown
        const profileDropdown = document.createElement('div');
        profileDropdown.className = 'profile-dropdown';
        
        const profileIcon = document.createElement('div');
        profileIcon.className = 'profile-icon';
        profileIcon.textContent = currentUser.name.charAt(0).toUpperCase();
        profileIcon.setAttribute('title', currentUser.name);
        profileIcon.addEventListener('click', toggleProfileMenu);
        
        const profileMenu = document.createElement('div');
        profileMenu.className = 'profile-menu';
        profileMenu.id = 'profileMenu';
        
        const userName = document.createElement('div');
        userName.className = 'profile-menu-item';
        userName.style.fontWeight = '600';
        userName.style.color = 'var(--primary-blue)';
        userName.textContent = currentUser.name;
        profileMenu.appendChild(userName);
        
        const userEmail = document.createElement('div');
        userEmail.className = 'profile-menu-item';
        userEmail.style.fontSize = '12px';
        userEmail.style.color = '#666';
        userEmail.textContent = currentUser.email;
        profileMenu.appendChild(userEmail);
        
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.className = 'profile-menu-item logout';
        logoutLink.textContent = 'Logout';
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        profileMenu.appendChild(logoutLink);
        
        profileDropdown.appendChild(profileIcon);
        profileDropdown.appendChild(profileMenu);
        nav.appendChild(profileDropdown);
    } else {
        // User is not logged in - show login link
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
        
        // Close menu when clicking outside
        if (menu.classList.contains('active')) {
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(event) {
                    if (!event.target.closest('.profile-dropdown')) {
                        menu.classList.remove('active');
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 0);
        }
    }
}

// Note: getCurrentUser() and logout() functions are defined in auth.js
