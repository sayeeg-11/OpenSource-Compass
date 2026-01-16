/**
 * Programs Page Logic
 * Handles fetching, rendering, filtering, modal interactions, and subscriptions
 */

let programs = [];

document.addEventListener('DOMContentLoaded', initPrograms);

/* =========================
   INIT
========================= */
function initPrograms() {
  fetchPrograms();
  bindFilters();
  bindModalClose();
  bindSubscriptionForm();
}

/* =========================
   DATA LOADING
========================= */
function fetchPrograms() {
  fetch('../data/programs.json')
    .then(res => res.json())
    .then(data => {
      programs = data;
      renderPrograms();
    })
    .catch(err => {
      console.error('Failed to load programs.json, using fallback', err);
      programs = getFallbackPrograms();
      renderPrograms();
    });
}

/* =========================
   RENDERING
========================= */
function renderPrograms(list = programs) {
  const container = document.getElementById('programsContainer');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="no-results">
        <h3>No programs found</h3>
        <p>Try adjusting your filters</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="program-card" data-id="${p.id}">
      <div class="program-info">
        <div class="program-header">
          <h3>${p.name}</h3>
          <span class="program-status status-${p.status.toLowerCase()}">${p.status}</span>
        </div>

        <p class="program-description">${p.description}</p>

        <div class="program-details">
          ${detail('Timeline', p.timeline)}
          ${detail('Stipend/Reward', p.stipend)}
          ${detail('Contributors', p.contributors.toLocaleString())}
          ${detail('Open Issues', p.issues)}
        </div>

        <div class="program-badges">
          <span class="badge difficulty-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
          <span class="badge">${p.organizations} Organizations</span>
        </div>

        <div class="program-actions">
          <button class="btn btn-primary view-btn">View Details</button>
          <button class="btn btn-secondary issues-btn">View Issues</button>
        </div>
      </div>

      <div class="program-logo">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='../library/assets/logo.png'">
      </div>
    </div>
  `).join('');

  bindProgramActions();
}

function detail(label, value) {
  return `
    <div class="detail-item">
      <span class="detail-label">${label}</span>
      <span class="detail-value">${value}</span>
    </div>`;
}

/* =========================
   PROGRAM ACTIONS
========================= */
function bindProgramActions() {
  document.querySelectorAll('.program-card').forEach(card => {
    const id = Number(card.dataset.id);

    card.addEventListener('click', () => openModal(id));
    card.querySelector('.view-btn').onclick = e => {
      e.stopPropagation();
      openModal(id);
    };
    card.querySelector('.issues-btn').onclick = e => {
      e.stopPropagation();
      viewIssues(id);
    };
  });
}

/* =========================
   MODAL
========================= */
function openModal(id) {
  const program = programs.find(p => p.id === id);
  if (!program) return;

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-logo">
      <img src="${program.image}" onerror="this.src='../library/assets/logo.png'">
    </div>

    <h2>${program.name}</h2>
    <p class="muted">${program.description}</p>

    ${modalSection('Quick Info', `
      ${info('Status', program.status)}
      ${info('Difficulty', program.difficulty)}
      ${info('Timeline', program.timeline)}
      ${info('Stipend', program.stipend)}
      ${info('Contributors', program.contributors.toLocaleString())}
      ${info('Open Issues', program.issues)}
    `)}

    ${modalSection('Types of Contributions',
      `<ul>${program.contributions.map(c => `<li>✓ ${c}</li>`).join('')}</ul>`
    )}

    ${modalSection('Popular Issues',
      `<ul>${program.issues_list.map(i => `<li>🐛 ${i}</li>`).join('')}</ul>`
    )}
  `;

  document.getElementById('programModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('programModal').style.display = 'none';
}

function bindModalClose() {
  window.addEventListener('click', e => {
    const modal = document.getElementById('programModal');
    if (e.target === modal) closeModal();
  });
}

function modalSection(title, content) {
  return `
    <div class="modal-section">
      <h3>${title}</h3>
      ${content}
    </div>`;
}

function info(label, value) {
  return `<div><strong>${label}:</strong> ${value}</div>`;
}

/* =========================
   FILTERING
========================= */
function bindFilters() {
  ['difficultyFilter', 'statusFilter', 'searchBox'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', filterPrograms);
  });
}

function filterPrograms() {
  const difficulty = getValue('difficultyFilter');
  const status = getValue('statusFilter');
  const search = getValue('searchBox').toLowerCase();

  const filtered = programs.filter(p =>
    (!difficulty || p.difficulty === difficulty) &&
    (!status || p.status === status) &&
    (!search || p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
  );

  renderPrograms(filtered);
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

/* =========================
   ISSUES VIEW
========================= */
function viewIssues(id) {
  const p = programs.find(pr => pr.id === id);
  if (!p) return;

  alert(
    `Found ${p.issues} open issues in ${p.name}\n\n` +
    p.issues_list.slice(0, 3).map(i => `• ${i}`).join('\n')
  );
}

/* =========================
   SUBSCRIPTION
========================= */
function bindSubscriptionForm() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('subscriberEmail').value.trim();
    const msg = document.getElementById('subscriptionMessage');

    if (!isValidEmail(email)) {
      showSubscriptionMsg(msg, 'Please enter a valid email address.', false);
      return;
    }

    console.log(`New Subscription: ${email}`);
    showSubscriptionMsg(msg, "You're subscribed! 🎉", true);
    form.reset();
  });
}

function showSubscriptionMsg(el, text, success) {
  el.textContent = text;
  el.className = `subscription-message ${success ? 'message-success' : 'message-error'}`;
  setTimeout(() => (el.textContent = ''), 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================
   FALLBACK DATA
========================= */
function getFallbackPrograms() {
  return programs; // reuse your existing fallback array if needed
}
