document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const resultsContainer = document.getElementById('recommendation-results');
    const loading = document.getElementById('loading');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const skills = document.getElementById('skills').value;
            const difficulty = document.getElementById('difficulty').value;
            const programs = document.getElementById('programs-input').value;

            loading.style.display = 'block';
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';

            try {
                // Adjust URL based on environment (assuming localhost for now)
                const apiUrl = `http://localhost:5000/api/projects/recommend?skills=${encodeURIComponent(skills)}&difficulty=${encodeURIComponent(difficulty)}&programs=${encodeURIComponent(programs)}`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch recommendations');

                const projects = await response.json();

                loading.style.display = 'none';
                resultsContainer.style.display = 'grid';

                if (projects.length === 0) {
                    resultsContainer.innerHTML = '<p style="grid-column: 1/-1;">No matching projects found. Try adjusting your filters.</p>';
                    return;
                }

                projects.forEach(project => {
                    const card = document.createElement('div');
                    card.className = 'project-result-card fade-in visible';

                    const programName = project.programId ? project.programId.name : 'Independent';
                    const stars = project.stars ? `<span class="stat-pill"><i class="fas fa-star"></i> ${(project.stars / 1000).toFixed(1)}k</span>` : '';
                    const languages = project.languages.length > 0 ? project.languages.slice(0, 3).join(', ') : 'N/A';

                    card.innerHTML = `
                        <div class="result-header">
                            <h4>
                                <a href="${project.repositoryUrl}" target="_blank">${project.name}</a>
                                <i class="fas fa-external-link-alt"></i>
                            </h4>
                            ${stars}
                        </div>
                        
                        <p class="result-desc">${project.description ? project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '') : 'No description available.'}</p>
                        
                        <div class="result-tags">
                            <span class="tag difficulty-${project.difficulty.toLowerCase()}">${project.difficulty}</span>
                            ${programName !== 'Independent' ? `<span class="tag program-tag">${programName}</span>` : ''}
                        </div>
                        
                        <div class="result-meta">
                             <div class="meta-item"><i class="fas fa-code"></i> ${languages}</div>
                             <div class="meta-item match-score"><i class="fas fa-bullseye"></i> ${project.score}% Match</div>
                        </div>
                    `;
                    resultsContainer.appendChild(card);
                });

            } catch (error) {
                console.error(error);
                loading.style.display = 'none';
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = `<p style="color: #ef4444;">Error: ${error.message}. Make sure the backend server (port 5000) is running.</p>`;
            }
        });
    }
});
