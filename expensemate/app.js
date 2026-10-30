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
function initAmbientGlow() {
  const orbs = [
    { el: document.getElementById('glowOrb1'), factorX: 0.22, factorY: 0.16 },
    { el: document.getElementById('glowOrb2'), factorX: -0.20, factorY: -0.14 },
    { el: document.getElementById('glowOrb3'), factorX: 0.16, factorY: -0.12 },
    { el: document.getElementById('glowOrb4'), factorX: -0.14, factorY: 0.18 }
  ].filter(o => o.el !== null);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX - window.innerWidth / 2) * 0.14;
    targetY = (e.clientY - window.innerHeight / 2) * 0.14;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      targetX = (e.touches[0].clientX - window.innerWidth / 2) * 0.10;
      targetY = (e.touches[0].clientY - window.innerHeight / 2) * 0.10;
    }
  }, { passive: true });

  function animateOrbs() {
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    orbs.forEach(orb => {
      orb.el.style.translate = `${currentX * orb.factorX}px ${currentY * orb.factorY}px`;
    });

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
   7. Interactive Screenshots Gallery Navigation & Drag-to-Scroll
   ========================================================================== */
function initGalleryNavigation() {
  const container = document.getElementById('screenshotsContainer');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');

  if (!container) return;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -280, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // Mouse drag-to-scroll support for desktop
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    if (container) container.classList.remove('dragging');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}
