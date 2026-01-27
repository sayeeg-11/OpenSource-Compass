// ======================================================
// GitHub Contributors – OpenSource Compass (UI page)
// ======================================================

const REPO_OWNER = 'sayeeg-11';
const REPO_NAME = 'OpenSource-Compass';
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

const CACHE_KEY = 'osc_contributors_cache_v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const PER_PAGE = 100;
const MAX_PAGES_SAFETY = 50;

let allContributors = [];
let visibleContributors = [];
let observer;

document.addEventListener('DOMContentLoaded', () => {
  initContributorsPage();
});

async function initContributorsPage() {
  const grid = document.getElementById('contributors-grid');

  if (!grid) return;

  renderSkeletons(grid, 12);
  setStatus('Loading contributors…');

  const cached = readCache();
  if (cached?.length) {
    allContributors = cached;
    visibleContributors = cached;
    setStatus('');
    renderContributorsGrid(grid, visibleContributors);
    updateStats(visibleContributors);
    void refreshInBackground();
  } else {
    await loadAndRender();
  }
}

async function refreshInBackground() {
  try {
    const [freshContributors, mergedPrCounts] = await Promise.all([
      fetchAllContributors(),
      fetchMergedPrCounts()
    ]);
    if (!freshContributors?.length) return;
    const enriched = attachMergedPrCounts(freshContributors, mergedPrCounts);
    allContributors = enriched;
    visibleContributors = enriched;
    writeCache(enriched);

    const grid = document.getElementById('contributors-grid');
    if (grid) renderContributorsGrid(grid, visibleContributors);
  } catch {
    // Silent background refresh failure.
  }
}

async function loadAndRender() {
  const grid = document.getElementById('contributors-grid');
  if (!grid) return;

  try {
    const [contributors, mergedPrCounts] = await Promise.all([
      fetchAllContributors(),
      fetchMergedPrCounts()
    ]);
    const enriched = attachMergedPrCounts(contributors, mergedPrCounts);
    allContributors = enriched;
    visibleContributors = enriched;
    writeCache(enriched);

    setStatus('');
    renderContributorsGrid(grid, visibleContributors);
    updateStats(visibleContributors);
  } catch (err) {
    renderEmptyState(grid);
    setStatus(formatError(err), true);
  }
}

function setStatus(message, isError = false) {
  const el = document.getElementById('contributors-status');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('is-error', Boolean(isError));
}

function renderEmptyState(grid) {
  grid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;color:var(--text-secondary);font-family:Inter,-apple-system,sans-serif;">
      Couldn’t load contributors right now.
      <div style="margin-top:0.5rem;">
        <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer" style="color:var(--deep-navy);font-weight:600;">
          Open the repo on GitHub
        </a>
      </div>
    </div>
  `;
}

function renderSkeletons(grid, count) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const sk = document.createElement('div');
    sk.className = 'contributor-skeleton';
    sk.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;">
        <div class="sk avatar"></div>
        <div style="flex:1;min-width:0;">
          <div class="sk line1"></div>
          <div class="sk line2"></div>
        </div>
      </div>
    `;
    frag.appendChild(sk);
  }
  grid.innerHTML = '';
  grid.appendChild(frag);
}

function setupObserver() {
  if (observer) return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    },
    { root: null, threshold: 0.12 }
  );
}

