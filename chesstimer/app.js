// ChessTimer Interactive Experience, Clock Simulation & Ambient System

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initChessClockSimulator();
  initScreenshotGallery();
  initFAQAccordion();
});

/* ==========================================================================
   1. Dynamic Moving Ambient Glow Lights (Subtle, blurred floating halos)
   ========================================================================== */
function initAmbientGlow() {
  const elements = [
    document.getElementById('glowOrb1'),
    document.getElementById('glowOrb2'),
    document.getElementById('glowOrb3'),
    document.getElementById('glowOrb4')
  ].filter(el => el !== null);

  if (!elements.length) return;

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

  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      targetMouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.02;
      targetMouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.02;
    }
  }, { passive: true });

  let time = 0;

  function renderGlow() {
    time += 1;
    orbs.forEach((orb) => {
      orb.timer -= 1;
      if (orb.timer <= 0) {
        orb.targetX = (Math.random() - 0.5) * 180;
        orb.targetY = (Math.random() - 0.5) * 180;
        orb.timer = Math.floor(Math.random() * 240) + 180;
      }

      orb.x += (orb.targetX - orb.x) * orb.speed;
      orb.y += (orb.targetY - orb.y) * orb.speed;

      const waveX = Math.sin(time * orb.freqX + orb.phase) * 60;
      const waveY = Math.cos(time * orb.freqY + orb.phase) * 60;

      const finalX = orb.x + waveX + targetMouseX;
      const finalY = orb.y + waveY + targetMouseY;

      orb.el.style.transform = `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0)`;
    });

    requestAnimationFrame(renderGlow);
  }

  requestAnimationFrame(renderGlow);
}

/* ==========================================================================
   2. Web Audio Acoustic Feedback (Tactile Pluck, Ticking & Buzzer)
   Synthesized via Web Audio API without requiring external MP3 downloads
   ========================================================================== */
class ChessAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPluck() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (_) {}
  }

  playTick() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (_) {}
  }

  playBuzzer() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch (_) {}
  }
}

/* ==========================================================================
   3. Dual Chess Clock Simulation Engine
   ========================================================================== */
