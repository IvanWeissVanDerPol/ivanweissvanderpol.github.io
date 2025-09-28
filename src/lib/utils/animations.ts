// Animation utility functions

/**
 * Detects if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Creates a staggered animation delay
 */
export function staggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

/**
 * Animates a counter from start to end value
 */
export function animateCounter(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2000,
  suffix: string = ''
): void {
  if (prefersReducedMotion()) {
    element.textContent = `${end}${suffix}`;
    return;
  }

  const startTime = Date.now();
  const range = end - start;

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-cubic)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + range * easeProgress);

    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  requestAnimationFrame(updateCounter);
}

/**
 * Adds intersection observer for reveal animations
 */
export function observeForAnimation(
  elements: NodeListOf<Element> | Element[],
  options?: IntersectionObserverInit,
  animationClass: string = 'animate'
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  elements.forEach(element => observer.observe(element));

  return observer;
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
  element: Element | string,
  options?: ScrollIntoViewOptions
): void {
  const targetElement = typeof element === 'string'
    ? document.querySelector(element)
    : element;

  if (!targetElement) return;

  const defaultOptions: ScrollIntoViewOptions = {
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
    ...options
  };

  targetElement.scrollIntoView(defaultOptions);
}

/**
 * Parallax scroll effect
 */
export function parallaxScroll(
  element: HTMLElement,
  speed: number = 0.5
): () => void {
  if (prefersReducedMotion()) return () => {};

  const updatePosition = () => {
    const scrolled = window.pageYOffset;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  };

  window.addEventListener('scroll', updatePosition);

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', updatePosition);
  };
}

/**
 * Typewriter effect
 */
export function typewriterEffect(
  element: HTMLElement,
  text: string,
  speed: number = 50
): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      element.textContent = text;
      resolve();
      return;
    }

    let index = 0;
    element.textContent = '';

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };

    type();
  });
}