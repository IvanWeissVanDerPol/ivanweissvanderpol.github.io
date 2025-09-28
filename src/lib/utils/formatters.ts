// Formatting utility functions

/**
 * Formats a date string to a readable format
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return dateObj.toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Formats a date range
 */
export function formatDateRange(
  startDate: string | Date,
  endDate?: string | Date | null,
  currentLabel: string = 'Present'
): string {
  const start = formatDate(startDate, { year: 'numeric', month: 'short' });
  const end = endDate
    ? formatDate(endDate, { year: 'numeric', month: 'short' })
    : currentLabel;

  return `${start} - ${end}`;
}

/**
 * Calculates and formats duration between dates
 */
export function formatDuration(
  startDate: string | Date,
  endDate?: string | Date | null
): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = endDate
    ? (typeof endDate === 'string' ? new Date(endDate) : endDate)
    : new Date();

  const months = (end.getFullYear() - start.getFullYear()) * 12 +
                  (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
  } else if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else {
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
}

/**
 * Formats a number as a percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a number with commas for thousands
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Converts a string to a URL-friendly slug
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Formats file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}