// Contribution workflow steps
const workflowSteps = [
    {
        id: 1,
        title: "Fork the Repository",
        description: "Create your own copy of the repository by clicking the 'Fork' button at the top right of the project page.",
        icon: "🍴",
        code: "git clone https://github.com/your-username/repository.git\ncd repository"
    },
    {
        id: 2,
        title: "Clone Your Fork",
        description: "Download your fork to your local machine to start working on it.",
        icon: "📥",
        code: "git clone https://github.com/your-username/repository.git\ncd repository"
    },
    {
        id: 3,
        title: "Create a Branch",
        description: "Create a new branch for your feature or bug fix to keep your changes organized.",
        icon: "🌿",
        code: "git checkout -b feature/your-feature-name"
    },
    {
        id: 4,
        title: "Make Your Changes",
        description: "Implement your feature or fix the bug. Remember to follow the project's coding style.",
        icon: "✏️",
        code: "git add .\ngit commit -m \"feat: add new feature\""
    },
    {
        id: 5,
        title: "Push Your Changes",
        description: "Push your changes to your fork on GitHub to prepare for creating a pull request.",
        icon: "📤",
        code: "git push origin feature/your-feature-name"
    },
    {
        id: 6,
        title: "Create a Pull Request",
        description: "Open a pull request to propose your changes to the original repository. Provide a clear description of your work.",
        icon: "🔄",
        code: "# Navigate to your fork on GitHub\n# Click 'Compare & pull request'"
    }
];

// Do's and Don'ts
const contributionGuidelines = {
    dos: [
        "Open an issue to discuss larger changes before starting work",
        "Follow the project's contribution guidelines in CONTRIBUTING.md",
        "Write clear, descriptive commit messages and PR titles",
        "Include tests for your code changes",
        "Keep your PR focused on a single issue or feature",
        "Respond promptly to review feedback"
    ],
    donts: [
        "Submit large, unrelated changes in a single PR",
        "Ignore existing code style and formatting conventions",
        "Skip writing tests for new functionality",
        "Merge your own PR without review (unless you're a maintainer)",
        "Make changes directly to the main branch",
        "Forget to update documentation when changing functionality"
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render workflow steps
    renderWorkflowSteps();
    
    // Render Do's and Don'ts
    renderContributionGuidelines();
    
    // Initialize progress tracking
    setupProgressTracking();
    
    // Add event listeners
    addEventListeners();
});

// Render workflow steps
function renderWorkflowSteps() {
    const container = document.getElementById('workflowContainer');
    container.innerHTML = workflowSteps.map(step => `
        <div class="workflow-step" data-step="${step.id}">
            <div class="workflow-step-number">${step.id}</div>
            <div class="workflow-step-icon">${step.icon}</div>
            <h3 class="workflow-step-title">${step.title}</h3>
            <p class="workflow-step-description">${step.description}</p>
            <div class="code-block">
                <button class="copy-btn">Copy</button>
                <pre>${step.code}</pre>
            </div>
        </div>
    `).join('');
}

// Render Do's and Don'ts
function renderContributionGuidelines() {
    const dosList = document.querySelector('.dos-list');
    const dontsList = document.querySelector('.donts-list');
    
    dosList.innerHTML = contributionGuidelines.dos.map(item => `
        <li>
            <div class="check-icon">✓</div>
            <div>${item}</div>
        </li>
    `).join('');
    
    dontsList.innerHTML = contributionGuidelines.donts.map(item => `
        <li>
            <div class="cross-icon">✕</div>
            <div>${item}</div>
        </li>
    `).join('');
}

// Setup progress tracking
function setupProgressTracking() {
    const steps = document.querySelectorAll('.workflow-step');
    const progressFill = document.getElementById('progressFill');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Mark this step as completed
            step.classList.add('completed');
            
            // Update progress bar
            const completedSteps = document.querySelectorAll('.workflow-step.completed').length;
            const totalSteps = steps.length;
            const progressPercentage = (completedSteps / totalSteps) * 100;
            progressFill.style.width = `${progressPercentage}%`;
            
            // Highlight next step if available
            if (index < steps.length - 1) {
                const nextStep = steps[index + 1];
                nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
                nextStep.classList.add('highlight');
                setTimeout(() => nextStep.classList.remove('highlight'), 2000);
            }
        });
    });
}

// Add event listeners
function addEventListeners() {
    // Copy to clipboard functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block').querySelector('pre');
            const code = codeBlock.innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = 'Copy';
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Helper function to simulate PR creation
function simulatePR() {
    alert("Great job! You've completed all the steps to contribute to open source.\n\nIn a real scenario, you would now:\n1. Navigate to your fork on GitHub\n2. Click 'Compare & pull request'\n3. Fill out the PR template with your changes\n4. Submit your PR for review");
}