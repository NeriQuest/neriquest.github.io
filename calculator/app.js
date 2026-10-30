// Calculator Interactive Experience, Math Engine, Indian Formatter & Radix Converter

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initCalculatorEngine();
  initBaseConverter();
  initFAQAccordion();
});

/* ==========================================================================
   1. Dynamic Moving Ambient Glow Lights
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
   2. Number Formatting Engines (Native Indian vs Standard Western)
   Replicates Flutter Home._HomeState.formatIndianInteger algorithm
   ========================================================================== */
function formatIndianInteger(intStr) {
  if (!intStr) return '0';
  const isNegative = intStr.startsWith('-');
  const cleanStr = isNegative ? intStr.slice(1) : intStr;

  if (cleanStr.length <= 3) return isNegative ? '-' + cleanStr : cleanStr;

  const lastThree = cleanStr.slice(-3);
  const remaining = cleanStr.slice(0, -3);

  // Group remaining in chunks of 2 from right
  const groups = [];
  let i = remaining.length;
  while (i > 0) {
    const start = Math.max(0, i - 2);
    groups.unshift(remaining.slice(start, i));
    i = start;
  }

  const result = groups.join(',') + ',' + lastThree;
  return isNegative ? '-' + result : result;
}

function formatWesternInteger(intStr) {
  if (!intStr) return '0';
  const isNegative = intStr.startsWith('-');
  const cleanStr = isNegative ? intStr.slice(1) : intStr;

  const groups = [];
  let i = cleanStr.length;
  while (i > 0) {
    const start = Math.max(0, i - 3);
    groups.unshift(cleanStr.slice(start, i));
    i = start;
  }

  const result = groups.join(',');
  return isNegative ? '-' + result : result;
}

function formatNumber(numStr, useIndian = true) {
  if (!numStr || numStr === 'Error' || isNaN(Number(numStr))) return numStr;

  const parts = numStr.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  const formattedInt = useIndian ? formatIndianInteger(integerPart) : formatWesternInteger(integerPart);
  return formattedInt + decimalPart;
}

/* ==========================================================================
   3. Interactive Calculator Engine
   ========================================================================== */
