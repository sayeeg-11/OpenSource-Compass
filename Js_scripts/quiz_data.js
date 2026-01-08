const quizData = [
    {
        title: "Module 1: Open Source Basics",
        questions: [
            {
                question: "What does 'Open Source' mean?",
                options: [
                    "Software that is free to use",
                    "Software with source code available for modification",
                    "Software that has no license",
                    "Software built by Google"
                ],
                correct: 1,
                explanation: "Open source software is code that is designed to be publicly accessible—anyone can see, modify, and distribute the code as they see fit."
            },
            {
                question: "Which of these is a popular version control system?",
                options: [
                    "Git",
                    "Node.js",
                    "Python",
                    "VScode"
                ],
                correct: 0,
                explanation: "Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers."
            },
            {
                question: "What is a 'Repository'?",
                options: [
                    "A folder where your project files are stored",
                    "A type of coding language",
                    "A server error",
                    "A license type"
                ],
                correct: 0,
                explanation: "A repository (or 'repo') contains all of your project's files and stores each file's revision history."
            },
            {
                question: "What does 'Forking' a repository do?",
                options: [
                    "Deletes the repository",
                    "Creates a copy of the repository under your account",
                    "Merges changes to the main branch",
                    "Downloads the code zip"
                ],
                correct: 1,
                explanation: "Forking creates a personal copy of someone else's project. Forking a repository allows you to freely experiment with changes without affecting the original project."
            },
            {
                question: "What is a 'Pull Request' (PR)?",
                options: [
                    "A request to download code",
                    "A request to merge your changes into the original repository",
                    "A request to become an admin",
                    "A request to delete a file"
                ],
                correct: 1,
                explanation: "Pull requests let you tell others about changes you've pushed to a branch in a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators."
            },
            {
                question: "Which license allows anyone to do anything with your code?",
                options: [
                    "MIT",
                    "GPL",
                    "Apache",
                    "Unlicense (Public Domain)"
                ],
                correct: 3,
                explanation: "The Unlicense is a template for dedicating your software to the public domain, effectively allowing anyone to use it for any purpose without restriction."
            },
            {
                question: "What is 'README.md' used for?",
                options: [
                    "To list contributors names only",
                    "To write private notes",
                    "To document the project and explain how to use/contribute",
                    "To store API keys"
                ],
                correct: 2,
                explanation: "A README file is often the first file a visitor sees. It tells the user what the project does, why it is useful, and how to get started with it."
            },
            {
                question: "What is an 'Issue' in GitHub?",
                options: [
                    "A serious problem with the server",
                    "A place to track bugs, enhancements, or tasks",
                    "A way to block users",
                    "A coding error"
                ],
                correct: 1,
                explanation: "Issues are used to track ideas, feedback, tasks, or bugs for work on GitHub."
            },
            {
                question: "What command creates a new branch in Git?",
                options: [
                    "git branch new",
                    "git checkout -b new-branch",
                    "git add branch",
                    "git commit -m 'new branch'"
                ],
                correct: 1,
                explanation: "`git checkout -b <branch-name>` creates a new branch and switches to it immediately."
            },
            {
                question: "What facilitates communication in open source projects?",
                options: [
                    "Code comments only",
                    "Checkboxes",
                    "Issues, Pull Requests, and Discussions",
                    "Emailing the CEO"
                ],
                correct: 2,
                explanation: "Open source projects rely on asynchronous communication tools like Issues, Pull Requests, and Discussion boards to collaborate effectively."
            }
        ]
    },
    {
        title: "Module 2: Git & GitHub Essentials",
        questions: [
            {
                question: "What command initializes a new Git repository?",
                options: [
                    "git start",
                    "git init",
                    "git new",
                    "git create"
                ],
                correct: 1,
                explanation: "`git init` creates a new, empty Git repository or reinitializes an existing one."
            },
            {
                question: "How do you stage files for a commit?",
                options: [
                    "git commit",
                    "git push",
                    "git stage",
                    "git add"
                ],
                correct: 3,
                explanation: "`git add` adds file contents to the staging area, preparing them for the next commit."
            },
            {
                question: "What command saves your staged changes?",
                options: [
                    "git save",
                    "git commit",
                    "git push",
                    "git store"
                ],
                correct: 1,
                explanation: "`git commit` captures a snapshot of the project's currently staged changes."
            },
            {
                question: "How do you check the status of your files?",
                options: [
                    "git check",
                    "git info",
                    "git status",
                    "git log"
                ],
                correct: 2,
                explanation: "`git status` displays the state of the working directory and the staging area."
            },
            {
                question: "What is 'origin' typically in Git?",
                options: [
                    "The first commit",
                    "The default name for the remote repository",
                    "The main branch",
                    "Your local computer"
                ],
                correct: 1,
                explanation: "In Git, 'origin' is the default alias for the remote repository URL that you cloned from."
            },
            {
                question: "How do you upload local changes to a remote repo?",
                options: [
                    "git upload",
                    "git push",
                    "git send",
                    "git commit"
                ],
                correct: 1,
                explanation: "`git push` is used to upload local repository content to a remote repository."
            },
            {
                question: "How do you download changes from a remote repo?",
                options: [
                    "git pull",
                    "git download",
                    "git fetch --all",
                    "git get"
                ],
                correct: 0,
                explanation: "`git pull` allows you to fetch from and integrate with another repository or a local branch."
            },
            {
                question: "What is a merge conflict?",
                options: [
                    "When two branches have same name",
                    "When Git can't automatically resolve differences in code",
                    "When the server is down",
                    "When a file is too large"
                ],
                correct: 1,
                explanation: "Merge conflicts occur when competing changes are made to the same line of a file, or when one person edits a file and another person deletes the same file."
            },
            {
                question: "What does 'git clone' do?",
                options: [
                    "Copies a repository to your local machine",
                    "Creates a duplicate branch",
                    "Backs up your computer",
                    "Copies a file"
                ],
                correct: 0,
                explanation: "`git clone` is used to target an existing repository and create a clone of it on your local machine."
            },
            {
                question: "What is the '.gitignore' file for?",
                options: [
                    "Ignoring toxic users",
                    "Specifying files Git should ignore",
                    "Listing ignored commits",
                    "Ignoring errors"
                ],
                correct: 1,
                explanation: "A `.gitignore` file specifies intentionally untracked files that Git should ignore."
            }
        ]
    },
    {
        title: "Module 3: Best Practices",
        questions: [
            {
                question: "Why are meaningful commit messages important?",
                options: [
                    "They make you look smart",
                    "They help others understand the history and context of changes",
                    "They are required by law",
                    "They increase code speed"
                ],
                correct: 1,
                explanation: "Good commit messages provide context about verify and why changes were made, making it easier for others (and future you) to understand the project history."
            },
            {
                question: "What is 'Linting'?",
                options: [
                    "Removing dust from computer",
                    "Analyzing code for potential errors and style issues",
                    "Compressing files",
                    "Encrypting code"
                ],
                correct: 1,
                explanation: "Linting is the automated process of analyzing source code to flag programming errors, bugs, stylistic errors, and suspicious constructs."
            },
            {
                question: "Why should you keep Pull Requests small?",
                options: [
                    "To save disk space",
                    "To make it easier to review and merge",
                    "Because GitHub charges by size",
                    "It doesn't matter"
                ],
                correct: 1,
                explanation: "Small, focused Pull Requests are easier to review, less likely to introduce bugs, and faster to merge."
            },
            {
                question: "What is 'CI/CD'?",
                options: [
                    "Code In / Code Out",
                    "Continuous Integration / Continuous Deployment",
                    "Computer Interface / Computer Design",
                    "Central Intelligence / Code Department"
                ],
                correct: 1,
                explanation: "CI/CD automates the building, testing, and deployment of applications."
            },
            {
                question: "What should you do before starting work on an issue?",
                options: [
                    "Nothing, just code",
                    "Check if it's assigned to someone else and comment to claim it",
                    "Email the owner",
                    "Delete the issue"
                ],
                correct: 1,
                explanation: "Communicating your intent prevents duplicated effort."
            },
            {
                question: "Why is documentation important?",
                options: [
                    "It isn't",
                    "It helps users use and contributors contribute to the project",
                    "It increases file size",
                    "It slows down development"
                ],
                correct: 1,
                explanation: "Documentation is crucial for onboarding new users and developers to the project."
            },
            {
                question: "What is 'Semantic Versioning' (SemVer)?",
                options: [
                    "Naming versions with random words",
                    "A standard versioning system (MAJOR.MINOR.PATCH)",
                    "Versioning by date",
                    "Versioning by size"
                ],
                correct: 1,
                explanation: "SemVer provides a standard meaning to version numbers, helping users understand the impact of updates."
            },
            {
                question: "What is a 'Code of Conduct'?",
                options: [
                    "A secret password",
                    "Rules outlining expected behavior for participants",
                    "A coding style guide",
                    "A list of commands"
                ],
                correct: 1,
                explanation: "A Code of Conduct helps create a safe and welcoming environment for all contributors."
            },
            {
                question: "Why use unit tests?",
                options: [
                    "To slow down the build",
                    "To verify small parts of the application work as expected",
                    "To test the UI color",
                    "To test internet speed"
                ],
                correct: 1,
                explanation: "Unit tests validate that individual units of source code perform as expected."
            },
            {
                question: "What is 'DRY' principle?",
                options: [
                    "Do Repeat Yourself",
                    "Don't Repeat Yourself",
                    "Do Review Yesterday",
                    "Don't Run Yet"
                ],
                correct: 1,
                explanation: "DRY promotes code reusability and maintainability by reducing repetition."
            }
        ]
    },
    {
        title: "Module 4: Licensing & Legal",
        questions: [
            {
                question: "What is code without a license?",
                options: [
                    "Public Domain",
                    "Copyrighted by default (All Rights Reserved)",
                    "Free to use",
                    "Open Source"
                ],
                correct: 1,
                explanation: "In most jurisdictions, creative work is copyrighted by default. Without a license, no one has permission to use, modify, or distribute it."
            },
            {
                question: "Which license is 'Copyleft'?",
                options: [
                    "MIT",
                    "Apache",
                    "GPL",
                    "BSD"
                ],
                correct: 2,
                explanation: "GPL is a copyleft license, meaning derivative works must also be open source under the same terms."
            },
            {
                question: "What is a key feature of the MIT license?",
                options: [
                    "It requires you to pay royalty",
                    "It is very permissive and short",
                    "It forbids commercial use",
                    "It requires you to use the same license"
                ],
                correct: 1,
                explanation: "The MIT License is a permissive free software license, meaning it puts very limited restriction on reuse."
            },
            {
                question: "Can you sell Open Source software?",
                options: [
                    "Yes, absolutely",
                    "No, never",
                    "Only on Tuesdays",
                    "Only if it sucks"
                ],
                correct: 0,
                explanation: "Open Source defines freedom, not price. You can sell it, but you must usually provide the source code."
            },
            {
                question: "What is a CLA?",
                options: [
                    "Code License Agreement",
                    "Contributor License Agreement",
                    "Central License Agency",
                    "Computer Law Association"
                ],
                correct: 1,
                explanation: "A CLA is a contract between a contributor and a project maintainer defining the terms of intellectual property contribution."
            },
            {
                question: "What does 'Permissive' license mean?",
                options: [
                    "You must ask permission",
                    "Minimal restrictions on how the software can be used, modified, and redistributed",
                    "Strict rules",
                    "Government only"
                ],
                correct: 1,
                explanation: "Permissive licenses (like MIT, Apache) allow you to do almost anything with the code, including using it in proprietary software."
            },
            {
                question: "Why check license compatibility?",
                options: [
                    "To match colors",
                    "Because not all open source licenses can be mixed in one project",
                    "To save time",
                    "It's optional"
                ],
                correct: 1,
                explanation: "Combining code with incompatible licenses (e.g., GPL and a proprietary license) can create legal issues."
            },
            {
                question: "What is the Apache 2.0 license known for?",
                options: [
                    "Banning patents",
                    "Explicit grant of patent rights",
                    "Being very strict",
                    "Being only for web servers"
                ],
                correct: 1,
                explanation: "Apache 2.0 includes an explicit grant of patent rights from contributors to users."
            },
            {
                question: "Is Public Domain a license?",
                options: [
                    "Yes",
                    "No, it is the absence of copyright",
                    "It's a paid license",
                    "It's a company"
                ],
                correct: 1,
                explanation: "Public Domain means the work has no copyright protection; anyone can use it for anything."
            },
            {
                question: "Who owns the code in an open source project?",
                options: [
                    "GitHub",
                    "The project creator usually, or contributors retain their own copyright",
                    "The government",
                    "No one"
                ],
                correct: 1,
                explanation: "Typically, contributors retain copyright to their contributions unless they sign a copyright assignment agreement."
            }
        ]
    },
    {
        title: "Module 5: Finding Projects",
        questions: [
            {
                question: "What is a 'Good First Issue'?",
                options: [
                    "An issue that is very hard",
                    "A label used to identify tasks suitable for beginners",
                    "The first issue ever created",
                    "A broken link"
                ],
                correct: 1,
                explanation: "Maintainers label issues as 'good first issue' to signal that they are relatively simple and good entry points for new contributors."
            },
            {
                question: "Where can you find open source projects?",
                options: [
                    "GitHub Explore",
                    "First Timers Only",
                    "CodeTriage",
                    "All of the above"
                ],
                correct: 3,
                explanation: "There are many platforms and aggregators dedicated to helping you find projects to contribute to."
            },
            {
                question: "What should you check before contributing?",
                options: [
                    "The CEO's name",
                    "CONTRIBUTING.md and recent activity",
                    "The stock price",
                    "The logo color"
                ],
                correct: 1,
                explanation: "Checking `CONTRIBUTING.md` creates understanding of the process, and recent activity ensures the project is not dead."
            },
            {
                question: "What is 'hacktoberfest'?",
                options: [
                    "A beer festival",
                    "A month-long celebration of open source software",
                    "A hacking competition",
                    "A holiday"
                ],
                correct: 1,
                explanation: "Hacktoberfest is an annual event in October encouraging participation in the open source community."
            },
            {
                question: "Why look at the 'Help Wanted' label?",
                options: [
                    "It means the project is abandoned",
                    "It indicates maintainers are specifically asking for assistance",
                    "It's a trap",
                    "It means the code is bad"
                ],
                correct: 1,
                explanation: "'Help Wanted' generally indicates that the maintainers are open to external contributions for that issue."
            },
            {
                question: "What is a 'Maintainer'?",
                options: [
                    "A janitor",
                    "Someone who manages and builds the source code project",
                    "A user",
                    "A bot"
                ],
                correct: 1,
                explanation: "Maintainers review pull requests, manage releases, and steer the project; they are the stewards of the repo."
            },
            {
                question: "Is it okay to solve an issue without asking?",
                options: [
                    "Always",
                    "Never",
                    "It's polite to comment first to avoid duplicate work",
                    "Only if you are fast"
                ],
                correct: 2,
                explanation: "Communication prevents you from working on something that someone else is already doing or that maintainers don't want."
            },
            {
                question: "What if you can't code well yet?",
                options: [
                    "Give up",
                    "Contribute documentation, translations, or design",
                    "Wait 10 years",
                    "Fake it"
                ],
                correct: 1,
                explanation: "Non-code contributions are extremely valuable and a great way to start in open source."
            },
            {
                question: "How to assess project health?",
                options: [
                    "Look at commit frequency and issue response time",
                    "Look at the logo",
                    "Look at the name",
                    "Guess"
                ],
                correct: 0,
                explanation: "Active commits and responsive maintainers are signs of a healthy, living project."
            },
            {
                question: "What does star count indicate?",
                options: [
                    "Quality",
                    "Popularity/Visibility",
                    "complexity",
                    "Age"
                ],
                correct: 1,
                explanation: "Stars indicate popularity and interest, but not necessarily code quality or project health."
            }
        ]
    },
    {
        title: "Module 6: Code Quality",
        questions: [
            {
                question: "What is 'Refactoring'?",
                options: [
                    "Adding new features",
                    "Restructuring existing code without changing its external behavior",
                    "Deleting code",
                    "Writing comments"
                ],
                correct: 1,
                explanation: "Refactoring improves code structure, readability, and maintainability without altering functionality."
            },
            {
                question: "Why follow a style guide?",
                options: [
                    "To match your outfit",
                    "To ensure consistency and readability across the codebase",
                    "To make code longer",
                    "To annoy contributors"
                ],
                correct: 1,
                explanation: "Consistent style makes the codebase easier to read and maintain for everyone."
            },
            {
                question: "What is 'Technical Debt'?",
                options: [
                    "Money owed to developers",
                    "Implied cost of additional rework caused by choosing an easy solution now instead of a better one later",
                    "Server costs",
                    "License fees"
                ],
                correct: 1,
                explanation: "Like financial debt, technical debt accumulates interest (difficulty in maintenance) and must eventually be paid down."
            },
            {
                question: "What is 'clean code'?",
                options: [
                    "Code without bugs",
                    "Code that is easy to understand and easy to change",
                    "Code that is short",
                    "Code with no comments"
                ],
                correct: 1,
                explanation: "Clean code is readable, simple, and concise, making it easy for other developers to work with."
            },
            {
                question: "What is a 'code smell'?",
                options: [
                    "Bad odor from computer",
                    "A surface indication that usually corresponds to a deeper problem in the system",
                    "A syntax error",
                    "A missing semicolon"
                ],
                correct: 1,
                explanation: "Code smells (like massive functions or duplicated code) suggest that refactoring might be needed."
            },
            {
                question: "Why review code?",
                options: [
                    "To criticize others",
                    "To find bugs, ensure quality, and share knowledge",
                    "To slow down release",
                    "To enforce power"
                ],
                correct: 1,
                explanation: "Code review is a critical quality assurance step and a primary method of knowledge transfer in teams."
            },
            {
                question: "What is 'Spaghetti Code'?",
                options: [
                    "Code for pasta recipes",
                    "Unstructured and difficult-to-maintain source code",
                    "Italian code",
                    "Fast code"
                ],
                correct: 1,
                explanation: "Spaghetti code has a complex and tangled control structure, making it hard to understand."
            },
            {
                question: "What is 'Dead Code'?",
                options: [
                    "Code that crashes",
                    "Code that is never executed",
                    "Code written by ghost",
                    "Old code"
                ],
                correct: 1,
                explanation: "Dead code bloats the codebase and confuses readers; it should be removed."
            },
            {
                question: "What is complexity?",
                options: [
                    "How smart the coder is",
                    "How difficult the code is to understand and verify",
                    "Length of file",
                    "Number of variables"
                ],
                correct: 1,
                explanation: "High complexity increases the chance of bugs and makes maintenance harder."
            },
            {
                question: "What is the 'Boy Scout Rule' in coding?",
                options: [
                    "Be prepared",
                    "Always leave the code better than you found it",
                    "Wear a uniform",
                    "Camp out"
                ],
                correct: 1,
                explanation: "Making small improvements (renaming a variable, adding a comment) with every commit keeps code quality high."
            }
        ]
    },
    {
        title: "Module 7: Documentation",
        questions: [
            {
                question: "Why is documentation crucial in Open Source?",
                options: [
                    "It isn't",
                    "Contributors and users rely on it since there is no customer support",
                    "It's just for show",
                    "To fill space"
                ],
                correct: 1,
                explanation: "Good documentation allows people to use and contribute to your project without needing to ask you questions constantly."
            },
            {
                question: "What goes in a CONTRIBUTING.md?",
                options: [
                    "Project history",
                    "Bio of author",
                    "Guidelines for how to contribute to the project",
                    "Jokes"
                ],
                correct: 2,
                explanation: "It tells potential contributors how to setup the env, run tests, and submit PRs."
            },
            {
                question: "What is API documentation?",
                options: [
                    "Instructions on how to use the code interface/library",
                    "Legal docs",
                    "Hardware specs",
                    "Meeting notes"
                ],
                correct: 0,
                explanation: "API documentation details the functions, classes, return types, and arguments for using a library."
            },
            {
                question: "What allows writing formatted text in GitHub?",
                options: [
                    "Microsoft Word",
                    "Markdown",
                    "Notepad",
                    "HTML only"
                ],
                correct: 1,
                explanation: "Markdown is a lightweight markup language used throughout GitHub for issues, PRs, and wikis."
            },
            {
                question: "What is a 'changelog'?",
                options: [
                    "List of changed users",
                    "A file containing a curated, chronologically ordered list of notable changes",
                    "A log of errors",
                    "A plan for future"
                ],
                correct: 1,
                explanation: "Changelogs help users understand what has changed between versions (features, fixes, breaking changes)."
            },
            {
                question: "What is inline documentation?",
                options: [
                    "Emails",
                    "Comments written directly in the source code",
                    "Separate PDF",
                    "Wiki page"
                ],
                correct: 1,
                explanation: "Comments and docstrings explain the *why* and *how* of specific code blocks right where they live."
            },
            {
                question: "Best way to write a tutorial?",
                options: [
                    "Write it for experts only",
                    "Step-by-step, clear instructions, assuming no prior knowledge",
                    "Write in Latin",
                    "Use no images"
                ],
                correct: 1,
                explanation: "Tutorials should be accessible and guide the user from a blank state to a completed goal."
            },
            {
                question: "What is 'Self-documenting code'?",
                options: [
                    "Code that writes its own docs",
                    "Code written so clearly (variable names, structure) that comments are largely unnecessary",
                    "AI code",
                    "Magic"
                ],
                correct: 1,
                explanation: "While a goal, complex logic often still needs comments. But naming variables `userAge` instead of `x` is self-documenting."
            },
            {
                question: "Who reads documentation?",
                options: [
                    "Nobody",
                    "Users, new contributors, and future maintainers",
                    "Only bots",
                    "The internet provider"
                ],
                correct: 1,
                explanation: "Everyone interacts with documentation at some point."
            },
            {
                question: "What tool generates sites from Markdown?",
                options: [
                    "Jekyll / Hugo / Docusaurus",
                    "Paint",
                    "Excel",
                    "Calculater"
                ],
                correct: 0,
                explanation: "Static site generators are commonly used to turn documentation files into beautiful websites."
            }
        ]
    },
    {
        title: "Module 8: Community Dynamics",
        questions: [
            {
                question: "What is 'Burnout'?",
                options: [
                    "A fire",
                    "Physical or emotional exhaustion",
                    "A tire mark",
                    "Fast coding"
                ],
                correct: 1,
                explanation: "Open source maintainers often face burnout due to high demands and lack of support."
            },
            {
                question: "How to handle a rude comment?",
                options: [
                    "Reply rudely back",
                    "Ignore it or report it if it violates CoC",
                    "Hack them",
                    "Delete repo"
                ],
                correct: 1,
                explanation: "Engaging with trolls drains energy. Enforcing the Code of Conduct protects the community."
            },
            {
                question: "What is 'Bus Factor'?",
                options: [
                    "Public transport schedule",
                    "The number of key developers who would stall the project if incapacitated (hit by a bus)",
                    "Vehicle size",
                    "Budget"
                ],
                correct: 1,
                explanation: "A low bus factor (e.g., 1) is risky because if that one person leaves, the project dies. Healthy projects have shared knowledge."
            },
            {
                question: "What is a 'Benevolent Dictator For Life' (BDFL)?",
                options: [
                    "A king",
                    "A title given to a small number of open-source software development leaders",
                    "A bad boss",
                    "A typo"
                ],
                correct: 1,
                explanation: "Examples include Guido van Rossum (Python) and Linus Torvalds (Linux), though the model is becoming less common."
            },
            {
                question: "Why is diversity important in open source?",
                options: [
                    "It looks good",
                    "Diverse perspectives lead to better, more robust software",
                    "It's a requirement",
                    "No reason"
                ],
                correct: 1,
                explanation: "Different backgrounds bring different use cases, solving problems the original creator might not have imagined."
            },
            {
                question: "What is 'imposter syndrome'?",
                options: [
                    "Being a spy",
                    "Feeling like a fraud despite being competent",
                    "Identity theft",
                    " Acting"
                ],
                correct: 1,
                explanation: "Many contributors feel they aren't 'smart enough'. It's normal and common."
            },
            {
                question: "How to say 'No' to a feature request?",
                options: [
                    "Don't reply",
                    "Politely explain why it doesn't fit the project roadmap",
                    "Say 'It's stupid",
                    "Charge money"
                ],
                correct: 1,
                explanation: "Maintainers must curate the project. A polite 'no' saves everyone time."
            },
            {
                question: "What is 'bikeshedding'?",
                options: [
                    "Painting a shed",
                    "Focusing on trivial details while ignoring important matters",
                    "Cycling",
                    "Recycling"
                ],
                correct: 1,
                explanation: "Also known as Parkinson's law of triviality. E.g., debating the color of a button for weeks while the server is crashing."
            },
            {
                question: "What is the 'tragedy of the commons' in OSS?",
                options: [
                    "A sad movie",
                    "Overuse of shared resources without contribution",
                    "A play",
                    "Copyright law"
                ],
                correct: 1,
                explanation: "Many companies use OSS but few contribute back, straining the maintainers."
            },
            {
                question: "How to encourage new contributors?",
                options: [
                    "Be mean",
                    "Be welcoming, provide mentorship, and label issues clearly",
                    "Hide the code",
                    "Write bad docs"
                ],
                correct: 1,
                explanation: "A welcoming culture is the #1 factor in retaining contributors."
            }
        ]
    },
    {
        title: "Module 9: Advanced Git",
        questions: [
            {
                question: "What does 'git rebase' do?",
                options: [
                    "Deletes base",
                    "Re-applies commits on top of another base tip",
                    "Resets computer",
                    "Basic git"
                ],
                correct: 1,
                explanation: "Rebasing rewrites history to create a linear progression of commits."
            },
            {
                question: "What command temporarily stores modified files?",
                options: [
                    "git hide",
                    "git stash",
                    "git store",
                    "git save"
                ],
                correct: 1,
                explanation: "`git stash` allows you to switch branches without committing unfinished work."
            },
            {
                question: "What is a 'cherry-pick'?",
                options: [
                    "Fruit picking",
                    "Applying the changes introduced by some existing commits",
                    "Picking a team",
                    "Deleting random commits"
                ],
                correct: 1,
                explanation: "`git cherry-pick` lets you pick a specific commit from one branch and apply it to another."
            },
            {
                question: "What does 'git reset --hard' do?",
                options: [
                    "Restarts computer",
                    "Resets the index and working tree (LOSE CHANGES)",
                    "Resets only index",
                    "Safe reset"
                ],
                correct: 1,
                explanation: "It forcefully resets your current state to a specific commit. Any uncommitted changes are lost forever."
            },
            {
                question: "What is 'HEAD'?",
                options: [
                    "Your brain",
                    "A reference to the currently checked-out commit",
                    "The first commit",
                    "The server"
                ],
                correct: 1,
                explanation: "HEAD is a pointer to the current branch reference."
            },
            {
                question: "What separates specific versions?",
                options: [
                    "Tags",
                    "Spaces",
                    "Commits",
                    "Branches"
                ],
                correct: 0,
                explanation: "Tags are used to mark specific points in history as being important, often used for releases (v1.0)."
            },
            {
                question: "What is a 'submodule'?",
                options: [
                    "A small submarine",
                    "A Git repository embedded inside another Git repository",
                    "A function",
                    "A folder"
                ],
                correct: 1,
                explanation: "Submodules allow you to keep a Git repository as a subdirectory of another Git repository."
            },
            {
                question: "How to search change history?",
                options: [
                    "git google",
                    "git bisect",
                    "git lookup",
                    "git search"
                ],
                correct: 1,
                explanation: "`git bisect` helps you find the commit that introduced a bug using binary search."
            },
            {
                question: "What is the difference between fetch and pull?",
                options: [
                    "No difference",
                    "Fetch downloads data; Pull downloads AND merges",
                    "Fetch is faster",
                    "Pull is safer"
                ],
                correct: 1,
                explanation: "Pull is essentially `git fetch` followed immediately by `git merge`."
            },
            {
                question: "What is a 'detached HEAD' state?",
                options: [
                    "A guillotine",
                    "When HEAD points directly to a commit instead of a branch",
                    "No internet",
                    "Git crash"
                ],
                correct: 1,
                explanation: "This happens when you check out a specific commit. New commits made here won't belong to any branch."
            }
        ]
    },
    {
        title: "Module 10: Career in Open Source",
        questions: [
            {
                question: "Can open source help you get a job?",
                options: [
                    "No",
                    "Yes, it serves as a public portfolio of your skills",
                    "Only if you are famous",
                    "Maybe"
                ],
                correct: 1,
                explanation: "Contributions show your code quality, communication skills, and ability to work in a team."
            },
            {
                question: "Do companies pay for Open Source?",
                options: [
                    "Never",
                    "Yes, many hire developers to work on OSS full-time",
                    "Only nonprofits",
                    "Illegal"
                ],
                correct: 1,
                explanation: "Companies like Red Hat, Google, and Microsoft employ thousands of engineers to work on open source."
            },
            {
                question: "What is 'GitHub Sponsors'?",
                options: [
                    "Ads on GitHub",
                    "A way to financially support developers",
                    "A loan",
                    "A bank"
                ],
                correct: 1,
                explanation: "It allows the community to financially support the people who build the open source software they use."
            },
            {
                question: "Soft skill gained from OSS?",
                options: [
                    "Typing fast",
                    "Asynchronous communication and collaboration",
                    "Sitting",
                    "Drinking coffee"
                ],
                correct: 1,
                explanation: "Working with distributed teams polishes your ability to communicate clearly in writing."
            },
            {
                question: "What is an 'Open Source Program Office' (OSPO)?",
                options: [
                    "A physical office",
                    "A dedicated team within a company managing open source strategy",
                    "A government agency",
                    "A club"
                ],
                correct: 1,
                explanation: "OSPOs help companies manage their open source consumption and contributions."
            },
            {
                question: "How to mention OSS on a resume?",
                options: [
                    "Don't",
                    "List significant contributions and link to profile",
                    "Print the code",
                    "Only if you own the repo"
                ],
                correct: 1,
                explanation: "Treat significant OSS work like work experience."
            },
            {
                question: "Does OSS replace a degree?",
                options: [
                    "Always",
                    "It depends, but it's strong practical proof of skill",
                    "Never",
                    "Degrees are useless"
                ],
                correct: 1,
                explanation: "While not a direct replacement, a strong portfolio can often substitute for formal credentials in many tech roles."
            },
            {
                question: "Networking benefit?",
                options: [
                    "Connecting cables",
                    "Meeting developers from around the world",
                    "None",
                    "Free wifi"
                ],
                correct: 1,
                explanation: "You interact with experts you might never meet locally."
            },
            {
                question: "What is 'DevRel'?",
                options: [
                    "Developer Relations",
                    "Development Release",
                    "Device Reliability",
                    "Developer Relay"
                ],
                correct: 0,
                explanation: "DevRel roles often involve engaging with open source communities."
            },
            {
                question: "Is contributing code the only way to a career?",
                options: [
                    "Yes",
                    "No, documentation, community management, and design are valid paths",
                    "Probably",
                    "Only QA"
                ],
                correct: 1,
                explanation: "Many have built careers specializing in technical writing or community management for open source projects."
            }
        ]
    }
];
