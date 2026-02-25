/* ═══════════════════════════════════════════
   PROFILE SELECTION – "Who is browsing?"
   ═══════════════════════════════════════════ */

function showProfileScreen() {

    const ps = document.getElementById('profile-screen');
    const grid = document.getElementById('profile-grid');
    grid.innerHTML = '';

    ps.style.display = 'flex';
    ps.classList.remove('fade-out');
    ps.style.opacity = '1';
    document.getElementById('app').classList.remove('visible');

    DATA.profiles.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.style.animationDelay = `${i * 120}ms`;
        card.innerHTML = `
      <div class="profile-icon">${p.icon}</div>
      <div class="profile-label">${p.label}</div>`;
        card.addEventListener('click', () => selectProfile(p.id));
        grid.appendChild(card);
    });
}

function selectProfile(pageId) {
    const ps = document.getElementById('profile-screen');
    ps.classList.add('fade-out');

    const finalPage = window.location.hash ? resolveHashRoute() : pageId;

    setTimeout(() => {
        ps.style.display = 'none';
        document.getElementById('app').classList.add('visible');
        navigateTo(finalPage);
    }, 600);
}
