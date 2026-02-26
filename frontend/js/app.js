/* ═══════════════════════════════════════════
   APP – Main initialization
   ═══════════════════════════════════════════ */

function initScrollAnimations() {
    // Only animate rows that are below the fold (scrolled to)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    // Only observe rows NOT already set to visible by CSS
    document.querySelectorAll('.content-row').forEach((row) => {
        observer.observe(row);
    });
}

function init() {
    initNavbar();

    // ── Inject hidden SEO content to boost "Ayushmaan" on page load ──
    const seoDiv = document.createElement('div');
    seoDiv.style.display = 'none';
    seoDiv.style.visibility = 'hidden';
    seoDiv.innerHTML = `
        <h1>Ayushmaan Yadav - Portfolio</h1>
        <h2>Ayushmaan - Software Engineer & Full-Stack Developer</h2>
        <p>I am Ayushmaan, a web developer, engineer, and tech student. Known as Ayushmaan Yadav, I build optimized web applications.</p>
    `;
    document.body.insertBefore(seoDiv, document.body.firstChild);

    // Build all pages
    buildProjectsPage();
    buildSkillsPage();
    buildResumePage();   // Now uses visual timeline
    buildAboutPage();    // Now has stats counter
    buildContactPage();

    initScrollAnimations();

    // ── Feature inits ──
    buildBottomNav();
    initCursorSpotlight();
    initKeyboardShortcuts();
    initCopyEmail();
    initPullToRefresh();

    // Start activity bar AFTER hero is built
    setTimeout(() => {
        initActivityBar();
        initProgressScrub();
    }, 100);

    initIntro();
}

document.addEventListener('DOMContentLoaded', init);

// ── Patch navigateTo to include page transition + sync bottom nav ──
const _navigateToOriginal = navigateTo;
window.navigateTo = function (pageId) {
    pageTransition(() => _navigateToOriginal(pageId));
    syncBottomNav(pageId);
};

// ── Handle browser back/forward ──
window.addEventListener('popstate', () => {
    const page = resolveHashRoute();
    navigateTo(page);
});
