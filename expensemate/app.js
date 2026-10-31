// ExpenseMate Interactive Logic, Animations & User Guide Engine

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initOnboardingSlider();
  initSmartInsightsRotation();
  initScrollAnimations();
  initUserGuide();
  initNavbarEnhancements();
  initGalleryNavigation();
});

/* ==========================================================================
   1. Dynamic Moving Glow Light (Android Modern Ambient Lighting)
   Supports mouse movement, touch dragging, and continuous fluid float
   ========================================================================== */
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
   2. Rotating Smart Insights (from onBorading.dart)
   ========================================================================== */
function initSmartInsightsRotation() {
  const insights = [
    "You spent ₹48.50 today",
    "To stay on budget: aim for ₹25.00/day",
    "On track: 30% of monthly budget remaining",
    "Top spend this week: Food & Groceries (42%)",
    "No ads • 100% Offline • Biometric Protected",
    "Split trip debts settled: Priya owes you ₹500"
  ];

  const pillText = document.getElementById('smartInsightText');
  if (!pillText) return;

  let index = 0;
  setInterval(() => {
    pillText.style.opacity = '0';
    pillText.style.transform = 'translateY(10px)';
    setTimeout(() => {
      index = (index + 1) % insights.length;
      pillText.textContent = insights[index];
      pillText.style.opacity = '1';
      pillText.style.transform = 'translateY(0)';
    }, 280);
  }, 3200);
}

/* ==========================================================================
   3. Interactive Onboarding Showcase (Replicating Flutter onBorading.dart)
   Multi-Layer Atmospheric Radiating Glows + Glassmorphic Card Shadows
   ========================================================================== */
const SLIDE_GLOW_DATA = [
  { hex: '#81C784', rgb: '129, 199, 132' }, // Slide 0: Welcome (Light Green)
  { hex: '#81C784', rgb: '129, 199, 132' }, // Slide 1: Fast & Effortless (Light Green)
  { hex: '#4DD0E1', rgb: '77, 208, 225' },  // Slide 2: Deep Analytics (Cyan)
  { hex: '#FFB74D', rgb: '255, 183, 77' },  // Slide 3: Budgeting & Smart Insights (Amber)
  { hex: '#26A69A', rgb: '38, 166, 154' },  // Slide 4: Recurring Subscriptions (Teal)
  { hex: '#FF7043', rgb: '255, 112, 67' },  // Slide 5: Split Bills & Debts (Coral)
  { hex: '#81C784', rgb: '129, 199, 132' }, // Slide 6: Home Screen Widgets (Light Green)
  { hex: '#BA68C8', rgb: '186, 104, 200' }  // Slide 7: Data Freedom & Customisation (Purple)
];

let currentSlide = 0;
const totalSlides = 8;

