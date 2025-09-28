// Responsive breakpoint constants
export const BREAKPOINTS = {
  xs: 480,
  sm: 736,
  md: 980,
  lg: 1280,
  xl: 1680,
  '2xl': 1920
} as const;

export const MEDIA_QUERIES = {
  xs: `(max-width: ${BREAKPOINTS.xs}px)`,
  sm: `(max-width: ${BREAKPOINTS.sm}px)`,
  md: `(max-width: ${BREAKPOINTS.md}px)`,
  lg: `(max-width: ${BREAKPOINTS.lg}px)`,
  xl: `(max-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(max-width: ${BREAKPOINTS['2xl']}px)`,

  // Minimum width queries
  'min-xs': `(min-width: ${BREAKPOINTS.xs + 1}px)`,
  'min-sm': `(min-width: ${BREAKPOINTS.sm + 1}px)`,
  'min-md': `(min-width: ${BREAKPOINTS.md + 1}px)`,
  'min-lg': `(min-width: ${BREAKPOINTS.lg + 1}px)`,
  'min-xl': `(min-width: ${BREAKPOINTS.xl + 1}px)`,
  'min-2xl': `(min-width: ${BREAKPOINTS['2xl'] + 1}px)`,

  // Range queries
  'xs-sm': `(min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px)`,
  'sm-md': `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px)`,
  'md-lg': `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px)`,
  'lg-xl': `(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px)`,

  // Feature queries
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  'reduced-motion': '(prefers-reduced-motion: reduce)',
  'high-contrast': '(prefers-contrast: high)',
  'dark-mode': '(prefers-color-scheme: dark)',
  'light-mode': '(prefers-color-scheme: light)'
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
export type MediaQuery = keyof typeof MEDIA_QUERIES;