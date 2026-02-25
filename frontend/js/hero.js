/* ═══════════════════════════════════════════
   HERO BANNER – featured project carousel
   ═══════════════════════════════════════════ */

let heroInterval = null;
let currentHeroSlide = 0;

// Expanded gradient palette — one per featured slot
const HERO_GRADIENTS = [
    'linear-gradient(135deg,#1a0000 0%,#0a0a0a 60%)',
    'linear-gradient(135deg,#001a1a 0%,#0a0a0a 60%)',
    'linear-gradient(135deg,#0d001a 0%,#0a0a0a 60%)',
    'linear-gradient(135deg,#001400 0%,#0a0a0a 60%)',
    'linear-gradient(135deg,#1a1000 0%,#0a0a0a 60%)',
];

function buildHero() {
    const featured = DATA.projects.filter((p) => p.featured);
    if (!featured.length) return;

    const container = document.getElementById('page-projects');

    const heroEl = document.createElement('div');
    heroEl.className = 'hero';

    featured.forEach((p, i) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
        slide.id = `hero-slide-${i}`;

        // ── Hero background ──
        const bg = document.createElement('div');
        bg.className = 'hero-bg';
        bg.style.background = HERO_GRADIENTS[i % HERO_GRADIENTS.length];
        slide.appendChild(bg);

        // ── Watermark emoji ──
        const wm = document.createElement('div');
        wm.className = 'hero-watermark';
        wm.textContent = p.emoji;
        slide.appendChild(wm);

        // ── Content ──
        const content = document.createElement('div');
        content.className = 'hero-content';

        const badge = document.createElement('div');
        badge.className = 'hero-badge';
        badge.textContent = p.category;
        content.appendChild(badge);

        const h1 = document.createElement('h1');
        h1.textContent = p.title;
        content.appendChild(h1);

        const desc = document.createElement('p');
        desc.textContent = p.desc;
        content.appendChild(desc);

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'hero-tags';
        (p.tags || []).forEach(t => {
            const s = document.createElement('span');
            s.textContent = t;
            tagsDiv.appendChild(s);
        });
        content.appendChild(tagsDiv);

        // ── Buttons — use addEventListener, NO inline onclick ──
        const btns = document.createElement('div');
        btns.className = 'hero-btns';

        const playBtn = document.createElement('button');
        playBtn.className = 'btn-play';
        playBtn.textContent = '▶ View Project';
        playBtn.addEventListener('click', () => openModal(p));
        btns.appendChild(playBtn);

        const infoBtn = document.createElement('button');
        infoBtn.className = 'btn-info';
        infoBtn.textContent = 'ℹ More Info';
        infoBtn.addEventListener('click', () => openModal(p));
        btns.appendChild(infoBtn);

        content.appendChild(btns);
        slide.appendChild(content);
        heroEl.appendChild(slide);
    });

    // ── Dots ──
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'hero-dots';
    featured.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.dataset.idx = i;
        dot.addEventListener('click', () => goToSlide(i));
        dotsDiv.appendChild(dot);
    });
    heroEl.appendChild(dotsDiv);

    container.insertAdjacentElement('afterbegin', heroEl);
}

function startHero() {
    clearInterval(heroInterval);
    currentHeroSlide = 0;          // ✅ reset on every page visit
    goToSlide(0);
    const featured = DATA.projects.filter((p) => p.featured);
    heroInterval = setInterval(() => {
        currentHeroSlide = (currentHeroSlide + 1) % featured.length;
        goToSlide(currentHeroSlide);
    }, 5000);
}

function goToSlide(idx) {
    currentHeroSlide = idx;
    document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === idx));
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}
