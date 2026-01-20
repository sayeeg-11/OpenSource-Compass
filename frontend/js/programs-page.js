// programs-page.js
// Renders the Programs page using data from ../data/programs.json

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('programs-grid');
  if (!grid) return;

  // -------------------------
  // Loading state
  // -------------------------
  grid.innerHTML = `
    <p class="status-message">Loading programs…</p>
  `;

  // Fetch program data
  fetch('../data/programs.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((programs) => {
      if (!Array.isArray(programs) || programs.length === 0) {
        grid.innerHTML = `<p class="status-message">No programs found.</p>`;
        return;
      }

      // Sort programs alphabetically
      const sorted = [...programs].sort((a, b) =>
        String(a?.name || '').localeCompare(String(b?.name || ''))
      );

      // Render cards
      grid.innerHTML = sorted.map(renderProgramCard).join('');
    })
    .catch((err) => {
      console.error('Failed to load programs:', err);
      grid.innerHTML = `<p class="status-message error">Failed to load programs. Please refresh the page.</p>`;
    });
});

function renderProgramCard(program) {
  const name = escapeHtml(program?.name || 'Open Source Program');
  const desc = escapeHtml(program?.description || 'No description provided.');
  const timeline = escapeHtml(program?.timeline || 'N/A');
  const difficulty = escapeHtml(program?.difficulty || 'Beginner');
  const stipend = escapeHtml(program?.stipend || 'N/A');
  const contributors = program?.contributors || 0;
  const organizations = program?.organizations || 0;
  const issues = program?.issues || 0;
  const skills = Array.isArray(program?.skills) ? program.skills : program?.contributions || [];
  const url = typeof program?.url === 'string' ? program.url.trim() : '';

  // Difficulty color
  let diffColor = 'var(--primary-gold)';
  if (difficulty.toLowerCase().includes('intermediate')) diffColor = 'var(--secondary-gold)';
  if (difficulty.toLowerCase().includes('advanced')) diffColor = '#e74c3c';

  // Skills / Contributions tags
  const skillsHtml = skills.length
    ? `<div class="card-skills">
         ${skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
       </div>`
    : '';

  // Stats badges
  const statsHtml = `
    <div class="card-stats">
      <span><i class="fas fa-users"></i> ${contributors} contributors</span>
      <span><i class="fas fa-building"></i> ${organizations} orgs</span>
      <span><i class="fas fa-exclamation-circle"></i> ${issues} issues</span>
    </div>
  `;

  return `
    <div class="program-card">
      <div class="card-accent" style="background: ${diffColor};"></div>
      <div class="card-content">
        <h4 class="card-title">${name}</h4>
        <p class="card-desc">${desc}</p>
        
        <div class="card-meta-grid">
          <div><i class="fas fa-calendar-alt"></i> <strong>Timeline:</strong> ${timeline}</div>
          <div><i class="fas fa-layer-group"></i> <strong>Level:</strong> <span style="color:${diffColor}; font-weight:600;">${difficulty}</span></div>
          <div><i class="fas fa-dollar-sign"></i> <strong>Stipend:</strong> ${stipend}</div>
        </div>

        ${skillsHtml}
        ${statsHtml}

        ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="card-link">
          Visit Official Website <i class="fas fa-arrow-up-right-from-square"></i>
        </a>` : ''}
      </div>
    </div>
  `;
}


function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
