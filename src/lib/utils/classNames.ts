// Utility for managing CSS class names
type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean };

/**
 * Combines multiple class names into a single string
 * Supports strings, conditionals, and object notation
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * Conditionally applies a class name
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : (falseClass || '');
}

/**
 * Generates BEM-style class names
 */
export function bem(
  block: string,
  element?: string,
  modifier?: string | string[]
): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    const modifiers = Array.isArray(modifier) ? modifier : [modifier];
    modifiers.forEach(mod => {
      className += ` ${block}--${mod}`;
    });
  }

  return className;
}