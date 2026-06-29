// --- Assisterly Dashboard Interactivity Controller ---

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI features
  initThemeSwitcher();
  initLiveClock();
  initStatsCounters();
  initSliderCarousel();
  initNotificationPanel();
  initScrollToTop();
  initFormValidation();
  initScrollSpy();
});

// ==========================================
// 1. Live Date & Time Display (S.No 9)
// ==========================================
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Clinical precision formatting in JetBrains Mono
    clockEl.textContent = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ==========================================
// 2. Theme Switcher (S.No 10)
// ==========================================
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Check saved user preference or system theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Play subtle rotation animation on click
    themeToggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });
}

// ==========================================
// 3. Dynamic Statistics Counters (S.No 5)
// ==========================================
function initStatsCounters() {
  const statsValues = [
    { id: 'stat-total-users', target: 4820, format: (v) => v.toLocaleString('en-IN') },
    { id: 'stat-active-caregivers', target: 1248, format: (v) => v.toLocaleString('en-IN') },
    { id: 'stat-revenue', target: 8.4, format: (v) => '₹' + v.toFixed(1) + 'L' },
    { id: 'stat-transactions', target: 3120, format: (v) => v.toLocaleString('en-IN') },
    { id: 'stat-alerts', target: 12, format: (v) => v.toString().padStart(2, '0') },
    { id: 'stat-pending', target: 7, format: (v) => v.toString().padStart(2, '0') }
  ];

  // Animate stats when they scroll into view
  const section = document.getElementById('dashboard');
  if (!section) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);

  function animateStats() {
    statsValues.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;

      let startVal = 0;
      const duration = 1600; // ms
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out function (quadratic)
        const easeProgress = progress * (2 - progress);
        
        const currentVal = stat.id === 'stat-revenue' 
          ? easeProgress * stat.target 
          : Math.floor(easeProgress * stat.target);

        el.textContent = stat.format(currentVal);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = stat.format(stat.target);
        }
      }
      requestAnimationFrame(step);
    });
  }
}

// ==========================================
// 4. Image Slider/Carousel (S.No 8)
// ==========================================
function initSliderCarousel() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow-left');
  const nextBtn = document.querySelector('.slider-arrow-right');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  // Build dots programmatically
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Navigate to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  // Autoplay
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 4500);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();
}

// ==========================================
// 5. Notification Panel Drawer (S.No 11)
// ==========================================
function initNotificationPanel() {
  const bellBtn = document.getElementById('bell-btn');
  const notifPanel = document.getElementById('notification-panel');
  const closeBtn = document.getElementById('close-notifications');
  const bellBadge = document.getElementById('bell-badge');
  const notifList = document.querySelector('.notification-list');

  bellBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel?.classList.toggle('active');
  });

  closeBtn?.addEventListener('click', () => {
    notifPanel?.classList.remove('active');
  });

  // Close when clicking outside the panel
  document.addEventListener('click', (e) => {
    if (notifPanel?.classList.contains('active') && !notifPanel.contains(e.target) && !bellBtn.contains(e.target)) {
      notifPanel.classList.remove('active');
    }
  });

  // Bind dismiss notification listeners
  notifList?.addEventListener('click', (e) => {
    const dismissBtn = e.target.closest('.dismiss-notification');
    if (dismissBtn) {
      e.stopPropagation();
      const item = dismissBtn.closest('.notification-item');
      if (item) {
        // Fade out animation
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.3s ease';
        setTimeout(() => {
          item.remove();
          updateBadge();
        }, 300);
      }
    }
  });

  function updateBadge() {
    const items = notifList?.querySelectorAll('.notification-item');
    if (bellBadge) {
      if (!items || items.length === 0) {
        bellBadge.style.display = 'none';
        if (notifList) {
          notifList.innerHTML = '<div class="notification-empty">No active notices</div>';
        }
      } else {
        bellBadge.style.display = 'flex';
        bellBadge.textContent = items.length;
      }
    }
  }

  updateBadge();
}

