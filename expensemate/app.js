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
