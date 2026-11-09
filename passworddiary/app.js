// PasswordDiary Interactive Showcase, Password Generator Engine & Vault Simulator
// Matches Dart logic in neriquest.passwordDiary

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initPasswordGenerator();
  initVaultSimulator();
  initCategoriesExplorer();
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

  if (!frame || !vaultList) return;

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
    const filtered = currentCategory === 'all'
      ? SIM_VAULT_ITEMS
      : SIM_VAULT_ITEMS.filter(item => item.category === currentCategory);

    vaultCountLabel.textContent = `${filtered.length} Protected Item${filtered.length === 1 ? '' : 's'}`;

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
   4. The 9 Structured Categories Explorer
   ========================================================================== */
const CATEGORIES_DATA = [
  {
    id: 'card',
    name: 'Payment Cards',
    icon: '💳',
    hint: 'Credit, Debit, Virtual & Prepaid Cards',
    secretLabel: 'CVV / CVC',
    secretMasked: '•••',
    secretReal: '419',
    tier1: ['Card Number (16 Digits)', 'Expiration Date (MM/YY)', 'Cardholder Name', 'Card Type'],
    tier2: ['Card Nickname', 'Issuer Bank (Chase, HDFC, Amex)', 'ATM / POS Chip PIN', 'Card Network', 'Notes']
  },
  {
    id: 'login',
    name: 'Website & Logins',
    icon: '🌐',
    hint: 'Credentials, Portals & Accounts',
    secretLabel: 'Master Password',
    secretMasked: '••••••••••••••••',
    secretReal: 'k7$L9@qW2!vM4#xZ',
    tier1: ['Username / Email', 'Service Title', 'Primary Password', 'URL / Domain'],
    tier2: ['Password History', 'One-Time Recovery Codes', 'Security Questions', 'Rotation Expiration', 'Personal Note']
  },
  {
    id: 'bank',
    name: 'Bank & Banking',
    icon: '🏦',
    hint: 'Accounts, Routing, IFSC & NetBanking',
    secretLabel: 'Account Number',
    secretMasked: '••••••••5819',
    secretReal: '849102945819',
    tier1: ['Bank Name', 'Account Holder Name', 'Customer ID / CIF', 'IFSC / Routing / Sort Code'],
    tier2: ['Account Type (Savings, Checking)', 'UPI ID / VPA', 'ATM PIN', 'NetBanking Password', 'Branch Phone']
  },
  {
    id: 'id',
    name: 'Identity & IDs',
    icon: '🪪',
    hint: 'Passports, Driving Licenses & SSN',
    secretLabel: 'Document / ID Number',
    secretMasked: '••••••••••',
    secretReal: 'Z89410294B',
    tier1: ['Full Legal Name', 'Issuing Authority / Country', 'Issue Date', 'Expiry Date'],
    tier2: ['Place of Birth', 'Document Class', 'Emergency Contact', 'Secure Document Copy Notes']
  },
  {
    id: 'note',
    name: 'Secure Notes',
    icon: '📝',
    hint: 'Private Memos & Confidential Text',
    secretLabel: 'Confidential Payload',
    secretMasked: '••••••••••••••••••••••••',
    secretReal: 'Server emergency recovery procedures & root SSH access instructions',
    tier1: ['Note Subject', 'Last Modified Date', 'Confidential Content'],
    tier2: ['Tags / Labels', 'Sensitivity Flag', 'Offline Markdown Formatting']
  },
  {
    id: 'software',
    name: 'Software Keys',
    icon: '🔑',
    hint: 'Licenses, Serials & Product Keys',
    secretLabel: 'License Key / Serial',
    secretMasked: 'XXXXX-XXXXX-XXXXX-XXXXX',
    secretReal: 'VK7JG-NPHTM-C97JM-9MPGT',
    tier1: ['Product Name', 'License Key / Serial', 'Version Number', 'Purchase Date'],
    tier2: ['Registered Email', 'Order / Invoice Number', 'Seats / Machine Count', 'Activation Web Link']
  },
  {
    id: 'safe',
    name: 'Safes & Lockers',
    icon: '🔒',
    hint: 'Physical Safes, Keypads & Lockers',
    secretLabel: 'Combination / Passcode',
    secretMasked: '••-••-••',
    secretReal: '24-18-36',
    tier1: ['Locker Location / Description', 'Primary Passcode / PIN', 'Physical Key ID'],
    tier2: ['Locker Box Number', 'Bank Branch / Home Location', 'Master Override Code', 'Key Holder Details']
  },
  {
    id: 'crypto',
    name: 'Crypto & Web3',
    icon: '🪙',
    hint: 'Seed Phrases & Hardware Wallets',
    secretLabel: '12 / 24-Word Seed Phrase',
    secretMasked: '•••• •••• •••• •••• •••• ••••',
    secretReal: 'witch collapse practice feed shame open despair creek road again ice leap',
    tier1: ['Wallet Name', 'Cryptocurrency / Network', '12/24 Word Seed Phrase', 'Public Wallet Address'],
    tier2: ['Derivation Path', 'Passphrase / 25th Word', 'Hardware Device Model', 'Recovery Contact']
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Networks',
    icon: '📶',
    hint: 'Home, Office & Router Credentials',
    secretLabel: 'Wi-Fi Password',
    secretMasked: '••••••••••••••',
    secretReal: 'AtlasFiber_Secure@2026',
    tier1: ['Network SSID', 'Wi-Fi Password', 'Encryption Type (WPA3/WPA2)', 'Location'],
    tier2: ['Router Gateway IP (192.168.1.1)', 'Router Admin Username', 'Router Admin Password', 'MAC Whitelist']
  }
];

