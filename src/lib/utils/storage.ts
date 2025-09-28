// Local storage utility functions with type safety

/**
 * Storage key prefix to avoid conflicts
 */
const STORAGE_PREFIX = 'portfolio_';

/**
 * Gets an item from localStorage with type safety
 */
export function getStorageItem<T>(key: string, defaultValue?: T): T | null {
  if (typeof window === 'undefined') return defaultValue || null;

  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (item === null) return defaultValue || null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue || null;
  }
}

/**
 * Sets an item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
    return false;
  }
}

/**
 * Removes an item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.removeItem(STORAGE_PREFIX + key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
    return false;
  }
}

/**
 * Clears all items with our prefix from localStorage
 */
export function clearStorage(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const keys = Object.keys(window.localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        window.localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
    return false;
  }
}

/**
 * Checks if localStorage is available
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Session storage utilities
 */
export const sessionStorage = {
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue || null;

    try {
      const item = window.sessionStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from sessionStorage:`, error);
      return defaultValue || null;
    }
  },

  set<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;

    try {
      window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage:`, error);
      return false;
    }
  },

  remove(key: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      window.sessionStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing from sessionStorage:`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const keys = Object.keys(window.sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          window.sessionStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error(`Error clearing sessionStorage:`, error);
      return false;
    }
  }
};

/**
 * Storage with expiration
 */
export function setStorageItemWithExpiry<T>(
  key: string,
  value: T,
  ttlMinutes: number
): boolean {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttlMinutes * 60000
  };

  return setStorageItem(key, item);
}

export function getStorageItemWithExpiry<T>(key: string): T | null {
  const item = getStorageItem<{ value: T; expiry: number }>(key);

  if (!item) return null;

  const now = new Date();
  if (now.getTime() > item.expiry) {
    removeStorageItem(key);
    return null;
  }

  return item.value;
}