function renderContributorsGrid(grid, list) {
  setupObserver();
  grid.innerHTML = '';

  if (!list?.length) {
    renderEmptyState(grid);
    return;
  }

  const frag = document.createDocumentFragment();

  list.forEach((c) => {
    const login = c?.login || c?.name || 'Anonymous';
    const mergedPrs = Number.isFinite(c?.merged_prs) ? c.merged_prs : 0;
    const avatar = c?.avatar_url ? `${c.avatar_url}&s=160` : fallbackAvatar(login);
    const profileUrl = c?.html_url || '';
    const isBot = (c?.type || '').toLowerCase() === 'bot' || /\[bot\]$/i.test(login);

    const card = document.createElement('div');
    card.className = 'contributor-card';
    card.innerHTML = `
      <div class="contributor-card-inner">
        <img class="contributor-avatar" src="${avatar}" alt="${escapeHtml(login)} avatar" loading="lazy" />
        <div class="contributor-main">
          <div class="contributor-name" title="${escapeHtml(login)}">${escapeHtml(login)}</div>
          <div class="contributor-meta">
            <span class="contributor-chip"><i class=\"fas fa-code-merge\" aria-hidden=\"true\"></i>${mergedPrs} merged PR${mergedPrs === 1 ? '' : 's'}</span>
            ${isBot ? `<span class="contributor-chip is-bot"><i class=\"fas fa-robot\" aria-hidden=\"true\"></i>Bot</span>` : ''}
          </div>
        </div>
        <div class="contributor-actions">
          ${profileUrl ? `<a class="contributor-github" href="${profileUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(login)} on GitHub"><i class=\"fab fa-github\" aria-hidden=\"true\"></i></a>` : ''}
        </div>
      </div>
    `;

    frag.appendChild(card);
    if (observer) observer.observe(card);
  });

  grid.appendChild(frag);
}

function fallbackAvatar(seed) {
  // Inline SVG fallback so we never show a broken image.
  const initial = String(seed || '?').trim().slice(0, 1).toUpperCase() || '?';
  const hue = hashToHue(String(seed || 'osc'));
  const bg1 = `hsl(${hue} 60% 78%)`;
  const bg2 = `hsl(${(hue + 28) % 360} 65% 72%)`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg1}" />
          <stop offset="1" stop-color="${bg2}" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="64" fill="url(#g)" />
      <text x="64" y="74" text-anchor="middle" font-family="Inter, Arial" font-size="54" font-weight="700" fill="#1b263b">
        ${escapeHtml(initial)}
      </text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function hashToHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

async function fetchAllContributors() {
  const all = [];

  for (let page = 1; page <= MAX_PAGES_SAFETY; page++) {
    // NOTE: Do not include anonymous contributors here.
    // Anonymous entries don't have a GitHub profile/avatar, but this page
    // is meant to link every card to a GitHub account.
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json'
      }
    });

    if (res.status === 403 && res.headers.get('X-RateLimit-Remaining') === '0') {
      const reset = Number(res.headers.get('X-RateLimit-Reset'));
      const resetAt = reset ? new Date(reset * 1000) : null;
      const msg = resetAt ? `GitHub rate limit hit. Try again after ${resetAt.toLocaleTimeString()}.` : 'GitHub rate limit hit. Try again later.';
      const err = new Error(msg);
      err.name = 'RateLimitError';
      throw err;
    }

    if (!res.ok) {
      throw new Error(`GitHub API error (${res.status})`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) break;
    all.push(
      ...data.filter((c) => Boolean(c && c.login && c.html_url && c.avatar_url))
    );

    if (data.length < PER_PAGE) break;
  }

  return all;
}

async function fetchMergedPrCounts() {
  const counts = new Map();

  for (let page = 1; page <= MAX_PAGES_SAFETY; page++) {
    const url = `${API_BASE}/pulls?state=closed&per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json'
      }
    });

    if (res.status === 403 && res.headers.get('X-RateLimit-Remaining') === '0') {
      const reset = Number(res.headers.get('X-RateLimit-Reset'));
      const resetAt = reset ? new Date(reset * 1000) : null;
      const msg = resetAt ? `GitHub rate limit hit. Try again after ${resetAt.toLocaleTimeString()}.` : 'GitHub rate limit hit. Try again later.';
      const err = new Error(msg);
      err.name = 'RateLimitError';
      throw err;
    }

    if (!res.ok) {
      throw new Error(`GitHub API error (${res.status})`);
    }

    const prs = await res.json();
    if (!Array.isArray(prs) || prs.length === 0) break;

    prs.forEach((pr) => {
      if (!pr?.merged_at) return;
      const login = pr?.user?.login;
      if (!login) return;
      counts.set(login, (counts.get(login) || 0) + 1);
    });

    if (prs.length < PER_PAGE) break;
  }

  return counts;
}

function attachMergedPrCounts(contributors, mergedCounts) {
  const enriched = (contributors || []).map((c) => {
    const login = c?.login;
    const merged_prs = login ? (mergedCounts.get(login) || 0) : 0;
    return { ...c, merged_prs };
  });

  // Sort by merged PRs desc, then login asc.
  enriched.sort((a, b) => {
    const ap = Number.isFinite(a?.merged_prs) ? a.merged_prs : 0;
    const bp = Number.isFinite(b?.merged_prs) ? b.merged_prs : 0;
    if (bp !== ap) return bp - ap;
    return String(a?.login || '').localeCompare(String(b?.login || ''));
  });

  return enriched;
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.data) || typeof parsed.at !== 'number') return null;
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Ignore cache errors (e.g., privacy mode).
  }
}

function formatError(err) {
  const msg = (err && err.message) ? String(err.message) : 'Something went wrong.';
  return `${msg} You can still view contributors on GitHub.`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function applyFilters() {
  const searchInput = document.getElementById('contributor-search');
  const botToggle = document.getElementById('toggle-bots');

  if (!searchInput || !botToggle) return;

  const query = searchInput.value.trim().toLowerCase();
  const showBots = botToggle.checked;

  visibleContributors = allContributors.filter((c) => {
    const login = c.login.toLowerCase();

    if (!showBots && /\[bot\]$/i.test(login)) return false;
    if (query && !login.includes(query)) return false;

    return true;
  });

  const grid = document.getElementById('contributors-grid');
  renderContributorsGrid(grid, visibleContributors);
  updateStats(visibleContributors);
}
function debounce(fn, delay = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
const searchInput = document.getElementById('contributor-search');
const botToggle = document.getElementById('toggle-bots');

searchInput?.addEventListener('input', debounce(applyFilters));
botToggle?.addEventListener('change', applyFilters);

function updateStats(list) {
  const stats = document.getElementById('contributors-stats');
  if (!stats) return;

  const total = list.length;
  const humans = list.filter(c => !/\[bot\]$/i.test(c.login)).length;
  const mergedPRs = list.reduce((sum, c) => sum + (c.merged_prs || 0), 0);
  const top = list[0];

  stats.innerHTML = `
    <span><strong>${total}</strong> contributors</span>
    <span><strong>${humans}</strong> people</span>
    <span><strong>${mergedPRs}</strong> merged PRs</span>
    ${top ? `<span>🏆 Top: <strong>${top.login}</strong></span>` : ''}
  `;
}
