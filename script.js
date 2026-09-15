document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Theme Management ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add brief rotation effect to icons on click
    const svg = themeToggleBtn.querySelector('svg');
    svg.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      svg.style.transform = '';
    }, 500);
  });

  // --- 2. Mobile Navigation Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = navLinks.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.innerHTML = navLinks.classList.contains('open') 
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close menu when clicking nav links
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  // --- 3. Scroll Header Effect & Active Link ---
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow background on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Nav Highlight
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // --- 4. Tagline Typewriter Effect ---
  const taglineEl = document.getElementById('typing-text');
  const words = ['MCA Graduate', 'AI & Web Developer', 'Data Analyst', 'Creative Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      taglineEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      taglineEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1500; // pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }
  
  // Start the typing animation
  type();

  // --- 5. Skills Progress & Filter Hub ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  // Triggering individual progress bar animations
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-progress') + '%';
      // Only set if visible or on load
      bar.style.width = targetWidth;
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          // Trigger animation in category
          setTimeout(() => {
            card.querySelectorAll('.skill-progress-bar').forEach(bar => {
              bar.style.width = bar.getAttribute('data-progress') + '%';
            });
          }, 100);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Internships / Experience Tab Switcher ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 7. Scroll Reveal Animation using IntersectionObserver ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it has skill progress bars, animate them
        if (entry.target.classList.contains('skills-section-wrapper')) {
          animateProgressBars();
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Wrapper for skills section to trigger bars if user directly scrolls
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsSection.classList.add('skills-section-wrapper');
    revealObserver.observe(skillsSection);
  }

  // --- 8. Contact Form Handling via EmailJS ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origHTML = submitBtn.innerHTML;

      // Read EmailJS IDs from data attributes on the form element
      const serviceId  = contactForm.getAttribute('data-service-id');
      const templateId = contactForm.getAttribute('data-template-id');

      // Collect form values into template params
      const templateParams = {
        from_name:  document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        message:    document.getElementById('message').value.trim(),
        to_email:   'roshini07521@gmail.com',
      };

      // Guard: warn if credentials haven't been replaced yet
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID') {
        formSuccess.style.display = 'block';
        formSuccess.style.background = 'rgba(239,68,68,0.12)';
        formSuccess.style.borderColor = 'rgba(239,68,68,0.3)';
        formSuccess.style.color = '#ef4444';
        formSuccess.textContent = 'EmailJS credentials not set. Please follow the setup guide.';
        return;
      }

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      emailjs.send(serviceId, templateId, templateParams)
        .then(() => {
          submitBtn.innerHTML = '<span>Sent Successfully!</span>';
          formSuccess.style.display = 'block';
          formSuccess.style.background = '';
          formSuccess.style.borderColor = '';
          formSuccess.style.color = '';
          formSuccess.textContent = 'Message sent! I will get back to you shortly.';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origHTML;
            formSuccess.style.display = 'none';
          }, 6000);
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHTML;
          formSuccess.style.display = 'block';
          formSuccess.style.background = 'rgba(239,68,68,0.12)';
          formSuccess.style.borderColor = 'rgba(239,68,68,0.3)';
          formSuccess.style.color = '#ef4444';
          formSuccess.textContent = 'Failed to send. Please email directly at roshini07521@gmail.com';

          setTimeout(() => { formSuccess.style.display = 'none'; }, 8000);
        });
    });
  }
});

// CSS Injection for spinner animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
