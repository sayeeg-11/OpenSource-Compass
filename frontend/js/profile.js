// profile.js
// Handles profile icon, dropdown, and logout UI

document.addEventListener('DOMContentLoaded', updateProfileIcon);

function updateProfileIcon() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Remove old profile/login if exists
  nav.querySelector('.profile-dropdown')?.remove();
  nav.querySelector('.login-link')?.remove();

  const user = getCurrentUser();

  if (!user) {
    appendLoginLink(nav);
    return;
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'profile-dropdown';

  const icon = document.createElement('div');
  icon.className = 'profile-icon';
  icon.textContent = user.name.charAt(0).toUpperCase();
  icon.title = user.name;
  icon.addEventListener('click', toggleProfileMenu);

  const menu = document.createElement('div');
  menu.className = 'profile-menu';
  menu.id = 'profileMenu';

  menu.innerHTML = `
    <div class="profile-menu-item profile-name">${user.name}</div>
    <div class="profile-menu-item profile-email">${user.email}</div>
    <a href="#" class="profile-menu-item logout" id="logoutBtn">Logout</a>
  `;

  dropdown.append(icon, menu);
  nav.appendChild(dropdown);

  document.getElementById('logoutBtn').addEventListener('click', logout);
}

/* =========================
   MENU TOGGLE
========================= */
function toggleProfileMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('profileMenu');
  if (!menu) return;

  menu.classList.toggle('active');

  document.addEventListener('click', function close(event) {
    if (!event.target.closest('.profile-dropdown')) {
      menu.classList.remove('active');
      document.removeEventListener('click', close);
    }
  });
}

/* =========================
   HELPERS
========================= */
function appendLoginLink(nav) {
  const link = document.createElement('a');
  link.href = '../pages/login.html';
  link.textContent = 'Login';
  link.className = 'login-link';
  nav.appendChild(link);
}

/* 
  getCurrentUser() and logout()
  are intentionally reused from auth.js
*/
