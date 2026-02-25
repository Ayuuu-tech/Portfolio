/* ═══════════════════════════════════════════
   INTRO – Logo animation sequence
   ═══════════════════════════════════════════ */

function initIntro() {
    const screen = document.getElementById('intro-screen');
    const logo = document.getElementById('intro-logo');

    // ── SVG "A" draw animation ──
    buildSvgIntroLogo();


    setTimeout(() => {
        const angles = [0, 60, 120, 180, 240, 300];
        angles.forEach((a, i) => {
            const p = document.createElement('div');
            p.className = 'intro-particle';
            const rad = (a * Math.PI) / 180;
            const dist = 100 + Math.random() * 60;

            p.style.cssText = `left:50%;top:50%;`;

            // Create unique keyframe for this particle
            const style = document.createElement('style');
            style.textContent = `
        @keyframes pb${i} {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(${Math.cos(rad) * dist}px, ${Math.sin(rad) * dist}px) scale(0); opacity: 0; }
        }`;
            document.head.appendChild(style);

            p.style.animation = `pb${i} 1s ${i * 60}ms ease-out forwards`;
            screen.appendChild(p);
        });
    }, 1200);

    // Concentric rings
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            const r = document.createElement('div');
            r.className = 'intro-ring';
            r.style.cssText = `left:50%;top:50%;transform:translate(-50%,-50%);animation-delay:${i * 200}ms;`;
            screen.appendChild(r);
        }
    }, 1400);

    // Glow pulse on the logo
    setTimeout(() => {
        logo.style.animation = 'glowPulse 1.2s ease-in-out 2';
    }, 1600);

    // Fade out and transition to profile selection
    setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.style.display = 'none';
            showProfileScreen();
        }, 800);
    }, 3200);
}
