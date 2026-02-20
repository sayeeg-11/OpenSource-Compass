const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function () {
    loadDashboard();
});

async function loadDashboard() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html'; // Assume we are in /pages/
        return;
    }

    // Update Basic UI immediately from localStorage
    document.getElementById('userName').textContent = user.name;
    document.getElementById('welcomeName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();

    try {
        // Fetch fresh profile data to get latest progress from DB
        const response = await fetch(`${API_URL}/auth/me`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            renderProgress(data.user);
            // Sync local storage with fresh data
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        } else {
            // Session might have expired on server
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
        // If offline or error, try to render with what we have
        renderProgress(user);
    }
}

function renderProgress(user) {
    const completedGuides = user.completedGuides || [];
    const completedCount = completedGuides.length;

    // Total guides available in current system
    const totalGuides = 5;
    const percentage = Math.round((completedCount / totalGuides) * 100);

    // Update Dashboard Stats Card
    const compEl = document.getElementById('completedCount');
    if (compEl) compEl.textContent = completedCount;

    const pendEl = document.getElementById('pendingCount');
    if (pendEl) pendEl.textContent = Math.max(0, totalGuides - completedCount);

    const prgText = document.getElementById('progressText');
    if (prgText) prgText.textContent = `${percentage}%`;

    const fillEl = document.getElementById('overallProgressFill');
    if (fillEl) fillEl.style.width = `${percentage}%`;

    // Update Rank
    let rank = 'Novice';
    if (completedCount >= 2) rank = 'Learner';
    if (completedCount >= 4) rank = 'Contributor';
    if (completedCount >= 5) rank = 'Master';

    const rankEl = document.getElementById('rankLabel');
    if (rankEl) rankEl.textContent = rank;

    // Render Guide List with dynamic content
    const listContainer = document.getElementById('progressList');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    const allGuides = [
        { id: 'git-01', name: 'Introduction to Git', icon: 'fab fa-git-alt' },
        { id: 'oss-01', name: 'Open Source Ethics', icon: 'fas fa-shield-alt' },
        { id: 'gh-01', name: 'First PR on GitHub', icon: 'fas fa-code-branch' },
        { id: 'comm-01', name: 'Community Guidelines', icon: 'fas fa-users' },
        { id: 'adv-01', name: 'Advanced Workflows', icon: 'fas fa-microchip' }
    ];

    allGuides.forEach(guide => {
        const isCompleted = completedGuides.some(g => g.guideId === guide.id);
        const item = document.createElement('div');
        item.className = 'guide-item';
        item.innerHTML = `
            <div class="guide-info">
                <div class="guide-icon"><i class="${guide.icon}"></i></div>
                <div>
                    <h4 style="margin:0; color: var(--text-high);">${guide.name}</h4>
                    <span style="font-size:0.8rem; color:var(--text-mid)">Module ID: ${guide.id}</span>
                </div>
            </div>
            <span class="status-badge ${isCompleted ? 'completed' : 'pending'}" style="white-space: nowrap;">
                ${isCompleted ? '<i class="fas fa-check"></i> Finished' : 'Pending'}
            </span>
        `;
        listContainer.appendChild(item);
    });
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Attach logout to sidebar button
const dashLogout = document.getElementById('dashboardLogout');
if (dashLogout) {
    dashLogout.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            localStorage.removeItem('currentUser');
            // Go to home page (../../index.html)
            window.location.href = '../../index.html';
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('currentUser');
            window.location.href = '../../index.html';
        }
    });
}
