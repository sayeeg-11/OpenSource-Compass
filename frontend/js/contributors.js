// ======================================================
// 🔮 GitHub Contributors Logic – OpenSource-Compass
// ======================================================

// ---------------- CONFIG ----------------
const REPO_OWNER = 'sayeeg-11';
const REPO_NAME = 'OpenSource-Compass';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

// ---------------- SCORING SYSTEM ----------------
// Priority: Hard > Medium > Easy > Level > Default
const POINTS = {
  HARD: 40,
  MEDIUM: 30,
  EASY: 20,
  L3: 11,
  L2: 5,
  L1: 2,
  DEFAULT: 1
};

// ---------------- STATE ----------------
let contributorsData = [];
let currentPage = 1;
const itemsPerPage = 8;

// ======================================================
// 🚀 INIT
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupModalEvents();
});

// ======================================================
// 🌐 MASTER DATA LOADER
// ======================================================
async function initData() {
  try {
    const [repoRes, contributorsRes, pulls] = await Promise.all([
      fetch(API_BASE),
      fetch(`${API_BASE}/contributors?per_page=100`),
      fetchAllPulls()
    ]);

    if (repoRes.status === 403 || contributorsRes.status === 403) {
      throw new Error('Rate Limit');
    }
    if (!repoRes.ok || !contributorsRes.ok) {
      throw new Error('Repo Error');
    }

    const repoData = await repoRes.json();
    const rawContributors = await contributorsRes.json();
    const totalCommits = await fetchTotalCommits();

    processData(repoData, rawContributors, pulls, totalCommits);
    fetchRecentActivity();

  } catch (err) {
    console.warn('⚠️ GitHub API failed → Using mock data', err);
    loadMockData();
  }
}

// ======================================================
// 📦 FETCH HELPERS
// ======================================================
async function fetchAllPulls() {
  let all = [];
  for (let page = 1; page <= 4; page++) {
    try {
      const res = await fetch(`${API_BASE}/pulls?state=all&per_page=100&page=${page}`);
      if (!res.ok) break;
      const data = await res.json();
      if (!data.length) break;
      all.push(...data);
    } catch {
      break;
    }
  }
  return all;
}

async function fetchTotalCommits() {
  try {
    const res = await fetch(`${API_BASE}/commits?per_page=1`);
    const link = res.headers.get('Link');
    if (!link) return 1;
    const match = link.match(/page=(\d+)>; rel="last"/);
    return match ? Number(match[1]) : 1;
  } catch {
    return 'N/A';
  }
}

// ======================================================
// 🧠 PROCESS CONTRIBUTORS + PRs
// ======================================================
function processData(repoData, contributors, pulls, totalCommits) {
  const statsMap = {};
  let totalPRs = 0;
  let totalPoints = 0;

  pulls.forEach(pr => {
    if (!pr.merged_at || !pr.user) return;

    const login = pr.user.login;
    if (!statsMap[login]) {
      statsMap[login] = { prs: 0, points: 0 };
    }

    statsMap[login].prs++;
    totalPRs++;

    const labels = (pr.labels || []).map(l => l.name.toLowerCase());
    let pts = POINTS.DEFAULT;

    // 🔥 Difficulty-based labels (highest priority)
    if (labels.some(l => l.includes('hard'))) {
      pts = POINTS.HARD;
    } else if (labels.some(l => l.includes('medium'))) {
      pts = POINTS.MEDIUM;
    } else if (labels.some(l => l.includes('easy'))) {
      pts = POINTS.EASY;

    // 🧱 Legacy system fallback
    } else if (labels.some(l => l.includes('level 3'))) {
      pts = POINTS.L3;
    } else if (labels.some(l => l.includes('level 2'))) {
      pts = POINTS.L2;
    } else if (labels.some(l => l.includes('level 1'))) {
      pts = POINTS.L1;
    }

    statsMap[login].points += pts;
    totalPoints += pts;
  });

  contributorsData = contributors
    .filter(c => c.login.toLowerCase() !== REPO_OWNER.toLowerCase())
    .map(c => ({
      ...c,
      prs: statsMap[c.login]?.prs || 0,
      points: statsMap[c.login]?.points || 0
    }))
    .filter(c => c.prs > 0)
    .sort((a, b) => b.points - a.points);

  updateGlobalStats(
    contributorsData.length,
    totalPRs,
    totalPoints,
    repoData.stargazers_count,
    repoData.forks_count,
    totalCommits
  );

  renderContributors(1);
}

// ======================================================
// 📊 GLOBAL STATS
// ======================================================
function updateGlobalStats(count, prs, points, stars, forks, commits) {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('total-contributors', count);
  set('total-prs', prs);
  set('total-points', points);
  set('github-stars', stars || 0);
  set('forks', forks || 0);
  set('total-commits', commits || 'N/A');
}

