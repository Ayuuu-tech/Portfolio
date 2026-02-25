/* ═══════════════════════════════════════════
   FEATURES – All new interactive features
   ═══════════════════════════════════════════ */

/* ── 4. PROJECT FILTER BAR ──────────────────── */
function buildFilterBar(parentEl) {
    const tags = ['All', 'Full-Stack', 'AI/ML', 'Python', 'Live', 'New'];
    const bar = document.createElement('div');
    bar.className = 'filter-bar';
    bar.id = 'filter-bar';

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (tag === 'All' ? ' active' : '');
        btn.textContent = tag;
        btn.addEventListener('click', () => {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjectRows(tag);
        });
        bar.appendChild(btn);
    });

    parentEl.appendChild(bar);  // ← simple append, order controlled by caller
}

function filterProjectRows(tag) {
    const scope = document.getElementById('projects-below-hero') || document.getElementById('page-projects');
    const rows = scope.querySelectorAll('.content-row');
    rows.forEach(row => {
        if (tag === 'All') { row.style.display = ''; return; }
        const cards = row.querySelectorAll('.card');
        let visibleCount = 0;
        cards.forEach(card => {
            const search = (card.dataset.search || '').toLowerCase();
            const tagL = tag.toLowerCase();
            const match =
                (tag === 'Live' && search.includes('live')) ||
                (tag === 'New' && search.includes('new')) ||
                (tag === 'Full-Stack' && (search.includes('node') || search.includes('express') || search.includes('react') || search.includes('full'))) ||
                (tag === 'AI/ML' && (search.includes('ai') || search.includes('ml') || search.includes('tensorflow') || search.includes('streamlit') || search.includes('python'))) ||
                search.includes(tagL);
            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });
        row.style.display = visibleCount === 0 ? 'none' : '';
    });
}

/* ── 5. ANIMATED STATS COUNTER (About page) ─── */
const PORTFOLIO_STATS = [
    { value: 13, suffix: '+', label: 'Projects Built' },
    { value: 5, suffix: '+', label: 'Full-Stack Apps' },
    { value: 200, suffix: '+', label: 'Users Served' },
    { value: 300, suffix: '+', label: 'Volunteers Led' },
];

function buildStatsCounter(parentEl) {
    const grid = document.createElement('div');
    grid.className = 'stats-grid';
    grid.id = 'stats-grid';

    PORTFOLIO_STATS.forEach(s => {
        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <div class="stat-number">
                <span class="stat-count" data-target="${s.value}">0</span>
                <sup>${s.suffix}</sup>
            </div>
            <div class="stat-label">${s.label}</div>`;
        grid.appendChild(item);
    });

    parentEl.insertBefore(grid, parentEl.firstChild);

    // Intersection observer — only animate when visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                grid.querySelectorAll('.stat-count').forEach(el => animateCount(el));
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(grid);
}

function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
    }, 30);
}

/* ── 7. CURSOR SPOTLIGHT ────────────────────── */
function initCursorSpotlight() {
    const spotlight = document.getElementById('cursor-spotlight');
    if (!spotlight) return;
    document.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    });
    // Only show on hero / profile screen
    document.getElementById('page-projects')?.addEventListener('mouseenter', () => {
        spotlight.style.display = 'block';
    });
    document.getElementById('page-projects')?.addEventListener('mouseleave', () => {
        spotlight.style.display = 'none';
    });
}

/* ── 8. HERO PARTICLE CANVAS ────────────────── */
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particle-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.35;';
    hero.insertAdjacentElement('afterbegin', canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const count = 55;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.6 + 0.2,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ── 9. PAGE TRANSITION ANIMATION ──────────── */
const transitionOverlay = (() => {
    const el = document.createElement('div');
    el.className = 'page-transition-overlay';
    document.body.appendChild(el);
    return el;
})();

function pageTransition(callback) {
    transitionOverlay.classList.add('flash');
    setTimeout(() => {
        callback();
        transitionOverlay.classList.remove('flash');
    }, 220);
}

// Patch navigateTo to use transition
const _origNavigateTo = window.navigateTo;
// Will be patched after navigation.js loads — see app.js init

/* ── 10. SVG "A" INTRO ANIMATION ───────────── */
function buildSvgIntroLogo() {
    const logo = document.getElementById('intro-logo');
    if (!logo) return;
    logo.innerHTML = `
        <svg id="intro-svg-a" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg"
             style="width:160px;height:auto;display:block;margin:0 auto 16px;">
            <path id="svg-a-path"
                d="M10 90 L60 5 L110 90 M25 65 L95 65"
                stroke="#E50914" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"
                fill="none"
                style="stroke-dasharray:300;stroke-dashoffset:300;animation:drawA 1.2s ease forwards 0.3s;"/>
        </svg>`;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawA {
            to { stroke-dashoffset: 0; }
        }`;
    document.head.appendChild(style);
}

/* ── 11. KEYBOARD SHORTCUTS ──────────────────── */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Skip if typing in input
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
        if (document.getElementById('modal-overlay')?.classList.contains('open')) return;
        if (document.getElementById('shortcuts-modal')?.classList.contains('open')) return;

        switch (e.key) {
            case 'h': case 'H': navigateTo('projects'); break;
            case 's': case 'S':
                e.preventDefault();
                document.getElementById('search-input')?.focus();
                break;
            case '1': navigateTo('projects'); break;
            case '2': navigateTo('skills'); break;
            case '3': navigateTo('resume'); break;
            case '4': navigateTo('about'); break;
            case '5': navigateTo('contact'); break;
            case '?':
                document.getElementById('shortcuts-modal')?.classList.add('open');
                break;
        }
    });

    // Close shortcuts modal
    document.getElementById('shortcuts-modal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('shortcuts-modal')) {
            document.getElementById('shortcuts-modal').classList.remove('open');
        }
    });
    document.getElementById('shortcuts-close')?.addEventListener('click', () => {
        document.getElementById('shortcuts-modal')?.classList.remove('open');
    });
    document.getElementById('help-btn')?.addEventListener('click', () => {
        document.getElementById('shortcuts-modal')?.classList.add('open');
    });
}

