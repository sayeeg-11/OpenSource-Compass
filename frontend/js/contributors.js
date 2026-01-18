/* =========================
   CONSTANTS & STORAGE KEYS
========================= */
const STORAGE_KEYS = {
  COMPLETED_STEPS: "completedSteps",
  THEME: "theme"
};

/* =========================
   DATA
========================= */
const workflowSteps = [
  { id: 1, title: "Fork the Repository", description: "Create your own copy of the repository using the Fork button on GitHub.", icon: "🍴", code: "git clone https://github.com/your-username/repository.git\ncd repository" },
  { id: 2, title: "Clone Your Fork", description: "Clone the forked repository to your local machine.", icon: "📥", code: "git clone https://github.com/your-username/repository.git\ncd repository" },
  { id: 3, title: "Create a Branch", description: "Always work on a separate branch for features or fixes.", icon: "🌿", code: "git checkout -b feature/your-feature-name" },
  { id: 4, title: "Make Your Changes", description: "Implement changes and commit them with a clear message.", icon: "✏️", code: "git add .\ngit commit -m \"feat: add new feature\"" },
  { id: 5, title: "Push Changes", description: "Push your branch to GitHub.", icon: "📤", code: "git push origin feature/your-feature-name" },
  { id: 6, title: "Open a Pull Request", description: "Create a PR with a clear description of your work.", icon: "🔄", code: "# Go to GitHub\n# Click 'Compare & pull request'" }
];

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  renderWorkflowSteps();
  restoreProgress();
  setupProgressTracking();
  setupCopyButtons();
  setupSearch();
  setupThemeToggle();
  setupKeyboardNavigation();
});

/* =========================
   RENDER WORKFLOW
========================= */
function renderWorkflowSteps() {
  const container = document.getElementById("workflowContainer");
  container.innerHTML = workflowSteps.map(step => `
    <div class="workflow-step" data-step="${step.id}" tabindex="0">
      <span class="status-badge pending">⏳ Pending</span>
      <div class="workflow-step-number">${step.id}</div>
      <div class="workflow-step-icon">${step.icon}</div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>

      <button class="toggle-code">Show Code</button>
      <div class="code-block hidden">
        <button class="copy-btn">Copy</button>
        <pre>${step.code}</pre>
      </div>
    </div>
  `).join("");
}

/* =========================
   PROGRESS (LocalStorage)
========================= */
function setupProgressTracking() {
  const steps = document.querySelectorAll(".workflow-step");
  const progressFill = document.getElementById("progressFill");

  steps.forEach(step => {
    step.addEventListener("click", () => markCompleted(step, steps, progressFill));
  });
}

function markCompleted(step, steps, progressFill) {
  const id = step.dataset.step;
  step.classList.add("completed");
  updateBadge(step, "completed");

  const completed = getCompletedSteps();
  if (!completed.includes(id)) {
    completed.push(id);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(completed));
  }

  progressFill.style.width = `${(completed.length / steps.length) * 100}%`;
}

function restoreProgress() {
  const completed = getCompletedSteps();
  const steps = document.querySelectorAll(".workflow-step");
  const progressFill = document.getElementById("progressFill");

  steps.forEach(step => {
    if (completed.includes(step.dataset.step)) {
      step.classList.add("completed");
      updateBadge(step, "completed");
    }
  });

  progressFill.style.width = `${(completed.length / steps.length) * 100}%`;
}

function getCompletedSteps() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS)) || [];
}

/* =========================
   STATUS BADGES
========================= */
function updateBadge(step, status) {
  const badge = step.querySelector(".status-badge");
  badge.className = `status-badge ${status}`;
  badge.textContent = status === "completed" ? "✅ Completed" : "🔥 Current";
}

/* =========================
   CODE TOGGLE & COPY
========================= */
document.addEventListener("click", e => {
  if (e.target.classList.contains("toggle-code")) {
    const block = e.target.nextElementSibling;
    block.classList.toggle("hidden");
    e.target.textContent = block.classList.contains("hidden") ? "Show Code" : "Hide Code";
  }

  if (e.target.classList.contains("copy-btn")) {
    const pre = e.target.nextElementSibling;
    navigator.clipboard.writeText(pre.innerText);
    e.target.textContent = "Copied!";
    setTimeout(() => e.target.textContent = "Copy", 1500);
  }
});

/* =========================
   SEARCH FILTER
========================= */
function setupSearch() {
  const search = document.getElementById("stepSearch");
  if (!search) return;

  search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    document.querySelectorAll(".workflow-step").forEach(step => {
      step.style.display = step.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
  });
}

/* =========================
   THEME TOGGLE
========================= */
function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(STORAGE_KEYS.THEME,
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

function applySavedTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  if (theme === "dark") document.body.classList.add("dark");
}

/* =========================
   KEYBOARD NAVIGATION
========================= */
function setupKeyboardNavigation() {
  const steps = [...document.querySelectorAll(".workflow-step")];

  document.addEventListener("keydown", e => {
    const active = document.activeElement;
    const index = steps.indexOf(active);

    if (e.key === "ArrowRight" && index < steps.length - 1) steps[index + 1].focus();
    if (e.key === "ArrowLeft" && index > 0) steps[index - 1].focus();
    if (e.key === "Enter" && active.classList.contains("workflow-step")) active.click();
  });
}

/* =========================
   DEMO PR SIMULATION
========================= */
function simulatePR() {
  alert("🎉 PR Simulation Complete!\nYou're now Open Source Ready 🚀");
}
