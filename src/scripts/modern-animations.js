/* =====================================================
   MODERN ANIMATIONS - Smooth Scroll & Interactions
   ===================================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // ===== Smooth Scroll Navigation =====
  initSmoothScroll();

  // ===== Intersection Observer for Animations =====
  initScrollAnimations();

  // ===== Parallax Effects =====
  initParallaxEffects();

  // ===== Navigation Effects =====
  initNavigationEffects();

  // ===== Progress Bar =====
  initProgressBar();

  // ===== Scroll to Top =====
  initScrollToTop();

  // ===== Particle Background - DISABLED =====
  // initParticleBackground(); // Too distracting

  // ===== Card Tilt Effects - DISABLED =====
  // initCardTiltEffects(); // Too dramatic

  // ===== Text Animations - Simplified =====
  // initTextAnimations(); // Typing effect disabled

  // ===== Loading States =====
  initLoadingStates();
});

// ===== SMOOTH SCROLL IMPLEMENTATION =====
function initSmoothScroll() {
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Stagger animations for child elements
        const children = entry.target.querySelectorAll('[data-animate-child]');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // Add animation classes to elements
  document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });

  document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// ===== NAVIGATION EFFECTS =====
function initNavigationEffects() {
  const nav = document.querySelector('.main-navigation');
  let lastScroll = 0;

  if (nav) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide/show navigation on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });

    // Active section highlighting
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
  }
}

// ===== UPDATE ACTIVE SECTION =====
function updateActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== PROGRESS BAR =====
function initProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'nav-progress';
  progressBar.style.width = '0%';

  const nav = document.querySelector('.main-navigation');
  if (nav) {
    nav.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  // Show/hide button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'hero-particles';

  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }

  heroSection.appendChild(particlesContainer);
}

// ===== CARD TILT EFFECTS =====
function initCardTiltEffects() {
  const cards = document.querySelectorAll('.project-card, .skill-category');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== TEXT ANIMATIONS =====
function initTextAnimations() {
  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero-title .name');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '1.2em';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing after a delay
    setTimeout(typeWriter, 500);
  }

  // Count up animation for stats
  const stats = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        const increment = target / 100;
        let current = 0;

        const updateCount = () => {
          if (current < target) {
            current += increment;
            entry.target.textContent = Math.ceil(current);
            requestAnimationFrame(updateCount);
          } else {
            entry.target.textContent = target;
          }
        };

        updateCount();
        countObserver.unobserve(entry.target);
      }
    });
  });

  stats.forEach(stat => countObserver.observe(stat));
}

// ===== LOADING STATES =====
function initLoadingStates() {
  // Remove loading class after page load
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate elements on load
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    animateElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) translateX(0)';
      }, index * 100);
    });
  });

  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initSmoothScroll,
    initScrollAnimations,
    initParallaxEffects,
    initNavigationEffects,
    initProgressBar,
    initScrollToTop,
    initParticleBackground,
    initCardTiltEffects,
    initTextAnimations,
    initLoadingStates,
    debounce,
    throttle
  };
}