function initOnboardingSlider() {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.getElementById('onboardingPrevBtn');
  const nextBtn = document.getElementById('onboardingNextBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const phoneFrame = document.getElementById('onboardingPhoneFrame');
  const auraTop = document.getElementById('onboardingAuraTop');
  const auraBottomRight = document.getElementById('onboardingAuraBottomRight');
  const auraTopLeft = document.getElementById('onboardingAuraTopLeft');
  const mockupBranding = document.querySelector('.mockup-branding');

  if (!slides.length) return;

  function updateSlider(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

    // Update slides visibility with smooth transition
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
        triggerSlideMicroAnimations(slide, idx);
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Expanding Dot Indicator (Flutter SmoothPageIndicator style)
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Toggle Back button visibility on Slide 0
    if (prevBtn) {
      if (currentSlide === 0) {
        prevBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
      }
    }

    // On Page 0, hide top branding so there is only one heading ExpenseMate (matches onBorading.dart line 265)
    if (mockupBranding) {
      mockupBranding.style.opacity = currentSlide === 0 ? '0' : '1';
      mockupBranding.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
      mockupBranding.style.transition = 'opacity 0.25s ease';
    }

    // Update Next button label and special gradient glow on final slide
    if (nextBtnText) {
      nextBtnText.textContent = currentSlide === totalSlides - 1 ? 'Get Started' : 'Next';
    }
    if (nextBtn) {
      if (currentSlide === totalSlides - 1) {
        nextBtn.classList.add('last-slide');
      } else {
        nextBtn.classList.remove('last-slide');
      }
    }

    // Multi-Layer Atmospheric Lighting System replicating Flutter onBorading.dart
    const glow = SLIDE_GLOW_DATA[currentSlide];
    const rgb = glow.rgb;

    // 1. Atmospheric top perimeter radiating glow
    if (auraTop) {
      auraTop.style.background = `radial-gradient(ellipse at 50% 15%, rgba(${rgb}, 0.28) 0%, rgba(${rgb}, 0.10) 50%, transparent 100%)`;
    }
    // 2. Bottom-right corner aura bleeding inward
    if (auraBottomRight) {
      auraBottomRight.style.background = `radial-gradient(circle, rgba(${rgb}, 0.18) 0%, rgba(${rgb}, 0.04) 55%, transparent 100%)`;
    }
    // 3. Top-left corner aura bleeding inward
    if (auraTopLeft) {
      auraTopLeft.style.background = `radial-gradient(circle, rgba(${rgb}, 0.20) 0%, transparent 70%)`;
    }
    // 4. Smartphone outer chassis ambient rim lighting & card glow & active dot color
    if (phoneFrame) {
      phoneFrame.style.setProperty('--slide-rim-glow', `rgba(${rgb}, 0.22)`);
      phoneFrame.style.setProperty('--slide-card-glow', `rgba(${rgb}, 0.18)`);
      phoneFrame.style.setProperty('--slide-dot-color', glow.hex);
      phoneFrame.style.setProperty('--slide-dot-glow', `rgba(${rgb}, 0.6)`);
    }
  }

  function triggerSlideMicroAnimations(slideElement, slideIdx) {
    // Slide 2: Analytics Bars Animation
    if (slideIdx === 2) {
      const bars = slideElement.querySelectorAll('.progress-fill');
      bars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          bar.style.width = targetWidth;
        }, 50);
      });
    }

    // Slide 3: Budget Bar Animation
    if (slideIdx === 3) {
      const budgetBar = slideElement.querySelector('.budget-track .progress-fill');
      if (budgetBar) {
        const targetWidth = budgetBar.style.width || '68%';
        budgetBar.style.width = '0%';
        setTimeout(() => {
          budgetBar.style.transition = 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
          budgetBar.style.width = targetWidth;
        }, 50);
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide === totalSlides - 1) {
        const downloadSec = document.getElementById('download');
        if (downloadSec) downloadSec.scrollIntoView({ behavior: 'smooth' });
      } else {
        updateSlider(currentSlide + 1);
      }
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateSlider(idx);
    });
  });

  // Touch Swipe Support for Mobile Phones
  const viewport = document.querySelector('.onboarding-viewport');
  if (viewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          if (currentSlide < totalSlides - 1) updateSlider(currentSlide + 1);
        } else {
          if (currentSlide > 0) updateSlider(currentSlide - 1);
        }
      }
    }, { passive: true });
  }

  // Interactive tab switches inside Slide 1 mockup
  const typeTabs = document.querySelectorAll('.mockup-type-tab');
  typeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      typeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Interactive Category Pills in Slide 1 mockup
  const catPills = document.querySelectorAll('.mockup-cat-pill');
  catPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  // Initialize first slide
  updateSlider(0);
}

/* ==========================================================================
   4. Scroll-Triggered Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.feature-card, .screenshot-item, .section-header, .cta-box, .hero-banner-frame, .hero-chip'
  );

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Once revealed, unobserve to maintain high performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.classList.add('reveal-element');
    // Stagger transition delay slightly for grids
    if (el.classList.contains('feature-card')) {
      el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   5. User Guide Search & Accordion Engine
   ========================================================================== */