/* ── 12. MY QUEUE (localStorage) ────────────── */
const MY_QUEUE_KEY = 'portfolio_my_queue';

function getQueue() {
    try { return JSON.parse(localStorage.getItem(MY_QUEUE_KEY) || '[]'); } catch { return []; }
}

function saveQueue(q) {
    localStorage.setItem(MY_QUEUE_KEY, JSON.stringify(q));
}

function toggleQueue(item, btn) {
    const queue = getQueue();
    const idx = queue.findIndex(i => i.id === item.id);
    if (idx === -1) {
        queue.push({ id: item.id, title: item.title || item.name, emoji: item.emoji || item.icon });
        saveQueue(queue);
        btn.classList.add('queued');
        showToast(`${item.emoji || '✅'} Added to My Queue`, 'success', 2500);
    } else {
        queue.splice(idx, 1);
        saveQueue(queue);
        btn.classList.remove('queued');
        showToast('Removed from My Queue', 'info', 2000);
    }
    refreshMyQueueRow();
}

function refreshMyQueueRow() {
    const queue = getQueue();
    const existing = document.getElementById('my-queue-row');
    if (existing) existing.remove();
    if (!queue.length) return;

    const items = queue.map(q => {
        const found = DATA.projects.find(p => p.id === q.id) ||
            DATA.skills.find(s => s.name === q.title);
        return found || { ...q, tags: [], desc: 'Saved to your queue' };
    });

    const page = document.getElementById(`page-${window.currentPage || 'projects'}`);
    if (!page) return;

    const existingRow = page.querySelector('.content-row');
    if (!existingRow) return;

    const row = document.createElement('div');
    row.id = 'my-queue-row';
    buildRow('🔖 My Queue', items, page, {});
    const built = page.lastElementChild;
    built.id = 'my-queue-row';
    page.insertBefore(built, existingRow);
}


/* ── 14. COPY EMAIL BUTTON ──────────────────── */
function initCopyEmail() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-email-btn');
        if (!btn) return;
        const email = btn.dataset.email || 'ayushmaan.ggn@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showToast('📋 Email copied to clipboard!', 'success', 2500);
        }).catch(() => {
            showToast('Could not copy — please copy manually: ' + email, 'info', 4000);
        });
    });
}

/* ── 15. BOTTOM MOBILE NAV ──────────────────── */
function buildBottomNav() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    const pages = ['projects', 'skills', 'resume', 'about', 'contact'];
    const labels = ['Projects', 'Skills', 'Resume', 'About', 'Contact'];
    const icons = ['🚀', '🛠️', '📄', '🎮', '📬'];

    const grid = document.createElement('div');
    grid.className = 'bottom-nav-grid';

    pages.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.className = 'bnav-item' + (p === 'projects' ? ' active' : '');
        btn.dataset.page = p;
        btn.innerHTML = `<span class="bnav-icon">${icons[i]}</span><span class="bnav-label">${labels[i]}</span>`;
        btn.addEventListener('click', () => {
            navigateTo(p);
            grid.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        grid.appendChild(btn);
    });
    nav.appendChild(grid);
}