// ======================================================
// 🏆 LEAGUE SYSTEM
// ======================================================
function getLeague(points) {
  if (points >= 150) return { label: 'Gold League 🏆', class: 'tier-gold', badge: 'badge-gold' };
  if (points >= 75) return { label: 'Silver League 🥈', class: 'tier-silver', badge: 'badge-silver' };
  if (points >= 30) return { label: 'Bronze League 🥉', class: 'tier-bronze', badge: 'badge-bronze' };
  return { label: 'Contributor 🎖️', class: 'tier-contributor', badge: 'badge-contributor' };
}

// ======================================================
// 🖼️ RENDER CONTRIBUTORS
// ======================================================
function renderContributors(page) {
  const grid = document.getElementById('contributors-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const slice = contributorsData.slice(start, start + itemsPerPage);

  if (!slice.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#888;">
      No contributors yet. Be the first!
    </p>`;
    return;
  }

  slice.forEach((c, i) => {
    const rank = start + i + 1;
    const league = getLeague(c.points);

    const card = document.createElement('div');
    card.className = `contributor-card ${league.class}`;
    card.innerHTML = `
      <img src="${c.avatar_url}&s=160" alt="${c.login}">
      <span class="cont-name">${c.login}</span>
      <span class="cont-commits-badge ${league.badge}">
        PRs: ${c.prs} | Pts: ${c.points}
      </span>
    `;

    card.addEventListener('click', () => openModal(c, league, rank));
    grid.appendChild(card);
  });

  renderPagination(page);
}

// ======================================================
// 📑 PAGINATION
// ======================================================
function renderPagination(page) {
  const total = Math.ceil(contributorsData.length / itemsPerPage);
  const el = document.getElementById('pagination-controls');
  if (!el || total <= 1) {
    if (el) el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <button class="pagination-btn" ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})">
      <i class="fas fa-chevron-left"></i> Prev
    </button>
    <span class="page-info">Page ${page} of ${total}</span>
    <button class="pagination-btn" ${page === total ? 'disabled' : ''} onclick="changePage(${page + 1})">
      Next <i class="fas fa-chevron-right"></i>
    </button>
  `;
}

window.changePage = (p) => {
  currentPage = p;
  renderContributors(p);
};

// ======================================================
// 🔍 MODAL
// ======================================================
function setupModalEvents() {
  const modal = document.getElementById('contributor-modal');
  const close = document.querySelector('.close-modal');

  close?.addEventListener('click', () => modal.classList.remove('active'));
  modal?.addEventListener('click', e => e.target === modal && modal.classList.remove('active'));
  document.addEventListener('keydown', e => e.key === 'Escape' && modal.classList.remove('active'));
}

function openModal(c, league, rank) {
  document.getElementById('modal-avatar').src = `${c.avatar_url}&s=200`;
  document.getElementById('modal-name').textContent = c.login;
  document.getElementById('modal-id').textContent = `ID: ${c.id || 'N/A'}`;
  document.getElementById('modal-rank').textContent = `#${rank}`;
  document.getElementById('modal-score').textContent = c.points;
  document.getElementById('modal-prs').textContent = c.prs;
  document.getElementById('modal-commits').textContent = c.contributions || 0;

  const badge = document.getElementById('modal-league-badge');
  badge.textContent = league.label;
  badge.className = `league-badge ${league.badge}`;

  document.getElementById('modal-profile-link').href = c.html_url;
  document.getElementById('modal-pr-link').href =
    `https://github.com/${REPO_OWNER}/${REPO_NAME}/pulls?q=is%3Apr+author%3A${c.login}`;

  document.getElementById('contributor-modal').classList.add('active');
}

// ======================================================
// 📡 RECENT ACTIVITY
// ======================================================
async function fetchRecentActivity() {
  try {
    const res = await fetch(`${API_BASE}/commits?per_page=10`);
    if (!res.ok) return;

    const commits = await res.json();
    const list = document.getElementById('activity-list');
    if (!list) return;

    list.innerHTML = commits.map(c => `
      <div class="activity-item">
        <div class="activity-marker"></div>
        <div class="commit-msg">
          <span>${c.commit.author.name}</span>: ${c.commit.message.split('\n')[0]}
        </div>
        <div class="commit-date">
          ${new Date(c.commit.author.date).toLocaleDateString()}
        </div>
      </div>
    `).join('');
  } catch {
    console.log('Activity feed unavailable');
  }
}

// ======================================================
// 🧪 MOCK DATA (FAILSAFE)
// ======================================================
function loadMockData() {
  contributorsData = Array.from({ length: 8 }, (_, i) => ({
    login: `DemoUser${i + 1}`,
    avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${i + 1}`,
    html_url: '#',
    prs: Math.max(1, 8 - i),
    points: [220, 180, 140, 100, 70, 45, 25, 10][i]
  }));

  updateGlobalStats(8, 42, 790, 120, 28, 340);
  renderContributors(1);
  mockActivityFeed();
}

function mockActivityFeed() {
  const list = document.getElementById('activity-list');
  if (!list) return;

  list.innerHTML = `
    <div class="activity-item">
      <div class="activity-marker"></div>
      <div class="commit-msg"><span>System</span>: Demo Mode Active</div>
      <div class="commit-date">Now</div>
    </div>
  `;
}
