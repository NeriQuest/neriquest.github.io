// PasswordDiary Interactive Showcase, Password Generator Engine & Vault Simulator
// Matches Dart logic in neriquest.passwordDiary

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initPasswordGenerator();
  initVaultSimulator();
  initCategoriesGrid();
  initFAQAccordion();
});

/* ==========================================================================
   1. Dynamic Moving Ambient Aurora Lights
   ========================================================================== */
function initAmbientGlow() {
  const orbs = [
    document.getElementById('glowOrb1'),
    document.getElementById('glowOrb2'),
    document.getElementById('glowOrb3'),
    document.getElementById('glowOrb4')
  ].filter(Boolean);

  if (!orbs.length) return;

  let angle = 0;
  function animate() {
    angle += 0.008;
    orbs.forEach((orb, i) => {
      const offsetX = Math.sin(angle + i * 1.5) * 35;
      const offsetY = Math.cos(angle + i * 1.5) * 30;
      orb.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ==========================================================================
   2. Cryptographic Password Generator (Exact Flutter Dart Implementation)
   ========================================================================== */
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = 'Il1O0';

function generatePassword({
  length = 16,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true,
  excludeAmbiguous = false
}) {
  let upper = UPPERCASE;
  let lower = LOWERCASE;
  let numbers = NUMBERS;
  let symbols = SYMBOLS;

  if (excludeAmbiguous) {
    for (const char of AMBIGUOUS.split('')) {
      upper = upper.replaceAll(char, '');
      lower = lower.replaceAll(char, '');
      numbers = numbers.replaceAll(char, '');
    }
  }

  let pool = '';
  const mandatory = [];

  // Secure random helper
  function getRandomChar(str) {
    if (!str.length) return '';
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return str[array[0] % str.length];
  }

  if (includeUppercase && upper.length > 0) {
    pool += upper;
    mandatory.push(getRandomChar(upper));
  }
  if (includeLowercase && lower.length > 0) {
    pool += lower;
    mandatory.push(getRandomChar(lower));
  }
  if (includeNumbers && numbers.length > 0) {
    pool += numbers;
    mandatory.push(getRandomChar(numbers));
  }
  if (includeSymbols && symbols.length > 0) {
    pool += symbols;
    mandatory.push(getRandomChar(symbols));
  }

  if (pool.length === 0) {
    pool = lower.length ? lower : LOWERCASE;
    mandatory.push(getRandomChar(pool));
  }

  const result = [...mandatory];
  while (result.length < length) {
    result.push(getRandomChar(pool));
  }

  // Shuffle array using Fisher-Yates with crypto random
  for (let i = result.length - 1; i > 0; i--) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const j = array[0] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

function calculateStrength(password) {
  if (!password || password.length === 0) return 0;
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 0.5;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 0.5;
  }
  if (/[0-9]/.test(password)) {
    score += 0.5;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 0.5;
  }

  return Math.min(Math.max(score, 0), 4);
}

function getStrengthLabel(score) {
  if (score < 1.0) return 'Very Weak';
  if (score < 2.0) return 'Weak';
  if (score < 3.0) return 'Fair';
  if (score < 3.8) return 'Strong';
  return 'Very Strong';
}

function initPasswordGenerator() {
  const display = document.getElementById('genPasswordDisplay');
  const slider = document.getElementById('lengthSlider');
  const sliderBadge = document.getElementById('sliderValBadge');
  const toggleUpper = document.getElementById('toggleUpper');
  const toggleLower = document.getElementById('toggleLower');
  const toggleNumbers = document.getElementById('toggleNumbers');
  const toggleSymbols = document.getElementById('toggleSymbols');
  const toggleAmbiguous = document.getElementById('toggleAmbiguous');
  const btnRegenerate = document.getElementById('btnRegenerate');
  const btnCopy = document.getElementById('btnCopyPassword');
  const copyBtnText = document.getElementById('copyBtnText');
  const strengthLabel = document.getElementById('strengthLabel');
  const charCountLabel = document.getElementById('charCountLabel');
  const segs = [
    document.getElementById('seg1'),
    document.getElementById('seg2'),
    document.getElementById('seg3'),
    document.getElementById('seg4')
  ];

  if (!display || !slider) return;

  function runGenerate() {
    const length = parseInt(slider.value, 10);
    sliderBadge.textContent = length;
    charCountLabel.textContent = length;

    const pw = generatePassword({
      length,
      includeUppercase: toggleUpper.checked,
      includeLowercase: toggleLower.checked,
      includeNumbers: toggleNumbers.checked,
      includeSymbols: toggleSymbols.checked,
      excludeAmbiguous: toggleAmbiguous.checked
    });

    display.textContent = pw;

    const score = calculateStrength(pw);
    const label = getStrengthLabel(score);
    strengthLabel.textContent = label;

    // Update strength bars colors
    let activeColor = '#818cf8';
    if (score >= 3.8) activeColor = '#34d399';
    else if (score >= 3.0) activeColor = '#38bdf8';
    else if (score >= 2.0) activeColor = '#fbbf24';
    else activeColor = '#f87171';

    segs.forEach((seg, i) => {
      if (score > i) {
        seg.style.backgroundColor = activeColor;
        seg.style.boxShadow = `0 0 10px ${activeColor}66`;
      } else {
        seg.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        seg.style.boxShadow = 'none';
      }
    });
  }

  slider.addEventListener('input', runGenerate);
  [toggleUpper, toggleLower, toggleNumbers, toggleSymbols, toggleAmbiguous].forEach(toggle => {
    toggle.addEventListener('change', runGenerate);
  });

  btnRegenerate.addEventListener('click', () => {
    btnRegenerate.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      btnRegenerate.style.transform = 'none';
    }, 250);
    runGenerate();
  });

  btnCopy.addEventListener('click', async () => {
    const pw = display.textContent;
    if (!pw) return;
    try {
      await navigator.clipboard.writeText(pw);
      copyBtnText.textContent = 'Copied!';
      btnCopy.style.background = '#34d399';
      setTimeout(() => {
        copyBtnText.textContent = 'Copy';
        btnCopy.style.background = '';
      }, 1800);
    } catch (e) {
      // Fallback
      copyBtnText.textContent = 'Copied!';
      setTimeout(() => { copyBtnText.textContent = 'Copy'; }, 1800);
    }
  });

  // Initial generation
  runGenerate();
}

/* ==========================================================================
   3. Interactive Vault Simulator
   ========================================================================== */
const SIM_VAULT_ITEMS = [
  {
    id: 1,
    category: 'card',
    categoryName: 'Payment Cards',
    icon: '💳',
    title: 'HDFC Millennia Credit Card',
    secretLabel: 'CVV',
    secretMasked: '•••',
    secretReal: '742',
    isSynced: true,
    isWeak: false,
    fields: ['Cardholder: John Doe', 'Exp: 09/28', 'Type: Credit', 'Network: Visa']
  },
  {
    id: 2,
    category: 'login',
    categoryName: 'Website & Logins',
    icon: '🌐',
    title: 'Google Account (Primary)',
    secretLabel: 'Password',
    secretMasked: '••••••••••••••••',
    secretReal: 'G9#kL2$vM8!xP4@z',
    isSynced: true,
    isWeak: false,
    fields: ['user@gmail.com', 'https://accounts.google.com', '2FA Backup Codes: 8 Saved']
  },
  {
    id: 3,
    category: 'bank',
    categoryName: 'Bank & Banking',
    icon: '🏦',
    title: 'Chase Total Checking',
    secretLabel: 'Account Number',
    secretMasked: '••••••••8912',
    secretReal: '984321768912',
    isSynced: false,
    isWeak: false,
    fields: ['Routing: 021000021', 'CIF: 4892019', 'Branch: Manhattan NYC']
  },
  {
    id: 4,
    category: 'crypto',
    categoryName: 'Crypto & Web3',
    icon: '🪙',
    title: 'Cold Storage Ledger Vault',
    secretLabel: '24-Word Recovery Seed',
    secretMasked: '•••• •••• •••• •••• (24 Words)',
    secretReal: 'abandon amount liar ... ocean wisdom',
    isSynced: true,
    isWeak: false,
    fields: ['Network: Ethereum / Bitcoin', 'Hardware: Ledger Nano X']
  },
  {
    id: 5,
    category: 'login',
    categoryName: 'Website & Logins',
    icon: '🌐',
    title: 'Old Forum Account',
    secretLabel: 'Password',
    secretMasked: '••••••••',
    secretReal: 'pass1234',
    isSynced: true,
    isWeak: true,
    fields: ['forum_user@mail.com', 'Audit: 8 Chars, No Symbols', 'Action: Update Needed']
  },
  {
    id: 6,
    category: 'wifi',
    categoryName: 'Wi-Fi Networks',
    icon: '📶',
    title: 'NeriHome 5G Fiber',
    secretLabel: 'WPA3 Password',
    secretMasked: '••••••••••••',
    secretReal: 'Quantum_Shield#99',
    isSynced: true,
    isWeak: false,
    fields: ['SSID: NeriHome_5G', 'Router IP: 192.168.1.1', 'Security: WPA3-Personal']
  },
  {
    id: 7,
    category: 'card',
    categoryName: 'Payment Cards',
    icon: '💳',
    title: 'Chase Sapphire Preferred',
    secretLabel: 'CVV',
    secretMasked: '•••',
    secretReal: '318',
    isSynced: false,
    isWeak: false,
    fields: ['Cardholder: John Doe', 'Exp: 11/29', 'Type: Metal Card']
  },
  {
    id: 8,
    category: 'login',
    categoryName: 'Website & Logins',
    icon: '🌐',
    title: 'GitHub Developer Account',
    secretLabel: 'Personal Access Token',
    secretMasked: 'ghp_••••••••••••••••••••••••',
    secretReal: 'ghp_k9sL2q9d8a1Bv4N7m6c0',
    isSynced: true,
    isWeak: false,
    fields: ['Scope: repo, workflow, read:org']
  }
];

function initVaultSimulator() {
  const frame = document.getElementById('phoneMockupFrame');
  const midnightBtn = document.getElementById('themeMidnightBtn');
  const bwBtn = document.getElementById('themeBwBtn');
  const vaultList = document.getElementById('phoneVaultList');
  const chipBtns = document.querySelectorAll('.sim-chip-btn');
  const lockOverlay = document.getElementById('phoneLockOverlay');
  const btnToggleLock = document.getElementById('btnToggleLock');
  const btnUnlockSim = document.getElementById('btnUnlockSim');
  const lockStatusText = document.getElementById('lockStatusText');
  const lockIndicator = document.getElementById('lockIndicator');
  const vaultCountLabel = document.getElementById('simVaultCount');

  // App Bar Interactive Elements
  const syncBtn = document.getElementById('simSyncIconBtn');
  const searchBtn = document.getElementById('simSearchIconBtn');
  const settingsBtn = document.getElementById('simSettingsIconBtn');
  const searchBar = document.getElementById('phoneSearchBar');
  const searchInput = document.getElementById('phoneSearchInput');
  const searchClear = document.getElementById('btnSearchClear');
  const auditPill = document.getElementById('simAuditPill');
  const fabBtn = document.getElementById('simFabBtn');

  // Modal Sheet Elements
  const dialogOverlay = document.getElementById('phoneDialogOverlay');
  const dialogIcon = document.getElementById('dialogIcon');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogBody = document.getElementById('dialogBody');
  const btnDialogClose = document.getElementById('btnDialogClose');

  if (!frame || !vaultList) return;

  function openDialog(icon, title, bodyHtml) {
    if (!dialogOverlay) return;
    dialogIcon.textContent = icon;
    dialogTitle.textContent = title;
    dialogBody.innerHTML = bodyHtml;
    dialogOverlay.style.display = 'flex';
  }

  function closeDialog() {
    if (!dialogOverlay) return;
    dialogOverlay.style.display = 'none';
  }

  if (btnDialogClose) {
    btnDialogClose.addEventListener('click', closeDialog);
  }
  if (dialogOverlay) {
    dialogOverlay.addEventListener('click', (e) => {
      if (e.target === dialogOverlay) closeDialog();
    });
  }

  // App Bar Action 1: Google Drive Two-Way Sync
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncBtn.style.transform = 'rotate(360deg)';
      syncBtn.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        syncBtn.style.transform = 'none';
        syncBtn.style.transition = '';
      }, 500);

      openDialog('☁️', 'Encrypted Google Drive Sync', `
        <div class="dialog-row">
          <span>Connection Status:</span>
          <span style="color:#34d399;">Connected &amp; Verified</span>
        </div>
        <div class="dialog-row">
          <span>Encryption Protocol:</span>
          <span>AES-256 Envelope Cipher</span>
        </div>
        <div class="dialog-row">
          <span>Startup Difference Check:</span>
          <span>8 Items Local • 0 Conflicts</span>
        </div>
        <div class="dialog-row">
          <span>Remote Storage:</span>
          <span>Google Drive AppData Folder</span>
        </div>
        <p style="margin-top:12px; font-size:0.8rem; color:var(--text-muted);">
          Your credentials are encrypted locally on your phone hardware before transmission. Google never sees your plain-text passwords or Master PIN.
        </p>
        <button class="dialog-action-btn" id="btnTriggerSyncAction">Trigger Instant Sync</button>
      `);

      const triggerSync = document.getElementById('btnTriggerSyncAction');
      if (triggerSync) {
        triggerSync.addEventListener('click', () => {
          triggerSync.textContent = 'Syncing Vault (AES-256)...';
          triggerSync.style.background = '#38bdf8';
          setTimeout(() => {
            triggerSync.textContent = '✓ Sync Complete • All 8 Items Up to Date';
            triggerSync.style.background = '#34d399';
            setTimeout(closeDialog, 1200);
          }, 600);
        });
      }
    });
  }

  // App Bar Action 2: Interactive Vault Search
  let searchQuery = '';
  if (searchBtn && searchBar && searchInput) {
    searchBtn.addEventListener('click', () => {
      const isVisible = searchBar.style.display !== 'none';
      if (isVisible) {
        searchBar.style.display = 'none';
        searchBtn.classList.remove('active');
        searchQuery = '';
        searchInput.value = '';
        renderVaultCards();
      } else {
        searchBar.style.display = 'block';
        searchBtn.classList.add('active');
        searchInput.focus();
      }
    });

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVaultCards();
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput.value) {
          searchInput.value = '';
          searchQuery = '';
          searchInput.focus();
          renderVaultCards();
        } else {
          searchBar.style.display = 'none';
          searchBtn.classList.remove('active');
          searchQuery = '';
          renderVaultCards();
        }
      });
    }
  }

  // App Bar Action 3: Settings Sheet
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      openDialog('⚙️', 'Vault & Security Settings', `
        <div class="dialog-row">
          <span>Master PIN Protection:</span>
          <span style="color:#818cf8;">4–6 Digits (Configured)</span>
        </div>
        <div class="dialog-row">
          <span>Key Wrapping Engine:</span>
          <span>AES-256 PBKDF2 Salted</span>
        </div>
        <div class="dialog-row">
          <span>Biometric Authentication:</span>
          <span style="color:#34d399;">Enabled (Fingerprint / Face)</span>
        </div>
        <div class="dialog-row">
          <span>Auto-Lock Delay:</span>
          <span>Instant on App Switch</span>
        </div>
        <div class="dialog-row">
          <span>Weak Password Audit:</span>
          <span style="color:#f87171;">Active (1 Weak Item)</span>
        </div>
        <div class="dialog-row">
          <span>Cloud Purge Option:</span>
          <span>Permanent Wipe Supported</span>
        </div>
        <button class="dialog-action-btn" id="btnCloseSettingsDialog">Done</button>
      `);

      const btnClose = document.getElementById('btnCloseSettingsDialog');
      if (btnClose) btnClose.addEventListener('click', closeDialog);
    });
  }

  // Weak Password Audit Pill
  if (auditPill) {
    auditPill.addEventListener('click', () => {
      openDialog('⚠️', 'Security Entropy Audit', `
        <p style="margin-bottom:10px;">The live entropy scanner found <strong>1 vulnerable credential</strong> in your vault:</p>
        <div style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.25); border-radius:10px; padding:10px; margin-bottom:12px;">
          <div style="font-weight:700; color:#fca5a5; font-size:0.88rem;">Old Forum Account</div>
          <div style="font-size:0.78rem; opacity:0.8; margin-top:2px;">Password: <code>pass1234</code> (8 chars, 0 symbols)</div>
          <div style="font-size:0.75rem; color:#f87171; margin-top:4px;">Risk: Highly susceptible to brute-force dictionary attacks.</div>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted);">
          Use our Cryptographic Generator below to replace it with a 16+ character high-entropy key.
        </p>
        <button class="dialog-action-btn" id="btnGoToGenerator">Open Password Generator</button>
      `);

      const btnGen = document.getElementById('btnGoToGenerator');
      if (btnGen) {
        btnGen.addEventListener('click', () => {
          closeDialog();
          const genSec = document.getElementById('generator');
          if (genSec) genSec.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  // Floating Action Button (+)
  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      openDialog('➕', 'Create New Vault Entry', `
        <p style="margin-bottom:12px;">Select an item template from 9 purpose-built modules:</p>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px; text-align:center; margin-bottom:14px;">
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">💳 Cards</div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">🌐 Logins</div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">🏦 Bank</div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">🪙 Crypto</div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">📶 Wi-Fi</div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 4px; border-radius:8px; font-size:0.78rem;">📝 Notes</div>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
          PasswordDiary encrypts every field with military-grade AES-256 before saving to local SQLite.
        </p>
        <a href="https://play.google.com/store/apps/details?id=neriquest.passwordDiary" target="_blank" rel="noopener noreferrer" class="dialog-action-btn" style="display:block; text-align:center; text-decoration:none;">Download PasswordDiary on Google Play</a>
      `);
    });
  }

  // Theme Switching
  midnightBtn.addEventListener('click', () => {
    frame.className = 'phone-frame theme-midnight';
    midnightBtn.classList.add('active');
    bwBtn.classList.remove('active');
  });

  bwBtn.addEventListener('click', () => {
    frame.className = 'phone-frame theme-bw';
    bwBtn.classList.add('active');
    midnightBtn.classList.remove('active');
  });

  // Render cards
  let currentCategory = 'all';

  function renderVaultCards() {
    vaultList.innerHTML = '';
    let filtered = currentCategory === 'all'
      ? SIM_VAULT_ITEMS
      : SIM_VAULT_ITEMS.filter(item => item.category === currentCategory);

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const catMatch = item.categoryName.toLowerCase().includes(q);
        const fieldsMatch = item.fields.some(f => f.toLowerCase().includes(q));
        return titleMatch || catMatch || fieldsMatch;
      });
    }

    vaultCountLabel.textContent = `${filtered.length} Protected Item${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      vaultList.innerHTML = `
        <div style="text-align:center; padding:36px 16px; color:var(--text-muted); font-size:0.88rem;">
          <div style="font-size:1.8rem; margin-bottom:8px;">🔍</div>
          <div>No items found matching "${searchQuery}"</div>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'sim-vault-card';

      const syncBadge = item.isSynced
        ? `<span class="sim-badge-synced" title="Synchronized with encrypted Google Drive">☁️ Drive Synced</span>`
        : `<span class="sim-badge-local" title="Stored exclusively on local SQLite">📱 Local Device</span>`;

      const weakBadge = item.isWeak
        ? `<span class="sim-badge-weak" title="Flagged by Security Audit Scanner">⚠️ Weak Password</span>`
        : '';

      card.innerHTML = `
        <div class="sim-card-top">
          <span class="sim-card-category-tag">
            <span>${item.icon}</span>
            <span>${item.categoryName}</span>
          </span>
          <button class="btn-card-reveal" title="Toggle Secret Visibility" data-id="${item.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        <div class="sim-card-status-row">
          ${syncBadge}
          ${weakBadge}
        </div>
        <div class="sim-card-title">${item.title}</div>
        <div class="sim-card-secret-box">
          <span style="font-size:0.75rem; opacity:0.65; text-transform:uppercase;">${item.secretLabel}:</span>
          <span class="secret-text" data-id="${item.id}">${item.secretMasked}</span>
        </div>
        <div class="sim-card-fields">
          ${item.fields.map(f => `<span class="sim-field-chip">${f}</span>`).join('')}
        </div>
      `;

      vaultList.appendChild(card);
    });

    // Attach reveal listeners
    vaultList.querySelectorAll('.btn-card-reveal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = SIM_VAULT_ITEMS.find(x => x.id === id);
        const secretSpan = vaultList.querySelector(`.secret-text[data-id="${id}"]`);
        if (!item || !secretSpan) return;

        if (secretSpan.textContent === item.secretMasked) {
          secretSpan.textContent = item.secretReal;
          secretSpan.style.color = '#34d399';
          btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
        } else {
          secretSpan.textContent = item.secretMasked;
          secretSpan.style.color = '';
          btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
      });
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderVaultCards();
    });
  });

  // Auto-Lock Simulation
  btnToggleLock.addEventListener('click', () => {
    lockOverlay.classList.add('active');
    lockStatusText.textContent = 'Vault Locked (Backgrounded)';
    lockIndicator.style.color = '#f87171';
    lockIndicator.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    lockIndicator.style.background = 'rgba(239, 68, 68, 0.12)';
  });

  btnUnlockSim.addEventListener('click', () => {
    lockOverlay.classList.remove('active');
    lockStatusText.textContent = 'Vault Unlocked';
    lockIndicator.style.color = '#34d399';
    lockIndicator.style.borderColor = 'rgba(52, 211, 153, 0.25)';
    lockIndicator.style.background = 'rgba(52, 211, 153, 0.1)';
  });

  renderVaultCards();
}

