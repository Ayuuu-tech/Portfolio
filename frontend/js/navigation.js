/* ═══════════════════════════════════════════
   NAVIGATION – page switching + hash routing
   ═══════════════════════════════════════════ */

const VALID_PAGES = ['projects', 'skills', 'resume', 'about', 'contact'];
let currentPage = 'projects';

function navigateTo(pageId) {
    if (!VALID_PAGES.includes(pageId)) pageId = 'projects';
    currentPage = pageId;

    // Toggle active page
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');

    // Toggle active desktop nav link
    document.querySelectorAll('.nav-links a').forEach((a) => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });

    // Sync mobile active link
    if (typeof syncMobileActiveLink === 'function') syncMobileActiveLink(pageId);

    // Reset search
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.card').forEach((c) => {
        c.style.opacity = '';
        c.style.transform = '';
        c.style.pointerEvents = '';
    });

    window.scrollTo(0, 0);

    // ── Navbar: opaque immediately on non-hero pages ──
    const navbar = document.getElementById('navbar');
    if (pageId === 'projects') {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    } else {
        navbar.classList.add('scrolled');
    }

    // ✅ Expose currentPage globally for navbar scroll handler
    window.currentPage = pageId;

    // ✅ Update hash for bookmarkable/shareable URLs
    history.replaceState(null, '', `#${pageId}`);

    // Hero auto-cycle only on projects page
    if (pageId === 'projects') {
        startHero();
        // Add particle canvas if not yet present
        if (!document.getElementById('hero-particle-canvas')) {
            initHeroParticles();
        }
    } else {
        clearInterval(heroInterval);
    }
}

// ── Hash-based routing on load ──
function resolveHashRoute() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_PAGES.includes(hash) ? hash : 'projects';
}