// ==========================================
// 6. Scroll to Top Floating Button (S.No 16)
// ==========================================
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// 7. Input Form Validation Logic (S.No 13)
// ==========================================
function initFormValidation() {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const ageInput = document.getElementById('age');
  const passwordInput = document.getElementById('password');
  const dobInput = document.getElementById('dob');
  const timeInput = document.getElementById('preferred-time');
  const addressInput = document.getElementById('address');
  const notesInput = document.getElementById('additional-notes');
  const hiddenNotes = document.getElementById('additional-notes-hidden');
  const cancelBtn = document.getElementById('btn-cancel');

  if (!form) return;

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-success');
    group.classList.add('has-error');
    
    let errorEl = group.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function showSuccess(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    group.classList.add('has-success');
    const errorEl = group.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateName() {
    const val = nameInput.value.trim();
    if (val.length < 3) {
      showError(nameInput, 'Name must be at least 3 letters long.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(val)) {
      showError(nameInput, 'Name must only contain alphabetical characters and spaces.');
      return false;
    }
    showSuccess(nameInput);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      showError(emailInput, 'Provide a valid email address (e.g. info@domain.com).');
      return false;
    }
    showSuccess(emailInput);
    return true;
  }

  function validatePhone() {
    const val = phoneInput.value.trim().replace(/\s/g, '');
    const phoneRegex = /^(?:\+91)?[6-9][0-9]{9}$/;
    if (!phoneRegex.test(val)) {
      showError(phoneInput, 'Provide a valid Indian 10-digit mobile number starting with 6-9.');
      return false;
    }
    showSuccess(phoneInput);
    return true;
  }

  function validateAge() {
    const val = ageInput.value.trim();
    if (!val) {
      showError(ageInput, 'Age is required.');
      return false;
    }
    const age = parseInt(val, 10);
    if (isNaN(age) || age < 18 || age > 75) {
      showError(ageInput, 'Age must be between 18 and 75 years.');
      return false;
    }
    showSuccess(ageInput);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (val.length < 8) {
      showError(passwordInput, 'Password must be at least 8 characters long.');
      return false;
    }
    if (!/[A-Z]/.test(val)) {
      showError(passwordInput, 'Password must include at least one uppercase letter.');
      return false;
    }
    if (!/[0-9]/.test(val)) {
      showError(passwordInput, 'Password must include at least one digit.');
      return false;
    }
    showSuccess(passwordInput);
    return true;
  }

  function validateDOB() {
    const val = dobInput.value;
    if (!val) {
      showError(dobInput, 'Please select your Date of Birth.');
      return false;
    }
    const birthDate = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      showError(dobInput, 'Caregivers must be at least 18 years of age.');
      return false;
    }
    if (age > 75) {
      showError(dobInput, 'Maximum age for caregiver registration is 75.');
      return false;
    }
    showSuccess(dobInput);
    return true;
  }

  function validatePreferredTime() {
    const val = timeInput.value.trim();
    if (!val) {
      showError(timeInput, 'Please select a preferred appointment time.');
      return false;
    }
    showSuccess(timeInput);
    return true;
  }

  function validateAddress() {
    const val = addressInput.value.trim();
    if (val.length < 15) {
      showError(addressInput, 'Address is too short. Provide a complete residential address (min 15 chars).');
      return false;
    }
    showSuccess(addressInput);
    return true;
  }

  function validateNotes() {
    if (notesInput && hiddenNotes) {
      hiddenNotes.value = notesInput.textContent.trim();
    }
    // Notes are optional, but we sync them
    if (notesInput) {
      showSuccess(notesInput);
    }
    return true;
  }

  // Real-time input checking
  nameInput?.addEventListener('input', validateName);
  emailInput?.addEventListener('input', validateEmail);
  phoneInput?.addEventListener('input', validatePhone);
  ageInput?.addEventListener('input', validateAge);
  passwordInput?.addEventListener('input', validatePassword);
  dobInput?.addEventListener('change', validateDOB);
  timeInput?.addEventListener('change', validatePreferredTime);
  addressInput?.addEventListener('input', validateAddress);

  // Sync contenteditable on keyup and input
  notesInput?.addEventListener('input', validateNotes);
  notesInput?.addEventListener('blur', validateNotes);

  // Cancel Button action (Req 17)
  cancelBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel registration? All entered details will be cleared.')) {
      form.reset();
      if (notesInput) notesInput.textContent = '';
      if (hiddenNotes) hiddenNotes.value = '';
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error', 'has-success');
        const err = group.querySelector('.error-message');
        if (err) err.textContent = '';
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Form submit intercept
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAgeValid = validateAge();
    const isPasswordValid = validatePassword();
    const isDOBValid = validateDOB();
    const isTimeValid = validatePreferredTime();
    const isAddressValid = validateAddress();
    const isNotesValid = validateNotes();

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isDOBValid && isTimeValid && isAddressValid && isNotesValid) {
      alert('Registration Successful! Caregiver background screening workflow has been queued.');
      form.reset();
      if (notesInput) notesInput.textContent = '';
      if (hiddenNotes) hiddenNotes.value = '';
      
      // Clear visual status indicators
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-success', 'has-error');
      });
    } else {
      // Focus on the first invalid field
      const firstErr = document.querySelector('.form-group.has-error input, .form-group.has-error textarea, .form-group.has-error [contenteditable]');
      firstErr?.focus();
    }
  });

  // Clear validation visual markers on form reset
  form.addEventListener('reset', () => {
    setTimeout(() => {
      if (notesInput) notesInput.textContent = '';
      if (hiddenNotes) hiddenNotes.value = '';
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error', 'has-success');
        const err = group.querySelector('.error-message');
        if (err) err.textContent = '';
      });
    }, 10);
  });
}

// ==========================================
// 8. Navigation Scroll Spy & Highlighting (S.No 2)
// ==========================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) return;

  // Map section IDs to the actual visible links in the simplified navigation menu
  const sectionToNavLink = {
    'home': 'home',
    'dashboard': 'home',
    'features': 'services',
    'services': 'services',
    'register': 'register',
    'reports': 'about',
    'about': 'about',
    'contact': 'contact',
    'help': 'help',
    'logout': 'help'
  };

  function spy() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 150; // offset for sticky nav

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id') || '';
      }
    });

    // Special fallback for Home section / welcome section
    if (window.scrollY < 100) {
      currentSectionId = 'home';
    }

    const mappedSectionId = sectionToNavLink[currentSectionId] || currentSectionId;

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${mappedSectionId}` || (mappedSectionId === '' && href === '#home')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', spy);
  spy(); // run initial highlight check
}
