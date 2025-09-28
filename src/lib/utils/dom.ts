// DOM manipulation utility functions

/**
 * Safely queries for a DOM element
 */
export function querySelector<T extends Element>(
  selector: string,
  parent: Document | Element = document
): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Safely queries for all matching DOM elements
 */
export function querySelectorAll<T extends Element>(
  selector: string,
  parent: Document | Element = document
): NodeListOf<T> {
  return parent.querySelectorAll<T>(selector);
}

/**
 * Adds event listener with automatic cleanup
 */
export function addEventListener<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  listener: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListener(
  target: any,
  type: any,
  listener: any,
  options?: any
): () => void {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}

/**
 * Checks if element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Gets the computed style value of an element
 */
export function getStyle(
  element: Element,
  property: string
): string {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Sets multiple styles on an element
 */
export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  Object.assign(element.style, styles);
}

/**
 * Creates an element with attributes
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  children?: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
 * Waits for DOM to be ready
 */
export function domReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else {
      resolve();
    }
  });
}

/**
 * Gets element dimensions including margin
 */
export function getOuterDimensions(element: Element): {
  width: number;
  height: number;
} {
  const computed = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  const marginLeft = parseFloat(computed.marginLeft);
  const marginRight = parseFloat(computed.marginRight);
  const marginTop = parseFloat(computed.marginTop);
  const marginBottom = parseFloat(computed.marginBottom);

  return {
    width: rect.width + marginLeft + marginRight,
    height: rect.height + marginTop + marginBottom
  };
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = createElement('textarea', {
      value: text,
      style: 'position: fixed; top: -999px; left: -999px;'
    });
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Toggles class with optional callback
 */
export function toggleClass(
  element: Element,
  className: string,
  force?: boolean
): boolean {
  const result = element.classList.toggle(className, force);
  return result;
}

/**
 * Waits for an element to appear in DOM
 */
export function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<Element | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}