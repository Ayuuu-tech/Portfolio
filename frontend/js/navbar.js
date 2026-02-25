/* ═══════════════════════════════════════════
   NAVBAR – setup, scroll, search, hamburger
   ═══════════════════════════════════════════ */

function initNavbar() {
    const linksContainer = document.getElementById('nav-links');
    const mobileLinksContainer = document.getElementById('mobile-nav-links');
    const pages = ['projects', 'skills', 'resume', 'about', 'contact'];
    const labels = ['Projects', 'Skills', 'Resume', 'About', 'Contact'];

    // Build desktop + mobile nav links together
    pages.forEach((p, i) => {
        // Desktop
        const a = document.createElement('a');
        a.textContent = labels[i];
        a.dataset.page = p;
        a.addEventListener('click', () => navigateTo(p));
        linksContainer.appendChild(a);

        // Mobile
        const ma = document.createElement('a');
        ma.textContent = labels[i];
        ma.dataset.page = p;
        ma.addEventListener('click', () => { navigateTo(p); closeMobileMenu(); });
        mobileLinksContainer.appendChild(ma);
    });

    // ── Scroll → dark navbar ──
    window.addEventListener('scroll', () => {
        const onProjects = window.currentPage === 'projects';
        const navbar = document.getElementById('navbar');
        if (!onProjects) {
            navbar.classList.add('scrolled');   // always opaque on non-hero pages
        } else {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
    });

    // ── Profile button ──
    document.getElementById('profile-btn').addEventListener('click', () => {
        clearInterval(heroInterval);
        showProfileScreen();
    });

    // ── Logo click → Projects ──
    document.getElementById('nav-logo').addEventListener('click', () => navigateTo('projects'));

    // ── Hamburger ──
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('open', isOpen);
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    // ── Live search ──
    document.getElementById('search-input').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.card').forEach((c) => {
            const match = !q || (c.dataset.search || '').toLowerCase().includes(q);
            c.style.opacity = match ? '1' : '.15';
            c.style.transform = match ? '' : 'scale(.92)';
            c.style.pointerEvents = match ? '' : 'none';
        });
    });
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('mobile-overlay').classList.remove('open');
    const btn = document.getElementById('hamburger-btn');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.getElementById('mobile-menu').setAttribute('aria-hidden', 'true');
}

// Keep mobile active links in sync
function syncMobileActiveLink(pageId) {
    document.querySelectorAll('#mobile-nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });
}
