// auth.js
// Handles signup & login using localStorage

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) signupForm.addEventListener('submit', handleSignup);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
});

/* =========================
   SIGNUP
========================= */
function handleSignup(e) {
  e.preventDefault();

  const name = getValue('name');
  const email = getValue('email');
  const password = getValue('password');
  const confirmPassword = getValue('confirmPassword');

  clearErrors();
  let valid = true;

  if (name.length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    valid = false;
  }

  if (!isValidEmail(email)) {
    showError('emailError', 'Enter a valid email address');
    valid = false;
  }

  if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters');
    valid = false;
  }

  if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match');
    valid = false;
  }

  if (!valid) return;

  const users = getUsers();
  if (users.some(u => u.email === email)) {
    showError('emailError', 'Account already exists');
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  window.location.href = '../index.html';
}

/* =========================
   LOGIN
========================= */
function handleLogin(e) {
  e.preventDefault();

  const email = getValue('loginEmail');
  const password = getValue('loginPassword');

  clearErrors();

  const users = getUsers();
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    showError('loginPasswordError', 'Invalid email or password');
    return;
  }

  setCurrentUser(user);
  window.location.href = '../index.html';
}

/* =========================
   HELPERS
========================= */
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(
    'currentUser',
    JSON.stringify({ id: user.id, name: user.name, email: user.email })
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

function clearErrors() {
  document
    .querySelectorAll('.error-message')
    .forEach(e => (e.style.display = 'none'));
}
