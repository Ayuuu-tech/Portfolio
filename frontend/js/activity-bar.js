/* ═══════════════════════════════════════════
   NOW CODING – Spotify-style bottom activity bar
   ═══════════════════════════════════════════ */

const GITHUB_USER = 'Ayuuu-tech';

// Curated fallback playlist — cycles through projects
const ACTIVITY_PLAYLIST = [
    { repo: 'ReLive AI', tech: 'FastAPI + WebSocket', emoji: '🏥', progress: 62 },
    { repo: 'Portfolio', tech: 'HTML + CSS + Vanilla JS', emoji: '🌐', progress: 85 },
    { repo: 'Laundry Buddy', tech: 'Node.js + MongoDB', emoji: '🧺', progress: 91 },
    { repo: 'QuantumForge DMET', tech: 'Python + Streamlit + NumPy', emoji: '⚛️', progress: 48 },
    { repo: 'Table Mint', tech: 'Next.js + TypeScript', emoji: '🍽️', progress: 34 },
];

let activityIndex = 0;
let progressInterval = null;
let currentProgress = 0;

function initActivityBar() {
    const bar = document.getElementById('activity-bar');
    if (!bar) return;

    // Try to fetch real GitHub activity first
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=5`)
        .then(r => r.json())
        .then(events => {
            const push = events.find(e => e.type === 'PushEvent');
            if (push) {
                const repoName = push.repo.name.split('/')[1].replace(/-/g, ' ');
                const msg = push.payload?.commits?.[0]?.message || 'Latest commit';
                ACTIVITY_PLAYLIST.unshift({ repo: repoName, tech: msg.substring(0, 35), emoji: '🔀', progress: 0 });
            }
        })
        .catch(() => { }) // silently fall back
        .finally(() => startActivityCycle());
}

function startActivityCycle() {
    renderActivity(ACTIVITY_PLAYLIST[activityIndex]);
    startProgressAnimation();

    // Rotate every 12s
    setInterval(() => {
        activityIndex = (activityIndex + 1) % ACTIVITY_PLAYLIST.length;
        currentProgress = 0;
        renderActivity(ACTIVITY_PLAYLIST[activityIndex]);
    }, 12000);
}

function renderActivity(item) {
    const bar = document.getElementById('activity-bar');
    if (!bar) return;

    document.getElementById('ab-emoji').textContent = item.emoji;
    document.getElementById('ab-repo').textContent = item.repo;
    document.getElementById('ab-tech').textContent = item.tech;

    // Reset progress
    currentProgress = item.progress || 0;
    updateProgressBar(currentProgress);
}

function startProgressAnimation() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        currentProgress = Math.min(currentProgress + 0.14, 99);
        updateProgressBar(currentProgress);
    }, 150);
}

function updateProgressBar(pct) {
    const fill = document.getElementById('ab-fill');
    const knob = document.getElementById('ab-knob');
    if (fill) fill.style.width = pct + '%';
    if (knob) knob.style.left = pct + '%';
}

// Allow clicking the progress bar to scrub
function initProgressScrub() {
    const track = document.getElementById('ab-track');
    if (!track) return;
    track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        currentProgress = Math.max(0, Math.min(pct, 99));
        updateProgressBar(currentProgress);
    });
}
