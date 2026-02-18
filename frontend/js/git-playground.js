document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');
    const sendBtn = document.getElementById('send-btn');
    const terminalWindow = document.querySelector('.terminal-window');

    // Scenarios UI
    const scenariosView = document.getElementById('scenarios-view');
    const cheatsheetView = document.getElementById('cheatsheet-view');
    const btnScenarios = document.getElementById('btn-scenarios');
    const btnCheatsheet = document.getElementById('btn-cheatsheet');
    const scenarioList = document.getElementById('scenario-list');
    const scenarioSearch = document.getElementById('scenario-search');
    const filterTags = document.querySelectorAll('.filter-tag');

    // Cheat Sheet UI
    const cheatSearch = document.getElementById('cheat-search');

    // --- State ---
    const state = {
        history: [],
        currentDir: '~/projects',
        currentBranch: 'main',
        branches: ['main'],
        staged: [],
        commandDelay: 300,
        commits: [
            { hash: '8f23a1', msg: 'Initial commit', author: 'User', date: new Date().toDateString() }
        ],
        activeScenario: null, // { id, ... }
        completedScenarios: []
    };

    // Load available scenarios from global or safe fallback
    const allScenarios = window.gitScenarios || [];

    // Restore completed scenarios from badge engine
    const savedCompletedIds = (window.GitBadgeEngine) ? GitBadgeEngine.getCompletedScenarios() : [];
    state.completedScenarios = [...savedCompletedIds];

    // --- Terminal Logic ---

    function addOutput(htmlContent, type = '') {
        const div = document.createElement('div');
        div.className = `command-output ${type}`;
        div.innerHTML = htmlContent; // Allow HTML for colors/formatting
        terminalOutput.appendChild(div);

        // Auto-scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function addCommandToHistory(cmd) {
        const div = document.createElement('div');
        div.className = 'command-line';
        div.style.marginBottom = '0.5rem';
        const promptBranch = state.currentBranch ? ` (<span style="color: #d2a8ff;">${state.currentBranch}</span>)` : '';
        div.innerHTML = `
            <span style="color: var(--primary-gold);">user@compass</span>:<span style="color: #58a6ff;">${state.currentDir}</span>${promptBranch}$ 
            <span style="color: #e6edf3;">${cmd}</span>
        `;
        terminalOutput.appendChild(div);
    }

    // Insert banner for active scenario
    function updateScenarioBanner() {
        // Remove existing banner if any
        const existingBanner = document.querySelector('.scenario-banner');
        if (existingBanner) existingBanner.remove();

        if (state.activeScenario) {
            const banner = document.createElement('div');
            banner.className = 'scenario-banner';
            banner.innerHTML = `
                <div class="scenario-banner-text">
                    <i class="fas fa-flag"></i> <strong>Goal:</strong> ${state.activeScenario.description}
                </div>
                <div class="scenario-banner-actions">
                    <button id="quit-scenario-btn" title="Quit Scenario">Quit</button>
                </div>
            `;
            // Insert after terminal bar (first child is terminal-bar)
            const terminalBar = terminalWindow.querySelector('.terminal-bar');
            terminalBar.after(banner);

            document.getElementById('quit-scenario-btn').addEventListener('click', quitScenario);
        }
    }

    function simulateGitCommand(cmd) {
        setTimeout(() => {
            const trimmed = cmd.trim();
            const args = trimmed.split(/\s+/);
            const mainCmd = args[0];
            const subCmd = args[1];

            // 1. Handle Non-Git Core Commands
            if (trimmed === 'help') {
                addOutput(`
                    <div style="color: #8b949e">Available Commands:</div>
                    <div style="padding-left: 1rem; color: var(--primary-gold); display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <div>git init</div>
                        <div>git clone [url]</div>
                        <div>git status</div>
                        <div>git add [file]</div>
                        <div>git commit -m "msg"</div>
                        <div>git push</div>
                        <div>git pull</div>
                        <div>git branch [name]</div>
                        <div>git checkout [branch]</div>
                        <div>git merge [branch]</div>
                        <div>git log</div>
                        <div>git diff</div>
                        <div>git remote -v</div>
                        <div>git stash</div>
                        <div>git reset</div>
                        <div>clear</div>
                    </div>
                `);
                return;
            } else if (trimmed === 'clear') {
                terminalOutput.innerHTML = '';
                if (state.activeScenario) {
                    addOutput(`<div class="welcome-msg"><p>Scenario Active: <strong>${state.activeScenario.title}</strong></p></div>`);
                } else {
                    addOutput(`<div class="welcome-msg"><p>Terminal cleared.</p></div>`);
                }
                return;
            } else if (mainCmd !== 'git') {
                addOutput(`bash: ${mainCmd}: command not found`, 'error');
                return;
            }

            // 2. Handle Git Commands
            if (!subCmd) {
                addOutput(`usage: git [--version] [--help] <command> [<args>]`, 'info');
                return;
            }

            // Execute Logic based on mock state
            let success = true; // tracking for scenario validation

            if (subCmd === 'init') {
                addOutput(`Initialized empty Git repository in /home/user/projects/.git/`, 'success');
                state.currentBranch = 'main';
                state.branches = ['main'];
            }
            else if (subCmd === 'clone') {
                const repo = args[2] || 'repo';
                addOutput(`Cloning into '${repo}'...<br>remote: Enumerating objects: 15, done.<br>remote: Total 15 (delta 2), reused 10 (delta 1)<br>Receiving objects: 100% (15/15), done.`, 'success');
            }
            else if (subCmd === 'status') {
                if (state.staged.length > 0) {
                    addOutput(`On branch ${state.currentBranch}<br>Changes to be committed:<br>  (use "git restore --staged <file>..." to unstage)<br><span style="color:#27c93f">\tmodified:   ${state.staged.join(' ')}</span>`, 'info');
                } else {
                    addOutput(`On branch ${state.currentBranch}<br>Your branch is up to date with 'origin/${state.currentBranch}'.<br><br>nothing to commit, working tree clean`, 'info');
                }
            }
            else if (subCmd === 'add') {
                if (args[2]) {
                    const file = args[2];
                    if (file === '.') {
                        state.staged = ['index.html', 'app.js', 'style.css']; // Mock all
                    } else {
                        state.staged.push(file);
                    }
                    addOutput(``); // Silent success
                } else {
                    addOutput(`Nothing specified, nothing added.`, 'info');
                    success = false;
                }
            }
            else if (subCmd === 'commit') {
                const msgIndex = args.indexOf('-m');
                let msg = 'commit';
                if (msgIndex !== -1 && args[msgIndex + 1]) {
                    // Start from msgIndex + 1, join rest, then cleanup quotes
                    // Simple parsing: just take the whole string after -m
                    const rawMsg = trimmed.substring(trimmed.indexOf('-m') + 3);
                    msg = rawMsg.replace(/^["']|["']$/g, "");
                }
                const newHash = Math.random().toString(16).substr(2, 7);
                state.commits.unshift({ hash: newHash, msg: msg, author: 'User', date: new Date().toDateString() });
                state.staged = []; // Clear staged
                addOutput(`[${state.currentBranch} ${newHash}] ${msg}<br> 1 file changed, 10 insertions(+)`, 'success');
            }
            else if (subCmd === 'push') {
                addOutput(`To https://github.com/user/repo.git<br> * [new branch]      ${state.currentBranch} -> ${state.currentBranch}`, 'success');
            }
            else if (subCmd === 'pull') {
                addOutput(`Updating 8f23a1..${state.commits[0] ? state.commits[0].hash : 'HEAD'}<br>Fast-forward<br> README.md | 2 ++<br> 1 file changed, 2 insertions(+)`, 'success');
            }
            else if (subCmd === 'branch') {
                if (args[2] && !args[2].startsWith('-')) {
                    // Create branch
                    if (!state.branches.includes(args[2])) {
                        state.branches.push(args[2]);
                        addOutput(``); // Success
                    } else {
                        addOutput(`fatal: A branch named '${args[2]}' already exists.`, 'error');
                        success = false;
                    }
                }
                else if (args[2] === '-d' || args[2] === '-D') {
                    const b = args[3];
                    if (state.branches.includes(b)) {
                        state.branches = state.branches.filter(br => br !== b);
                        addOutput(`Deleted branch ${b} (was 8f23a1).`);
                    } else {
                        addOutput(`error: branch '${b}' not found.`, 'error');
                        success = false;
                    }
                }
                else if (args[2] === '-m') {
                    const newName = args[3];
                    const oldIndex = state.branches.indexOf(state.currentBranch);
                    if (oldIndex !== -1) {
                        state.branches[oldIndex] = newName;
                        state.currentBranch = newName;
                        addOutput(``);
                    }
                }
                else {
                    // List branches
                    let output = '';
                    state.branches.forEach(b => {
                        if (b === state.currentBranch) output += `* <span style="color: #3fb950">${b}</span><br>`;
                        else output += `  ${b}<br>`;
                    });
                    addOutput(output);
                }
            }
            else if (subCmd === 'checkout') {
                if (args[2] === '-b' && args[3]) {
                    // Create and switch
                    if (!state.branches.includes(args[3])) {
                        state.branches.push(args[3]);
                        state.currentBranch = args[3];
                        addOutput(`Switched to a new branch '${args[3]}'`);
                    } else {
                        addOutput(`fatal: A branch named '${args[3]}' already exists.`, 'error');
                    }
                } else if (args[2]) {
                    // Switch
                    if (state.branches.includes(args[2])) {
                        state.currentBranch = args[2];
                        addOutput(`Switched to branch '${args[2]}'`);
                    } else if (args[2] === '.') {
                        addOutput(`Updated 1 path from the index`);
                    } else if (args[2].includes('.')) {
                        // Likely a file checkout
                        addOutput(`Updated 1 path from the index`);
                    } else {
                        addOutput(`error: pathspec '${args[2]}' did not match any file(s) known to git`, 'error');
                        success = false;
                    }
                } else {
                    addOutput(`git checkout: branch name required`, 'error');
                    success = false;
                }
            }
            else if (subCmd === 'merge') {
                if (args[2]) {
                    addOutput(`Updating 8f23a1..${Math.random().toString(16).substr(2, 7)}<br>Fast-forward<br> app.js | 15 +++++++++++++++<br> 1 file changed, 15 insertions(+)`, 'success');
                } else {
                    addOutput(`fatal: No branch selected to merge.`, 'error');
                    success = false;
                }
            }
            else if (subCmd === 'log') {
                let logHtml = '';
                (state.commits || []).forEach(c => {
                    logHtml += `<span style="color: #d2a8ff;">commit ${c.hash}</span><br>Author: ${c.author} &lt;user@example.com&gt;<br>Date:   ${c.date}<br><br>    ${c.msg}<br><br>`;
                });
                if (logHtml === '') logHtml = 'No commits yet.';
                addOutput(logHtml);
            }
            else if (subCmd === 'diff') {
                addOutput(`diff --git a/file.txt b/file.txt<br>index 83db48f..bf36a31 100644<br>--- a/file.txt<br>+++ b/file.txt<br>@@ -1 +1,2 @@<br> Hello World<br>+Added new feature`);
            }
            else if (subCmd === 'remote') {
                if (args[2] === '-v') {
                    addOutput(`origin  https://github.com/user/repo.git (fetch)<br>origin  https://github.com/user/repo.git (push)`);
                } else {
                    addOutput(`origin`);
                }
            }
            else if (subCmd === 'stash') {
                if (args[2] === 'apply' || args[2] === 'pop') {
                    addOutput(`On branch ${state.currentBranch}<br>Changes not staged for commit:<br>M	file.txt`);
                } else {
                    addOutput(`Saved working directory and index state WIP on ${state.currentBranch}: ${state.commits[0]?.hash || 'HEAD'} ${state.commits[0]?.msg || ''}`);
                }
            }
            else if (subCmd === 'reset') {
                if (args.includes('--soft')) addOutput(``);
                else if (args.includes('--hard')) addOutput(`HEAD is now at ${state.commits[0]?.hash || 'init'} ${state.commits[0]?.msg || ''}`);
                else addOutput(`Unstaged changes after reset:<br>M	file.php`);
            }
            else if (subCmd === 'rebase') {
                addOutput(`Successfully rebased and updated refs/heads/${state.currentBranch}.`);
            }
            else if (subCmd === 'cherry-pick') {
                addOutput(`[${state.currentBranch} ${Math.random().toString(16).substr(2, 7)}] Cherry-picked commit`);
            }
            else if (subCmd === 'clean') {
                addOutput(`Removing junk.txt<br>Removing temp/`);
            }
            else if (subCmd === 'show') {
                addOutput(`commit ${args[2] || '8f23a1'}<br>Author: User<br>Date: ...<br><br>    Diff content here...`);
            }
            else if (['tag', 'fetch', 'mv', 'rm', 'restore', 'bisect', 'submodule', 'worktree', 'bundle',
                'gc', 'fsck', 'count-objects', 'verify-pack', 'cat-file', 'show-ref', 'archive',
                'describe', 'filter-branch', 'rerere', 'revert', 'check-ignore', 'range-diff',
                'prune-packed', 'update-index', 'grep', 'shortlog', 'ls-files', 'blame', 'config', 'switch'].includes(subCmd)) {
                addOutput(`[Simulation] Command 'git ${subCmd}' executed successfully.<br><span style="color: #8b949e; font-size: 0.85em;">(Visual simulation for this advanced command is simplified)</span>`, 'success');
            }
            else {
                addOutput(`git: '${subCmd}' is not a git command. See 'git --help'.`, 'error');
                success = false;
            }

            // 3. Scenario Validation Check
            if (state.activeScenario) {
                checkScenarioSuccess(state.activeScenario, trimmed, state.history);
            }

        }, state.commandDelay);
    }

    function checkScenarioSuccess(scenario, lastCmd, history) {
        let isComplete = false;

        // Use custom validate function if available
        if (scenario.validate) {
            try {
                isComplete = scenario.validate(state, lastCmd, history);
            } catch (e) {
                console.error("Validation error", e);
            }
        }
        // Fallback to strict regex
        else if (scenario.solutionRegex) {
            isComplete = scenario.solutionRegex.test(lastCmd);
        }

        if (isComplete) {
            addOutput(`<br><div style="border: 1px solid #27c93f; background: rgba(39, 201, 63, 0.1); padding: 1rem; border-radius: 8px;">
                <h4 style="color: #27c93f; margin-top: 0;"><i class="fas fa-check-circle"></i> Scenario Completed!</h4>
                <p>Great job! You've solved "${scenario.title}".</p>
            </div>`);

            // Mark completed in UI
            const card = document.querySelector(`.scenario-card[data-id="${scenario.id}"]`);
            if (card) card.classList.add('completed');

            // Track completion
            if (!state.completedScenarios.includes(scenario.id)) {
                state.completedScenarios.push(scenario.id);
            }

            // --- Badge System Integration ---
            if (window.GitBadgeEngine) {
                const commandCount = state.history.length;
                const newBadges = GitBadgeEngine.onScenarioComplete(scenario.id, commandCount);

                // Show toast for each newly earned badge
                newBadges.forEach((badge, i) => {
                    setTimeout(() => showBadgeToast(badge), (i + 1) * 600);
                });

                // Update badge UI counters
                updateBadgeUI();
            }
        }
    }

    function handleCommand() {
        const cmd = commandInput.value;
        if (!cmd.trim()) return;

        state.history.push(cmd);
        addCommandToHistory(cmd);
        simulateGitCommand(cmd);
        commandInput.value = '';
    }

    // --- Scenarios Management ---

    function renderScenarios(levelFilter = 'all', searchQuery = '') {
        scenarioList.innerHTML = '';

        let filtered = allScenarios;
        if (levelFilter !== 'all') {
            filtered = filtered.filter(s => s.level === levelFilter);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
        }

        if (filtered.length === 0) {
            scenarioList.innerHTML = '<div style="color: var(--text-secondary); padding: 1rem; text-align: center;">No scenarios found.</div>';
            return;
        }

        filtered.forEach(scenario => {
            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.dataset.id = scenario.id;

            // Mark previously completed scenarios
            if (state.completedScenarios.includes(scenario.id)) {
                card.classList.add('completed');
            }

            const levelClass = `level-${scenario.level.toLowerCase()}`;

            card.innerHTML = `
                <div class="scenario-header">
                    <span class="scenario-title">${scenario.title}</span>
                    <span class="scenario-level ${levelClass}">${scenario.level}</span>
                </div>
                <div class="scenario-desc">${scenario.description}</div>
            `;

            card.addEventListener('click', () => loadScenario(scenario.id));
            scenarioList.appendChild(card);
        });
    }

    function loadScenario(id) {
        const scenario = allScenarios.find(s => s.id === id);
        if (!scenario) return;

        // active class in UI
        document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
        const card = document.querySelector(`.scenario-card[data-id="${id}"]`);
        if (card) card.classList.add('active');

        // Update State
        state.activeScenario = scenario;

        // Reset Terminal & State properties
        state.history = [];
        // Apply initial state override
        if (scenario.initialState) {
            state.currentDir = scenario.initialState.currentDir || '~/projects';
            state.currentBranch = scenario.initialState.currentBranch || 'main';
            state.branches = scenario.initialState.branches || ['main'];
            state.commits = scenario.initialState.commits ? [...scenario.initialState.commits] : [];
            state.staged = scenario.initialState.staged || [];
        }

        // Output Welcome
        terminalOutput.innerHTML = `
            <div class="welcome-msg">
                <h3 style="color: var(--primary-gold); margin-bottom: 0.5rem;">Scenario: ${scenario.title}</h3>
                <p><strong>Diffculty:</strong> ${scenario.level}</p>
                <div class="warning-box" style="margin-top: 1rem;">
                    <i class="fas fa-tasks"></i>
                    <span><strong>Task:</strong> ${scenario.description}</span>
                </div>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Enter your commands below to solve this.</p>
            </div>
        `;

        updateScenarioBanner();

        // Focus input
        commandInput.focus();
    }

    function quitScenario() {
        state.activeScenario = null;
        updateScenarioBanner();
        terminalOutput.innerHTML = `
           <div class="welcome-msg">
               <p>Scenario exited. Back to free playground mode.</p>
           </div>
        `;
        document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
    }

    // --- Event Listeners ---

    // Terminal Interactions
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCommand();
    });

    sendBtn.addEventListener('click', handleCommand);
    terminalOutput.addEventListener('click', () => commandInput.focus());

    // Toggle View
    function switchView(view) {
        if (view === 'scenarios') {
            scenariosView.style.display = 'flex';
            cheatsheetView.style.display = 'none';
            btnScenarios.classList.add('active');
            btnCheatsheet.classList.remove('active');
            renderScenarios('all'); // Refresh
        } else {
            scenariosView.style.display = 'none';
            cheatsheetView.style.display = 'flex';
            btnScenarios.classList.remove('active');
            btnCheatsheet.classList.add('active');
        }
    }

    btnScenarios.addEventListener('click', () => switchView('scenarios'));
    btnCheatsheet.addEventListener('click', () => switchView('cheatsheet'));

    // Filter Tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const level = tag.dataset.level;
            renderScenarios(level, scenarioSearch.value);
        });
    });

    // Scenario Search
    scenarioSearch.addEventListener('input', (e) => {
        const activeLevel = document.querySelector('.filter-tag.active').dataset.level;
        renderScenarios(activeLevel, e.target.value);
    });


    // Cheat Sheet Logic (Preserved)
    document.querySelectorAll('.cheat-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.cheat-item');
            item.classList.toggle('active');
        });
    });

    cheatSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.cheat-item');
        items.forEach(item => {
            const code = item.querySelector('code').textContent.toLowerCase();
            const desc = item.querySelector('.cheat-details p').textContent.toLowerCase();
            if (code.includes(term) || desc.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
    });

    // --- Modals & Settings Logic (Preserved) ---
    const settingsBtn = document.getElementById('settings-btn');
    const helpBtn = document.getElementById('help-btn');
    const settingsModal = document.getElementById('settings-modal');
    const helpModal = document.getElementById('help-modal');
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    const fontSizeSelect = document.getElementById('font-size-select');
    const themeSelect = document.getElementById('theme-select');
    const speedSelect = document.getElementById('speed-select');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
    if (helpBtn) helpBtn.addEventListener('click', () => helpModal.classList.add('active'));

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            if (theme === 'matrix') document.body.classList.add('theme-matrix');
            else document.body.classList.remove('theme-matrix');
        });
    }

    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            const speed = e.target.value;
            state.commandDelay = speed === 'instant' ? 0 : speed === 'fast' ? 100 : speed === 'normal' ? 300 : 800;
        });
    }

    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            const size = e.target.value;
            terminalOutput.style.fontSize = size === 'small' ? '0.85rem' : size === 'medium' ? '0.95rem' : '1.1rem';
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            state.history = [];
            state.currentDir = '~/projects';
            state.currentBranch = 'main';
            state.branches = ['main'];
            state.staged = [];
            state.commits = [{ hash: '8f23a1', msg: 'Initial commit', author: 'User', date: new Date().toDateString() }];
            state.activeScenario = null;
            updateScenarioBanner();

            terminalOutput.innerHTML = `
                <div class="welcome-msg">
                    <p>Welcome to the Git Terminal Simulator!</p>
                    <p>Playground mode activated. Freely experiment with Git commands. Type 'help' for help.</p>
                    <div class="warning-box">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Note: This is a simplified Git simulation for learning purposes. State has been reset.</span>
                    </div>
                </div>
             `;
            settingsModal.classList.remove('active');
        });
    }

    // --- Initialization ---
    // Default View: Scenarios
    renderScenarios();

    // --- Badge Modal & Toast System ---

    function showBadgeToast(badge) {
        const container = document.getElementById('badge-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'badge-toast';
        toast.innerHTML = `
            <div class="toast-icon" style="background: ${badge.gradient}">
                <i class="fas ${badge.icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-label">Badge Unlocked!</div>
                <div class="toast-title">${badge.title}</div>
            </div>
        `;
        container.appendChild(toast);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            toast.style.transition = 'all 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    function updateBadgeUI() {
        if (!window.GitBadgeEngine) return;

        const progress = GitBadgeEngine.getProgress();

        // Update nav pill
        const navCount = document.getElementById('nav-badge-count');
        if (navCount) navCount.textContent = progress.earned;

        // Update sidebar mini progress
        const miniProgress = document.getElementById('badge-progress-mini');
        if (miniProgress) miniProgress.textContent = `${progress.earned} / ${progress.total}`;

        // Update modal progress bar
        const progressText = document.getElementById('badge-progress-text');
        const progressFill = document.getElementById('badge-progress-fill');
        if (progressText) progressText.textContent = `${progress.earned} / ${progress.total}`;
        if (progressFill) progressFill.style.width = `${progress.percent}%`;
    }

    function renderBadgeGrid(levelFilter = 'all') {
        if (!window.GitBadgeEngine) return;

        const grid = document.getElementById('badge-grid');
        if (!grid) return;

        let badges = GitBadgeEngine.getAllBadges();
        if (levelFilter !== 'all') {
            badges = badges.filter(b => b.level === levelFilter);
        }

        // Sort: earned first, then locked
        badges.sort((a, b) => (b.earned ? 1 : 0) - (a.earned ? 1 : 0));

        grid.innerHTML = badges.map(badge => {
            const cardClass = badge.earned ? 'badge-card earned' : 'badge-card locked';
            const earnedDate = badge.earnedAt
                ? `<div class="badge-earned-date">Earned ${new Date(badge.earnedAt).toLocaleDateString()}</div>`
                : '';
            const levelClass = badge.level.toLowerCase();

            return `
                <div class="${cardClass}" style="--badge-gradient: ${badge.gradient}" id="badge-${badge.id}">
                    <div class="badge-icon-wrap" style="${badge.earned ? `background: ${badge.gradient}` : ''}">
                        <i class="fas ${badge.icon}"></i>
                    </div>
                    <div class="badge-title">${badge.title}</div>
                    <div class="badge-description">${badge.description}</div>
                    <span class="badge-level-tag ${levelClass}">${badge.level}</span>
                    ${earnedDate}
                </div>
            `;
        }).join('');
    }

    // Badge modal open/close
    const badgeModalOverlay = document.getElementById('badge-modal-overlay');
    const badgeModalClose = document.getElementById('badge-modal-close');
    const openBadgesBtn = document.getElementById('open-badges-btn');

    if (openBadgesBtn) {
        openBadgesBtn.addEventListener('click', () => {
            renderBadgeGrid();
            updateBadgeUI();
            badgeModalOverlay.classList.add('active');
        });
    }

    if (badgeModalClose) {
        badgeModalClose.addEventListener('click', () => {
            badgeModalOverlay.classList.remove('active');
        });
    }

    if (badgeModalOverlay) {
        badgeModalOverlay.addEventListener('click', (e) => {
            if (e.target === badgeModalOverlay) {
                badgeModalOverlay.classList.remove('active');
            }
        });
    }

    // Badge level tab filtering
    document.querySelectorAll('.badge-level-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.badge-level-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderBadgeGrid(tab.dataset.badgeLevel);
        });
    });

    // Badge share button
    const badgeShareBtn = document.getElementById('badge-share-btn');
    if (badgeShareBtn && window.GitBadgeEngine) {
        badgeShareBtn.addEventListener('click', () => {
            const url = GitBadgeEngine.getShareableURL();
            navigator.clipboard.writeText(url).then(() => {
                badgeShareBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
                setTimeout(() => {
                    badgeShareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Profile';
                }, 2500);
            }).catch(() => {
                // Fallback: open in new tab
                window.open(url, '_blank');
            });
        });
    }

    // Initialize badge UI on load
    updateBadgeUI();

});

