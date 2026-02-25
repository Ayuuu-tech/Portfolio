/* ═══════════════════════════════════════════
   GITHUB STATS – Live stat cards row
   ═══════════════════════════════════════════ */

const GH_USER = 'Ayuuu-tech';  // ✅ verified — 17 repos, 5 followers

async function buildGithubStats(parentEl) {
    // Skeleton placeholder while fetching
    const section = document.createElement('div');
    section.className = 'gh-stats-section';
    section.innerHTML = `
        <div class="row-header">
            <h3>📊 GitHub Activity</h3>
            <span class="row-arrow">›</span>
        </div>
        <div class="gh-stats-grid" id="gh-stats-grid">
            ${[1, 2, 3, 4].map(() => `<div class="gh-stat-card shimmer"><div class="shimmer-inner"></div></div>`).join('')}
        </div>
        <div class="gh-chart-container">
            <img class="gh-commit-chart shimmer" src="https://ghchart.rshah.org/E50914/${GH_USER}" alt="GitHub Contributions Chart" onload="this.classList.remove('shimmer')" onerror="this.style.display='none'" />
        </div>`;
    parentEl.appendChild(section);   // ← just append, order controlled by caller

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`),
            fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`)
        ]);
        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate stats
        const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
        const publicRepos = user.public_repos || repos.length;
        const followers = user.followers || 0;

        const stats = [
            { icon: '📦', label: 'Public Repos', value: publicRepos, sub: 'across GitHub' },
            { icon: '⭐', label: 'Total Stars', value: totalStars, sub: 'community appreciation' },
            { icon: '🔀', label: 'Forks', value: totalForks, sub: 'by contributors' },
            { icon: '👥', label: 'Followers', value: followers, sub: 'on GitHub' },
        ];

        renderGhStats(stats);
    } catch {
        // Graceful degradation with real fallback values from API
        renderGhStats([
            { icon: '📦', label: 'Public Repos', value: 17, sub: 'across GitHub' },
            { icon: '⭐', label: 'Total Stars', value: 8, sub: 'community appreciation' },
            { icon: '🔀', label: 'Forks', value: 3, sub: 'by contributors' },
            { icon: '👥', label: 'Followers', value: 5, sub: 'on GitHub' },
        ]);
    }
}

function renderGhStats(stats) {
    const grid = document.getElementById('gh-stats-grid');
    if (!grid) return;
    grid.innerHTML = stats.map(s => `
        <div class="gh-stat-card">
            <div class="gh-stat-icon">${s.icon}</div>
            <div class="gh-stat-value" data-target="${s.value}">0</div>
            <div class="gh-stat-label">${s.label}</div>
            <div class="gh-stat-sub">${s.sub}</div>
        </div>`).join('');

    // Animate counters
    grid.querySelectorAll('.gh-stat-value').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
        }, 30);
    });
}
