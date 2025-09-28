// Debounce and throttle utility functions

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let lastCallTime: number | null = null;

  const leading = options?.leading || false;
  const trailing = options?.trailing !== false;

  const invokeFunc = () => {
    if (lastArgs) {
      func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  };

  const startTimer = (wait: number) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (trailing) invokeFunc();
    }, wait);
  };

  return function debounced(this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;
    const now = Date.now();

    if (!lastCallTime) {
      lastCallTime = now;
      if (leading) {
        invokeFunc();
      }
    }

    startTimer(wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per wait milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let lastCallTime = 0;

  const leading = options?.leading !== false;
  const trailing = options?.trailing !== false;

  const invokeFunc = () => {
    if (lastArgs) {
      func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  };

  return function throttled(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      if (leading) {
        invokeFunc();
      }
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        timeout = null;
        invokeFunc();
      }, remaining);
    }
  };
}

/**
 * Request animation frame throttle
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;

  return function rafThrottled(this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
        rafId = null;
      });
    }
  };
}

/**
 * Cancellable debounce with immediate cancel method
 */
export interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

export function debounceCancellable<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebouncedFunc<T> {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;

  const invokeFunc = () => {
    if (lastArgs) {
      func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  };

  const debounced = function (this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      invokeFunc();
    }, wait);
  } as DebouncedFunc<T>;

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
    lastThis = null;
  };

  debounced.flush = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    invokeFunc();
  };

  debounced.pending = () => timeout !== null;

  return debounced;
}