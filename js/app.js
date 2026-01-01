document.addEventListener('DOMContentLoaded', () => {
    // Only run dashboard logic if the dashboard container exists
    const dashboardContainer = document.getElementById('programs-dashboard');
    if (dashboardContainer) {
        initDashboard();
    }
});

let allPrograms = [];

async function initDashboard() {
    try {
        const response = await fetch('../data/programs.json');
        const data = await response.json();
        allPrograms = data.programs;
        renderPrograms(allPrograms);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading programs:', error);
        document.getElementById('programs-grid').innerHTML = '<p>Failed to load programs. Please try again later.</p>';
    }
}

function renderPrograms(programs) {
    const grid = document.getElementById('programs-grid');
    grid.innerHTML = '';

    if (programs.length === 0) {
        grid.innerHTML = '<p class="no-results">No programs found matching your criteria.</p>';
        return;
    }

    programs.forEach(program => {
        const card = document.createElement('div');
        card.className = 'program-card';
        // Add difficulty attribute for styling hooks if needed
        card.dataset.difficulty = program.difficulty;

        // Generate Tags HTML
        const tagsHtml = program.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Badge Color Logic
        let badgeClass = 'badge-secondary';
        if (program.status === 'Open') badgeClass = 'badge-success';
        if (program.status === 'Closed') badgeClass = 'badge-danger';
        if (program.status === 'Upcoming') badgeClass = 'badge-warning';

        card.innerHTML = `
            <div class="card-header">
                <h3>${program.name}</h3>
                <span class="status-badge ${badgeClass}">${program.status}</span>
            </div>
            <div class="card-meta">
                <span class="meta-item"><i class="difficulty-icon"></i> ${program.difficulty}</span>
                <span class="meta-item"><i class="season-icon"></i> ${program.season}</span>
            </div>
            <p class="program-desc">${program.description}</p>
            <div class="tags-container">
                ${tagsHtml}
            </div>
            <div class="card-actions">
                <a href="${program.official_link}" target="_blank" class="btn-outline">Official Site</a>
                ${program.link !== '#' ? `<a href="${program.link}" class="btn-primary-sm">Details</a>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const statusFilter = document.getElementById('status-filter');

    function filterPrograms() {
        const query = searchInput.value.toLowerCase();
        const difficulty = difficultyFilter.value;
        const status = statusFilter.value;

        const filtered = allPrograms.filter(program => {
            const matchesSearch = program.name.toLowerCase().includes(query) ||
                program.description.toLowerCase().includes(query);
            const matchesDifficulty = difficulty === 'all' || program.difficulty === difficulty;
            const matchesStatus = status === 'all' || program.status === status;

            return matchesSearch && matchesDifficulty && matchesStatus;
        });

        renderPrograms(filtered);
    }

    searchInput.addEventListener('input', filterPrograms);
    difficultyFilter.addEventListener('change', filterPrograms);
    statusFilter.addEventListener('change', filterPrograms);
}
