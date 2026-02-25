/* ═══════════════════════════════════════════
   LEETCODE STATS CARD
   Uses: alfa-leetcode-api.onrender.com (CORS-friendly, no auth needed)
   ═══════════════════════════════════════════ */

const LEETCODE_USER = 'ayuuu_13';
const ALFA_API_BASE = 'https://alfa-leetcode-api.onrender.com';

// Real question counts (LeetCode totals as of 2025)
const LC_TOTAL_EASY = 878;
const LC_TOTAL_MEDIUM = 1844;
const LC_TOTAL_HARD = 821;

async function buildLeetcodeStats(parentEl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lc-wrapper';
    wrapper.innerHTML = `
        <div class="row-header" style="padding:0 60px">
            <h3>LeetCode Progress</h3>
            <a href="https://leetcode.com/u/${LEETCODE_USER}/" target="_blank" rel="noopener" class="lc-profile-link">
                View Profile →
            </a>
        </div>
        <div class="lc-card" id="lc-card">
            <div class="lc-shimmer"><div class="shimmer-inner" style="height:200px;border-radius:12px"></div></div>
        </div>`;
    parentEl.appendChild(wrapper);

    // Fetch solved stats + user profile in parallel
    try {
        const [solvedRes, userRes] = await Promise.all([
            fetch(`${ALFA_API_BASE}/${LEETCODE_USER}/solved`),
            fetch(`${ALFA_API_BASE}/${LEETCODE_USER}`)
        ]);

        if (!solvedRes.ok) throw new Error('Solved endpoint failed');

        const solved = await solvedRes.json();
        const user = await userRes.json();

        // alfa-leetcode-api response shape
        const allSubmissions = solved.acSubmissionNum?.find(s => s.difficulty === 'All');
        const totalSolved = solved.solvedProblem ?? allSubmissions?.count ?? 0;

        renderLeetcodeCard({
            totalSolved,
            easySolved: solved.easySolved ?? 0,
            mediumSolved: solved.mediumSolved ?? 0,
            hardSolved: solved.hardSolved ?? 0,
            totalEasy: LC_TOTAL_EASY,
            totalMedium: LC_TOTAL_MEDIUM,
            totalHard: LC_TOTAL_HARD,
            ranking: user.ranking ?? 0,
            acceptanceRate: calcAcceptRate(solved),
            avatar: user.avatar ?? '',
            name: user.name ?? LEETCODE_USER,
        });

    } catch (err) {
        console.warn('[LeetCode] API fetch failed, using fallback.', err);
        // Use real fetched data as hardcoded fallback
        renderLeetcodeCard({
            totalSolved: 10,
            easySolved: 5,
            mediumSolved: 4,
            hardSolved: 1,
            totalEasy: LC_TOTAL_EASY,
            totalMedium: LC_TOTAL_MEDIUM,
            totalHard: LC_TOTAL_HARD,
            ranking: 5000001,
            acceptanceRate: 69.6,
            name: 'Ayushmaan Yadav',
        });
    }
}

function calcAcceptRate(solved) {
    const totalSub = solved.totalSubmissionNum?.find(s => s.difficulty === 'All')?.submissions ?? 0;
    const acSub = solved.acSubmissionNum?.find(s => s.difficulty === 'All')?.submissions ?? 0;
    if (!totalSub) return 0;
    return Math.round((acSub / totalSub) * 1000) / 10;
}

function renderLeetcodeCard(data) {
    const card = document.getElementById('lc-card');
    if (!card) return;

    const easyPct = Math.round((data.easySolved / LC_TOTAL_EASY) * 100);
    const medPct = Math.round((data.mediumSolved / LC_TOTAL_MEDIUM) * 100);
    const hardPct = Math.round((data.hardSolved / LC_TOTAL_HARD) * 100);
    const totalAll = LC_TOTAL_EASY + LC_TOTAL_MEDIUM + LC_TOTAL_HARD;
    const totalPct = Math.round((data.totalSolved / totalAll) * 100);

    // Donut circumference = 2π × 40 ≈ 251.3
    const strokeDash = (totalPct / 100 * 251.3).toFixed(1);

    card.innerHTML = `
    <div class="lc-inner">
        <div class="lc-donut-wrap">
            <svg class="lc-donut" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e1e" stroke-width="9"/>
                <circle cx="50" cy="50" r="40" fill="none"
                    stroke="url(#lcGrad)" stroke-width="9"
                    stroke-dasharray="${strokeDash} 251.3"
                    stroke-dashoffset="62.8"
                    stroke-linecap="round"
                    class="lc-donut-circle"/>
                <defs>
                    <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stop-color="#ffa116"/>
                        <stop offset="100%" stop-color="#ff6b6b"/>
                    </linearGradient>
                </defs>
            </svg>
            <div class="lc-donut-center">
                <span class="lc-total" data-target="${data.totalSolved}">0</span>
                <span class="lc-total-label">/ ${totalAll} Solved</span>
            </div>
        </div>

        <div class="lc-bars">
            <div class="lc-bar-row">
                <div class="lc-bar-header">
                    <span class="lc-diff easy">Easy</span>
                    <span class="lc-count">${data.easySolved} <em>/ ${LC_TOTAL_EASY}</em></span>
                </div>
                <div class="lc-bar-track">
                    <div class="lc-bar-fill easy-fill" data-width="${easyPct}%"></div>
                </div>
            </div>
            <div class="lc-bar-row">
                <div class="lc-bar-header">
                    <span class="lc-diff medium">Medium</span>
                    <span class="lc-count">${data.mediumSolved} <em>/ ${LC_TOTAL_MEDIUM}</em></span>
                </div>
                <div class="lc-bar-track">
                    <div class="lc-bar-fill medium-fill" data-width="${medPct}%"></div>
                </div>
            </div>
            <div class="lc-bar-row">
                <div class="lc-bar-header">
                    <span class="lc-diff hard">Hard</span>
                    <span class="lc-count">${data.hardSolved} <em>/ ${LC_TOTAL_HARD}</em></span>
                </div>
                <div class="lc-bar-track">
                    <div class="lc-bar-fill hard-fill" data-width="${hardPct}%"></div>
                </div>
            </div>
        </div>

        <div class="lc-meta">
            <div class="lc-meta-item">
                <span class="lc-meta-val">${data.acceptanceRate?.toFixed(1) ?? '—'}%</span>
                <span class="lc-meta-key">Acceptance</span>
            </div>
            <div class="lc-meta-divider"></div>
            <div class="lc-meta-item">
                <span class="lc-meta-val">#${Number(data.ranking || 0).toLocaleString()}</span>
                <span class="lc-meta-key">Global Rank</span>
            </div>
            <div class="lc-meta-divider"></div>
            <div class="lc-meta-item">
                <span class="lc-meta-val">${data.totalSolved}</span>
                <span class="lc-meta-key">AC Problems</span>
            </div>
        </div>
    </div>`;

    // Animate on viewport entry
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Counter
            animateLcCounter(card.querySelector('.lc-total'), data.totalSolved);

            // Bars (staggered)
            card.querySelectorAll('.lc-bar-fill').forEach((bar, i) => {
                setTimeout(() => { bar.style.width = bar.dataset.width; }, i * 150);
            });

            observer.disconnect();
        });
    }, { threshold: 0.2 });
    observer.observe(card);
}

function animateLcCounter(el, target) {
    if (!el) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n;
        if (n >= target) clearInterval(t);
    }, 30);
}
