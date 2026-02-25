/* ═══════════════════════════════════════════
   MODAL – detail overlay
   ═══════════════════════════════════════════ */

function openModal(item) {
  const overlay = document.getElementById('modal-overlay');
  const hero = document.getElementById('modal-hero');
  const body = document.getElementById('modal-body');

  // ── Hero background ──
  const theme = getColorForEmoji(item.emoji || item.icon);
  hero.style.background = `linear-gradient(135deg,${theme.c1},${theme.c2},#111)`;

  // Preserve close button and gradient overlay, rebuild emoji
  const closeBtn = hero.querySelector('.modal-close');
  const gradDiv = hero.querySelector('.modal-hero-gradient');
  hero.innerHTML = '';
  hero.appendChild(closeBtn);
  hero.appendChild(gradDiv);

  const emojiSpan = document.createElement('span');
  emojiSpan.className = 'modal-hero-emoji';
  emojiSpan.textContent = item.emoji || item.icon || '';
  hero.appendChild(emojiSpan);

  // ── Proficiency bar (skills) via CSS classes ──
  let levelHtml = '';
  if (item.level !== undefined) {
    const label = item.level >= 85 ? 'Expert' : item.level >= 70 ? 'Advanced' : item.level >= 50 ? 'Intermediate' : 'Beginner';
    levelHtml = `
      <div class="modal-level">
        <div class="modal-level-header">
          <span>Proficiency</span><span>${item.level}% · ${label}</span>
        </div>
        <div class="modal-level-track">
          <div class="modal-level-fill" style="width:${item.level}%"></div>
        </div>
      </div>`;
  }

  // ── Body ──
  body.innerHTML = `
    <h2>${item.title || item.name || ''}</h2>
    <p>${item.desc || ''}</p>
    ${levelHtml}
    <div class="modal-tags">${(item.tags || []).map(t => `<span>${t}</span>`).join('')}</div>
    <div class="modal-actions">
      ${item.link
      ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="modal-link-btn"><button class="btn-primary">Open Link →</button></a>`
      : '<button class="btn-primary">▶ View Details</button>'}
      <button class="btn-secondary" id="modal-close-body">Close</button>
    </div>`;

  body.querySelector('#modal-close-body')?.addEventListener('click', closeModal);

  // Reset spring animation
  const box = document.getElementById('modal-box');
  box.style.animation = 'none';
  box.offsetHeight;   // force reflow
  box.style.animation = '';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Event listeners ──
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ✅ Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