// Keep bottom nav in sync with page changes
function syncBottomNav(pageId) {
    document.querySelectorAll('.bnav-item').forEach(b => {
        b.classList.toggle('active', b.dataset.page === pageId);
    });
}

/* ── 16. PULL-TO-REFRESH (mobile) ───────────── */
function initPullToRefresh() {
    let startY = 0;
    let pulling = false;
    const indicator = document.getElementById('ptr-indicator');

    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            pulling = true;
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!pulling) return;
        const dy = e.touches[0].clientY - startY;
        if (dy > 60 && indicator) indicator.classList.add('visible');
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (!pulling) return;
        pulling = false;
        if (indicator?.classList.contains('visible')) {
            indicator.textContent = '🔄 Refreshing…';
            setTimeout(() => {
                indicator.classList.remove('visible');
                indicator.textContent = '↓ Pull to refresh';
                window.location.reload();
            }, 800);
        }
    });
}

/* ── 18. VISUAL TIMELINE (Resume page) ──────── */
const TIMELINE_DATA = [
    {
        year: '2024',
        items: [
            {
                emoji: '🎓',
                title: 'B.Tech CSE — Enrolled',
                desc: 'Started Bachelor of Technology in Computer Science & Engineering with CGPA 7.70/10.',
                tags: ['B.Tech', 'CSE', '2024–2028']
            }
        ]
    },
    {
        year: '2025',
        items: [
            {
                emoji: '🏅',
                title: 'Vice President, NSS',
                desc: 'Elected Vice President of the National Service Scheme. Led 300+ volunteers across 50+ social initiatives.',
                tags: ['NSS', 'Leadership', 'May 2025']
            },
            {
                emoji: '💻',
                title: 'Web Developer — Bridgehut',
                desc: 'Part-time role building 3+ full-stack applications, 10+ REST APIs reducing manual processing by 40%.',
                tags: ['Part-time', 'Full-Stack', 'Sep 2025']
            },
            {
                emoji: '🧺',
                title: 'Laundry Buddy Launched',
                desc: 'Deployed full-stack PWA for hostel laundry management — 200+ active users, Docker on Render.',
                tags: ['PWA', 'Node.js', 'MongoDB']
            }
        ]
    },
    {
        year: '2026',
        items: [
            {
                emoji: '🏥',
                title: 'ReLive AI — In Development',
                desc: 'Building AI-powered post-operative monitoring platform with LSTM + XGBoost for healthcare hackathon.',
                tags: ['FastAPI', 'AI/ML', 'In Progress']
            },
            {
                emoji: '⚛️',
                title: 'QuantumForge DMET',
                desc: 'Released quantum many-body simulator using DMET theory on the Hubbard model with Streamlit UI.',
                tags: ['Python', 'Research', 'Streamlit']
            }
        ]
    }
];

function buildResumePage() {
    const page = document.getElementById('page-resume');

    // Header with download button
    const header = document.createElement('div');
    header.className = 'resume-header';
    header.innerHTML = `
        <h2>My Journey</h2>
        <a href="resume.pdf" download="Ayushmaan_Yadav_Resume.pdf" class="download-resume-btn">
            <span class="dl-icon">⬇</span> Download Resume PDF
        </a>`;
    page.appendChild(header);

    // Timeline
    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    TIMELINE_DATA.forEach(group => {
        const yearEl = document.createElement('div');
        yearEl.className = 'timeline-year';
        yearEl.textContent = group.year;
        timeline.appendChild(yearEl);

        group.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'timeline-item';
            row.innerHTML = `
                <div class="timeline-card">
                    <span class="timeline-card-emoji">${item.emoji}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <div class="timeline-card-tags">
                        ${item.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>`;
            timeline.appendChild(row);
        });
    });

    // "Present" marker
    const present = document.createElement('div');
    present.className = 'timeline-year';
    present.innerHTML = `<span style="color:#06d6a0;font-size:1rem;font-weight:700;letter-spacing:2px;">● PRESENT</span>`;
    timeline.appendChild(present);

    page.appendChild(timeline);
}