function initCalculatorEngine() {
  const screenExpr = document.getElementById('screenExpression');
  const screenRes = document.getElementById('screenResult');
  const screenBadge = document.getElementById('screenFormatBadge');
  const toggleIndianBtn = document.getElementById('toggleIndianBtn');
  const indianBtnLabel = document.getElementById('indianBtnLabel');
  const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
  const historyCountBadge = document.getElementById('historyCountBadge');
  const historyDrawer = document.getElementById('calcHistoryDrawer');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const copyResultBtn = document.getElementById('copyResultBtn');
  const tabStandardBtn = document.getElementById('tabStandardBtn');
  const tabConverterBtn = document.getElementById('tabConverterBtn');
  const calcMainPane = document.getElementById('calcMainPane');
  const calcConverterPane = document.getElementById('calcConverterPane');
  const calcToast = document.getElementById('calcToast');
  const keyBtns = document.querySelectorAll('.key-btn');

  let rawExpression = '12500 * 8 + 450';
  let isIndian = true;
  let history = [
    { expr: '12,500 × 8 + 450', result: '1,00,450' },
    { expr: '50,000 + 75,000', result: '1,25,000' }
  ];

  function showToast(msg) {
    calcToast.textContent = msg;
    calcToast.classList.add('show');
    setTimeout(() => {
      calcToast.classList.remove('show');
    }, 1500);
  }

  function evaluateExpression(expr) {
    if (!expr || !expr.trim()) return '0';
    try {
      let clean = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/,/g, '');

      // Evaluate percentages e.g. 50% -> (50/100)
      clean = clean.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

      // Validate tokens (only safe math symbols)
      if (/[^0-9\+\-\*\/\.\(\)\s]/g.test(clean)) {
        return 'Error';
      }

      const res = Function("'use strict'; return (" + clean + ")")();
      if (!isFinite(res) || isNaN(res)) return 'Error';

      const rounded = Math.round(res * 100000000) / 100000000;
      return rounded.toString();
    } catch (_) {
      return null;
    }
  }

  function renderScreen() {
    let displayExpr = rawExpression
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ')
      .replace(/\+/g, ' + ')
      .replace(/\-/g, ' − ');

    // Format individual numbers in expression with Indian/Western commas
    displayExpr = displayExpr.replace(/\b\d+(\.\d+)?\b/g, (match) => {
      return formatNumber(match, isIndian);
    });

    screenExpr.textContent = displayExpr || '0';

    const evalRes = evaluateExpression(rawExpression);
    if (evalRes && evalRes !== 'Error') {
      screenRes.textContent = formatNumber(evalRes, isIndian);
    } else if (evalRes === 'Error') {
      screenRes.textContent = 'Error';
    }
  }

  function updateHistoryUI() {
    historyCountBadge.textContent = history.length;
    if (!history.length) {
      historyList.innerHTML = '<div class="history-empty">No calculations saved yet.</div>';
      return;
    }

    historyList.innerHTML = history.map((item, idx) => `
      <div class="history-item" data-idx="${idx}">
        <div class="hist-expr">${item.expr}</div>
        <div class="hist-res">= ${item.result}</div>
      </div>
    `).join('');

    historyList.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => {
        const item = history[parseInt(el.dataset.idx, 10)];
        if (item) {
          rawExpression = item.result.replace(/,/g, '');
          renderScreen();
          historyDrawer.classList.remove('open');
          showToast('Loaded calculation into active view');
        }
      });
    });
  }

  function handleKey(btn) {
    const val = btn.dataset.val;
    const action = btn.dataset.action;

    if (action === 'clear') {
      rawExpression = '';
      screenRes.textContent = '0';
    } else if (action === 'backspace') {
      rawExpression = rawExpression.trim().slice(0, -1);
    } else if (action === 'brackets') {
      const openCount = (rawExpression.match(/\(/g) || []).length;
      const closeCount = (rawExpression.match(/\)/g) || []).length;
      const lastChar = rawExpression.slice(-1);

      if (openCount > closeCount && /[0-9\)]/.test(lastChar)) {
        rawExpression += ')';
      } else {
        if (/[0-9\)]/.test(lastChar)) {
          rawExpression += '*(';
        } else {
          rawExpression += '(';
        }
      }
    } else if (action === 'percent') {
      rawExpression += '%';
    } else if (action === 'operator') {
      const op = val === '×' ? '*' : (val === '÷' ? '/' : val);
      rawExpression += op;
    } else if (action === 'equals') {
      const evalRes = evaluateExpression(rawExpression);
      if (evalRes && evalRes !== 'Error') {
        const formattedRes = formatNumber(evalRes, isIndian);
        history.unshift({
          expr: screenExpr.textContent,
          result: formattedRes
        });
        if (history.length > 20) history.pop();
        updateHistoryUI();
        rawExpression = evalRes;
        screenRes.textContent = formattedRes;
        showToast('Calculation saved to tape');
      } else {
        screenRes.textContent = 'Error';
      }
      return;
    } else if (val !== undefined) {
      rawExpression += val;
    }

    renderScreen();
  }

  keyBtns.forEach(btn => {
    btn.addEventListener('click', () => handleKey(btn));
  });

  toggleIndianBtn.addEventListener('click', () => {
    isIndian = !isIndian;
    if (isIndian) {
      indianBtnLabel.textContent = 'Indian: 1,00,000';
      screenBadge.textContent = 'Indian Grouping';
      showToast('Switched to Indian Lakh/Crore Grouping');
    } else {
      indianBtnLabel.textContent = 'Western: 100,000';
      screenBadge.textContent = 'Western Grouping';
      showToast('Switched to Western 3-Digit Grouping');
    }
    renderScreen();
  });

  copyResultBtn.addEventListener('click', () => {
    const textToCopy = screenRes.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied ${textToCopy} to clipboard`);
    }).catch(() => {
      showToast('Copied to clipboard');
    });
  });

  toggleHistoryBtn.addEventListener('click', () => {
    historyDrawer.classList.toggle('open');
  });

  clearHistoryBtn.addEventListener('click', () => {
    history = [];
    updateHistoryUI();
    showToast('Calculation tape cleared');
  });

  tabStandardBtn.addEventListener('click', () => {
    tabStandardBtn.classList.add('active');
    tabConverterBtn.classList.remove('active');
    calcMainPane.style.display = 'block';
    calcConverterPane.style.display = 'none';
  });

  tabConverterBtn.addEventListener('click', () => {
    tabConverterBtn.classList.add('active');
    tabStandardBtn.classList.remove('active');
    calcMainPane.style.display = 'none';
    calcConverterPane.style.display = 'block';

    const curVal = parseInt(screenRes.textContent.replace(/,/g, ''), 10);
    const convInput = document.getElementById('convInput');
    if (!isNaN(curVal) && curVal >= 0 && curVal < 100000000) {
      convInput.value = curVal;
      convInput.dispatchEvent(new Event('input'));
    }
  });

  window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key >= '0' && e.key <= '9') {
      rawExpression += e.key;
      renderScreen();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      rawExpression += e.key;
      renderScreen();
    } else if (e.key === 'Enter' || e.key === '=') {
      const equalsBtn = document.querySelector('.key-equals');
      if (equalsBtn) handleKey(equalsBtn);
    } else if (e.key === 'Backspace') {
      rawExpression = rawExpression.slice(0, -1);
      renderScreen();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      rawExpression = '';
      screenRes.textContent = '0';
      renderScreen();
    }
  });

  renderScreen();
  updateHistoryUI();
}

/* ==========================================================================
   4. Programmer Base Converter Engine (DEC / BIN / OCT / HEX)
   ========================================================================== */
function initBaseConverter() {
  const convInput = document.getElementById('convInput');
  const valDec = document.getElementById('valDec');
  const valBin = document.getElementById('valBin');
  const valOct = document.getElementById('valOct');
  const valHex = document.getElementById('valHex');
  const copyBtns = document.querySelectorAll('.btn-copy-base');
  const calcToast = document.getElementById('calcToast');

  if (!convInput) return;

  function showToast(msg) {
    calcToast.textContent = msg;
    calcToast.classList.add('show');
    setTimeout(() => {
      calcToast.classList.remove('show');
    }, 1500);
  }

  function updateConversions() {
    const raw = convInput.value.trim();
    if (!raw || isNaN(raw)) {
      valDec.textContent = '0';
      valBin.textContent = '0';
      valOct.textContent = '0';
      valHex.textContent = '0x0';
      return;
    }

    const n = Math.abs(parseInt(raw, 10));

    valDec.textContent = n.toLocaleString('en-IN');

    const binStr = n.toString(2);
    const paddedBin = binStr.padStart(Math.ceil(binStr.length / 4) * 4, '0');
    valBin.textContent = paddedBin.match(/.{1,4}/g).join(' ');

    valOct.textContent = n.toString(8);
    valHex.textContent = '0x' + n.toString(16).toUpperCase();
  }

  convInput.addEventListener('input', updateConversions);

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const text = targetEl.textContent.replace(/\s+/g, '');
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied ${text} to clipboard`);
        }).catch(() => {
          showToast('Copied to clipboard');
        });
      }
    });
  });

  updateConversions();
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

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

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
