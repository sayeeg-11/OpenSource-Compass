// ============================================================
// Git Playground — Badge / Gamification Engine
// Manages badge definitions, unlock rules, persistence (localStorage),
// and public-profile / shareable-link generation.
// ============================================================

const GitBadgeEngine = (() => {
    // --------------- STORAGE KEY ---------------
    const STORAGE_KEY = 'gitPlayground_badges';

    // --------------- BADGE DEFINITIONS ---------------
    const BADGE_DEFINITIONS = [
        // ---- BEGINNER ----
        {
            id: 'git-beginner',
            title: 'Git Beginner',
            description: 'Complete your very first Git scenario.',
            level: 'Beginner',
            icon: 'fa-seedling',
            color: '#27c93f',
            gradient: 'linear-gradient(135deg, #27c93f, #1fa835)',
            rule: (stats) => stats.totalCompleted >= 1,
        },
        {
            id: 'first-scenario',
            title: 'First Scenario Completed',
            description: 'You solved your first Git challenge!',
            level: 'Beginner',
            icon: 'fa-flag-checkered',
            color: '#58a6ff',
            gradient: 'linear-gradient(135deg, #58a6ff, #388bfd)',
            rule: (stats) => stats.totalCompleted >= 1,
        },
        {
            id: 'five-down',
            title: 'High Five',
            description: 'Complete 5 scenarios.',
            level: 'Beginner',
            icon: 'fa-hand-peace',
            color: '#f0883e',
            gradient: 'linear-gradient(135deg, #f0883e, #d97b30)',
            rule: (stats) => stats.totalCompleted >= 5,
        },
        {
            id: 'branch-explorer',
            title: 'Branch Explorer',
            description: 'Complete 3 branching scenarios.',
            level: 'Beginner',
            icon: 'fa-code-branch',
            color: '#d2a8ff',
            gradient: 'linear-gradient(135deg, #d2a8ff, #bc8cf2)',
            rule: (stats) => stats.branchingCompleted >= 3,
        },
        {
            id: 'init-master',
            title: 'Init Master',
            description: 'Complete the "Initialize Repository" scenario.',
            level: 'Beginner',
            icon: 'fa-play-circle',
            color: '#3fb950',
            gradient: 'linear-gradient(135deg, #3fb950, #2ea043)',
            rule: (stats) => stats.scenarioIds.includes('beg-01'),
        },

        // ---- INTERMEDIATE ----
        {
            id: 'merge-conflict-survivor',
            title: 'Merge Conflict Survivor',
            description: 'Complete a merge-related scenario.',
            level: 'Intermediate',
            icon: 'fa-code-merge',
            color: '#f778ba',
            gradient: 'linear-gradient(135deg, #f778ba, #da3b8a)',
            rule: (stats) => stats.mergeCompleted >= 1,
        },
        {
            id: 'ten-streak',
            title: 'Double Digits',
            description: 'Complete 10 scenarios.',
            level: 'Intermediate',
            icon: 'fa-fire',
            color: '#f85149',
            gradient: 'linear-gradient(135deg, #f85149, #da3633)',
            rule: (stats) => stats.totalCompleted >= 10,
        },
        {
            id: 'stash-ninja',
            title: 'Stash Ninja',
            description: 'Complete a stash-related scenario.',
            level: 'Intermediate',
            icon: 'fa-box-archive',
            color: '#79c0ff',
            gradient: 'linear-gradient(135deg, #79c0ff, #58a6ff)',
            rule: (stats) => stats.stashCompleted >= 1,
        },
        {
            id: 'remote-rider',
            title: 'Remote Rider',
            description: 'Complete 3 remote/push/pull scenarios.',
            level: 'Intermediate',
            icon: 'fa-cloud-upload-alt',
            color: '#7ee787',
            gradient: 'linear-gradient(135deg, #7ee787, #56d364)',
            rule: (stats) => stats.remoteCompleted >= 3,
        },
        {
            id: 'twenty-five-club',
            title: '25 Club',
            description: 'Complete 25 scenarios.',
            level: 'Intermediate',
            icon: 'fa-award',
            color: '#e3b341',
            gradient: 'linear-gradient(135deg, #e3b341, #d29922)',
            rule: (stats) => stats.totalCompleted >= 25,
        },
        {
            id: 'level-sweeper-beg',
            title: 'Beginner Sweep',
            description: 'Complete all Beginner-level scenarios.',
            level: 'Intermediate',
            icon: 'fa-broom',
            color: '#a5d6ff',
            gradient: 'linear-gradient(135deg, #a5d6ff, #79c0ff)',
            rule: (stats) => stats.beginnerTotal > 0 && stats.beginnerCompleted >= stats.beginnerTotal,
        },

        // ---- ADVANCED ----
        {
            id: 'rebase-master',
            title: 'Rebase Master',
            description: 'Complete a rebase scenario.',
            level: 'Advanced',
            icon: 'fa-layer-group',
            color: '#ffa657',
            gradient: 'linear-gradient(135deg, #ffa657, #f0883e)',
            rule: (stats) => stats.rebaseCompleted >= 1,
        },
        {
            id: 'scenario-speedrunner',
            title: 'Scenario Speedrunner',
            description: 'Complete any scenario on the first command (no mistakes).',
            level: 'Advanced',
            icon: 'fa-bolt',
            color: '#ffbd2e',
            gradient: 'linear-gradient(135deg, #ffbd2e, #e3a520)',
            rule: (stats) => stats.speedruns >= 1,
        },
        {
            id: 'fifty-legend',
            title: 'Half-Century Legend',
            description: 'Complete 50 scenarios.',
            level: 'Advanced',
            icon: 'fa-trophy',
            color: '#ffd700',
            gradient: 'linear-gradient(135deg, #ffd700, #e6c200)',
            rule: (stats) => stats.totalCompleted >= 50,
        },
        {
            id: 'century',
            title: 'Century',
            description: 'Complete 100 scenarios — true Git mastery.',
            level: 'Advanced',
            icon: 'fa-crown',
            color: '#ff6ec7',
            gradient: 'linear-gradient(135deg, #ff6ec7, #e855b3)',
            rule: (stats) => stats.totalCompleted >= 100,
        },
        {
            id: 'level-sweeper-int',
            title: 'Intermediate Sweep',
            description: 'Complete all Intermediate-level scenarios.',
            level: 'Advanced',
            icon: 'fa-check-double',
            color: '#d2a8ff',
            gradient: 'linear-gradient(135deg, #d2a8ff, #bc8cf2)',
            rule: (stats) => stats.intermediateTotal > 0 && stats.intermediateCompleted >= stats.intermediateTotal,
        },
        {
            id: 'level-sweeper-adv',
            title: 'Advanced Sweep',
            description: 'Complete all Advanced-level scenarios.',
            level: 'Advanced',
            icon: 'fa-star',
            color: '#f85149',
            gradient: 'linear-gradient(135deg, #f85149, #da3633)',
            rule: (stats) => stats.advancedTotal > 0 && stats.advancedCompleted >= stats.advancedTotal,
        },
        {
            id: 'completionist',
            title: 'Completionist',
            description: 'Complete every single scenario in the Git Playground.',
            level: 'Advanced',
            icon: 'fa-gem',
            color: '#00ffff',
            gradient: 'linear-gradient(135deg, #00ffff, #00cccc)',
            rule: (stats) => stats.allScenariosTotal > 0 && stats.totalCompleted >= stats.allScenariosTotal,
        },
    ];

    // --------------- INTERNAL HELPERS ---------------

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (_) { /* corrupt data */ }
        return { earnedBadges: {}, completedScenarios: [], speedruns: 0 };
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    /** Build aggregated stats from the completed scenario IDs list. */
    function buildStats(data, allScenarios) {
        const ids = data.completedScenarios || [];
        const scenarios = allScenarios || window.gitScenarios || [];

        const completed = scenarios.filter(s => ids.includes(s.id));
        const beginnerAll = scenarios.filter(s => s.level === 'Beginner');
        const intermediateAll = scenarios.filter(s => s.level === 'Intermediate');
        const advancedAll = scenarios.filter(s => s.level === 'Advanced');

        // Keyword matching helpers
        const countByKeyword = (list, keywords) =>
            list.filter(s => keywords.some(k =>
                s.title.toLowerCase().includes(k) ||
                s.description.toLowerCase().includes(k) ||
                s.id.toLowerCase().includes(k)
            )).length;

        return {
            totalCompleted: ids.length,
            scenarioIds: ids,
            beginnerCompleted: completed.filter(s => s.level === 'Beginner').length,
            intermediateCompleted: completed.filter(s => s.level === 'Intermediate').length,
            advancedCompleted: completed.filter(s => s.level === 'Advanced').length,
            beginnerTotal: beginnerAll.length,
            intermediateTotal: intermediateAll.length,
            advancedTotal: advancedAll.length,
            allScenariosTotal: scenarios.length,
            branchingCompleted: countByKeyword(completed, ['branch', 'checkout', 'switch']),
            mergeCompleted: countByKeyword(completed, ['merge', 'conflict']),
            rebaseCompleted: countByKeyword(completed, ['rebase']),
            stashCompleted: countByKeyword(completed, ['stash']),
            remoteCompleted: countByKeyword(completed, ['push', 'pull', 'remote', 'clone', 'fetch']),
            speedruns: data.speedruns || 0,
        };
    }

    // --------------- PUBLIC API ---------------

    /** Mark a scenario as completed and evaluate badge unlocks. Returns array of newly earned badges. */
    function onScenarioComplete(scenarioId, commandCount) {
        const data = loadData();

        // Deduplicate
        if (!data.completedScenarios.includes(scenarioId)) {
            data.completedScenarios.push(scenarioId);
        }

        // Speed run? (solved in 1 command)
        if (commandCount !== undefined && commandCount <= 1) {
            data.speedruns = (data.speedruns || 0) + 1;
        }

        // Evaluate all badge rules
        const stats = buildStats(data);
        const newlyEarned = [];

        BADGE_DEFINITIONS.forEach(badge => {
            if (data.earnedBadges[badge.id]) return; // already earned
            try {
                if (badge.rule(stats)) {
                    data.earnedBadges[badge.id] = {
                        earnedAt: new Date().toISOString(),
                    };
                    newlyEarned.push(badge);
                }
            } catch (_) { /* safety */ }
        });

        saveData(data);
        return newlyEarned;
    }

    /** Get all badge definitions with earned status merged in. */
    function getAllBadges() {
        const data = loadData();
        return BADGE_DEFINITIONS.map(b => ({
            ...b,
            earned: !!data.earnedBadges[b.id],
            earnedAt: data.earnedBadges[b.id]?.earnedAt || null,
        }));
    }

    /** Get only earned badges. */
    function getEarnedBadges() {
        return getAllBadges().filter(b => b.earned);
    }

    /** Get global progress summary. */
    function getProgress() {
        const data = loadData();
        const total = BADGE_DEFINITIONS.length;
        const earned = Object.keys(data.earnedBadges).length;
        return {
            earned,
            total,
            percent: total > 0 ? Math.round((earned / total) * 100) : 0,
            completedScenarios: data.completedScenarios.length,
        };
    }

    /** Get shareable profile data as a base64 URL-safe string. */
    function getShareableProfileData() {
        const data = loadData();
        const profile = {
            badges: Object.keys(data.earnedBadges),
            scenarios: data.completedScenarios.length,
            speedruns: data.speedruns || 0,
            exportedAt: new Date().toISOString(),
        };
        return btoa(JSON.stringify(profile));
    }

    /** Generate a shareable URL for the badge profile. */
    function getShareableURL() {
        const profileData = getShareableProfileData();
        const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
        return `${base}badges.html?profile=${profileData}`;
    }

    /** Parse profile data from a base64 string (for badge profile page). */
    function parseProfileData(encoded) {
        try {
            return JSON.parse(atob(encoded));
        } catch (_) {
            return null;
        }
    }

    /** Get badge definition by ID */
    function getBadgeById(id) {
        return BADGE_DEFINITIONS.find(b => b.id === id) || null;
    }

    /** Reset all badge data */
    function resetAll() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /** Get completed scenario IDs */
    function getCompletedScenarios() {
        return loadData().completedScenarios || [];
    }

    return {
        onScenarioComplete,
        getAllBadges,
        getEarnedBadges,
        getProgress,
        getShareableURL,
        getShareableProfileData,
        parseProfileData,
        getBadgeById,
        resetAll,
        getCompletedScenarios,
        BADGE_DEFINITIONS,
    };
})();

// Make available globally
window.GitBadgeEngine = GitBadgeEngine;
