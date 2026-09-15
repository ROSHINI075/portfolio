/* =====================================================
   Portfolio Script — Roshini P
   EmailJS credentials are hardcoded here for reliability
   ===================================================== */

// ── EmailJS Config ──────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_w5dx7ur';
const EMAILJS_TEMPLATE_ID = 'template_7al4khi';
const EMAILJS_PUBLIC_KEY  = '-mYg-yC0t18PoRqBs';

// ── Init EmailJS immediately ─────────────────────────
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
} else {
  // Retry after SDK loads if CDN was slow
  window.addEventListener('load', () => {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  });
}

// ── Spinner CSS ──────────────────────────────────────
(function injectSpinnerCSS() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .skill-category-card { transition: opacity 0.3s ease; }
    .skill-category-card.hidden { display: none !important; }
  `;
  document.head.appendChild(s);
})();

// ── DOMContentLoaded ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. THEME TOGGLE ───────────────────────────── */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current  = document.documentElement.getAttribute('data-theme');
      const next     = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      // Rotate the VISIBLE svg icon only
      const visibleSvg = themeToggleBtn.querySelector(
        next === 'light' ? '.sun-icon' : '.moon-icon'
      );
      if (visibleSvg) {
        visibleSvg.style.transition = 'transform 0.5s ease';
        visibleSvg.style.transform  = 'rotate(360deg)';
        setTimeout(() => { visibleSvg.style.transform = ''; }, 550);
      }
    });
  }

  /* ── 2. HAMBURGER NAV ──────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  const ICON_MENU  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const ICON_CLOSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6"  y2="18"/><line x1="6"  y1="6" x2="18" y2="18"/></svg>`;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.innerHTML = ICON_MENU;
      });
    });
  }

  /* ── 3. SCROLL — HEADER + ACTIVE NAV ──────────── */
  const header   = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollY = window.pageYOffset;

    // Header glass background
    if (header) {
      header.classList.toggle('scrolled', scrollY > 50);
    }

    // Active nav link
    sections.forEach(sec => {
      const top = sec.offsetTop - 130;
      const bot = top + sec.offsetHeight;
      const id  = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bot);
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── 4. TYPEWRITER EFFECT ──────────────────────── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words = ['MCA Graduate', 'AI & Web Developer', 'Data Analyst', 'Creative Problem Solver'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function typeStep() {
      const word  = words[wIdx];
      const speed = deleting ? 40 : 100;

      typingEl.textContent = deleting
        ? word.substring(0, cIdx - 1)
        : word.substring(0, cIdx + 1);

      deleting ? cIdx-- : cIdx++;

      let next = speed;
      if (!deleting && cIdx === word.length) {
        deleting = true; next = 1500;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        next = 500;
      }
      setTimeout(typeStep, next);
    }
    typeStep();
  }

  /* ── 5. SKILLS FILTER + PROGRESS BARS ─────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const skillCards  = document.querySelectorAll('.skill-category-card');

  function animateBars(container) {
    const target = container || document;
    target.querySelectorAll('.skill-progress-bar').forEach(bar => {
      bar.style.width = (bar.getAttribute('data-progress') || 0) + '%';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden', !match);
        if (match) setTimeout(() => animateBars(card), 80);
      });
    });
  });

  /* ── 6. EXPERIENCE TABS ────────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b   => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(btn.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });

  /* ── 7. SCROLL REVEAL + PROGRESS BARS ON SCROLL ─ */
  const reveals = document.querySelectorAll('.reveal');
  let barsAnimated = false;

  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');

      // Animate progress bars when skills section comes into view
      if (!barsAnimated && entry.target.closest('#skills')) {
        barsAnimated = true;
        animateBars();
      }

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  // Also observe skill cards themselves for bar animation
  skillCards.forEach(card => revealObs.observe(card));

  /* ── 8. CONTACT FORM — EmailJS ─────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origHTML  = submitBtn.innerHTML;

      // Check EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        showFormMsg('error', 'Email service not loaded. Please check your connection and try again.');
        return;
      }

      // Collect values
      const params = {
        from_name:  document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        message:    document.getElementById('message').value.trim(),
      };

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending</span>
        <svg width="16" height="16" viewBox="0 0 50 50" style="animation:spin 1s linear infinite;flex-shrink:0">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="6"
            stroke-dasharray="80" stroke-dashoffset="60" stroke-linecap="round"/>
        </svg>`;

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
        submitBtn.innerHTML = `<span>✓ Sent!</span>`;
        showFormMsg('success', '✅ Message sent successfully! I will get back to you shortly.');
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHTML;
          hideFormMsg();
        }, 6000);
      } catch (err) {
        console.error('EmailJS error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = origHTML;
        showFormMsg('error', '❌ Failed to send. Please email me directly: roshini07521@gmail.com');
        setTimeout(hideFormMsg, 8000);
      }
    });
  }

  function showFormMsg(type, text) {
    if (!formSuccess) return;
    formSuccess.textContent = text;
    formSuccess.style.display = 'block';
    if (type === 'error') {
      formSuccess.style.background    = 'rgba(239,68,68,0.10)';
      formSuccess.style.borderColor   = 'rgba(239,68,68,0.30)';
      formSuccess.style.color         = '#ef4444';
    } else {
      formSuccess.style.background    = '';
      formSuccess.style.borderColor   = '';
      formSuccess.style.color         = '';
    }
  }

  function hideFormMsg() {
    if (formSuccess) formSuccess.style.display = 'none';
  }

}); // end DOMContentLoaded
