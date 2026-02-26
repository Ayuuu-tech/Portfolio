/* ═══════════════════════════════════════════
   CARD & ROW BUILDERS
   ═══════════════════════════════════════════ */

/**
 * Generate a rich, vibrant gradient theme seeded from an emoji.
 */
function getColorForEmoji(emoji) {
  const themes = [
    { c1: '#f72585', c2: '#2d0a1b' }, // Neon Pink -> Dark Maroon
    { c1: '#4361ee', c2: '#0b132b' }, // Royal Blue -> Midnight
    { c1: '#06d6a0', c2: '#00291d' }, // Mint Green -> Deep Forest
    { c1: '#7209b7', c2: '#1a0033' }, // Deep Violet -> Black Purple
    { c1: '#ff9e00', c2: '#2e1c00' }, // Golden Orange -> Dark Brown
    { c1: '#00b4d8', c2: '#001a2c' }, // Cyan -> Deep Navy
    { c1: '#e63946', c2: '#300206' }, // Crimson Red -> Dark Blood
    { c1: '#3a0ca3', c2: '#0d0221' }  // Indigo -> Pitch Purple
  ];
  let hash = 0;
  for (let i = 0; i < (emoji || '').length; i++) {
    hash = emoji.charCodeAt(i) + ((hash << 5) - hash);
  }
  return themes[Math.abs(hash) % themes.length];
}

/**
 * Create a single card element.
 */
function createCard(item, options = {}) {
  const { showRank, isSkill } = options;
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.search = `${item.title || item.name} ${(item.tags || []).join(' ')} ${item.desc || ''} ${item.category || ''}`;

  let badges = '';
  if (item.isNew) badges += '<div class="card-badge badge-new">NEW</div>';
  if (item.isLive) badges += '<div class="card-badge badge-live"><span class="dot"></span>LIVE</div>';

  let rankHtml = '';
  if (showRank && item.rank && item.rank <= 10) {
    rankHtml = `<div class="top10-num">${item.rank}</div>`;
    card.style.marginLeft = '30px';
  }

  const theme = getColorForEmoji(item.emoji || item.icon);
  const bg = `background:linear-gradient(135deg, ${theme.c1} 0%, ${theme.c2} 100%)`;

  card.innerHTML = `
    ${rankHtml}
    <div class="card-inner" style="${bg}">
      ${badges}
      <div class="card-emoji">${(item.emoji || item.icon || '').startsWith('http') ? `<img src="${item.emoji || item.icon}" style="width:55px; height:55px; object-fit:contain; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.4));" alt="${item.name || item.title || ''}" />` : (item.emoji || item.icon || '')}</div>
      <div class="card-gradient"></div>
      <div class="card-title">${item.title || item.name || ''}</div>
      ${isSkill ? `<div class="skill-bar-wrap"><div class="skill-bar" style="width:${item.level || 0}%"></div></div>` : ''}
    </div>
    <div class="card-preview">
      <div class="preview-actions">
        <button class="preview-play" title="View Project">▶</button>
        <button class="preview-queue queue-btn" title="Add to My Queue">+</button>
        <button title="Like">👍</button>
        <button title="More info">⌄</button>
      </div>
      <div class="preview-desc">${item.desc || `Proficiency: ${item.level}%` || ''}</div>
      <div class="preview-tags">${(item.tags || []).map((t) => `<span>${t}</span>`).join('')}</div>
    </div>`;

  const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // ── Tap behaviour: 1st tap = preview, 2nd tap = modal ──
  card.addEventListener('click', (e) => {
    if (e.target.closest('.preview-actions')) return;

    if (isTouchDevice()) {
      const preview = card.querySelector('.card-preview');
      if (!preview) { openModal(item); return; }

      const isOpen = card.classList.contains('touch-preview-open');
      // Close any other open previews
      document.querySelectorAll('.card.touch-preview-open').forEach(c => {
        if (c !== card) c.classList.remove('touch-preview-open');
      });

      if (isOpen) {
        openModal(item);
      } else {
        card.classList.add('touch-preview-open');
        // Auto-close after 4 seconds
        clearTimeout(card._previewTimer);
        card._previewTimer = setTimeout(() => card.classList.remove('touch-preview-open'), 4000);
      }
    } else {
      openModal(item);
    }
  });

  // ── Ripple effect on touch ──
  card.addEventListener('touchstart', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'card-ripple';
    const rect = card.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    ripple.style.cssText = `left:${x}px;top:${y}px`;
    card.querySelector('.card-inner')?.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, { passive: true });


  // Wire preview action buttons
  const inner = card.querySelector('.card-inner');
  const preview = card.querySelector('.card-preview');

  // ▶ Open modal
  card.querySelector('.preview-play')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(item);
  });

  // + Queue toggle
  const queueBtn = card.querySelector('.preview-queue');
  if (queueBtn) {
    const queue = getQueue();
    if (queue.find(q => q.id === item.id)) queueBtn.classList.add('queued');
    queueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleQueue(item, queueBtn);
    });
  }

  return card;
}

/**
 * Build a scrollable content row and attach it to parentEl.
 */
function buildRow(title, items, parentEl, options = {}) {
  if (!items.length) return;

  const row = document.createElement('div');
  row.className = 'content-row';
  row.innerHTML = `
    <div class="row-header">
      <h3>${title}</h3>
      <span class="row-arrow">›</span>
    </div>
    <div class="row-container">
      <button class="scroll-btn scroll-left">‹</button>
      <div class="row-scroll"></div>
      <button class="scroll-btn scroll-right">›</button>
    </div>`;

  const scroll = row.querySelector('.row-scroll');
  items.forEach((item) => scroll.appendChild(createCard(item, options)));

  row.querySelector('.scroll-left').addEventListener('click', () => {
    scroll.scrollBy({ left: -640, behavior: 'smooth' });
  });
  row.querySelector('.scroll-right').addEventListener('click', () => {
    scroll.scrollBy({ left: 640, behavior: 'smooth' });
  });

  // ── Drag-to-scroll ──
  let isDown = false;
  let startX, scrollLeft;
  let didDrag = false;

  scroll.addEventListener('mousedown', (e) => {
    isDown = true;
    didDrag = false;
    startX = e.pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
    scroll.classList.add('dragging');
  });

  scroll.addEventListener('mouseleave', () => {
    isDown = false;
    scroll.classList.remove('dragging');
  });

  scroll.addEventListener('mouseup', () => {
    isDown = false;
    scroll.classList.remove('dragging');
  });

  scroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) didDrag = true;
    scroll.scrollLeft = scrollLeft - walk;
  });

  // Prevent card click from firing after a drag
  scroll.addEventListener('click', (e) => {
    if (didDrag) e.stopPropagation();
  }, true);

  // ── Touch / Swipe scroll ──
  let touchStartX = 0;
  let touchScrollLeft = 0;
  let didSwipe = false;

  scroll.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = scroll.scrollLeft;
    didSwipe = false;
    scroll.style.scrollBehavior = 'auto';
  }, { passive: true });

  scroll.addEventListener('touchmove', (e) => {
    const dx = touchStartX - e.touches[0].pageX;
    if (Math.abs(dx) > 5) didSwipe = true;
    scroll.scrollLeft = touchScrollLeft + dx;
  }, { passive: true });

  scroll.addEventListener('touchend', () => {
    scroll.style.scrollBehavior = 'smooth';
  });

  // Prevent card click after a swipe
  scroll.addEventListener('click', (e) => {
    if (didSwipe) e.stopPropagation();
  }, true);

  parentEl.appendChild(row);
}
