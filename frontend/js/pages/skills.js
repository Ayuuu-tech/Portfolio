/* ═══════════════════════════════════════════
   SKILLS PAGE BUILDER
   ═══════════════════════════════════════════ */

function buildSkillsPage() {
    const page = document.getElementById('page-skills');

    // LeetCode stats card at the top
    buildLeetcodeStats(page);

    // Skill rows grouped by category
    const categories = [...new Set(DATA.skills.map(s => s.category))];
    categories.forEach((cat) => {
        const items = DATA.skills.filter((s) => s.category === cat);
        buildRow(cat, items, page, { isSkill: true });
    });
}
