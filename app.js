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
    document.getElementById('glowOrb1'),
    document.getElementById('glowOrb2'),
    document.getElementById('glowOrb3'),
    document.getElementById('glowOrb4')
  ].filter(el => el !== null);

  if (!elements.length) return;

  // Independent randomized physics state for each orb
  const orbs = elements.map((el, i) => ({
    el,
    x: (Math.random() - 0.5) * 80,
    y: (Math.random() - 0.5) * 80,
    targetX: (Math.random() - 0.5) * 160,
    targetY: (Math.random() - 0.5) * 160,
    speed: 0.003 + (Math.random() * 0.003),
    freqX: 0.0008 + (Math.random() * 0.0006),
    freqY: 0.0006 + (Math.random() * 0.0005),
    phase: i * 2.5,
    timer: Math.floor(Math.random() * 180) + 120
  }));

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      targetMouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.025;
      targetMouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.025;
    }
  }, { passive: true });

  let time = 0;

  function updateRandomDrift() {
    time += 1;
    mouseX += (targetMouseX - mouseX) * 0.03;
    mouseY += (targetMouseY - mouseY) * 0.03;

    orbs.forEach((orb) => {
      // Periodic target waypoint randomization
      orb.timer -= 1;
      if (orb.timer <= 0) {
        orb.targetX = (Math.random() - 0.5) * 220;
        orb.targetY = (Math.random() - 0.5) * 180;
        orb.speed = 0.0025 + (Math.random() * 0.0035);
        orb.timer = Math.floor(Math.random() * 300) + 180; // 3 to 8 seconds
      }

      // Smooth ease towards random target
      orb.x += (orb.targetX - orb.x) * orb.speed;
      orb.y += (orb.targetY - orb.y) * orb.speed;

      // Add continuous organic sine curve so paths are wavy and fluid
      const waveX = Math.sin((time * orb.freqX) + orb.phase) * 45;
      const waveY = Math.cos((time * orb.freqY) + orb.phase) * 35;

      const finalX = orb.x + waveX + mouseX;
      const finalY = orb.y + waveY + mouseY;

      orb.el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(updateRandomDrift);
  }

  updateRandomDrift();
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
