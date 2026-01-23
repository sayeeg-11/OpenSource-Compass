// Load programs data
let programs = [];

// Fetch programs data from JSON file (relative to /frontend/pages/)
fetch('../data/programs.json')
    .then(response => response.json())
    .then(data => {
        programs = data;
        renderPrograms();
    })
    .catch(error => {
        console.error('Error loading programs:', error);
        // Fallback to hardcoded data if JSON fails
        programs = [
            {
                id: 1,
                name: "Google Summer of Code",
                image: "../library/assets/program_logo/gsoc.webp",
                description: "Google's annual, international program focused on bringing more student developers into open source software development.",
                status: "Active",
                difficulty: "Advanced",
                timeline: "May - August",
                stipend: "$3000 - $6600",
                contributors: 2000,
                issues: 450,
                organizations: 180,
                contributions: [
                    "Bug fixes and feature implementations",
                    "Documentation improvements",
                    "Performance optimization",
                    "UI/UX enhancements"
                ],
                issues_list: [
                    "Fix pagination in search results",
                    "Implement dark mode support",
                    "Add multi-language support",
                    "Optimize database queries",
                    "Create user dashboard"
                ]
            },
            {
                id: 2,
                name: "GirlScript Summer of Code",
                image: "../library/assets/program_logo/ggsoc.png",
                description: "A nationwide summer program to inspire girls to explore technology and make their first meaningful open-source contribution.",
                status: "Active",
                difficulty: "Beginner",
                timeline: "March - May",
                stipend: "Certificates & Perks",
                contributors: 1500,
                issues: 320,
                organizations: 120,
                contributions: [
                    "Frontend development",
                    "Backend integration",
                    "API documentation",
                    "Testing and QA"
                ],
                issues_list: [
                    "Create landing page UI",
                    "Build contact form with validation",
                    "Add responsive design fixes",
                    "Implement search functionality",
                    "Write unit tests"
                ]
            },
            {
                id: 3,
                name: "Hacktoberfest",
                image: "../library/assets/program_logo/hacktober.webp",
                description: "Digital celebration of open source software. Make four quality pull requests during October and earn a limited edition t-shirt.",
                status: "Upcoming",
                difficulty: "Beginner",
                timeline: "October 1-31",
                stipend: "T-Shirt & Digital Badge",
                contributors: 100000,
                issues: 5000,
                organizations: 500,
                contributions: [
                    "Code improvements",
                    "Bug fixing",
                    "Documentation",
                    "Translation work"
                ],
                issues_list: [
                    "Fix typos in documentation",
                    "Add missing comments to code",
                    "Create README files",
                    "Fix broken links",
                    "Improve code formatting"
                ]
            },
            {
                id: 4,
                name: "MLH Fellowship",
                image: "../library/assets/program_logo/gsoc.webp",
                description: "A remote internship alternative for aspiring technologists. Get mentorship, build projects, and contribute to open source.",
                status: "Active",
                difficulty: "Intermediate",
                timeline: "Year-round",
                stipend: "$3000 - $5000",
                contributors: 800,
                issues: 380,
                organizations: 90,
                contributions: [
                    "Machine learning models",
                    "Data analysis projects",
                    "Web application development",
                    "Cloud infrastructure"
                ],
                issues_list: [
                    "Implement ML algorithm",
                    "Create data visualization dashboard",
                    "Optimize ML model performance",
                    "Write technical documentation",
                    "Build REST API endpoints"
                ]
            },
            {
                id: 5,
                name: "Outreachy",
                image: "../library/assets/program_logo/outreachy.webp",
                description: "Paid, remote internship program to support diversity in open source. Open to underrepresented groups in tech.",
                status: "Upcoming",
                difficulty: "Intermediate",
                timeline: "May-August & Dec-March",
                stipend: "$6000 - $7000",
                contributors: 400,
                issues: 200,
                organizations: 60,
                contributions: [
                    "Full-stack development",
                    "System administration",
                    "Community management",
                    "Technical writing"
                ],
                issues_list: [
                    "Refactor legacy code",
                    "Create deployment automation",
                    "Build admin interface",
                    "Write API documentation",
                    "Implement caching mechanism"
                ]
            },
            {
                id: 6,
                name: "Social Winter of Code",
                url: "https://socialsummerofcode.github.io/",
                image: "../library/assets/program_logo/ssoc.webp",
                description: "A beginner-friendly winter program encouraging students to contribute to open source during winter break.",
                status: "Completed",
                difficulty: "Beginner",
                timeline: "December - January",
                stipend: "Certificates & Prizes",
                contributors: 600,
                issues: 150,
                organizations: 45,
                contributions: [
                    "Simple bug fixes",
                    "Documentation tasks",
                    "Code review practice",
                    "Community contributions"
                ],
                issues_list: [
                    "Add feature flag documentation",
                    "Fix CSS alignment issues",
                    "Create beginner guides",
                    "Improve test coverage",
                    "Add inline code comments"
                ]
            },{
        id: 6,
        name: "FOSSASIA Codeheat",
        url: "https://codeheat.org/",
        image: "https://fossasia.org/assets/img/logo.png",
        description: "A coding contest for FOSSASIA projects on GitHub to improve open source software.",
        status: "Upcoming",
        difficulty: "Beginner",
        timeline: "Sept - Feb",
        stipend: "Prizes & Travel",
        contributors: 3000,
        issues: 500,
        organizations: 1,
        contributions: ["UI Design", "App Development", "Web Dev"],
        issues_list: ["Fix CSS alignment", "Add localized strings"]
    },
    {
        id: 7,
        name: "Season of KDE",
        url: "https://community.kde.org/SoK",
        image: "https://kde.org/stuff/clipart/logo/kde-logo-white-blue-rounded-128x128.png",
        description: "Mentorship program for new contributors to work on KDE desktop ecosystem projects.",
        status: "Completed",
        difficulty: "Intermediate",
        timeline: "Jan - March",
        stipend: "Certificates & Swag",
        contributors: 800,
        issues: 120,
        organizations: 1,
        contributions: ["Desktop Apps", "C++/Qt", "Icons"],
        issues_list: ["Plasma shell fixes", "Konsole feature adds"]
    },
    {
        id: 8,
        name: "Hyperledger Mentorship",
        url: "https://wiki.hyperledger.org/display/INTERN",
        image: "https://www.hyperledger.org/wp-content/uploads/2018/03/Hyperledger_Logo_Grey_500x125.png",
        description: "Mentorship for blockchain development using Hyperledger frameworks.",
        status: "Active",
        difficulty: "Advanced",
        timeline: "June - October",
        stipend: "$3000",
        contributors: 400,
        issues: 80,
        organizations: 15,
        contributions: ["Blockchain", "Security", "Distributed Ledgers"],
        issues_list: ["Fabric smart contracts", "Besu performance"]
    },
    {
        id: 9,
        name: "Julia Seasons of Contributions",
        url: "https://julialang.org/jsoc/",
        image: "https://julialang.org/assets/infra/logo.svg",
        description: "Projects focused on improving the Julia programming language and its ecosystem.",
        status: "Upcoming",
        difficulty: "Advanced",
        timeline: "May - August",
        stipend: "$1000 - $3000",
        contributors: 300,
        issues: 60,
        organizations: 1,
        contributions: ["Scientific Computing", "Package Dev"],
        issues_list: ["Sparse matrix optimization", "Auto-diff support"]
    },
    {
        id: 10,
        name: "Processing Foundation Fellowship",
        url: "https://processingfoundation.org/fellowships",
        image: "https://processingfoundation.org/assets/img/logo.png",
        description: "Supporting artists and coders to develop open source software for visual arts.",
        status: "Upcoming",
        difficulty: "Intermediate",
        timeline: "June - August",
        stipend: "$3000",
        contributors: 200,
        issues: 40,
        organizations: 1,
        contributions: ["p5.js", "Creative Coding", "Accessibility"],
        issues_list: ["Shaders for beginners", "Sound library bugs"]
    },
    {
        id: 11,
        name: "GitHub Octernships",
        url: "https://github.com/education/Octernships",
        image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        description: "Connecting students with industry partners for paid open source internships.",
        status: "Active",
        difficulty: "Intermediate",
        timeline: "Year-round",
        stipend: "$500+ / mo",
        contributors: 1000,
        issues: 150,
        organizations: 100,
        contributions: ["Product Dev", "Internal Tools", "OSS Projects"],
        issues_list: ["API integration", "Dashboard UI"]
    },
    {
        id: 12,
        name: "Summer of Bitcoin",
        url: "https://www.summerofbitcoin.org/",
        image: "https://www.summerofbitcoin.org/images/sob-logo.svg",
        description: "A program introducing students to Bitcoin open-source development and design.",
        status: "Active",
        difficulty: "Advanced",
        timeline: "May - August",
        stipend: "Paid in Bitcoin",
        contributors: 600,
        issues: 90,
        organizations: 30,
        contributions: ["Cryptography", "Protocol Dev", "Wallets"],
        issues_list: ["Lightning Network fixes", "Taproot implementation"]
    },
    {
        id: 13,
        name: "Open Source Promotion Plan (OSPP)",
        url: "https://summer-ospp.ac.cn/",
        image: "https://summer-ospp.ac.cn/images/logo.png",
        description: "Global student program encouraging participation in the open source supply chain.",
        status: "Upcoming",
        difficulty: "Intermediate",
        timeline: "April - Sept",
        stipend: "$1000 - $1700",
        contributors: 2000,
        issues: 350,
        organizations: 200,
        contributions: ["Middleware", "Cloud", "Operating Systems"],
        issues_list: ["Refactor Go modules", "Update Rust crates"]
    },
    {
        id: 14,
        name: "AsyncAPI Mentorship",
        url: "https://github.com/asyncapi/mentorship",
        image: "https://avatars.githubusercontent.com/u/16401334?s=200&v=4",
        description: "Supporting new contributors to become maintainers within the AsyncAPI community.",
        status: "Active",
        difficulty: "Intermediate",
        timeline: "Rolling",
        stipend: "$1500",
        contributors: 400,
        issues: 50,
        organizations: 1,
        contributions: ["Spec Dev", "Documentation", "Tooling"],
        issues_list: ["Schema validation fixes", "Generator CLI adds"]
    },
    {
        id: 15,
        name: "Free Software Foundation (FSF) Internship",
        url: "https://www.fsf.org/volunteer/internships",
        image: "https://static.fsf.org/nosvn/fsf-logo-notext.png",
        description: "Hands-on experience in advocacy and sysadmin for the free software movement.",
        status: "Active",
        difficulty: "Intermediate",
        timeline: "Tri-annual",
        stipend: "Unpaid/Credit",
        contributors: 100,
        issues: 30,
        organizations: 1,
        contributions: ["Sysadmin", "Licensing", "Web Dev"],
        issues_list: ["Fix web accessibility", "Maintain GNU servers"]
    },
    {
        id: 16,
        name: "Cloud Native (CNCF) Mentoring",
        url: "https://github.com/cncf/mentoring",
        image: "https://www.cncf.io/wp-content/uploads/2020/06/cncf-color-stacked.png",
        description: "Mentoring for Kubernetes, Prometheus, and other cloud native ecosystem projects.",
        status: "Active",
        difficulty: "Advanced",
        timeline: "Tri-annual",
        stipend: "$3000",
        contributors: 10000,
        issues: 600,
        organizations: 120,
        contributions: ["Containerization", "Monitoring", "Security"],
        issues_list: ["Helm chart updates", "Envoy proxy fixes"]
    },
    {
        id: 17,
        name: "X.Org Endless Vacation of Code (EVoC)",
        url: "https://www.x.org/wiki/XorgEVoC/",
        image: "https://www.x.org/wiki/logo.png",
        description: "Student program for working on X Window System, Wayland, and Mesa graphics.",
        status: "Active",
        difficulty: "Advanced",
        timeline: "Flexible",
        stipend: "$5000",
        contributors: 150,
        issues: 40,
        organizations: 1,
        contributions: ["Graphics Drivers", "Compilers", "Display Servers"],
        issues_list: ["Mesa Vulkan driver fixes", "Wayland protocol adds"]
    },
    {
        id: 18,
        name: "Summer of Nix",
        url: "https://summer.nixos.org/",
        image: "https://nixos.org/logo/nixos-logo-only-hires.png",
        description: "Developing NixOS packages and infrastructure during the summer.",
        status: "Upcoming",
        difficulty: "Advanced",
        timeline: "July - Sept",
        stipend: "Varies",
        contributors: 200,
        issues: 50,
        organizations: 1,
        contributions: ["DevOps", "Nix Packaging", "System Config"],
        issues_list: ["Package legacy binaries", "Improve NixOS modules"]
    },
    {
        id: 19,
        name: "DataONE Summer Internship",
        url: "https://www.dataone.org/internships",
        image: "https://www.dataone.org/sites/all/themes/dataone/logo.png",
        description: "Developing data management tools for the environmental science community.",
        status: "Completed",
        difficulty: "Intermediate",
        timeline: "May - July",
        stipend: "$5000",
        contributors: 100,
        issues: 25,
        organizations: 1,
        contributions: ["Data Science", "Python", "Metadata"],
        issues_list: ["Validation tool updates", "Portal UI fixes"]
    },
    {
        id: 20,
        name: "Igalia Coding Experience",
        url: "https://www.igalia.com/jobs/igalia-coding-experience",
        image: "https://www.igalia.com/images/igalia-logo.svg",
        description: "Specialized training and mentorship in core browser technologies (Chromium, WebKit).",
        status: "Active",
        difficulty: "Advanced",
        timeline: "Rolling",
        stipend: "Varies",
        contributors: 50,
        issues: 20,
        organizations: 1,
        contributions: ["Browsers", "Compiler Engineering"],
        issues_list: ["WebKit layout fixes", "W3C spec compliance"]
    },
    {
        id: 21,
        name: "FOSSASIA Codeheat",
        url: "https://codeheat.org/",
        image: "https://fossasia.org/assets/img/logo.png",
        description: "A two-month coding contest for FOSSASIA projects, offering prizes and mentorship.",
        status: "Upcoming",
        difficulty: "Beginner",
        timeline: "Oct - Dec",
        stipend: "Prizes & Rewards",
        contributors: 2000,
        issues: 400,
        organizations: 1,
        contributions: ["Web App", "UI/UX", "Bug fixes"],
        issues_list: ["Redesign dashboard", "Fix API response errors"]
    }
        ];
        renderPrograms();
    });

