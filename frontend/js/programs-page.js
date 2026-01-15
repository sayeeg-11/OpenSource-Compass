// programs-page.js
// Renders the Programs page using data from ../data/programs.json

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('programs-grid');
  if (!grid) return;

  grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);">Loading programs…</p>';

  fetch('../data/programs.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((programs) => {
      if (!Array.isArray(programs) || programs.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);">No programs found.</p>';
        return;
      }

      const sorted = [...programs].sort((a, b) => String(a?.name || '').localeCompare(String(b?.name || '')));

      grid.innerHTML = sorted
        .map((p) => {
          const name = escapeHtml(p?.name || 'Open Source Program');
          const desc = escapeHtml(p?.description || '');
          const timeline = escapeHtml(p?.timeline || '');
          const difficulty = escapeHtml(p?.difficulty || '');
          const url = typeof p?.url === 'string' ? p.url.trim() : '';

          return `
            <div class="card">
              <h4>${name}</h4>
              <p>${desc}</p>
              <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">
                ${timeline ? `<span><strong>Timeline:</strong> ${timeline}</span>` : ''}
                ${timeline && difficulty ? '<span style="margin:0 0.5rem;">·</span>' : ''}
                ${difficulty ? `<span><strong>Level:</strong> ${difficulty}</span>` : ''}
              </p>
             ${url ? `<p style="margin-top: 1rem;">
  <a
    href="${url}"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit official website of ${name} (opens in a new tab)"
    style="color: var(--deep-navy); font-weight: 600; text-decoration: none;"
  >
    <i
      class="fas fa-arrow-up-right-from-square"
      aria-hidden="true"
      style="margin-right:0.4rem;color:var(--primary-gold);"
    ></i>
    Official website
  </a>
</p>` : ''}

            </div>
          `;
        })
        .join('');
    })
    .catch((err) => {
      console.error('Failed to load programs:', err);
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#a12b2b;">Failed to load programs. Please refresh.</p>';
    });
});

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
