class Terminal {
    constructor(containerId, stepData, onComplete) {
        this.container = document.getElementById(containerId);
        this.stepData = stepData;
        this.onComplete = onComplete;
        this.commandHistory = [];
        this.fileSystem = { 'index.html': 'untracked', 'style.css': 'untracked' }; // Basic mocked FS state
        this.gitState = 'none'; // none, initialized

        this.render();
        this.attachListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="terminal-window">
                <div class="terminal-header">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <span class="terminal-title">bash -- 80x24</span>
                </div>
                <div class="terminal-body" id="term-body">
                    <div class="term-line">Welcome to Git Terminal v1.0</div>
                    <div class="term-line">Type commands to complete the task.</div>
                    <br>
                    <div id="term-output"></div>
                    <div class="term-input-line">
                        <span class="term-prompt">$</span>
                        <input type="text" id="term-input" autocomplete="off" spellcheck="false" autofocus>
                    </div>
                </div>
            </div>
        `;
        // Auto focus
        setTimeout(() => document.getElementById('term-input').focus(), 100);
    }

    attachListeners() {
        const input = document.getElementById('term-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                this.processCommand(command);
                input.value = '';
            }
        });

        // Keep focus
        this.container.addEventListener('click', () => {
            document.getElementById('term-input').focus();
        });
    }

    log(text, type = 'normal') {
        const output = document.getElementById('term-output');
        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        line.innerText = text;
        output.appendChild(line);
        document.getElementById('term-body').scrollTop = document.getElementById('term-body').scrollHeight;
    }

    processCommand(cmd) {
        this.log(`$ ${cmd}`);

        if (cmd === '') return;

        // check against lesson requirements
        if (this.stepData.valid_commands.includes(cmd)) {
            // Check specific logic states if needed (mocked for MVP)
            if (cmd.startsWith('git init')) {
                this.gitState = 'initialized';
                this.log('Initialized empty Git repository in /project/.git/');
            } else if (cmd.startsWith('git add')) {
                this.log('succesfully staged changes');
            } else if (cmd.startsWith('git commit')) {
                this.log('[main (root-commit)] ' + (cmd.match(/-m ["'](.*)["']/) ? cmd.match(/-m ["'](.*)["']/)[1] : 'Initial commit'));
            } else if (cmd.startsWith('git status')) {
                this.log('On branch main. nothing to commit, working tree clean.');
            }

            // Assume success if command matched valid list for this simplistic MVP
            this.log('✅ Task Verified!', 'success');

            // Disable input briefly
            document.getElementById('term-input').disabled = true;

            setTimeout(() => {
                this.onComplete();
            }, 1000);

        } else {
            // Handle common errors or just generic
            if (!cmd.startsWith('git')) {
                this.log(`bash: ${cmd}: command not found`, 'error');
            } else {
                this.log(`Command executed, but that's not what the lesson asked for. Try: ${this.stepData.instruction}`, 'warning');
            }
        }
    }
}
