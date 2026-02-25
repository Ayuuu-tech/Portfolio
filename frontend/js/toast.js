/* ═══════════════════════════════════════════
   TOAST – In-page notification system
   (replaces all alert() calls)
   ═══════════════════════════════════════════ */

(function () {
    // Create container once
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);

    /**
     * Show a toast notification.
     * @param {string} message  – Text to display
     * @param {'success'|'error'|'info'} type
     * @param {number} duration – ms before auto-dismiss (default 4000)
     */
    window.showToast = function (message, type = 'success', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = { success: '✅', error: '❌', info: 'ℹ️' }[type] || '✅';
        toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${message}</span><button class="toast-close">✕</button>`;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => toast.classList.add('toast-visible'));

        const dismiss = () => {
            toast.classList.remove('toast-visible');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', dismiss);
        setTimeout(dismiss, duration);
    };
})();