function initCategoriesExplorer() {
  const grid = document.getElementById('categoryTabsGrid');
  const panel = document.getElementById('categoryDetailPanel');
  if (!grid || !panel) return;

  let activeIndex = 0;

  function renderExplorer() {
    grid.innerHTML = '';
    CATEGORIES_DATA.forEach((cat, idx) => {
      const card = document.createElement('div');
      card.className = `category-tab-card ${idx === activeIndex ? 'active' : ''}`;
      card.innerHTML = `
        <div class="tab-icon-wrap">${cat.icon}</div>
        <div class="tab-title">${cat.name}</div>
        <div class="tab-hint">${cat.hint}</div>
      `;
      card.addEventListener('click', () => {
        activeIndex = idx;
        renderExplorer();
      });
      grid.appendChild(card);
    });

    const activeCat = CATEGORIES_DATA[activeIndex];
    panel.innerHTML = `
      <div class="panel-header">
        <div class="panel-icon-box">${activeCat.icon}</div>
        <div class="panel-title-group">
          <h3>${activeCat.name}</h3>
          <p>${activeCat.hint}</p>
        </div>
      </div>

      <div class="panel-secret-preview">
        <div class="secret-preview-label">
          <span>Primary Masked Secret (${activeCat.secretLabel})</span>
          <button class="btn-toggle-secret-view" id="btnTogglePanelSecret" title="Toggle Secret Visibility">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        <div class="secret-value-row">
          <span id="panelSecretText">${activeCat.secretMasked}</span>
          <span style="font-size:0.75rem; color:#818cf8; font-family:var(--font-family); font-weight:700;">Protected Field</span>
        </div>
      </div>

      <div class="panel-field-group">
        <h4>Default Tier-1 Essential Fields</h4>
        <div class="field-chips-list">
          ${activeCat.tier1.map(f => `<span class="field-pill">✓ ${f}</span>`).join('')}
        </div>
      </div>

      <div class="panel-field-group">
        <h4>Suggested Tier-2 Custom Fields</h4>
        <div class="field-chips-list">
          ${activeCat.tier2.map(f => `<span class="field-pill">+ ${f}</span>`).join('')}
        </div>
      </div>
    `;

    const toggleSecretBtn = panel.querySelector('#btnTogglePanelSecret');
    const secretText = panel.querySelector('#panelSecretText');
    if (toggleSecretBtn && secretText) {
      toggleSecretBtn.addEventListener('click', () => {
        if (secretText.textContent === activeCat.secretMasked) {
          secretText.textContent = activeCat.secretReal;
          secretText.style.color = '#34d399';
          toggleSecretBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
        } else {
          secretText.textContent = activeCat.secretMasked;
          secretText.style.color = '';
          toggleSecretBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
      });
    }
  }

  renderExplorer();
}

/* ==========================================================================
   5. FAQ Accordion Handler
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
