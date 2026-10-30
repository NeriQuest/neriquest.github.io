// ExpenseMate Interactive Logic & User Guide Engine

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initOnboardingSlider();
  initSmartInsightsRotation();
  initUserGuide();
});

/* ==========================================================================
   1. Dynamic Moving Glow Light (Android Modern Ambient Lighting)
   ========================================================================== */
function initAmbientGlow() {
  const glowOrb1 = document.getElementById('glowOrb1');
  const glowOrb2 = document.getElementById('glowOrb2');

  if (!glowOrb1 || !glowOrb2) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 3;
  let orbX = mouseX;
  let orbY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY + window.scrollY;
  });

  function animateOrbs() {
    orbX += (mouseX - orbX) * 0.05;
    orbY += (mouseY - orbY) * 0.05;

    glowOrb1.style.transform = `translate3d(${orbX * 0.4}px, ${orbY * 0.25}px, 0)`;
    glowOrb2.style.transform = `translate3d(${-orbX * 0.3}px, ${-orbY * 0.2}px, 0)`;

    requestAnimationFrame(animateOrbs);
  }

  animateOrbs();
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
    "No ads • 100% Offline • Biometric Protected"
  ];

  const pillText = document.getElementById('smartInsightText');
  if (!pillText) return;

  let index = 0;
  setInterval(() => {
    pillText.style.opacity = '0';
    pillText.style.transform = 'translateY(8px)';
    setTimeout(() => {
      index = (index + 1) % insights.length;
      pillText.textContent = insights[index];
      pillText.style.opacity = '1';
      pillText.style.transform = 'translateY(0)';
    }, 280);
  }, 3200);
}

/* ==========================================================================
   3. Interactive Onboarding Showcase (Replicating onBorading.dart)
   ========================================================================== */
const SLIDE_GLOW_COLORS = [
  '#81C784', // Welcome: ExpenseMate signature light green
  '#81C784', // Slide 1: Fast & Effortless
  '#4DD0E1', // Slide 2: Deep Analytics (Cyan)
  '#FFB74D', // Slide 3: Budgeting & Smart Insights (Amber)
  '#26A69A', // Slide 4: Recurring Subscriptions (Teal)
  '#FF7043', // Slide 5: Split Bills & Debts (Coral)
  '#81C784', // Slide 6: Home Screen Widgets
  '#BA68C8'  // Slide 7: Data Freedom & Customisation (Purple)
];

let currentSlide = 0;
const totalSlides = 8;

function initOnboardingSlider() {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.getElementById('onboardingPrevBtn');
  const nextBtn = document.getElementById('onboardingNextBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const auraContainer = document.getElementById('onboardingDynamicAura');

  if (!slides.length) return;

  function updateSlider(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

    // Update slides visibility with smooth transition
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
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

    // Update Next button label for last slide
    if (nextBtnText) {
      nextBtnText.textContent = currentSlide === totalSlides - 1 ? 'Get Started' : 'Next';
    }

    // Dynamic Atmosphere Glow Color Transition
    const color = SLIDE_GLOW_COLORS[currentSlide];
    if (auraContainer) {
      auraContainer.style.background = `radial-gradient(circle at 50% 30%, ${color}40 0%, ${color}15 45%, transparent 70%)`;
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

  // Touch Swipe Support for Phones
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
   4. User Guide Search & Accordion Engine
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
