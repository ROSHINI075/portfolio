/* =====================================================
   PRIYADHARSHINI V — PORTFOLIO JAVASCRIPT
   ===================================================== */

'use strict';

// ========= Utility =========
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ========= Cursor Glow =========
(function initCursorGlow() {
  const glow = $('#cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  glow.style.opacity = '1';
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// ========= Theme Toggle =========
(function initTheme() {
  const btn = $('#theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('priya-theme') || 'dark';
  root.setAttribute('data-theme', saved);

  btn && btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('priya-theme', next);
  });
})();

// ========= Mobile Navigation =========
(function initMobileNav() {
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');

  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger && hamburger.classList.remove('open');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger && hamburger.classList.remove('open');
    }
  });
})();

// ========= Header Scroll Effect =========
(function initHeaderScroll() {
  const header = $('#header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ========= Back to Top =========
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ========= Active Nav Link on Scroll =========
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = $(`a.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
})();

// ========= Reveal on Scroll =========
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger items in the same parent
        const siblings = entry.target.parentElement
          ? $$('.reveal', entry.target.parentElement)
          : [];
        const index = siblings.indexOf(entry.target);
        const delay = index * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();

// ========= Typing Text Effect =========
(function initTypingEffect() {
  const el = $('#typing-text');
  if (!el) return;

  const phrases = [
    'Python Web Applications',
    'AI-Powered Tools',
    'NLP & Data Solutions',
    'Flask-Based Systems',
    'Backend Software',
    'Real-World Software Projects',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPING_SPEED = 60;
  const DELETING_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_DELETE = 400;

  function tick() {
    const phrase = phrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === phrase.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; tick(); }, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isPaused = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(() => { isPaused = false; isDeleting = false; tick(); }, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  setTimeout(tick, 800);
})();

// ========= Skill Bar Animation =========
(function initSkillBars() {
  const bars = $$('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-w') || 0;
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ========= Skills Filter =========
(function initSkillsFilter() {
  const filterBtns = $$('.filter-btn');
  const cards = $$('.skill-cat-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

// ========= Contact Form with EmailJS =========
(function initContactForm() {
  const EMAILJS_SERVICE_ID  = 'service_w5dx7ur';
  const EMAILJS_TEMPLATE_ID = 'template_7al4khi';
  const EMAILJS_PUBLIC_KEY  = '-mYg-yC0t18PoRqBs';

  // Init EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  } else {
    window.addEventListener('load', () => {
      if (typeof emailjs !== 'undefined') emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    });
  }

  const form = $('#contactForm');
  if (!form) return;

  const successEl = $('#form-success');
  const errorEl   = $('#form-error');
  const submitBtn = $('#submit-contact-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successEl && successEl.classList.remove('visible');
    errorEl   && errorEl.classList.remove('visible');

    const params = {
      from_name:  document.getElementById('contact-name')?.value.trim() || '',
      from_email: document.getElementById('contact-email-input')?.value.trim() || '',
      subject:    document.getElementById('contact-subject')?.value.trim() || 'Portfolio Contact',
      message:    document.getElementById('contact-message')?.value.trim() || '',
    };

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!params.from_name || !params.from_email || !params.message || !emailRegex.test(params.from_email)) {
      errorEl && errorEl.classList.add('visible');
      return;
    }

    if (!submitBtn) return;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      } else {
        throw new Error('EmailJS not loaded');
      }
      submitBtn.innerHTML = '<span>✓ Sent!</span>';
      form.reset();
      successEl && successEl.classList.add('visible');
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        successEl && successEl.classList.remove('visible');
      }, 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      // Fallback: open mail client
      const subj = encodeURIComponent(params.subject);
      const body = encodeURIComponent(`Name: ${params.from_name}\nEmail: ${params.from_email}\n\nMessage:\n${params.message}`);
      window.location.href = `mailto:roshini07521@gmail.com?subject=${subj}&body=${body}`;
      errorEl && errorEl.classList.add('visible');
    }
  });
})();

// ========= Smooth section transitions =========
(function initSmoothLinks() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ========= Project Card Hover Tilt =========
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 5;
      const tiltY = ((x - cx) / cx) * -5;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ========= Stats Counter Animation =========
(function initCounters() {
  const statValues = $$('.stat-value');
  if (!statValues.length) return;

  const animateCounter = (el, target, duration = 1500) => {
    // Only animate numeric values
    const numTarget = parseFloat(target);
    if (isNaN(numTarget)) return;

    const suffix = target.replace(/[\d.]/g, '');
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numTarget * eased;

      el.textContent = (Number.isInteger(numTarget) ? Math.floor(current) : current.toFixed(1)) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));
})();

console.log('%c⚡ Priyadharshini V — Portfolio', 'font-size:16px;font-weight:bold;color:#8b5cf6;');
console.log('%cBuilt with passion & pure code.', 'color:#94a3b8;');