// Render Programs
function renderPrograms(filteredPrograms = programs) {
    const container = document.getElementById('programsContainer');
    
    if (filteredPrograms.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No programs found</h3>
                <p>Try adjusting your filters to see available programs</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredPrograms.map(program => `
    <div class="program-card" onclick="openModal(${program.id})">
        <div class="program-info">
            <div class="program-header">
                <h3>${program.name}</h3>
                <span class="program-status status-${program.status.toLowerCase()}">${program.status}</span>
            </div>
            
            <p class="program-description">${program.description}</p>
            
            <div class="program-details">
                <div class="detail-item">
                    <span class="detail-label">Timeline</span>
                    <span class="detail-value">${program.timeline}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Stipend/Reward</span>
                    <span class="detail-value">${program.stipend}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Contributors</span>
                    <span class="detail-value">${program.contributors.toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Open Issues</span>
                    <span class="detail-value">${program.issues}</span>
                </div>
            </div>

            <div class="program-badges">
                <span class="badge difficulty-${program.difficulty.toLowerCase()}">${program.difficulty}</span>
                <span class="badge">${program.organizations} Organizations</span>
            </div>

            <div class="program-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); openModal(${program.id})">View Details</button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); viewIssues(${program.id})">View Issues</button>
            </div>
        </div>

        <div class="program-logo">
            <img src="${program.image}" alt="${program.name} logo" onerror="this.src='../library/assets/logo.png'">
        </div>
    </div>
`).join('');
}

// Open Modal
function openModal(programId) {
    const program = programs.find(p => p.id === programId);
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-logo">
            <img src="${program.image}" alt="${program.name} logo" onerror="this.src='../library/assets/logo.png'">
        </div>
        <h2>${program.name}</h2>
        <p style="color: #666; margin-bottom: 16px;">${program.description}</p>
        
        <div class="modal-section">
            <h3>Quick Info</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                <div>
                    <strong>Status:</strong> <span style="color: var(--secondary-blue);">${program.status}</span>
                </div>
                <div>
                    <strong>Difficulty:</strong> <span style="color: var(--secondary-blue);">${program.difficulty}</span>
                </div>
                <div>
                    <strong>Timeline:</strong> <span style="color: var(--secondary-blue);">${program.timeline}</span>
                </div>
                <div>
                    <strong>Stipend:</strong> <span style="color: var(--secondary-blue);">${program.stipend}</span>
                </div>
                <div>
                    <strong>Total Contributors:</strong> <span style="color: var(--secondary-blue);">${program.contributors.toLocaleString()}</span>
                </div>
                <div>
                    <strong>Open Issues:</strong> <span style="color: var(--secondary-blue);">${program.issues}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3>Types of Contributions</h3>
            <ul class="contributions-list">
                ${program.contributions.map(c => `<li>✓ ${c}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Popular Issues to Work On</h3>
            <ul class="issues-list">
                ${program.issues_list.map(i => `<li>🐛 ${i}</li>`).join('')}
            </ul>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button class="btn btn-primary" onclick="alert('Redirecting to official website...')">Visit Official Website</button>
            <button class="btn btn-secondary" onclick="alert('Redirecting to GitHub projects...')">Browse GitHub Projects</button>
        </div>
    `;

    document.getElementById('programModal').style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('programModal').style.display = 'none';
}

// View Issues
function viewIssues(programId) {
    const program = programs.find(p => p.id === programId);
    alert(`Found ${program.issues} open issues in ${program.name}\n\nTop issues:\n${program.issues_list.slice(0, 3).map(i => '• ' + i).join('\n')}\n\nView more on GitHub!`);
}

// Filter Programs
function filterPrograms() {
    const difficulty = document.getElementById('difficultyFilter').value;
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchBox').value.toLowerCase();

    const filtered = programs.filter(program => {
        const matchesDifficulty = !difficulty || program.difficulty === difficulty;
        const matchesStatus = !status || program.status === status;
        const matchesSearch = !search || program.name.toLowerCase().includes(search) || program.description.toLowerCase().includes(search);
        
        return matchesDifficulty && matchesStatus && matchesSearch;
    });

    renderPrograms(filtered);
}

// Event Listeners
document.getElementById('difficultyFilter').addEventListener('change', filterPrograms);
document.getElementById('statusFilter').addEventListener('change', filterPrograms);
document.getElementById('searchBox').addEventListener('input', filterPrograms);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('programModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Subscription Form Handling
const subscribeForm = document.getElementById('subscribeForm');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('subscriberEmail');
        const messageDisplay = document.getElementById('subscriptionMessage');
        const email = emailInput.value.trim();
        
        // Client-side Email Validation Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            // Mock Integration: Log the data to the console
            console.log(`New Subscription Request: ${email}`);
            
            // Update UI with success message
            messageDisplay.textContent = "Thank you for subscribing! You'll be notified of upcoming deadlines.";
            messageDisplay.className = "subscription-message message-success";
            
            // Reset the form
            emailInput.value = '';
            
            // Clear message after 5 seconds
            setTimeout(() => {
                messageDisplay.textContent = "";
            }, 5000);
        } else {
            // Error handling for invalid email format
            messageDisplay.textContent = "Please enter a valid email address.";
            messageDisplay.className = "subscription-message message-error";
        }
    });
}