/* ==========================================================================
   4. 9 Specialized Vault Modules Interactive Grid
   ========================================================================== */
function initCategoriesGrid() {
  const cards = document.querySelectorAll('.module-card');
  if (!cards.length) return;

  cards.forEach(card => {
    // Reveal secret toggle on each card
    const toggleBtn = card.querySelector('.module-secret-toggle');
    const secretVal = card.querySelector('.module-secret-value');

    if (toggleBtn && secretVal) {
      toggleBtn.addEventListener('click', () => {
        const masked = secretVal.getAttribute('data-masked');
        const real = secretVal.getAttribute('data-real');
        const isRevealed = secretVal.textContent !== masked;

        if (isRevealed) {
          secretVal.textContent = masked;
          secretVal.style.color = '#a5b4fc';
          toggleBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        } else {
          secretVal.textContent = real;
          secretVal.style.color = '#34d399';
          toggleBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
        }
      });
    }

    // Filter simulator button on each card
    const filterBtn = card.querySelector('.btn-filter-simulator');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        const cat = filterBtn.getAttribute('data-category');
        const targetChip = document.querySelector(`.sim-chip-btn[data-category="${cat}"]`);
        if (targetChip) {
          targetChip.click();
        }
        const simSection = document.getElementById('simulator');
        if (simSection) {
          simSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
}

/* ==========================================================================
   5. In-App FAQ Accordion Handler
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(other => {
        const q = other.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
        other.classList.remove('active');
      });
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
      }
    });
  });
}
