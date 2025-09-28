/**
 * Navigation Animation Module
 * Handles scroll effects, active states, and mobile menu interactions
 */

export class NavigationAnimations {
  constructor() {
    this.nav = document.querySelector('.main-navigation');
    this.mobileToggle = document.querySelector('[data-mobile-toggle]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.navLinks = document.querySelectorAll('[data-nav-link], [data-mobile-nav-link]');
    this.lastScrollY = window.scrollY;
    this.ticking = false;

    this.init();
  }

  init() {
    this.initScrollEffects();
    this.initMobileMenu();
    this.initActiveStates();
    this.initKeyboardNavigation();
  }

  /**
   * Initialize scroll-based navigation effects
   */
  initScrollEffects() {
    const updateNavigation = () => {
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > this.lastScrollY;
      const scrolled = scrollY > 50;

      // Add/remove scrolled class
      if (scrolled) {
        this.nav?.classList.add('scrolled');
      } else {
        this.nav?.classList.remove('scrolled');
      }

      // Hide/show navigation on scroll
      if (scrollingDown && scrollY > 200) {
        this.nav?.classList.add('nav-hidden');
      } else {
        this.nav?.classList.remove('nav-hidden');
      }

      this.lastScrollY = scrollY;
      this.ticking = false;
    };

    const requestTick = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(updateNavigation);
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    updateNavigation(); // Initial update
  }

  /**
   * Initialize mobile menu functionality
   */
  initMobileMenu() {
    if (!this.mobileToggle || !this.mobileMenu) return;

    // Toggle menu
    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close on link click
    const mobileLinks = this.mobileMenu.querySelectorAll('[data-mobile-nav-link]');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!this.mobileMenu.contains(e.target) &&
          !this.mobileToggle.contains(e.target) &&
          this.mobileMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * Toggle mobile menu state
   */
  toggleMobileMenu() {
    const isOpen = this.mobileMenu?.classList.contains('active');

    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.mobileMenu?.classList.add('active');
    this.mobileToggle?.classList.add('active');
    this.mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus first menu item
    const firstLink = this.mobileMenu?.querySelector('[data-mobile-nav-link]');
    firstLink?.focus();
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.mobileMenu?.classList.remove('active');
    this.mobileToggle?.classList.remove('active');
    this.mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Return focus to toggle button
    this.mobileToggle?.focus();
  }

  /**
   * Initialize active link states based on scroll position
   */
  initActiveStates() {
    const updateActiveLink = () => {
      const currentSection = this.getCurrentSection();

      this.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentSection) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial update
  }

  /**
   * Get the current section based on scroll position
   */
  getCurrentSection() {
    const sections = document.querySelectorAll('section[id], article[id]');
    const scrollPosition = window.scrollY + 100;

    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;

      if (scrollPosition >= top && scrollPosition <= bottom) {
        return `#${section.id}`;
      }
    }

    // Default to home if no section is active
    return window.scrollY < 100 ? '#' : '';
  }

  /**
   * Initialize keyboard navigation for accessibility
   */
  initKeyboardNavigation() {
    // Add keyboard navigation for desktop menu
    this.navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextLink = this.navLinks[index + 1] || this.navLinks[0];
          nextLink?.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevLink = this.navLinks[index - 1] || this.navLinks[this.navLinks.length - 1];
          prevLink?.focus();
        }
      });
    });
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    window.removeEventListener('scroll', this.requestTick);
    document.removeEventListener('keydown', this.handleEscape);
  }
}

// Auto-initialize on DOM content loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new NavigationAnimations();
  });
}

export default NavigationAnimations;