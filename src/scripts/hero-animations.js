/**
 * Hero Section Animation Module
 * Handles all animations and interactions for hero components
 */

export class HeroAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.initParallaxEffect();
    this.initTextAnimations();
    this.initScrollIndicator();
    this.initIntersectionObserver();
  }

  /**
   * Initialize parallax scrolling effect for background
   */
  initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const background = document.querySelector('.hero-background');

    if (!heroSection || !background) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      background.style.transform = `translateY(${rate}px)`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  /**
   * Initialize text reveal animations
   */
  initTextAnimations() {
    const animatedElements = document.querySelectorAll('.hero-title span, .description-main, .hero-social');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * Initialize scroll indicator animation
   */
  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.hero-section').nextElementSibling;

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    // Hide scroll indicator when scrolling down
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '0.6';
        scrollIndicator.style.pointerEvents = 'auto';
      }

      lastScrollY = currentScrollY;
    });
  }

  /**
   * Initialize intersection observer for reveal animations
   */
  initIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe hero stats
    const statsElements = document.querySelectorAll('.value-prop');
    statsElements.forEach((el) => observer.observe(el));

    // Observe CTA buttons
    const ctaElements = document.querySelectorAll('.hero-actions');
    ctaElements.forEach((el) => observer.observe(el));
  }

  /**
   * Utility function to add staggered animations
   */
  staggerAnimation(elements, baseDelay = 0, staggerDelay = 100) {
    elements.forEach((element, index) => {
      element.style.animationDelay = `${baseDelay + index * staggerDelay}ms`;
    });
  }

  /**
   * Clean up animations (useful for page transitions)
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('scroll', this.requestTick);
  }
}

// Auto-initialize on DOM content loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimations();
  });
}

// Export for use in Astro components
export default HeroAnimations;