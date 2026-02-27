const gitScenarios = [
    // ==========================================
    // BEGINNER LEVEL (1-35)
    // Focus: Setup, Basic Workflow, History
    // ==========================================
    {
        id: 'beg-01',
        title: 'Initialize Repository',
        level: 'Beginner',
        description: 'Start tracking a new project. Initialize a Git repository.',
        initialState: { currentDir: '~/projects/new-project' },
        solutionRegex: /^git\s+init$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git init'
    },
    {
        id: 'beg-02',
        title: 'Clone a Remote Repo',
        level: 'Beginner',
        description: 'Clone the repository from "https://github.com/company/docs.git".',
        initialState: { currentDir: '~/projects' },
        solutionRegex: /^git\s+clone\s+https:\/\/github\.com\/company\/docs\.git$/,
        validate: (state, lastCmd) => lastCmd.includes('clone') && lastCmd.includes('docs.git')
    },
    {
        id: 'beg-03',
        title: 'Check Status',
        level: 'Beginner',
        description: 'You modified some files. Check the status of your working tree.',
        initialState: { currentBranch: 'main', staged: [], commits: [{ hash: 'a1' }] },
        solutionRegex: /^git\s+status$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git status'
    },
    {
        id: 'beg-04',
        title: 'Stage a Specific File',
        level: 'Beginner',
        description: 'Stage the file "login.js" for the next commit.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+add\s+login\.js$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git add login.js'
    },
    {
        id: 'beg-05',
        title: 'Stage All Changes',
        level: 'Beginner',
        description: 'Stage all modified files in the current directory.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+add\s+\.$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git add .' || lastCmd.trim() === 'git add -A'
    },
    {
        id: 'beg-06',
        title: 'Create Your First Commit',
        level: 'Beginner',
        description: 'Commit your staged changes with message "Initial setup".',
        initialState: { staged: ['index.html'] },
        solutionRegex: /^git\s+commit\s+-m\s+["']Initial setup["']$/,
        validate: (state, lastCmd) => lastCmd.includes('commit') && lastCmd.includes('Initial setup')
    },
    {
        id: 'beg-07',
        title: 'View Commit History',
        level: 'Beginner',
        description: 'Display the commit logs to see what has happened so far.',
        initialState: { commits: [{ hash: 'a1', msg: 'init' }] },
        solutionRegex: /^git\s+log$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git log'
    },
    {
        id: 'beg-08',
        title: 'Create a Feature Branch',
        level: 'Beginner',
        description: 'Create a new branch named "feature-nav" to work on navigation.',
        initialState: { branches: ['main'] },
        solutionRegex: /^git\s+branch\s+feature-nav$/,
        validate: (state, lastCmd) => state.branches.includes('feature-nav')
    },
    {
        id: 'beg-09',
        title: 'Switch Branch',
        level: 'Beginner',
        description: 'Switch from "main" to the existing "develop" branch.',
        initialState: { branches: ['main', 'develop'], currentBranch: 'main' },
        solutionRegex: /^git\s+checkout\s+develop$/,
        validate: (state, lastCmd) => state.currentBranch === 'develop'
    },
    {
        id: 'beg-10',
        title: 'Create and Switch',
        level: 'Beginner',
        description: 'Create and switch to a new branch "hotfix-auth" in one command.',
        initialState: { branches: ['main'] },
        solutionRegex: /^git\s+checkout\s+-b\s+hotfix-auth$/,
        validate: (state, lastCmd) => state.currentBranch === 'hotfix-auth'
    },
    {
        id: 'beg-11',
        title: 'Delete a Branch',
        level: 'Beginner',
        description: 'Delete the "old-experiment" branch which is no longer needed.',
        initialState: { branches: ['main', 'old-experiment'], currentBranch: 'main' },
        solutionRegex: /^git\s+branch\s+-(d|D)\s+old-experiment$/,
        validate: (state, lastCmd) => !state.branches.includes('old-experiment')
    },
    {
        id: 'beg-12',
        title: 'Rename Current Branch',
        level: 'Beginner',
        description: 'Rename the current branch to "main-v2".',
        initialState: { currentBranch: 'master' },
        solutionRegex: /^git\s+branch\s+-m\s+main-v2$/,
        validate: (state, lastCmd) => state.currentBranch === 'main-v2'
    },
    {
        id: 'beg-13',
        title: 'Check Remote URLs',
        level: 'Beginner',
        description: 'List the remote repositories and their URLs.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+remote\s+-v$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git remote -v'
    },
    {
        id: 'beg-14',
        title: 'Push to Remote',
        level: 'Beginner',
        description: 'Push your commits to the origin repository.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+push$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git push' || lastCmd.includes('push origin')
    },
    {
        id: 'beg-15',
        title: 'Pull Updates',
        level: 'Beginner',
        description: 'Download and merge changes from the remote repository.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+pull$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git pull'
    },
    {
        id: 'beg-16',
        title: 'View Changes (Diff)',
        level: 'Beginner',
        description: 'See what has changed in your working directory but isn\'t staged yet.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+diff$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git diff'
    },
    {
        id: 'beg-17',
        title: 'Unstage a File',
        level: 'Beginner',
        description: 'You staged "secret.env" by mistake. Unstage it.',
        initialState: { staged: ['secret.env'] },
        solutionRegex: /^git\s+restore\s+--staged\s+secret\.env$/,
        validate: (state, lastCmd) => lastCmd.includes('restore --staged secret.env') || lastCmd.includes('reset secret.env')
    },
    {
        id: 'beg-18',
        title: 'Discard Local Changes',
        level: 'Beginner',
        description: 'Discard changes to "style.css" and revert to the last commit.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+restore\s+style\.css$/,
        validate: (state, lastCmd) => lastCmd.includes('restore style.css') || lastCmd.includes('checkout style.css')
    },
    {
        id: 'beg-19',
        title: 'Commit with Title and Body',
        level: 'Beginner',
        description: 'Commit with message "Feat: Login" using the -m flag.',
        initialState: { staged: ['login.js'] },
        solutionRegex: /^git\s+commit\s+-m\s+["'].*["']$/,
        validate: (state, lastCmd) => lastCmd.includes('commit -m')
    },
    {
        id: 'beg-20',
        title: 'Git Version',
        level: 'Beginner',
        description: 'Check which version of Git is installed.',
        initialState: {},
        solutionRegex: /^git\s+--version$/,
        validate: (state, lastCmd) => lastCmd.includes('--version')
    },
    {
        id: 'beg-21',
        title: 'List Files',
        level: 'Beginner',
        description: 'List all files Git knows about (ls-files).',
        initialState: {},
        solutionRegex: /^git\s+ls-files$/,
        validate: (state, lastCmd) => lastCmd.includes('ls-files')
    },
    {
        id: 'beg-22',
        title: 'Move a File',
        level: 'Beginner',
        description: 'Rename "old.txt" to "new.txt" using Git.',
        initialState: {},
        solutionRegex: /^git\s+mv\s+old\.txt\s+new\.txt$/,
        validate: (state, lastCmd) => lastCmd.includes('mv old.txt new.txt')
    },
    {
        id: 'beg-23',
        title: 'Remove a File',
        level: 'Beginner',
        description: 'Remove "bad.js" from the repository and filesystem.',
        initialState: {},
        solutionRegex: /^git\s+rm\s+bad\.js$/,
        validate: (state, lastCmd) => lastCmd.includes('rm bad.js')
    },
    {
        id: 'beg-24',
        title: 'Show Commit Detail',
        level: 'Beginner',
        description: 'See the content of the last commit (HEAD).',
        initialState: { commits: [{ hash: 'HEAD' }] },
        solutionRegex: /^git\s+show\s+HEAD$/,
        validate: (state, lastCmd) => lastCmd.includes('show HEAD') || lastCmd.trim() === 'git show'
    },
    {
        id: 'beg-25',
        title: 'One-line Log',
        level: 'Beginner',
        description: 'View the commit history in a compact one-line format.',
        initialState: { commits: [{ hash: 'a' }, { hash: 'b' }] },
        solutionRegex: /^git\s+log\s+--oneline$/,
        validate: (state, lastCmd) => lastCmd.includes('log') && lastCmd.includes('--oneline')
    },
    {
        id: 'beg-26',
        title: 'Initialize with Main',
        level: 'Beginner',
        description: 'Initialize a repo and set the initial branch name to "main".',
        initialState: {},
        solutionRegex: /^git\s+init\s+-b\s+main$/,
        validate: (state, lastCmd) => lastCmd.includes('init') && lastCmd.includes('-b main')
    },
    {
        id: 'beg-27',
        title: 'Configure Username',
        level: 'Beginner',
        description: 'Set your global username to "DevUser".',
        initialState: {},
        solutionRegex: /^git\s+config\s+--global\s+user\.name\s+["']?DevUser["']?$/,
        validate: (state, lastCmd) => lastCmd.includes('config') && lastCmd.includes('user.name')
    },
    {
        id: 'beg-28',
        title: 'Configure Email',
        level: 'Beginner',
        description: 'Set your global email to "dev@example.com".',
        initialState: {},
        solutionRegex: /^git\s+config\s+--global\s+user\.email\s+["']?dev@example\.com["']?$/,
        validate: (state, lastCmd) => lastCmd.includes('config') && lastCmd.includes('user.email')
    },
    {
        id: 'beg-29',
        title: 'Status Short',
        level: 'Beginner',
        description: 'Check status in short format.',
        initialState: {},
        solutionRegex: /^git\s+status\s+-s$/,
        validate: (state, lastCmd) => lastCmd.includes('status -s')
    },
    {
        id: 'beg-30',
        title: 'Help',
        level: 'Beginner',
        description: 'Display the help manual.',
        initialState: {},
        solutionRegex: /^git\s+help$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git help'
    },
    {
        id: 'beg-31',
        title: 'Restore All',
        level: 'Beginner',
        description: 'Discard all changes in current directory (restore .).',
        initialState: {},
        solutionRegex: /^git\s+restore\s+\.$/,
        validate: (state, lastCmd) => lastCmd.includes('restore .')
    },
    {
        id: 'beg-32',
        title: 'Diff Staged',
        level: 'Beginner',
        description: 'See changes that are staged for the next commit.',
        initialState: { staged: ['file.txt'] },
        solutionRegex: /^git\s+diff\s+--staged$/,
        validate: (state, lastCmd) => lastCmd.includes('diff --staged')
    },
    {
        id: 'beg-33',
        title: 'List Branches',
        level: 'Beginner',
        description: 'List all local branches.',
        initialState: { branches: ['main', 'dev'] },
        solutionRegex: /^git\s+branch$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git branch'
    },
    {
        id: 'beg-34',
        title: 'Checkout Previous',
        level: 'Beginner',
        description: 'Switch back to the previous branch.',
        initialState: { branches: ['main', 'dev'] },
        solutionRegex: /^git\s+checkout\s+-$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git checkout -'
    },
    {
        id: 'beg-35',
        title: 'Add directory',
        level: 'Beginner',
        description: 'Stage the entire "src" directory.',
        initialState: {},
        solutionRegex: /^git\s+add\s+src\/$/,
        validate: (state, lastCmd) => lastCmd.includes('add src')
    },

    // ==========================================
    // INTERMEDIATE LEVEL (36-75)
    // Focus: Branching Strategies, Merging, Remotes
    // ==========================================
    {
        id: 'int-01',
        title: 'Merge Branch',
        level: 'Intermediate',
        description: 'Merge "feature-login" into the current branch "main".',
        initialState: { branches: ['main', 'feature-login'], currentBranch: 'main' },
        solutionRegex: /^git\s+merge\s+feature-login$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git merge feature-login'
    },
    {
        id: 'int-02',
        title: 'Abort Merge',
        level: 'Intermediate',
        description: 'A merge conflict occurred. Abort the merge attempt.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+merge\s+--abort$/,
        validate: (state, lastCmd) => lastCmd.includes('merge --abort')
    },
    {
        id: 'int-03',
        title: 'Stash Changes',
        level: 'Intermediate',
        description: 'You need to switch branches but have uncommitted work. Stash it.',
        initialState: { currentBranch: 'dev' },
        solutionRegex: /^git\s+stash$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git stash'
    },
    {
        id: 'int-04',
        title: 'Apply Stash',
        level: 'Intermediate',
        description: 'Apply the most recent stash to your working directory.',
        initialState: { currentBranch: 'dev' },
        solutionRegex: /^git\s+stash\s+apply$/,
        validate: (state, lastCmd) => lastCmd.includes('stash apply')
    },
    {
        id: 'int-05',
        title: 'Pop Stash',
        level: 'Intermediate',
        description: 'Apply and remove the last stash from the list.',
        initialState: { currentBranch: 'dev' },
        solutionRegex: /^git\s+stash\s+pop$/,
        validate: (state, lastCmd) => lastCmd.includes('stash pop')
    },
    {
        id: 'int-06',
        title: 'List Stashes',
        level: 'Intermediate',
        description: 'See all stashed changes.',
        initialState: {},
        solutionRegex: /^git\s+stash\s+list$/,
        validate: (state, lastCmd) => lastCmd.includes('stash list')
    },
    {
        id: 'int-07',
        title: 'Amend Commit',
        level: 'Intermediate',
        description: 'You forgot to add a file to the last commit. Amend it.',
        initialState: { staged: ['forgotten.txt'] },
        solutionRegex: /^git\s+commit\s+--amend$/,
        validate: (state, lastCmd) => lastCmd.includes('commit --amend')
    },
    {
        id: 'int-08',
        title: 'Amend Message',
        level: 'Intermediate',
        description: 'Change the last commit message to "Fix: Typo".',
        initialState: {},
        solutionRegex: /^git\s+commit\s+--amend\s+-m\s+["']Fix: Typo["']$/,
        validate: (state, lastCmd) => lastCmd.includes('commit --amend')
    },
    {
        id: 'int-09',
        title: 'Reset Soft',
        level: 'Intermediate',
        description: 'Undo the last commit, but keep changes staged (soft reset).',
        initialState: { commits: [{ hash: 'b' }, { hash: 'a' }] },
        solutionRegex: /^git\s+reset\s+--soft\s+HEAD~1$/,
        validate: (state, lastCmd) => lastCmd.includes('reset --soft')
    },
    {
        id: 'int-10',
        title: 'Reset Hard',
        level: 'Intermediate',
        description: 'Dangerously discard all local changes and commits up to HEAD~1.',
        initialState: { commits: [{ hash: 'b' }, { hash: 'a' }] },
        solutionRegex: /^git\s+reset\s+--hard\s+HEAD~1$/,
        validate: (state, lastCmd) => lastCmd.includes('reset --hard')
    },
    {
        id: 'int-11',
        title: 'Cherry Pick',
        level: 'Intermediate',
        description: 'Apply the changes from commit 8f23a1 to your current branch.',
        initialState: { currentBranch: 'main' },
        solutionRegex: /^git\s+cherry-pick\s+8f23a1$/,
        validate: (state, lastCmd) => lastCmd.includes('cherry-pick 8f23a1')
    },
    {
        id: 'int-12',
        title: 'Diff Two Branches',
        level: 'Intermediate',
        description: 'Compare changes between "main" and "develop".',
        initialState: { branches: ['main', 'develop'] },
        solutionRegex: /^git\s+diff\s+main\.\.develop$/,
        validate: (state, lastCmd) => lastCmd.includes('diff main..develop') || lastCmd.includes('diff main develop')
    },
    {
        id: 'int-13',
        title: 'Create Tag',
        level: 'Intermediate',
        description: 'Tag the current commit as "v1.0.0".',
        initialState: {},
        solutionRegex: /^git\s+tag\s+v1\.0\.0$/,
        validate: (state, lastCmd) => lastCmd.includes('tag v1.0.0')
    },
    {
        id: 'int-14',
        title: 'Push Tags',
        level: 'Intermediate',
        description: 'Push all tags to the remote repository.',
        initialState: {},
        solutionRegex: /^git\s+push\s+--tags$/,
        validate: (state, lastCmd) => lastCmd.includes('push --tags')
    },
    {
        id: 'int-15',
        title: 'Fetch Changes',
        level: 'Intermediate',
        description: 'Download objects and refs from another repository.',
        initialState: {},
        solutionRegex: /^git\s+fetch$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git fetch' || lastCmd.trim() === 'git fetch origin'
    },
    {
        id: 'int-16',
        title: 'Clean Untracked',
        level: 'Intermediate',
        description: 'Remove untracked files from the working tree.',
        initialState: {},
        solutionRegex: /^git\s+clean\s+-f$/,
        validate: (state, lastCmd) => lastCmd.includes('clean -f')
    },
    {
        id: 'int-17',
        title: 'Rebase Branch',
        level: 'Intermediate',
        description: 'Rebase "feature" on top of "main".',
        initialState: { branches: ['main', 'feature'], currentBranch: 'feature' },
        solutionRegex: /^git\s+rebase\s+main$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git rebase main'
    },
    {
        id: 'int-18',
        title: 'Show Remote Origin',
        level: 'Intermediate',
        description: 'Show details about the remote named "origin".',
        initialState: {},
        solutionRegex: /^git\s+remote\s+show\s+origin$/,
        validate: (state, lastCmd) => lastCmd.includes('remote show origin')
    },
    {
        id: 'int-19',
        title: 'Log Graph',
        level: 'Intermediate',
        description: 'Show the commit history as a text-based graph.',
        initialState: {},
        solutionRegex: /^git\s+log\s+--graph$/,
        validate: (state, lastCmd) => lastCmd.includes('log --graph')
    },
    {
        id: 'int-20',
        title: 'Ignore Files',
        level: 'Intermediate',
        description: 'Add "*.log" to .gitignore within the current directory.',
        initialState: {},
        solutionRegex: /^echo\s+"\*\.log"\s+>>\s+\.gitignore$/,
        validate: (state, lastCmd) => lastCmd.includes('.gitignore') // broad check for echo or basic creation
    },
    {
        id: 'int-21',
        title: 'Blame File',
        level: 'Intermediate',
        description: 'Show who modified what lines in "app.js".',
        initialState: {},
        solutionRegex: /^git\s+blame\s+app\.js$/,
        validate: (state, lastCmd) => lastCmd.includes('blame app.js')
    },
    {
        id: 'int-22',
        title: 'Reset File',
        level: 'Intermediate',
        description: 'Unstage "config.json" without losing modifications.',
        initialState: { staged: ['config.json'] },
        solutionRegex: /^git\s+reset\s+config\.json$/,
        validate: (state, lastCmd) => lastCmd.includes('reset config.json')
    },
    {
        id: 'int-23',
        title: 'Prune Remotes',
        level: 'Intermediate',
        description: 'Fetch and prune remote-tracking branches that no longer exist.',
        initialState: {},
        solutionRegex: /^git\s+fetch\s+--prune$/,
        validate: (state, lastCmd) => lastCmd.includes('fetch --prune')
    },
    {
        id: 'int-24',
        title: 'Drop Stash',
        level: 'Intermediate',
        description: 'Delete the most recent stash entry.',
        initialState: {},
        solutionRegex: /^git\s+stash\s+drop$/,
        validate: (state, lastCmd) => lastCmd.includes('stash drop')
    },
    {
        id: 'int-25',
        title: 'Checkout Detached',
        level: 'Intermediate',
        description: 'Checkout commit 8f23a1 specifically (detached HEAD state).',
        initialState: {},
        solutionRegex: /^git\s+checkout\s+8f23a1$/,
        validate: (state, lastCmd) => lastCmd.includes('checkout 8f23a1')
    },
    {
        id: 'int-26',
        title: 'Delete Remote Branch',
        level: 'Intermediate',
        description: 'Delete the "old-feat" branch on the origin remote.',
        initialState: {},
        solutionRegex: /^git\s+push\s+origin\s+--delete\s+old-feat$/,
        validate: (state, lastCmd) => lastCmd.includes('push origin --delete old-feat')
    },
    {
        id: 'int-27',
        title: 'Reflog',
        level: 'Intermediate',
        description: 'View the reference log to find lost commits.',
        initialState: {},
        solutionRegex: /^git\s+reflog$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git reflog'
    },
    {
        id: 'int-28',
        title: 'Annotated Tag',
        level: 'Intermediate',
        description: 'Create an annotated tag "v1.0" with message "Release".',
        initialState: {},
        solutionRegex: /^git\s+tag\s+-a\s+v1\.0\s+-m\s+["']Release["']$/,
        validate: (state, lastCmd) => lastCmd.includes('tag -a')
    },
    {
        id: 'int-29',
        title: 'List Tags',
        level: 'Intermediate',
        description: 'Show all tags.',
        initialState: {},
        solutionRegex: /^git\s+tag$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git tag'
    },
    {
        id: 'int-30',
        title: 'Clean Directories',
        level: 'Intermediate',
        description: 'Remove untracked directories and files (clean -fd).',
        initialState: {},
        solutionRegex: /^git\s+clean\s+-fd$/,
        validate: (state, lastCmd) => lastCmd.includes('clean -fd')
    },
    {
        id: 'int-31',
        title: 'Commit All',
        level: 'Intermediate',
        description: 'Stage modified files and commit them in one command.',
        initialState: {},
        solutionRegex: /^git\s+commit\s+-am\s+["'].*["']$/,
        validate: (state, lastCmd) => lastCmd.includes('commit -am')
    },
    {
        id: 'int-32',
        title: 'Show File at Commit',
        level: 'Intermediate',
        description: 'View "app.js" content as it was in commit 8f23a1.',
        initialState: {},
        solutionRegex: /^git\s+show\s+8f23a1:app\.js$/,
        validate: (state, lastCmd) => lastCmd.includes('show 8f23a1:app.js')
    },
    {
        id: 'int-33',
        title: 'Rebase Continue',
        level: 'Intermediate',
        description: 'Continue the rebase after resolving conflicts.',
        initialState: {},
        solutionRegex: /^git\s+rebase\s+--continue$/,
        validate: (state, lastCmd) => lastCmd.includes('rebase --continue')
    },
    {
        id: 'int-34',
        title: 'Rebase Skip',
        level: 'Intermediate',
        description: 'Skip the current commit during a rebase.',
        initialState: {},
        solutionRegex: /^git\s+rebase\s+--skip$/,
        validate: (state, lastCmd) => lastCmd.includes('rebase --skip')
    },
    {
        id: 'int-35',
        title: 'Restore Worktree',
        level: 'Intermediate',
        description: 'Restore the working tree from the index for all files.',
        initialState: {},
        solutionRegex: /^git\s+restore\s+\.$/,
        validate: (state, lastCmd) => lastCmd.includes('restore .')
    },
    {
        id: 'int-36',
        title: 'Interactive Add',
        level: 'Intermediate',
        description: 'Start interactive staging mode.',
        initialState: {},
        solutionRegex: /^git\s+add\s+-i$/,
        validate: (state, lastCmd) => lastCmd.includes('add -i')
    },
    {
        id: 'int-37',
        title: 'Diff Cached',
        level: 'Intermediate',
        description: 'View changes staged for commit (alias for --staged).',
        initialState: {},
        solutionRegex: /^git\s+diff\s+--cached$/,
        validate: (state, lastCmd) => lastCmd.includes('diff --cached')
    },
    {
        id: 'int-38',
        title: 'Rev Parse',
        level: 'Intermediate',
        description: 'Get the absolute git directory path.',
        initialState: {},
        solutionRegex: /^git\s+rev-parse\s+--git-dir$/,
        validate: (state, lastCmd) => lastCmd.includes('rev-parse')
    },
    {
        id: 'int-39',
        title: 'Grep Search',
        level: 'Intermediate',
        description: 'Search for "TODO" in tracked files.',
        initialState: {},
        solutionRegex: /^git\s+grep\s+"TODO"$/,
        validate: (state, lastCmd) => lastCmd.includes('grep')
    },
    {
        id: 'int-40',
        title: 'Shortlog',
        level: 'Intermediate',
        description: 'Summarize git log output.',
        initialState: {},
        solutionRegex: /^git\s+shortlog$/,
        validate: (state, lastCmd) => lastCmd.includes('shortlog')
    },

    // ==========================================
    // ADVANCED LEVEL (76-105)
    // Focus: Repairs, Complex History, Internals
    // ==========================================
    {
        id: 'adv-01',
        title: 'Interactive Rebase',
        level: 'Advanced',
        description: 'Start an interactive rebase for the last 3 commits.',
        initialState: { commits: [{}, {}, {}] },
        solutionRegex: /^git\s+rebase\s+-i\s+HEAD~3$/,
        validate: (state, lastCmd) => lastCmd.includes('rebase -i HEAD~3')
    },
    {
        id: 'adv-02',
        title: 'Bisect Start',
        level: 'Advanced',
        description: 'Start a binary search to find a bug.',
        initialState: {},
        solutionRegex: /^git\s+bisect\s+start$/,
        validate: (state, lastCmd) => lastCmd.includes('bisect start')
    },
    {
        id: 'adv-03',
        title: 'Bisect Bad',
        level: 'Advanced',
        description: 'Mark the current commit as bad.',
        initialState: {},
        solutionRegex: /^git\s+bisect\s+bad$/,
        validate: (state, lastCmd) => lastCmd.includes('bisect bad')
    },
    {
        id: 'adv-04',
        title: 'Bisect Good',
        level: 'Advanced',
        description: 'Mark commit a1b2c3 as good.',
        initialState: {},
        solutionRegex: /^git\s+bisect\s+good\s+a1b2c3$/,
        validate: (state, lastCmd) => lastCmd.includes('bisect good')
    },
    {
        id: 'adv-05',
        title: 'Bisect Reset',
        level: 'Advanced',
        description: 'Exit the bisect session.',
        initialState: {},
        solutionRegex: /^git\s+bisect\s+reset$/,
        validate: (state, lastCmd) => lastCmd.includes('bisect reset')
    },
    {
        id: 'adv-06',
        title: 'Reflog Reset',
        level: 'Advanced',
        description: 'Reset HEAD to the state at index 5 in reflog.',
        initialState: {},
        solutionRegex: /^git\s+reset\s+--hard\s+HEAD@\{5\}$/,
        validate: (state, lastCmd) => lastCmd.includes('reset --hard HEAD@{5}')
    },
    {
        id: 'adv-07',
        title: 'Squash Commits (Merge)',
        level: 'Advanced',
        description: 'Merge "feature" into "main" but squash commits into one.',
        initialState: { branches: ['main', 'feature'] },
        solutionRegex: /^git\s+merge\s+--squash\s+feature$/,
        validate: (state, lastCmd) => lastCmd.includes('merge --squash')
    },
    {
        id: 'adv-08',
        title: 'Submodule Add',
        level: 'Advanced',
        description: 'Add a submodule from "https://github.com/lib/lib.git".',
        initialState: {},
        solutionRegex: /^git\s+submodule\s+add\s+https:\/\/github\.com\/lib\/lib\.git$/,
        validate: (state, lastCmd) => lastCmd.includes('submodule add')
    },
    {
        id: 'adv-09',
        title: 'Submodule Update',
        level: 'Advanced',
        description: 'Initialize and update submodules recursively.',
        initialState: {},
        solutionRegex: /^git\s+submodule\s+update\s+--init\s+--recursive$/,
        validate: (state, lastCmd) => lastCmd.includes('submodule update')
    },
    {
        id: 'adv-10',
        title: 'Worktree Add',
        level: 'Advanced',
        description: 'Create a new working tree for branch "hotfix" at ../hotfix.',
        initialState: {},
        solutionRegex: /^git\s+worktree\s+add\s+\.\.\/hotfix\s+hotfix$/,
        validate: (state, lastCmd) => lastCmd.includes('worktree add')
    },
    {
        id: 'adv-11',
        title: 'Bundle Create',
        level: 'Advanced',
        description: 'Create a bundle file named "repo.bundle" of the master branch.',
        initialState: {},
        solutionRegex: /^git\s+bundle\s+create\s+repo\.bundle\s+master$/,
        validate: (state, lastCmd) => lastCmd.includes('bundle create')
    },
    {
        id: 'adv-12',
        title: 'Garbage Collection',
        level: 'Advanced',
        description: 'Optimize the local repository (gc).',
        initialState: {},
        solutionRegex: /^git\s+gc$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git gc'
    },
    {
        id: 'adv-13',
        title: 'Fsck',
        level: 'Advanced',
        description: 'Verify the connectivity and validity of objects in the database.',
        initialState: {},
        solutionRegex: /^git\s+fsck$/,
        validate: (state, lastCmd) => lastCmd.trim() === 'git fsck'
    },
    {
        id: 'adv-14',
        title: 'Count Objects',
        level: 'Advanced',
        description: 'Count unpacked number of objects and their disk consumption.',
        initialState: {},
        solutionRegex: /^git\s+count-objects\s+-v$/,
        validate: (state, lastCmd) => lastCmd.includes('count-objects')
    },
    {
        id: 'adv-15',
        title: 'Verify Pack',
        level: 'Advanced',
        description: 'Verify the pack file (simulate "git verify-pack -v .git/objects/pack/pack-*.idx").',
        initialState: {},
        solutionRegex: /^git\s+verify-pack/,
        validate: (state, lastCmd) => lastCmd.includes('verify-pack')
    },
    {
        id: 'adv-16',
        title: 'Cat File',
        level: 'Advanced',
        description: 'Show the type of the object 8f23a1.',
        initialState: {},
        solutionRegex: /^git\s+cat-file\s+-t\s+8f23a1$/,
        validate: (state, lastCmd) => lastCmd.includes('cat-file -t')
    },
    {
        id: 'adv-17',
        title: 'Show Ref',
        level: 'Advanced',
        description: 'List references in a local repository.',
        initialState: {},
        solutionRegex: /^git\s+show-ref$/,
        validate: (state, lastCmd) => lastCmd.includes('show-ref')
    },
    {
        id: 'adv-18',
        title: 'Archive',
        level: 'Advanced',
        description: 'Create a tar archive of the current HEAD.',
        initialState: {},
        solutionRegex: /^git\s+archive\s+--format=tar\s+HEAD$/,
        validate: (state, lastCmd) => lastCmd.includes('archive')
    },
    {
        id: 'adv-19',
        title: 'Describe',
        level: 'Advanced',
        description: 'Give an object a human readable name based on tags.',
        initialState: {},
        solutionRegex: /^git\s+describe$/,
        validate: (state, lastCmd) => lastCmd.includes('describe')
    },
    {
        id: 'adv-20',
        title: 'Filter Branch (Danger)',
        level: 'Advanced',
        description: 'Rewrite history (just simulate calling the command).',
        initialState: {},
        solutionRegex: /^git\s+filter-branch/,
        validate: (state, lastCmd) => lastCmd.includes('filter-branch')
    },
    {
        id: 'adv-21',
        title: 'Rerere',
        level: 'Advanced',
        description: 'Reuse recorded resolution of conflicted merges (enable).',
        initialState: {},
        solutionRegex: /^git\s+config\s+--global\s+rerere\.enabled\s+true$/,
        validate: (state, lastCmd) => lastCmd.includes('rerere')
    },
    {
        id: 'adv-22',
        title: 'Revert Commit',
        level: 'Advanced',
        description: 'Create a new commit that undoes changes in HEAD.',
        initialState: {},
        solutionRegex: /^git\s+revert\s+HEAD$/,
        validate: (state, lastCmd) => lastCmd.includes('revert HEAD')
    },
    {
        id: 'adv-23',
        title: 'Log Stat',
        level: 'Advanced',
        description: 'Show log with diffstat.',
        initialState: {},
        solutionRegex: /^git\s+log\s+--stat$/,
        validate: (state, lastCmd) => lastCmd.includes('log --stat')
    },
    {
        id: 'adv-24',
        title: 'Find Lost Stash',
        level: 'Advanced',
        description: 'Search for dangling commits that might be lost stashes.',
        initialState: {},
        solutionRegex: /^git\s+fsck\s+--no-reflogs$/,
        validate: (state, lastCmd) => lastCmd.includes('fsck')
    },
    {
        id: 'adv-25',
        title: 'Rm Cached',
        level: 'Advanced',
        description: 'Unstage and remove "secret.key" from index, keep file on disk.',
        initialState: {},
        solutionRegex: /^git\s+rm\s+--cached\s+secret\.key$/,
        validate: (state, lastCmd) => lastCmd.includes('rm --cached')
    },
    {
        id: 'adv-26',
        title: 'Check Ignore',
        level: 'Advanced',
        description: 'Debug why "debug.log" is being ignored.',
        initialState: {},
        solutionRegex: /^git\s+check-ignore\s+-v\s+debug\.log$/,
        validate: (state, lastCmd) => lastCmd.includes('check-ignore')
    },
    {
        id: 'adv-27',
        title: 'Diff Word',
        level: 'Advanced',
        description: 'Show diff by word instead of line.',
        initialState: {},
        solutionRegex: /^git\s+diff\s+--word-diff$/,
        validate: (state, lastCmd) => lastCmd.includes('word-diff')
    },
    {
        id: 'adv-28',
        title: 'Range Diff',
        level: 'Advanced',
        description: 'Compare two commit ranges.',
        initialState: {},
        solutionRegex: /^git\s+range-diff/,
        validate: (state, lastCmd) => lastCmd.includes('range-diff')
    },
    {
        id: 'adv-29',
        title: 'Prune Packed',
        level: 'Advanced',
        description: 'Remove extra objects that are already in pack files.',
        initialState: {},
        solutionRegex: /^git\s+prune-packed$/,
        validate: (state, lastCmd) => lastCmd.includes('prune-packed')
    },
    {
        id: 'adv-30',
        title: 'Update Index',
        level: 'Advanced',
        description: 'Tell git to assume "config.php" is unchanged.',
        initialState: {},
        solutionRegex: /^git\s+update-index\s+--assume-unchanged\s+config\.php$/,
        validate: (state, lastCmd) => lastCmd.includes('update-index')
    }
];

if (typeof window !== 'undefined') {
    window.gitScenarios = gitScenarios;
}
