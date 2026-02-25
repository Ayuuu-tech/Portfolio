/* ═══════════════════════════════════════════
   PROJECTS PAGE BUILDER
   ═══════════════════════════════════════════ */

function buildProjectsPage() {
    const page = document.getElementById('page-projects');

    // 1. Hero banner (inserted as first child)
    buildHero();

    // 2. Section wrapper — everything below the hero goes here in order
    const belowHero = document.createElement('div');
    belowHero.id = 'projects-below-hero';
    page.appendChild(belowHero);

    // 3. Project Filter Bar
    buildFilterBar(belowHero);

    // 4. Category rows
    const categories = [...new Set(DATA.projects.map(p => p.category))];
    categories.forEach((cat) => {
        const items = DATA.projects.filter((p) => p.category === cat);
        buildRow(cat, items, belowHero, { showRank: cat === 'Featured Projects' });
    });

    // 5. GitHub Live Stats — async, appended at the end (non-blocking)
    buildGithubStats(belowHero);
}
