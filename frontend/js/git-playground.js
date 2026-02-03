document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');
    const sendBtn = document.getElementById('send-btn');
    const cheatSearch = document.getElementById('cheat-search');
    const cheatItems = document.querySelectorAll('.cheat-item');

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
        ]
    };

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

    function simulateGitCommand(cmd) {
        setTimeout(() => {
            const trimmed = cmd.trim();
            const args = trimmed.split(/\s+/);
            const mainCmd = args[0];
            const subCmd = args[1];

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
            } else if (trimmed === 'clear') {
                terminalOutput.innerHTML = `
                    <div class="welcome-msg">
                        <p>Welcome to the Git Terminal Simulator!</p>
                        <p>Playground mode activated. Freely experiment with Git commands. Type 'help' for help.</p>
                        <div class="warning-box">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>Note: This is a simplified Git simulation for learning purposes. State is transient using mock data.</span>
                        </div>
                    </div>
                `;
            } else if (mainCmd !== 'git') {
                addOutput(`bash: ${mainCmd}: command not found`, 'error');
                return;
            } else {
                // Handle Git Commands
                if (!subCmd) {
                    addOutput(`usage: git [--version] [--help] <command> [<args>]`, 'info');
                    return;
                }

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
                    addOutput(`On branch ${state.currentBranch}<br>Your branch is up to date with 'origin/${state.currentBranch}'.<br><br>nothing to commit, working tree clean`, 'info');
                }
                else if (subCmd === 'add') {
                    if (args[2]) {
                        addOutput(``); // Silent success
                    } else {
                        addOutput(`Nothing specified, nothing added.`, 'info');
                    }
                }
                else if (subCmd === 'commit') {
                    const msgIndex = args.indexOf('-m');
                    let msg = 'commit';
                    if (msgIndex !== -1 && args[msgIndex + 1]) {
                        msg = trimmed.substring(trimmed.indexOf('-m') + 3).replace(/["']/g, "");
                    }
                    const newHash = Math.random().toString(16).substr(2, 7);
                    state.commits.unshift({ hash: newHash, msg: msg, author: 'User', date: new Date().toDateString() });
                    addOutput(`[${state.currentBranch} ${newHash}] ${msg}<br> 1 file changed, 10 insertions(+)`, 'success');
                }
                else if (subCmd === 'push') {
                    addOutput(`To https://github.com/user/repo.git<br> * [new branch]      ${state.currentBranch} -> ${state.currentBranch}`, 'success');
                }
                else if (subCmd === 'pull') {
                    addOutput(`Updating 8f23a1..${state.commits[0].hash}<br>Fast-forward<br> README.md | 2 ++<br> 1 file changed, 2 insertions(+)`, 'success');
                }
                else if (subCmd === 'branch') {
                    if (args[2]) {
                        // Create branch
                        if (!state.branches.includes(args[2])) {
                            state.branches.push(args[2]);
                            addOutput(``); // Success
                        } else {
                            addOutput(`fatal: A branch named '${args[2]}' already exists.`, 'error');
                        }
                    } else {
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
                        } else {
                            addOutput(`error: pathspec '${args[2]}' did not match any file(s) known to git`, 'error');
                        }
                    } else {
                        addOutput(`git checkout: branch name required`, 'error');
                    }
                }
                else if (subCmd === 'merge') {
                    if (args[2]) {
                        addOutput(`Updating 8f23a1..${Math.random().toString(16).substr(2, 7)}<br>Fast-forward<br> app.js | 15 +++++++++++++++<br> 1 file changed, 15 insertions(+)`, 'success');
                    } else {
                        addOutput(`fatal: No branch selected to merge.`, 'error');
                    }
                }
                else if (subCmd === 'log') {
                    let logHtml = '';
                    state.commits.forEach(c => {
                        logHtml += `<span style="color: #d2a8ff;">commit ${c.hash}</span><br>Author: ${c.author} &lt;user@example.com&gt;<br>Date:   ${c.date}<br><br>    ${c.msg}<br><br>`;
                    });
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
                    addOutput(`Saved working directory and index state WIP on ${state.currentBranch}: ${state.commits[0].hash} ${state.commits[0].msg}`);
                }
                else if (subCmd === 'reset') {
                    addOutput(`Unstaged changes after reset:<br>M	file.php`);
                }
                else {
                    addOutput(`git: '${subCmd}' is not a git command. See 'git --help'.`, 'error');
                }
            }
        }, state.commandDelay);
    }

    function handleCommand() {
        const cmd = commandInput.value;
        if (!cmd.trim()) return;

        addCommandToHistory(cmd);
        simulateGitCommand(cmd);
        commandInput.value = '';
    }

    // Event Listeners for Terminal
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCommand();
    });

    sendBtn.addEventListener('click', handleCommand);

    // Focus input on clicking terminal background
    terminalOutput.addEventListener('click', () => commandInput.focus());


    // --- Cheat Sheet Logic ---

    // Toggle Accordion - Updated to use event delegation for dynamically added items if needed
    // But since we are hardcoding HTML, simple selection is fine.

    // We need to re-select cheat items if we were dynamically adding them, 
    // but the current plan is to edit HTML file directly for cheat sheet content.
    // So current logic holds.

    document.querySelectorAll('.cheat-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.cheat-item');
            item.classList.toggle('active');
        });
    });

    // Search Filter
    cheatSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.cheat-item'); // Re-select to be safe

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

    // --- Modals & Settings Logic ---

    const settingsBtn = document.getElementById('settings-btn');
    const helpBtn = document.getElementById('help-btn');
    const settingsModal = document.getElementById('settings-modal');
    const helpModal = document.getElementById('help-modal');
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    const fontSizeSelect = document.getElementById('font-size-select');
    const themeSelect = document.getElementById('theme-select');
    const speedSelect = document.getElementById('speed-select');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Open Modals
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            helpModal.classList.add('active');
        });
    }

    // Close Modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).classList.remove('active');
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    // Theme Setting
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            if (theme === 'matrix') {
                document.body.classList.add('theme-matrix');
            } else {
                document.body.classList.remove('theme-matrix');
            }
        });
    }

    // Response Speed Setting
    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            const speed = e.target.value;
            if (speed === 'instant') state.commandDelay = 0;
            else if (speed === 'fast') state.commandDelay = 100;
            else if (speed === 'normal') state.commandDelay = 300;
            else if (speed === 'realistic') state.commandDelay = 800;
        });
    }

    // Font Size Setting
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            const size = e.target.value;
            if (size === 'small') {
                terminalOutput.style.fontSize = '0.85rem';
            } else if (size === 'medium') {
                terminalOutput.style.fontSize = '0.95rem';
            } else if (size === 'large') {
                terminalOutput.style.fontSize = '1.1rem';
            }
        });
    }

    // Clear History Setting
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            // Reset State
            state.history = [];
            state.currentDir = '~/projects';
            state.currentBranch = 'main';
            state.branches = ['main'];
            state.staged = [];
            state.commits = [{ hash: '8f23a1', msg: 'Initial commit', author: 'User', date: new Date().toDateString() }];

            // Clear Output
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

            // Close Modal
            settingsModal.classList.remove('active');
        });
    }

});
