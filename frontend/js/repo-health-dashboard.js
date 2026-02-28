/**
 * Repo Health Dashboard - Frontend Logic
 * Fetches repo metrics from GitHub API directly (no backend needed)
 * and displays a beautiful health dashboard alongside issue insights.
 */

(function () {
    'use strict';

    // Language colors map (GitHub-style)
    const LANG_COLORS = {
        'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5',
        'Java': '#b07219', 'C++': '#f34b7d', 'C': '#555555', 'C#': '#178600',
        'Go': '#00ADD8', 'Rust': '#dea584', 'Ruby': '#701516', 'PHP': '#4F5D95',
        'Swift': '#F05138', 'Kotlin': '#A97BFF', 'Dart': '#00B4AB',
        'HTML': '#e34c26', 'CSS': '#563d7c', 'SCSS': '#c6538c',
        'Shell': '#89e051', 'PowerShell': '#012456', 'Dockerfile': '#384d54',
        'Vue': '#41b883', 'Svelte': '#ff3e00', 'Lua': '#000080',
        'Haskell': '#5e5086', 'Scala': '#c22d40', 'Elixir': '#6e4a7e',
        'Jupyter Notebook': '#DA5B0B', 'R': '#198CE7', 'Makefile': '#427819',
        'Other': '#94a3b8'
    };

    /**
     * Parse owner/repo from a GitHub URL
     */
    function parseRepoFromUrl(url) {
        // Match issue/PR URLs or plain repo URLs
        const issueMatch = url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (issueMatch) {
            return { owner: issueMatch[1], repo: issueMatch[2].replace(/\.git$/, '') };
        }
        return null;
    }

    /**
     * Format large numbers (e.g., 12345 → 12.3k)
     */
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    }

    /**
     * Format bytes to human readable
     */
    function formatBytes(kb) {
        if (kb >= 1024 * 1024) return (kb / (1024 * 1024)).toFixed(1) + ' GB';
        if (kb >= 1024) return (kb / 1024).toFixed(1) + ' MB';
        return kb + ' KB';
    }

    /**
     * Calculate days since a date
     */
    function daysSince(dateStr) {
        const then = new Date(dateStr);
        const now = new Date();
        return Math.floor((now - then) / (1000 * 60 * 60 * 24));
    }

    /**
     * Get a time-ago string
     */
    function timeAgo(dateStr) {
        const days = daysSince(dateStr);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return days + ' days ago';
        if (days < 30) return Math.floor(days / 7) + ' weeks ago';
        if (days < 365) return Math.floor(days / 30) + ' months ago';
        return Math.floor(days / 365) + ' years ago';
    }

    /**
     * Calculate repo health score (0-100)
     */
    function calculateHealthScore(repoData, contributors) {
        let score = 0;
        const breakdown = {};

        // 1. Documentation (20 points)
        let docScore = 0;
        if (repoData.description) docScore += 6;
        if (repoData.has_wiki) docScore += 4;
        if (repoData.homepage) docScore += 4;
        if (repoData.license) docScore += 6;
        breakdown.documentation = docScore;
        score += docScore;

        // 2. Community (25 points)
        let communityScore = 0;
        const stars = repoData.stargazers_count || 0;
        if (stars >= 1000) communityScore += 10;
        else if (stars >= 100) communityScore += 7;
        else if (stars >= 10) communityScore += 4;
        else if (stars > 0) communityScore += 2;

        const forks = repoData.forks_count || 0;
        if (forks >= 100) communityScore += 8;
        else if (forks >= 20) communityScore += 5;
        else if (forks >= 5) communityScore += 3;
        else if (forks > 0) communityScore += 1;

        const contribCount = contributors || 0;
        if (contribCount >= 20) communityScore += 7;
        else if (contribCount >= 5) communityScore += 5;
        else if (contribCount >= 2) communityScore += 3;
        else communityScore += 1;
        breakdown.community = communityScore;
        score += communityScore;

        // 3. Activity (30 points)
        let activityScore = 0;
        const pushedDaysAgo = daysSince(repoData.pushed_at);
        if (pushedDaysAgo <= 7) activityScore += 15;
        else if (pushedDaysAgo <= 30) activityScore += 10;
        else if (pushedDaysAgo <= 90) activityScore += 6;
        else if (pushedDaysAgo <= 365) activityScore += 3;

        const openIssues = repoData.open_issues_count || 0;
        // Low open issues relative to stars = well maintained
        const issueRatio = stars > 0 ? openIssues / stars : openIssues;
        if (issueRatio < 0.05) activityScore += 15;
        else if (issueRatio < 0.15) activityScore += 10;
        else if (issueRatio < 0.3) activityScore += 6;
        else activityScore += 2;
        breakdown.activity = activityScore;
        score += activityScore;

        // 4. Code Quality Signals (25 points)
        let codeScore = 0;
        if (!repoData.archived) codeScore += 5; else codeScore += 0;
        if (!repoData.disabled) codeScore += 5;
        if (repoData.has_projects) codeScore += 3;
        if (repoData.has_issues) codeScore += 3;
        if ((repoData.topics || []).length > 0) codeScore += 4;
        const sizeKb = repoData.size || 0;
        if (sizeKb > 0 && sizeKb < 500000) codeScore += 5;
        else if (sizeKb > 0) codeScore += 3;
        breakdown.codeQuality = codeScore;
        score += codeScore;

        return { score: Math.min(score, 100), breakdown };
    }

    /**
     * Get grade label from score
     */
    function getGrade(score) {
        if (score >= 80) return { label: 'Excellent', class: 'excellent', icon: 'fa-shield-alt' };
        if (score >= 60) return { label: 'Good', class: 'good', icon: 'fa-thumbs-up' };
        if (score >= 40) return { label: 'Fair', class: 'fair', icon: 'fa-exclamation-circle' };
        return { label: 'Needs Work', class: 'poor', icon: 'fa-tools' };
    }

    /**
     * Build the dashboard HTML
     */
    function buildDashboardHTML(repoData, languages, contributorCount, healthResult) {
        const grade = getGrade(healthResult.score);
        const offset = 314 - (314 * healthResult.score / 100);

        // Format language data
        let langHTML = '';
        if (languages && Object.keys(languages).length > 0) {
            const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
            const langEntries = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8);

            const segmentsHTML = langEntries.map(([lang, bytes]) => {
                const pct = ((bytes / totalBytes) * 100).toFixed(1);
                const color = LANG_COLORS[lang] || LANG_COLORS['Other'];
                return `<div class="health-lang-segment" style="width: ${pct}%; background: ${color};" title="${lang}: ${pct}%"></div>`;
            }).join('');

            const legendHTML = langEntries.map(([lang, bytes]) => {
                const pct = ((bytes / totalBytes) * 100).toFixed(1);
                const color = LANG_COLORS[lang] || LANG_COLORS['Other'];
                return `<div class="health-lang-item">
                    <span class="health-lang-dot" style="background: ${color};"></span>
                    <span>${lang}</span>
                    <span class="health-lang-percent">${pct}%</span>
                </div>`;
            }).join('');

            langHTML = `
                <div class="health-languages-section">
                    <div class="health-languages-title">
                        <i class="fas fa-code"></i>
                        <span>Language Distribution</span>
                    </div>
                    <div class="health-lang-bar-container">${segmentsHTML}</div>
                    <div class="health-lang-legend">${legendHTML}</div>
                </div>`;
        }

        // Topics
        let topicsHTML = '';
        if (repoData.topics && repoData.topics.length > 0) {
            const tags = repoData.topics.map(t =>
                `<span class="health-topic-tag">${t}</span>`
            ).join('');
            topicsHTML = `
                <div class="health-topics-section">
                    <div class="health-topics-title">
                        <i class="fas fa-tags"></i>
                        <span>Topics</span>
                    </div>
                    <div class="health-topics-list">${tags}</div>
                </div>`;
        }

        // Breakdown bars
        const bd = healthResult.breakdown;
        function barClass(val, max) {
            const pct = (val / max) * 100;
            if (pct >= 80) return 'excellent';
            if (pct >= 60) return 'good';
            if (pct >= 40) return 'fair';
            return 'poor';
        }

        return `
        <div class="health-dashboard-header">
            <div class="health-dashboard-title">
                <i class="fas fa-heartbeat"></i>
                <h3>Repository Health Dashboard</h3>
            </div>
            <a href="${repoData.html_url}" target="_blank" rel="noopener" class="health-dashboard-repo-link">
                <i class="fab fa-github"></i>
                ${repoData.full_name}
                <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i>
            </a>
        </div>

        <!-- Health Score Ring -->
        <div class="health-score-section">
            <div class="health-score-ring">
                <svg viewBox="0 0 120 120">
                    <circle class="ring-bg" cx="60" cy="60" r="50" />
                    <circle class="ring-progress ${grade.class}" cx="60" cy="60" r="50"
                        style="stroke-dashoffset: ${offset};" />
                </svg>
                <div class="health-score-value">
                    <span class="health-score-number">${healthResult.score}</span>
                    <span class="health-score-label">Score</span>
                </div>
            </div>
            <div class="health-score-details">
                <div class="health-score-grade ${grade.class}">
                    <i class="fas ${grade.icon}"></i>
                    ${grade.label}
                </div>
                <p class="health-score-summary">
                    <strong>${repoData.full_name}</strong> has ${grade.label.toLowerCase()} repository health.
                    ${repoData.description ? repoData.description : 'No description provided.'} 
                    ${repoData.archived ? '<br><em style="color: #f59e0b;">⚠ This repository is archived.</em>' : ''}
                </p>
            </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="health-metrics-grid">
            <div class="health-metric-card stars">
                <div class="health-metric-icon"><i class="fas fa-star"></i></div>
                <div class="health-metric-value">${formatNumber(repoData.stargazers_count)}</div>
                <div class="health-metric-name">Stars</div>
            </div>
            <div class="health-metric-card forks">
                <div class="health-metric-icon"><i class="fas fa-code-branch"></i></div>
                <div class="health-metric-value">${formatNumber(repoData.forks_count)}</div>
                <div class="health-metric-name">Forks</div>
            </div>
            <div class="health-metric-card issues">
                <div class="health-metric-icon"><i class="fas fa-exclamation-circle"></i></div>
                <div class="health-metric-value">${formatNumber(repoData.open_issues_count)}</div>
                <div class="health-metric-name">Open Issues</div>
            </div>
            <div class="health-metric-card watchers">
                <div class="health-metric-icon"><i class="fas fa-eye"></i></div>
                <div class="health-metric-value">${formatNumber(repoData.subscribers_count || repoData.watchers_count)}</div>
                <div class="health-metric-name">Watchers</div>
            </div>
            <div class="health-metric-card license">
                <div class="health-metric-icon"><i class="fas fa-balance-scale"></i></div>
                <div class="health-metric-value" style="font-size: ${repoData.license ? '1rem' : '1.6rem'};">${repoData.license ? repoData.license.spdx_id : '—'}</div>
                <div class="health-metric-name">License</div>
            </div>
            <div class="health-metric-card size">
                <div class="health-metric-icon"><i class="fas fa-database"></i></div>
                <div class="health-metric-value" style="font-size: 1.1rem;">${formatBytes(repoData.size)}</div>
                <div class="health-metric-name">Repo Size</div>
            </div>
        </div>

        <!-- Activity & Community Details -->
        <div class="health-detail-sections">
            <div class="health-detail-card">
                <div class="health-detail-card-title">
                    <i class="fas fa-bolt"></i>
                    <span>Activity</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-clock"></i> Created</span>
                    <span class="health-detail-value">${timeAgo(repoData.created_at)}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-edit"></i> Last Updated</span>
                    <span class="health-detail-value">${timeAgo(repoData.updated_at)}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-upload"></i> Last Push</span>
                    <span class="health-detail-value">${timeAgo(repoData.pushed_at)}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-code-branch"></i> Default Branch</span>
                    <span class="health-detail-value">${repoData.default_branch}</span>
                </div>
            </div>
            <div class="health-detail-card">
                <div class="health-detail-card-title">
                    <i class="fas fa-users"></i>
                    <span>Community</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-user-friends"></i> Contributors</span>
                    <span class="health-detail-value">${contributorCount > 0 ? contributorCount : '—'}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-network-wired"></i> Network Count</span>
                    <span class="health-detail-value">${formatNumber(repoData.network_count || repoData.forks_count)}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-globe"></i> Homepage</span>
                    <span class="health-detail-value">${repoData.homepage ? '<a href="' + repoData.homepage + '" target="_blank" style="color: #d4af37; text-decoration: none;">Visit ↗</a>' : '—'}</span>
                </div>
                <div class="health-detail-row">
                    <span class="health-detail-label"><i class="fas fa-book"></i> Wiki</span>
                    <span class="health-detail-value">${repoData.has_wiki ? '✅ Enabled' : '❌ None'}</span>
                </div>
            </div>
        </div>

        <!-- Health Breakdown -->
        <div class="health-breakdown">
            <div class="health-breakdown-title">
                <i class="fas fa-chart-bar"></i>
                <span>Health Breakdown</span>
            </div>
            <div class="health-bar-item">
                <div class="health-bar-header">
                    <span class="health-bar-label">📋 Documentation</span>
                    <span class="health-bar-value">${bd.documentation}/20</span>
                </div>
                <div class="health-bar-track">
                    <div class="health-bar-fill ${barClass(bd.documentation, 20)}" data-width="${(bd.documentation / 20) * 100}%"></div>
                </div>
            </div>
            <div class="health-bar-item">
                <div class="health-bar-header">
                    <span class="health-bar-label">👥 Community</span>
                    <span class="health-bar-value">${bd.community}/25</span>
                </div>
                <div class="health-bar-track">
                    <div class="health-bar-fill ${barClass(bd.community, 25)}" data-width="${(bd.community / 25) * 100}%"></div>
                </div>
            </div>
            <div class="health-bar-item">
                <div class="health-bar-header">
                    <span class="health-bar-label">⚡ Activity</span>
                    <span class="health-bar-value">${bd.activity}/30</span>
                </div>
                <div class="health-bar-track">
                    <div class="health-bar-fill ${barClass(bd.activity, 30)}" data-width="${(bd.activity / 30) * 100}%"></div>
                </div>
            </div>
            <div class="health-bar-item">
                <div class="health-bar-header">
                    <span class="health-bar-label">🔧 Code Quality Signals</span>
                    <span class="health-bar-value">${bd.codeQuality}/25</span>
                </div>
                <div class="health-bar-track">
                    <div class="health-bar-fill ${barClass(bd.codeQuality, 25)}" data-width="${(bd.codeQuality / 25) * 100}%"></div>
                </div>
            </div>
        </div>

        ${langHTML}
        ${topicsHTML}
        `;
    }

    /**
     * Animate health bars after render
     */
    function animateHealthBars() {
        setTimeout(() => {
            document.querySelectorAll('.health-bar-fill[data-width]').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 200);
    }

    /**
     * Show loading state
     */
    function showLoading(container) {
        container.innerHTML = `
            <div class="health-dashboard-loading">
                <div class="health-loading-spinner"></div>
                <span class="health-loading-text">Analyzing repository health...</span>
            </div>`;
        container.classList.add('active');
    }

    /**
     * Show error state
     */
    function showError(container, message) {
        container.innerHTML = `
            <div class="health-dashboard-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>`;
        container.classList.add('active');
    }

    /**
     * Fetch all repo health data from GitHub API
     */
    async function fetchRepoHealth(owner, repo) {
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'OpenSource-Compass-App'
        };

        // Parallel fetch for speed
        const [repoRes, langRes, contribRes] = await Promise.allSettled([
            fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
            fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
            fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`, { headers })
        ]);

        // Repo data is required
        if (repoRes.status !== 'fulfilled' || !repoRes.value.ok) {
            const errorData = repoRes.status === 'fulfilled' ? await repoRes.value.json() : {};
            throw new Error(errorData.message || 'Failed to fetch repository data.');
        }

        const repoData = await repoRes.value.json();

        // Languages (optional)
        let languages = {};
        if (langRes.status === 'fulfilled' && langRes.value.ok) {
            languages = await langRes.value.json();
        }

        // Contributors count from Link header
        let contributorCount = 0;
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
            const linkHeader = contribRes.value.headers.get('Link');
            if (linkHeader) {
                const lastMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                contributorCount = lastMatch ? parseInt(lastMatch[1]) : 1;
            } else {
                const contribData = await contribRes.value.json();
                contributorCount = Array.isArray(contribData) ? contribData.length : 0;
            }
        }

        return { repoData, languages, contributorCount };
    }

    /**
     * Main: Initialize the dashboard functionality
     */
    function init() {
        const dashboardContainer = document.getElementById('repoHealthDashboard');
        if (!dashboardContainer) return;

        // Listen for the issue insights form submission
        const issueForm = document.getElementById('issueInsightsForm');
        if (!issueForm) return;

        // Hook into the form submit to also trigger health dashboard
        issueForm.addEventListener('submit', async (e) => {
            // The issue-insights.js handles the AI analysis;
            // We just handle the health dashboard part here.
            const issueUrl = document.getElementById('issueUrl').value.trim();
            if (!issueUrl) return;

            const parsed = parseRepoFromUrl(issueUrl);
            if (!parsed) {
                showError(dashboardContainer, 'Could not parse repository info from the URL.');
                return;
            }

            showLoading(dashboardContainer);

            try {
                const { repoData, languages, contributorCount } = await fetchRepoHealth(parsed.owner, parsed.repo);
                const healthResult = calculateHealthScore(repoData, contributorCount);

                dashboardContainer.innerHTML = buildDashboardHTML(repoData, languages, contributorCount, healthResult);
                dashboardContainer.classList.add('active');

                animateHealthBars();

                // Smooth scroll to dashboard after a short delay (let AI result render first)
                setTimeout(() => {
                    dashboardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 600);

            } catch (err) {
                console.error('Repo Health Error:', err);
                showError(dashboardContainer, 'Failed to fetch repo health: ' + err.message);
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