function initChessClockSimulator() {
  const p1Panel = document.getElementById('player1Panel');
  const p2Panel = document.getElementById('player2Panel');
  const p1TimeEl = document.getElementById('p1Time');
  const p2TimeEl = document.getElementById('p2Time');
  const p1Ring = document.getElementById('p1Ring');
  const p2Ring = document.getElementById('p2Ring');
  const p1MovesEl = document.getElementById('p1Moves');
  const p2MovesEl = document.getElementById('p2Moves');
  const p1IncEl = document.getElementById('p1Inc');
  const p2IncEl = document.getElementById('p2Inc');
  const p1Hint = document.getElementById('p1Hint');
  const p2Hint = document.getElementById('p2Hint');
  const matchStatusText = document.getElementById('matchStatusText');
  const matchStatusPill = document.getElementById('matchStatusPill');
  const pauseCenterBtn = document.getElementById('pauseCenterBtn');
  const resetClockBtn = document.getElementById('resetClockBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const flipViewBtn = document.getElementById('flipViewBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const simToast = document.getElementById('simToast');

  if (!p1Panel || !p2Panel) return;

  const audio = new ChessAudioEngine();
  const CIRCUMFERENCE = 2 * Math.PI * 62; // ~389.55

  // Match State
  let initialDuration = 180; // 3 min
  let incrementSeconds = 2;   // +2s
  let p1Remaining = initialDuration;
  let p2Remaining = initialDuration;
  let p1Moves = 0;
  let p2Moves = 0;
  let activePlayer = null; // null: not started, 1: Black, 2: White
  let isPaused = false;
  let timerInterval = null;
  let gameOver = false;

  function formatTime(totalSeconds) {
    if (totalSeconds <= 0) return '00:00';
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateRings() {
    const p1Ratio = Math.max(0, p1Remaining / initialDuration);
    const p2Ratio = Math.max(0, p2Remaining / initialDuration);

    p1Ring.style.strokeDashoffset = (CIRCUMFERENCE * (1 - p1Ratio)).toString();
    p2Ring.style.strokeDashoffset = (CIRCUMFERENCE * (1 - p2Ratio)).toString();

    p1TimeEl.textContent = formatTime(p1Remaining);
    p2TimeEl.textContent = formatTime(p2Remaining);

    // Low time visual warnings (<10s)
    if (p1Remaining <= 10 && p1Remaining > 0) {
      p1Panel.classList.add('low-time');
    } else {
      p1Panel.classList.remove('low-time');
    }

    if (p2Remaining <= 10 && p2Remaining > 0) {
      p2Panel.classList.add('low-time');
    } else {
      p2Panel.classList.remove('low-time');
    }
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (isPaused || !activePlayer || gameOver) return;

      if (activePlayer === 1) {
        p1Remaining -= 0.1;
        if (p1Remaining <= 0) {
          p1Remaining = 0;
          flagFall(1);
        } else if (p1Remaining <= 10 && Math.floor(p1Remaining * 10) % 10 === 0) {
          audio.playTick();
        }
      } else if (activePlayer === 2) {
        p2Remaining -= 0.1;
        if (p2Remaining <= 0) {
          p2Remaining = 0;
          flagFall(2);
        } else if (p2Remaining <= 10 && Math.floor(p2Remaining * 10) % 10 === 0) {
          audio.playTick();
        }
      }
      updateRings();
    }, 100);
  }

  function flagFall(losingPlayer) {
    gameOver = true;
    clearInterval(timerInterval);
    audio.playBuzzer();
    const winner = losingPlayer === 1 ? 'White' : 'Black';
    matchStatusText.textContent = `Time Expired! ${winner} Wins on Time`;
    matchStatusPill.style.color = '#ef4444';
    showToast(`Time Expired! ${winner} Wins!`);
  }

  function showToast(msg) {
    simToast.textContent = msg;
    simToast.classList.add('show');
    setTimeout(() => {
      simToast.classList.remove('show');
    }, 1600);
  }

  function switchTurn(fromPlayer) {
    if (gameOver) return;

    audio.playPluck();

    if (activePlayer === null) {
      // First move starts match
      activePlayer = fromPlayer === 2 ? 1 : 2;
    } else if (activePlayer === fromPlayer) {
      // Add Fischer increment to the player finishing their move
      if (fromPlayer === 1) {
        p1Remaining += incrementSeconds;
        p1Moves += 1;
        p1MovesEl.textContent = p1Moves;
        activePlayer = 2;
      } else {
        p2Remaining += incrementSeconds;
        p2Moves += 1;
        p2MovesEl.textContent = p2Moves;
        activePlayer = 1;
      }
    } else {
      // Clicked on inactive player
      return;
    }

    isPaused = false;
    updateActiveStyles();
    startTimer();
  }

  function updateActiveStyles() {
    if (activePlayer === 1) {
      p1Panel.classList.add('active-turn');
      p2Panel.classList.remove('active-turn');
      p1Hint.textContent = 'Your Turn • Tap when move complete';
      p2Hint.textContent = 'Opponent Thinking...';
      matchStatusText.textContent = 'Active: Player 1 (Black)';
    } else if (activePlayer === 2) {
      p2Panel.classList.add('active-turn');
      p1Panel.classList.remove('active-turn');
      p2Hint.textContent = 'Your Turn • Tap when move complete';
      p1Hint.textContent = 'Opponent Thinking...';
      matchStatusText.textContent = 'Active: Player 2 (White)';
    } else {
      p1Panel.classList.remove('active-turn');
      p2Panel.classList.remove('active-turn');
      matchStatusText.textContent = 'Ready • Tap White to Start';
      p1Hint.textContent = 'Tap to start';
      p2Hint.textContent = 'White plays first • Tap to start';
    }
  }

  function togglePause() {
    if (activePlayer === null || gameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
      showToast('Game Paused • Long-press or tap to resume');
      matchStatusText.textContent = 'Game Paused';
      pauseCenterBtn.innerHTML = '▶';
    } else {
      showToast('Game Resumed');
      matchStatusText.textContent = activePlayer === 1 ? 'Active: Player 1 (Black)' : 'Active: Player 2 (White)';
      pauseCenterBtn.innerHTML = '⏸';
      startTimer();
    }
  }

  function resetMatch() {
    clearInterval(timerInterval);
    p1Remaining = initialDuration;
    p2Remaining = initialDuration;
    p1Moves = 0;
    p2Moves = 0;
    activePlayer = null;
    isPaused = false;
    gameOver = false;
    p1MovesEl.textContent = '0';
    p2MovesEl.textContent = '0';
    p1Panel.classList.remove('low-time', 'active-turn');
    p2Panel.classList.remove('low-time', 'active-turn');
    pauseCenterBtn.innerHTML = '⏸';
    matchStatusPill.style.color = '';
    updateActiveStyles();
    updateRings();
    showToast('Match Clock Reset');
  }

  // Click Turn Switch
  p1Panel.addEventListener('click', () => switchTurn(1));
  p2Panel.addEventListener('click', () => switchTurn(2));

  // Long-Press Universal Pause
  let pressTimer = null;
  const boardEl = document.getElementById('clockBoard');

  function startLongPress(e) {
    if (e.target.closest('.tool-btn') || e.target.closest('.preset-btn') || e.target.closest('#pauseCenterBtn')) return;
    pressTimer = setTimeout(() => {
      togglePause();
    }, 600);
  }

  function cancelLongPress() {
    if (pressTimer) clearTimeout(pressTimer);
  }

  boardEl.addEventListener('mousedown', startLongPress);
  boardEl.addEventListener('mouseup', cancelLongPress);
  boardEl.addEventListener('mouseleave', cancelLongPress);

  boardEl.addEventListener('touchstart', startLongPress, { passive: true });
  boardEl.addEventListener('touchend', cancelLongPress);
  boardEl.addEventListener('touchcancel', cancelLongPress);

  // Center Pause button
  pauseCenterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePause();
  });

  // Reset button
  resetClockBtn.addEventListener('click', resetMatch);

  // Sound Toggle
  soundToggleBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    if (audio.enabled) {
      soundIcon.textContent = '🔊';
      soundToggleBtn.querySelector('.tool-text').textContent = 'Sound ON';
      showToast('Sound Alerts Enabled');
    } else {
      soundIcon.textContent = '🔇';
      soundToggleBtn.querySelector('.tool-text').textContent = 'Muted';
      showToast('Sound Muted');
    }
  });

  // Face-to-Face toggle (rotates Player 1)
  let faceToFace = false;
  flipViewBtn.addEventListener('click', () => {
    faceToFace = !faceToFace;
    if (faceToFace) {
      p1Panel.classList.add('face-to-face');
      flipViewBtn.style.color = 'var(--accent-gold)';
      showToast('Face-to-Face: Player 1 Inverted 180°');
    } else {
      p1Panel.classList.remove('face-to-face');
      flipViewBtn.style.color = '';
      showToast('Single-Side View Restored');
    }
  });

  // Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initialDuration = parseInt(btn.dataset.time, 10);
      incrementSeconds = parseInt(btn.dataset.inc, 10);
      p1IncEl.textContent = incrementSeconds;
      p2IncEl.textContent = incrementSeconds;
      resetMatch();
    });
  });

  // Initialize
  updateRings();
}

/* ==========================================================================
   4. Screenshot Gallery Navigation
   ========================================================================== */
function initScreenshotGallery() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('prevGalleryBtn');
  const nextBtn = document.getElementById('nextGalleryBtn');
  const dotsContainer = document.getElementById('galleryDots');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = track.querySelectorAll('.gallery-card');
  if (!cards.length) return;

  // Create dots
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 24;
      track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.gallery-dot');

  prevBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    const activeIndex = Math.round(track.scrollLeft / cardWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Searchable User Guide / FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearchInput');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const keywords = (item.dataset.keywords || '').toLowerCase();

        if (!query || text.includes(query) || keywords.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}