function initUserGuide() {
  const container = document.getElementById('userGuideContainer');
  const searchInput = document.getElementById('userGuideSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const categoryFilters = document.getElementById('guideCategoryFilters');
  const resultCounter = document.getElementById('guideResultCount');

  if (!container || typeof USER_GUIDE_DATA === 'undefined') return;

  let activeSection = 'All';
  let searchQuery = '';

  // Render Filter Pills
  const categories = ['All', ...USER_GUIDE_DATA.map(s => s.title)];
  categoryFilters.innerHTML = categories.map(cat => {
    const isAll = cat === 'All';
    const count = isAll
      ? USER_GUIDE_DATA.reduce((acc, s) => acc + s.items.length, 0)
      : (USER_GUIDE_DATA.find(s => s.title === cat)?.items.length || 0);

    return `<button class="guide-filter-chip ${isAll ? 'active' : ''}" data-cat="${escapeHtml(cat)}">
      ${escapeHtml(cat)} <span class="chip-count">${count}</span>
    </button>`;
  }).join('');

  categoryFilters.querySelectorAll('.guide-filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.querySelectorAll('.guide-filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSection = btn.getAttribute('data-cat');
      renderGuide();
    });
  });

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    clearBtn.style.display = searchQuery.length > 0 ? 'inline-flex' : 'none';
    renderGuide();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    renderGuide();
    searchInput.focus();
  });

  // Expand / Collapse all user guide items
  const toggleAllBtn = document.getElementById('guideToggleAllBtn');
  if (toggleAllBtn) {
    let allOpen = false;
    toggleAllBtn.addEventListener('click', () => {
      const items = document.querySelectorAll('.guide-item');
      allOpen = !allOpen;
      items.forEach(item => {
        item.open = allOpen;
      });
      toggleAllBtn.textContent = allOpen ? 'Collapse All' : 'Expand All';
    });
  }

  // Quick tag links in hero or guide header
  document.querySelectorAll('.guide-quick-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      const term = tag.getAttribute('data-search') || tag.textContent.trim();
      searchInput.value = term;
      searchQuery = term.toLowerCase();
      clearBtn.style.display = 'inline-flex';
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      renderGuide();
    });
  });

  function renderGuide() {
    let totalMatches = 0;
    let html = '';

    USER_GUIDE_DATA.forEach(section => {
      if (activeSection !== 'All' && section.title !== activeSection) {
        return;
      }

      // Filter items within section
      const matchedItems = section.items.filter(item => {
        if (!searchQuery) return true;
        const qMatch = item.question.toLowerCase().includes(searchQuery);
        const aMatch = item.answer.toLowerCase().includes(searchQuery);
        const kwMatch = item.keywords.some(k => k.toLowerCase().includes(searchQuery));
        return qMatch || aMatch || kwMatch;
      });

      if (matchedItems.length === 0) return;
      totalMatches += matchedItems.length;

      html += `
        <div class="guide-section-group">
          <div class="guide-section-header">
            <span class="guide-section-icon">${getSectionIcon(section.icon)}</span>
            <h3 class="guide-section-title">${escapeHtml(section.title)}</h3>
            <span class="guide-section-badge">${matchedItems.length} guide${matchedItems.length > 1 ? 's' : ''}</span>
          </div>

          <div class="guide-accordion-list">
            ${matchedItems.map(item => `
              <details class="guide-item" id="guide-${escapeHtml(item.id)}">
                <summary class="guide-item-question">
                  <div class="guide-q-content">
                    <span class="guide-q-dot"></span>
                    <span class="guide-q-text">${highlightMatch(item.question, searchQuery)}</span>
                  </div>
                  <span class="guide-chevron">›</span>
                </summary>
                <div class="guide-item-answer">
                  <div class="guide-answer-body">
                    ${formatAnswerMarkdown(item.answer, searchQuery)}
                  </div>
                  ${item.keywords && item.keywords.length > 0 ? `
                    <div class="guide-keywords-row">
                      <span class="keywords-label">Keywords:</span>
                      ${item.keywords.map(kw => `<span class="keyword-pill">${escapeHtml(kw)}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              </details>
            `).join('')}
          </div>
        </div>
      `;
    });

    if (totalMatches === 0) {
      container.innerHTML = `
        <div class="guide-empty-state">
          <div class="empty-icon">🔍</div>
          <h4>No guides found for "${escapeHtml(searchQuery)}"</h4>
          <p>Try searching for terms like "budget", "voice", "split", "excel", or "trash".</p>
          <button class="btn btn-sm btn-secondary" onclick="document.getElementById('clearSearchBtn').click()">Clear Search</button>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }

    if (resultCounter) {
      resultCounter.textContent = `${totalMatches} guide${totalMatches === 1 ? '' : 's'} available`;
    }
  }

  // Initial render
  renderGuide();
}

/* Helper to map Flutter Material icons to sleek visual symbols */
function getSectionIcon(iconName) {
  const iconMap = {
    'play_circle_outline_rounded': '⚡',
    'category_outlined': '🏷️',
    'group_outlined': '👥',
    'delete_outline_rounded': '🗑️',
    'track_changes_rounded': '🎯',
    'palette_outlined': '🎨',
    'widgets_outlined': '📱',
    'bar_chart_rounded': '📊',
    'repeat_rounded': '🔄',
    'import_export_rounded': '💾',
    'fingerprint_rounded': '🔒',
    'account_balance_wallet_outlined': '💡'
  };
  return iconMap[iconName] || '📖';
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark class="highlight">$1</mark>');
}

function formatAnswerMarkdown(text, query) {
  let formatted = escapeHtml(text);

  // Bold **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  formatted = formatted.replace(/^[•*]\s*(.*?)$/gm, '<li class="bullet-item">$1</li>');

  // Wrap contiguous bullet points in <ul>
  formatted = formatted.replace(/(<li class="bullet-item">.*?<\/li>\s*)+/g, '<ul class="guide-bullets">$&</ul>');

  // Numbered points 1. ... 2. ...
  formatted = formatted.replace(/^[0-9]+\.\s*(.*?)$/gm, '<li class="numbered-item">$1</li>');
  formatted = formatted.replace(/(<li class="numbered-item">.*?<\/li>\s*)+/g, '<ol class="guide-numbers">$&</ol>');

  // Paragraph line breaks
  formatted = formatted.replace(/\n\n+/g, '</p><p>');
  formatted = `<p>${formatted}</p>`;

  // Clean empty paragraphs
  formatted = formatted.replace(/<p>\s*<\/p>/g, '');

  if (query) {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    formatted = formatted.replace(regex, '<mark class="highlight">$1</mark>');
  }

  return formatted;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   6. Navbar Dynamic Frosted Glass & Active ScrollSpy
   ========================================================================== */
function initNavbarEnhancements() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Toggle frosted glass navbar
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   7. Interactive Visual Walkthrough Studio Engine (3D Tilt, Auto-Tour, Audio & Lightbox)
   ========================================================================== */
const walkthroughScreens = [
  {
    id: 1,
    title: "1. Home Page",
    badge: "Dashboard & Net Worth",
    shortTag: "Home Page",
    icon: "🏠",
    color: "#4ade80",
    colorRgb: "74, 222, 128",
    img: "../images/expensemate/mockup/1_home.png",
    subtitle: "Your financial command center at a single glance.",
    description: "Instant net worth calculation, monthly spending burn rate, and a categorized breakdown of recent cash flows. Beautiful AMOLED card hierarchy puts essential numbers front and center.",
    highlights: [
      "Real-time Net Worth calculation & balance overview",
      "Recent transaction stream with custom category avatars",
      "Visual monthly budget meter and spending velocity"
    ],
    pill1: { icon: "⚡", text: "Instant Net Worth" },
    pill2: { icon: "🔒", text: "100% Offline SQLite" }
  },
  {
    id: 2,
    title: "2. Add Page",
    badge: "3-Second Fast Entry",
    shortTag: "Add Page",
    icon: "➕",
    color: "#38bdf8",
    colorRgb: "56, 189, 248",
    img: "../images/expensemate/mockup/2_add.png",
    subtitle: "Log transactions faster than opening your physical wallet.",
    description: "Designed for speed: big tactile numpad, instant category chip selector, payment account switcher, and built-in AI Voice Assistant dictation (e.g. 'Spent 250 on coffee from HDFC').",
    highlights: [
      "Hands-free AI Voice Assistant dictation",
      "Customizable emoji categories & payment source selector",
      "One-tap split with friends directly from the entry screen"
    ],
    pill1: { icon: "🎙️", text: "AI Voice Dictation" },
    pill2: { icon: "⚡", text: "3-Sec Quick Add" }
  },
  {
    id: 3,
    title: "3. Pie Chart",
    badge: "Visual Spending Breakdown",
    shortTag: "Pie Chart",
    icon: "📊",
    color: "#c084fc",
    colorRgb: "192, 132, 252",
    img: "../images/expensemate/mockup/3_stats.png",
    subtitle: "Turn boring numbers into colorful, actionable insights.",
    description: "Interactive donut and pie charts visualizing exactly where your hard-earned cash goes. Filter by week, month, year, or custom date ranges to spot money leaks effortlessly.",
    highlights: [
      "Interactive category slices with tap-to-inspect detail",
      "Percentage vs absolute amount views",
      "Weekly, monthly, and yearly historical trend comparisons"
    ],
    pill1: { icon: "🍩", text: "Interactive Donut" },
    pill2: { icon: "🔥", text: "Top Spend Analysis" }
  },
  {
    id: 4,
    title: "4. Calendar Expense",
    badge: "Day-by-Day Financial Heatmap",
    shortTag: "Calendar Expense",
    icon: "📅",
    color: "#fb923c",
    colorRgb: "251, 146, 60",
    img: "../images/expensemate/mockup/4_calender.png",
    subtitle: "Map your daily spending rhythm across the entire month.",
    description: "An intuitive calendar view highlighting expense intensity on each day. Tap any date to inspect historical receipts, spot weekend spending spikes, and review previous days.",
    highlights: [
      "Color-coded spending intensity indicators per date",
      "One-tap date inspection with itemized daily receipt list",
      "Recurring bill marks and weekend expense tracking"
    ],
    pill1: { icon: "🗓️", text: "Expense Heatmap" },
    pill2: { icon: "📍", text: "Daily Receipt History" }
  },
  {
    id: 5,
    title: "5. Budget",
    badge: "Proactive Spending Limits",
    shortTag: "Budget",
    icon: "🎯",
    color: "#22c55e",
    colorRgb: "34, 197, 94",
    img: "../images/expensemate/mockup/5_budget.png",
    subtitle: "Take control of your cash flow before the month ends.",
    description: "Set overall monthly budget limits or drill down into specific categories like Dining, Shopping, or Travel. Real-time visual progress bars warn you before you overspend.",
    highlights: [
      "Dynamic 80% & 100% threshold alert notifications",
      "Category-level custom spending caps",
      "Daily safe-to-spend allowance calculator"
    ],
    pill1: { icon: "🎯", text: "Custom Limits" },
    pill2: { icon: "🛡️", text: "Overspend Shield" }
  },
  {
    id: 6,
    title: "6. All Account Dashboard",
    badge: "Multi-Wallet Management",
    shortTag: "All Account Dashboard",
    icon: "💳",
    color: "#60a5fa",
    colorRgb: "96, 165, 250",
    img: "../images/expensemate/mockup/6_account.png",
    subtitle: "Consolidate bank accounts, credit cards, and cash jars.",
    description: "Manage multiple payment sources seamlessly. Track cash on hand, savings accounts, credit card debt, and digital wallets. Transfer balances between accounts with zero friction.",
    highlights: [
      "Credit card debt balance vs available limit tracking",
      "Inter-account balance transfers in 2 taps",
      "Individual account transaction ledgers"
    ],
    pill1: { icon: "💳", text: "Multi-Account" },
    pill2: { icon: "🔄", text: "Instant Transfers" }
  },
  {
    id: 7,
    title: "7. Split with Friends",
    badge: "Shared Bills & Debt Settlement",
    shortTag: "Split with Friends",
    icon: "👥",
    color: "#f43f5e",
    colorRgb: "244, 63, 94",
    img: "../images/expensemate/mockup/7_friends.png",
    subtitle: "Group trips, flatmate groceries, and dinners made effortless.",
    description: "Track shared expenditures, calculate who owes what, and settle debts with one tap. Zero awkward mental math and zero forgotten loans between friends.",
    highlights: [
      "Equal and custom split ratios for dining and trips",
      "One-tap debt settlement record keeping",
      "Friend-by-friend balance ledger and reminder sharing"
    ],
    pill1: { icon: "🤝", text: "Zero Awkward Math" },
    pill2: { icon: "💰", text: "1-Tap Settle Up" }
  },
  {
    id: 8,
    title: "8. Recurring, Trash, Settings Page",
    badge: "Subscriptions & Data Sovereignty",
    shortTag: "Recurring, Trash, Settings Page",
    icon: "⚙️",
    color: "#f59e0b",
    colorRgb: "245, 158, 11",
    img: "../images/expensemate/mockup/8_reccuring.png",
    subtitle: "Full control over recurring bills, deleted data, and privacy.",
    description: "Automate recurring subscriptions like Netflix or gym memberships. Recover accidentally deleted expenses from the 30-day trash bin, and export encrypted Excel spreadsheets.",
    highlights: [
      "Automated subscription renewal reminders",
      "30-day recycle bin safety net for deleted entries",
      "1-click export to open Excel (.xlsx) and CSV spreadsheets"
    ],
    pill1: { icon: "💾", text: "Excel Export" },
    pill2: { icon: "🗑️", text: "30-Day Trash Undo" }
  }
];

class WalkthroughSoundFX {
  constructor() {
    this.ctx = null;
  }
  playPop() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (_) {}
  }
}

function initGalleryNavigation() {
  const tabs = document.querySelectorAll('.wt-tab-btn');
  const stageImg = document.getElementById('stageActiveImg');
  const stageFrame = document.getElementById('stagePhoneFrame');
  const stagePhoneWrapper = document.getElementById('stagePhoneWrapper');
  const stageCard = document.getElementById('walkthroughStageCard');
  const stageGlow = document.getElementById('stageAmbientGlow');
  const stepBadge = document.getElementById('stageStepBadge');
  const tagBadge = document.getElementById('stageTagBadge');
  const stageTitle = document.getElementById('stageTitle');
  const stageSubtitle = document.getElementById('stageSubtitle');
  const stageDesc = document.getElementById('stageDesc');
  const highlightsList = document.getElementById('stageHighlightsList');
  const progressBar = document.getElementById('stageProgressBar');
  const prevBtn = document.getElementById('stagePrevBtn');
  const nextBtn = document.getElementById('stageNextBtn');
  const autoTourBtn = document.getElementById('autoTourBtn');
  const autoTourIcon = document.getElementById('autoTourIcon');
  const autoTourLabel = document.getElementById('autoTourLabel');
  const shuffleBtn = document.getElementById('shuffleScreenBtn');
  const zoomBtn = document.getElementById('stageZoomBtn');
  const filmstripItems = document.querySelectorAll('.filmstrip-item');
  const filmstripTrack = document.getElementById('filmstripTrack');
  const fsLeftArrow = document.getElementById('filmstripLeftArrow');
  const fsRightArrow = document.getElementById('filmstripRightArrow');
  const floatPill1 = document.getElementById('floatPill1');
  const floatPill2 = document.getElementById('floatPill2');
  const floatPillIcon1 = document.getElementById('floatPillIcon1');
  const floatPillText1 = document.getElementById('floatPillText1');
  const floatPillIcon2 = document.getElementById('floatPillIcon2');
  const floatPillText2 = document.getElementById('floatPillText2');

  // Lightbox elements
  const lightbox = document.getElementById('walkthroughLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxStep = document.getElementById('lightboxStep');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  if (!tabs.length || !stageImg) return;

  const sfx = new WalkthroughSoundFX();
  let currentIndex = 0;
  let autoTourInterval = null;

  function setScreen(index, playSound = true) {
    if (index < 0) index = walkthroughScreens.length - 1;
    if (index >= walkthroughScreens.length) index = 0;
    currentIndex = index;

    const data = walkthroughScreens[index];
    if (!data) return;

    if (playSound) sfx.playPop();

    // 1. Update Tabs
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // Scroll active tab horizontally inside its own track only (NEVER scrolling the window vertically)
    const activeTab = tabs[index];
    if (activeTab && activeTab.parentElement) {
      const tabsTrack = activeTab.parentElement;
      const targetLeft = activeTab.offsetLeft - (tabsTrack.clientWidth / 2) + (activeTab.clientWidth / 2);
      tabsTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    // 2. Animate Image transition with quick scale & fade
    stageImg.classList.add('fade-out');
    setTimeout(() => {
      stageImg.src = data.img;
      stageImg.alt = data.title;
      stageImg.classList.remove('fade-out');
    }, 120);

    // 3. Update Text Content
    stepBadge.textContent = `SCREEN 0${data.id} OF 08`;
    tagBadge.textContent = data.badge;
    stageTitle.textContent = data.title;
    stageSubtitle.textContent = data.subtitle;
    stageDesc.textContent = data.description;

    // 4. Update Highlights
    highlightsList.innerHTML = data.highlights.map(h => `
      <div class="stage-hl-item">
        <span class="hl-check" style="color: ${data.color}; background: rgba(${data.colorRgb}, 0.18);">✓</span>
        <span>${h}</span>
      </div>
    `).join('');

    // 5. Update Floating Pills
    if (floatPill1 && floatPill2) {
      floatPillIcon1.textContent = data.pill1.icon;
      floatPillText1.textContent = data.pill1.text;
      floatPillIcon2.textContent = data.pill2.icon;
      floatPillText2.textContent = data.pill2.text;

      floatPill1.style.borderColor = `rgba(${data.colorRgb}, 0.4)`;
      floatPill1.style.boxShadow = `0 12px 28px rgba(0, 0, 0, 0.6), 0 0 16px rgba(${data.colorRgb}, 0.25)`;
      floatPill2.style.borderColor = `rgba(${data.colorRgb}, 0.4)`;
      floatPill2.style.boxShadow = `0 12px 28px rgba(0, 0, 0, 0.6), 0 0 16px rgba(${data.colorRgb}, 0.25)`;
    }

    // 6. Update Color accents
    tagBadge.style.color = data.color;
    tagBadge.style.borderColor = `rgba(${data.colorRgb}, 0.35)`;
    tagBadge.style.background = `rgba(${data.colorRgb}, 0.15)`;
    stageSubtitle.style.color = data.color;
    stageGlow.style.background = `radial-gradient(circle, rgba(${data.colorRgb}, 0.32) 0%, transparent 70%)`;
    stageFrame.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(${data.colorRgb}, 0.25)`;
    stageCard.style.borderColor = `rgba(${data.colorRgb}, 0.35)`;

    // 7. Update Progress Bar
    const pct = ((index + 1) / walkthroughScreens.length) * 100;
    progressBar.style.width = `${pct}%`;
    progressBar.style.background = `linear-gradient(90deg, #4ade80, ${data.color})`;

    // 8. Update Filmstrip
    filmstripItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    // Scroll active thumbnail horizontally inside filmstrip only (NEVER scrolling the window vertically)
    const activeThumb = filmstripItems[index];
    if (activeThumb && filmstripTrack) {
      const targetLeft = activeThumb.offsetLeft - (filmstripTrack.clientWidth / 2) + (activeThumb.clientWidth / 2);
      filmstripTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    // 9. If Lightbox is open, update lightbox
    if (lightbox.classList.contains('open')) {
      updateLightboxContent();
    }
  }

  // Tab button click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stopAutoTour();
      setScreen(parseInt(tab.dataset.index, 10));
    });
  });

  // Filmstrip click
  filmstripItems.forEach(item => {
    item.addEventListener('click', () => {
      stopAutoTour();
      setScreen(parseInt(item.dataset.index, 10));
    });
  });

  // Prev / Next Buttons (Stage Studio)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoTour();
      setScreen(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoTour();
      setScreen(currentIndex + 1);
    });
  }

  // Filmstrip Arrow buttons
  if (fsLeftArrow && filmstripTrack) {
    fsLeftArrow.addEventListener('click', () => {
      filmstripTrack.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }
  if (fsRightArrow && filmstripTrack) {
    fsRightArrow.addEventListener('click', () => {
      filmstripTrack.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // Shuffle / Surprise Me Button
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      stopAutoTour();
      let rand = Math.floor(Math.random() * walkthroughScreens.length);
      if (rand === currentIndex) rand = (rand + 1) % walkthroughScreens.length;

      // Fun bouncy effect on phone
      stagePhoneWrapper.style.transform = 'scale(0.92) rotate(4deg)';
      setTimeout(() => {
        setScreen(rand);
        stagePhoneWrapper.style.transform = 'scale(1.05) rotate(-2deg)';
        setTimeout(() => {
          stagePhoneWrapper.style.transform = '';
        }, 180);
      }, 100);
    });
  }

  // Auto Tour Functionality
  function startAutoTour() {
    autoTourBtn.classList.add('active');
    autoTourIcon.textContent = '⏸';
    autoTourLabel.textContent = 'Pause Tour';
    autoTourInterval = setInterval(() => {
      setScreen(currentIndex + 1);
    }, 3800);
  }

  function stopAutoTour() {
    if (autoTourInterval) {
      clearInterval(autoTourInterval);
      autoTourInterval = null;
    }
    autoTourBtn.classList.remove('active');
    autoTourIcon.textContent = '▶';
    autoTourLabel.textContent = 'Auto Tour';
  }

  if (autoTourBtn) {
    autoTourBtn.addEventListener('click', () => {
      if (autoTourInterval) {
        stopAutoTour();
      } else {
        startAutoTour();
      }
    });
  }

  // 3D Tilt Effect on Smartphone Mockup
  if (stagePhoneWrapper) {
    stagePhoneWrapper.addEventListener('mousemove', (e) => {
      const rect = stagePhoneWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 14;

      stagePhoneWrapper.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    stagePhoneWrapper.addEventListener('mouseleave', () => {
      stagePhoneWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }


  // Origin Story Lightbox Integration
  const originPhotos = [
    {
      img: '../images/expensemate/initalPlan/plan1.png',
      title: 'Original Phone Idea Note ("Expenses calculator" · Midnight Spark)',
      step: 'Origin Story: Phase 01 (Digital Note)'
    },
    {
      img: '../images/expensemate/initalPlan/plan2.png',
      title: 'July 2024 Handwritten Notebook Wireframe Blueprint',
      step: 'Origin Story: Phase 02 (Notebook Wireframe)'
    }
  ];

  let isOriginLightbox = false;
  let originPhotoIndex = 0;

  window.openOriginPhoto = function(index) {
    if (index < 0 || index >= originPhotos.length) return;
    stopAutoTour();
    isOriginLightbox = true;
    originPhotoIndex = index;
    const item = originPhotos[originPhotoIndex];
    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxStep.textContent = item.step;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  // Lightbox Functionality
  function updateLightboxContent() {
    const data = walkthroughScreens[currentIndex];
    if (!data) return;
    lightboxImg.src = data.img;
    lightboxImg.alt = data.title;
    lightboxTitle.textContent = data.title;
    lightboxStep.textContent = `Screen ${data.id} of 8`;
  }

  function openLightbox() {
    stopAutoTour();
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    isOriginLightbox = false;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // stageFrame click removed per user preference
  if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOriginLightbox) {
        window.openOriginPhoto((originPhotoIndex - 1 + originPhotos.length) % originPhotos.length);
      } else {
        setScreen(currentIndex - 1);
      }
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOriginLightbox) {
        window.openOriginPhoto((originPhotoIndex + 1) % originPhotos.length);
      } else {
        setScreen(currentIndex + 1);
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setScreen(currentIndex - 1);
      if (e.key === 'ArrowRight') setScreen(currentIndex + 1);
    }
  });

  // Touch Swipe for mobile stage
  let touchStartX = 0;
  stageCard.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) touchStartX = e.touches[0].clientX;
  }, { passive: true });

  stageCard.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        stopAutoTour();
        if (diff > 0) {
          setScreen(currentIndex - 1);
        } else {
          setScreen(currentIndex + 1);
        }
      }
    }
  }, { passive: true });

  // Initial Screen Render
  setScreen(0, false);
}

