// Load programs data
let programs = [];

// Fetch programs data from JSON file
fetch('programs.json')
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
                image: "../assets/program_logo/gsoc.webp",
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
                image: "../assets/program_logo/ggsoc.png",
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
                image: "../assets/program_logo/hacktober.webp",
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
                image: "../assets/program_logo/mlh.webp",
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
                image: "../assets/program_logo/outreachy.webp",
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
                image: "../assets/program_logo/ssoc.webp",
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
            <img src="${program.image}" alt="${program.name} logo" onerror="this.src='../assets/program_logo/placeholder.png'">
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
            <img src="${program.image}" alt="${program.name} logo" onerror="this.src='../assets/program_logo/placeholder.png'">
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