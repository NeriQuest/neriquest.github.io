// NeriQuest Studio - Modern Ambient Physics & Gallery Interactions

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initScreenshotDragScroll();
  initSmoothScrollLinks();
});

/* ==========================================================================
   1. Dynamic Organic Random Floating Glow Lights
   Continuous Brownian random walk with curved sine drift & gentle mouse influence
   ========================================================================== */
function initAmbientGlow() {
  const elements = [
    document.getElementById('glowOrb1') || document.querySelector('.glow-1'),
    document.getElementById('glowOrb2') || document.querySelector('.glow-2'),
    document.getElementById('glowOrb3') || document.querySelector('.glow-3'),
    document.getElementById('glowOrb4') || document.querySelector('.glow-4')
  ].filter(el => el !== null);

  if (!elements.length) return;

  // Multi-harmonic physics configuration for wide, continuous, and visible organic drifting
  const orbs = [
    {
      el: elements[0],
      ampX1: 175, ampX2: 75,
      ampY1: 130, ampY2: 55,
      speedX1: 0.0017, speedX2: 0.0032,
      speedY1: 0.0020, speedY2: 0.0026,
      phaseX: 0.2, phaseY: 1.4
    },
    {
      el: elements[1],
      ampX1: 160, ampX2: 85,
      ampY1: 155, ampY2: 65,
      speedX1: 0.0019, speedX2: 0.0029,
      speedY1: 0.0015, speedY2: 0.0036,
      phaseX: 2.6, phaseY: 3.9
    },
    {
      el: elements[2],
      ampX1: 195, ampX2: 70,
      ampY1: 135, ampY2: 75,
      speedX1: 0.0016, speedX2: 0.0034,
      speedY1: 0.0022, speedY2: 0.0023,
      phaseX: 4.3, phaseY: 0.8
    },
    {
      el: elements[3],
      ampX1: 185, ampX2: 80,
      ampY1: 145, ampY2: 60,
      speedX1: 0.0021, speedX2: 0.0027,
      speedY1: 0.0018, speedY2: 0.0033,
      phaseX: 1.9, phaseY: 5.4
    }
  ];

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.055;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.055;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      targetMouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.035;
      targetMouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.035;
    }
  }, { passive: true });

  let time = 0;

  function updateMotion() {
    time += 1;
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    orbs.forEach((orb) => {
      // Compound harmonic wave calculation delivers continuous, fluid, non-repeating trajectories
      const waveX = Math.sin(time * orb.speedX1 + orb.phaseX) * orb.ampX1 +
                    Math.cos(time * orb.speedX2 + orb.phaseX * 1.5) * orb.ampX2;
      const waveY = Math.cos(time * orb.speedY1 + orb.phaseY) * orb.ampY1 +
                    Math.sin(time * orb.speedY2 + orb.phaseY * 1.5) * orb.ampY2;

      const finalX = waveX + mouseX;
      const finalY = waveY + mouseY;

      orb.el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(updateMotion);
  }

  requestAnimationFrame(updateMotion);
}

/* ==========================================================================
   2. Intuitive Click & Drag Scrolling for Screenshot Tracks
   ========================================================================== */
function initScreenshotDragScroll() {
  const tracks = document.querySelectorAll('.screenshots-scroll-track');
  
  tracks.forEach(track => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6; // Scroll speed multiplier
      track.scrollLeft = scrollLeft - walk;
    });

    track.style.cursor = 'grab';
  });
}

/* ==========================================================================
   3. Smooth Scroll Links Handling
   ========================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
