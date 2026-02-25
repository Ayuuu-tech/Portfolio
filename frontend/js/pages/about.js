/* ═══════════════════════════════════════════
   ABOUT PAGE BUILDER
   ═══════════════════════════════════════════ */

function buildAboutPage() {
    const page = document.getElementById('page-about');

    // Animated stats counter at the top
    buildStatsCounter(page);

    // Story rows
    const categories = [...new Set(DATA.about.map(a => a.category))];
    categories.forEach((cat) => {
        buildRow(cat, DATA.about.filter((a) => a.category === cat), page);
    });
}
