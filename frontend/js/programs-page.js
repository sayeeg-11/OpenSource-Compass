// programs-page.js
// Renders the Programs page using data from ../data/programs.json

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('programs-grid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  showLoadingState();

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

      // Render actual cards
      renderProgramCards(sorted);
      
      // Re-attach filter functionality
      initializeFilters();
    })
    .catch((err) => {
      console.error('Failed to load programs:', err);
      grid.innerHTML = `<p class="status-message error">Failed to load programs. Please refresh the page.</p>`;
    });
});

/**
 * Show loading skeleton cards
 */
function showLoadingState() {
  const grid = document.getElementById('programs-grid');
  if (!grid) return;
  
  grid.innerHTML = Array(8).fill(0).map((_, i) => `
    <div class="program-card skeleton-card" style="animation-delay: ${i * 0.1}s">
      <div class="skeleton-icon"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text" style="width: 60%"></div>
      <div class="skeleton-badge"></div>
      <div class="skeleton-stats">
        <div class="skeleton-stat"></div>
        <div class="skeleton-stat"></div>
        <div class="skeleton-stat"></div>
      </div>
    </div>
  `).join('');
}

/**
 * Render actual program cards
 */
function renderProgramCards(programs) {
  const grid = document.getElementById('programs-grid');
  const noResults = document.getElementById('noResults');
  
  // Hide no results message initially
  if (noResults) noResults.style.display = 'none';
  
  // Render cards with data attributes for filtering
  grid.innerHTML = programs.map(program => {
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
    
    // Extract filter classes from program data
    const levelClass = getLevelClass(difficulty);
    const typeClass = getTypeClass(stipend);
    const regionClass = program?.region === 'India' ? 'india' : 'global';
    const statusClass = program?.status === 'ongoing' ? 'ongoing' : 'seasonal';

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
      <div class="program-card ${levelClass} ${typeClass} ${regionClass} ${statusClass}" 
           data-name="${name.toLowerCase()}"
           data-level="${difficulty.toLowerCase()}"
           data-type="${typeClass}"
           data-region="${regionClass}"
           data-status="${statusClass}">
        <div class="card-accent" style="background: ${diffColor};"></div>
        <div class="card-content">
          <h4 class="card-title">${name}</h4>
          <p class="card-desc">${desc}</p>
          
          <div class="badge-group">
            <span class="label ${typeClass}">${typeClass === 'paid' ? 'Paid' : 'Unpaid'}</span>
            <span class="label ${regionClass}">${regionClass === 'india' ? 'India' : 'Global'}</span>
            <span class="label ${levelClass}">${difficulty}</span>
          </div>
          
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
  }).join('');
}

/**
 * Helper function to get level class
 */
function getLevelClass(difficulty) {
  const diff = difficulty.toLowerCase();
  if (diff.includes('beginner')) return 'beginner';
  if (diff.includes('intermediate')) return 'intermediate';
  if (diff.includes('advanced')) return 'advanced';
  return 'beginner';
}

/**
 * Helper function to get type class based on stipend
 */
function getTypeClass(stipend) {
  const stipendLower = stipend.toLowerCase();
  if (stipendLower.includes('paid') || stipendLower.includes('$') || stipendLower.includes('stipend')) {
    return 'paid';
  }
  return 'unpaid';
}

/**
 * Initialize filter functionality
 */
function initializeFilters() {
  const filters = {
    level: document.getElementById("levelFilter"),
    type: document.getElementById("typeFilter"),
    region: document.getElementById("regionFilter"),
    status: document.getElementById("statusFilter"),
  };

  const cards = document.querySelectorAll(".program-card:not(.skeleton-card)");
  const noResults = document.getElementById("noResults");

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const matchLevel =
        filters.level.value === "all" || card.classList.contains(filters.level.value);

      const matchType =
        filters.type.value === "all" || card.classList.contains(filters.type.value);

      const matchRegion =
        filters.region.value === "all" || card.classList.contains(filters.region.value);

      const matchStatus =
        filters.status.value === "all" || card.classList.contains(filters.status.value);

      if (matchLevel && matchType && matchRegion && matchStatus) {
        card.style.display = "flex";
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Show "No Results" message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  // Add active filter UI feedback
  Object.values(filters).forEach(filter => {
    filter.addEventListener("change", () => {
      // Highlight active filters
      Object.values(filters).forEach(f => f.classList.remove("active-filter"));
      if (filter.value !== "all") {
        filter.classList.add("active-filter");
      }
      applyFilters();
    });
  });

  // Initial filter application
  applyFilters();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}