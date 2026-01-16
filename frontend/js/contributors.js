/* =========================
   DATA
========================= */

// Contribution workflow steps
const workflowSteps = [
  {
    id: 1,
    title: "Fork the Repository",
    description: "Create your own copy of the repository using the Fork button on GitHub.",
    icon: "🍴",
    code: "git clone https://github.com/your-username/repository.git\ncd repository"
  },
  {
    id: 2,
    title: "Clone Your Fork",
    description: "Clone the forked repository to your local machine.",
    icon: "📥",
    code: "git clone https://github.com/your-username/repository.git\ncd repository"
  },
  {
    id: 3,
    title: "Create a Branch",
    description: "Always work on a separate branch for features or fixes.",
    icon: "🌿",
    code: "git checkout -b feature/your-feature-name"
  },
  {
    id: 4,
    title: "Make Your Changes",
    description: "Implement changes and commit them with a clear message.",
    icon: "✏️",
    code: "git add .\ngit commit -m \"feat: add new feature\""
  },
  {
    id: 5,
    title: "Push Changes",
    description: "Push your branch to GitHub.",
    icon: "📤",
    code: "git push origin feature/your-feature-name"
  },
  {
    id: 6,
    title: "Open a Pull Request",
    description: "Create a PR with a clear description of your work.",
    icon: "🔄",
    code: "# Go to GitHub\n# Click 'Compare & pull request'"
  }
];

// Contribution guidelines
const contributionGuidelines = {
  dos: [
    "Discuss large changes via issues first",
    "Follow CONTRIBUTING.md rules",
    "Write meaningful commit messages",
    "Add tests when required",
    "Keep PRs small and focused",
    "Respond to review comments"
  ],
  donts: [
    "Mix unrelated changes in one PR",
    "Ignore code style rules",
    "Skip tests",
    "Merge without review",
    "Commit directly to main branch",
    "Forget documentation updates"
  ]
};

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  renderWorkflowSteps();
  renderGuidelines();
  setupProgressTracking();
  setupCopyButtons();
  setupSmoothScroll();
});

/* =========================
   RENDER FUNCTIONS
========================= */

function renderWorkflowSteps() {
  const container = document.getElementById('workflowContainer');
  if (!container) return;

  container.innerHTML = workflowSteps.map(step => `
    <div class="workflow-step" data-step="${step.id}">
      <div class="workflow-step-number">${step.id}</div>
      <div class="workflow-step-icon">${step.icon}</div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>

      <div class="code-block">
        <button class="copy-btn">Copy</button>
        <pre>${step.code}</pre>
      </div>
    </div>
  `).join('');
}

function renderGuidelines() {
  renderList('.dos-list', contributionGuidelines.dos, '✓', 'check-icon');
  renderList('.donts-list', contributionGuidelines.donts, '✕', 'cross-icon');
}

function renderList(selector, items, symbol, iconClass) {
  const list = document.querySelector(selector);
  if (!list) return;

  list.innerHTML = items.map(item => `
    <li>
      <span class="${iconClass}">${symbol}</span>
      <span>${item}</span>
    </li>
  `).join('');
}

/* =========================
   INTERACTIONS
========================= */

function setupProgressTracking() {
  const steps = document.querySelectorAll('.workflow-step');
  const progressFill = document.getElementById('progressFill');
  if (!steps.length || !progressFill) return;

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      step.classList.add('completed');

      const completed = document.querySelectorAll('.workflow-step.completed').length;
      progressFill.style.width = `${(completed / steps.length) * 100}%`;

      highlightNextStep(steps, index);
    });
  });
}

function highlightNextStep(steps, index) {
  if (index >= steps.length - 1) return;

  const next = steps[index + 1];
  next.classList.add('highlight');
  next.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => next.classList.remove('highlight'), 2000);
}

function setupCopyButtons() {
  document.addEventListener('click', e => {
    if (!e.target.classList.contains('copy-btn')) return;

    const pre = e.target.nextElementSibling;
    if (!pre) return;

    navigator.clipboard.writeText(pre.innerText).then(() => {
      e.target.textContent = 'Copied!';
      e.target.classList.add('copied');

      setTimeout(() => {
        e.target.textContent = 'Copy';
        e.target.classList.remove('copied');
      }, 2000);
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

/* =========================
   DEMO HELP
========================= */

function simulatePR() {
  alert(
    "🎉 Great job!\n\nNext steps on GitHub:\n" +
    "1. Open your fork\n" +
    "2. Click 'Compare & pull request'\n" +
    "3. Fill PR details\n" +
    "4. Submit for review"
  );
}
