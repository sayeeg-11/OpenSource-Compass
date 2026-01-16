// programs-page.js
// Renders Open Source Programs dynamically with filtering support

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("programs-grid");
  if (!grid) return;

  renderMessage("Loading programs…");

  fetch("../data/programs.json")
    .then(validateResponse)
    .then(renderPrograms)
    .catch(handleError);

  /* ================= Helpers ================= */

  function validateResponse(res) {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function renderPrograms(programs) {
    if (!Array.isArray(programs) || programs.length === 0) {
      renderMessage("No programs found.");
      return;
    }

    const sorted = [...programs].sort((a, b) =>
      String(a?.name || "").localeCompare(String(b?.name || ""))
    );

    // Render filter + cards
    grid.innerHTML = `
      <div class="programs-toolbar">
        ${renderFilters()}
      </div>
      <div class="programs-list">
        ${sorted.map(renderCard).join("")}
      </div>
    `;

    attachFilterLogic();
  }

  function renderCard(program) {
    const name = escapeHtml(program?.name || "Open Source Program");
    const desc = escapeHtml(program?.description || "");
    const timeline = escapeHtml(program?.timeline || "");
    const level = escapeHtml(program?.difficulty || "");
    const url = typeof program?.url === "string" ? program.url.trim() : "";

    return `
      <article class="program-card" data-level="${level.toLowerCase()}">
        <h4>${name}</h4>
        <p class="program-desc">${desc}</p>

        <div class="program-meta">
          ${timeline ? `<span><strong>Timeline:</strong> ${timeline}</span>` : ""}
          ${level ? `<span><strong>Level:</strong> ${level}</span>` : ""}
        </div>

        ${
          url
            ? `<a class="program-link" href="${url}" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-arrow-up-right-from-square"></i> Official Website
              </a>`
            : ""
        }
      </article>
    `;
  }

  function renderFilters() {
    return `
      <div class="filter-group">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="beginner">Beginner</button>
        <button class="filter-btn" data-filter="intermediate">Intermediate</button>
        <button class="filter-btn" data-filter="advanced">Advanced</button>
      </div>
    `;
  }

  function attachFilterLogic() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".program-card");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === "all" || card.dataset.level === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  function renderMessage(message) {
    grid.innerHTML = `
      <p class="programs-message">${message}</p>
    `;
  }

  function handleError(err) {
    console.error("Failed to load programs:", err);
    grid.innerHTML = `
      <p class="programs-error">
        Failed to load programs. Please refresh the page.
      </p>
    `;
  }
});

/* ================= Security ================= */

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
