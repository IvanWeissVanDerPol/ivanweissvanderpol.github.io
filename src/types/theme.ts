// Theme system type definitions
export interface ThemeSystem {
  themes: Record<ThemeId, ThemeDefinition>;
  currentTheme: ThemeId;
  prefersDark?: boolean;
  customThemes?: CustomTheme[];
}

export type ThemeId = 'midnight' | 'cosmic' | 'forest' | 'crimson' | 'arctic' | string;

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description?: string;
  isDark: boolean;
  colors: ThemeColors;
  typography?: TypographyConfig;
  spacing?: SpacingConfig;
  borders?: BorderConfig;
  shadows?: ShadowConfig;
  animations?: AnimationConfig;
}

export interface ThemeColors {
  // Background colors
  '--bg-primary': string;
  '--bg-secondary': string;
  '--bg-tertiary': string;
  '--bg-quaternary'?: string;
  '--bg-glass'?: string;
  '--bg-card'?: string;
  '--bg-card-hover'?: string;

  // Text colors
  '--text-primary': string;
  '--text-secondary': string;
  '--text-tertiary'?: string;
  '--text-muted': string;
  '--text-heading': string;
  '--text-accent': string;

  // Brand colors
  '--color-primary': string;
  '--color-primary-dark'?: string;
  '--color-primary-light'?: string;
  '--color-secondary': string;
  '--color-secondary-dark'?: string;
  '--color-accent': string;
  '--color-accent-dark'?: string;

  // Semantic colors
  '--color-success'?: string;
  '--color-warning'?: string;
  '--color-error'?: string;
  '--color-info'?: string;

  // Border colors
  '--border-primary': string;
  '--border-secondary'?: string;
  '--border-light': string;
  '--border-muted'?: string;

  // Gradients
  '--gradient-primary': string;
  '--gradient-secondary'?: string;
  '--gradient-hero': string;
  '--gradient-card'?: string;
  '--gradient-text'?: string;
}

export interface TypographyConfig {
  fontFamily?: {
    base?: string;
    heading?: string;
    mono?: string;
  };
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, number>;
  lineHeight?: Record<string, number>;
  letterSpacing?: Record<string, string>;
}

export interface SpacingConfig {
  base?: string;
  scale?: Record<string, string>;
}

export interface BorderConfig {
  radius?: Record<string, string>;
  width?: Record<string, string>;
}

export interface ShadowConfig {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  glow?: string;
  'glow-lg'?: string;
}

export interface AnimationConfig {
  duration?: {
    fast?: string;
    normal?: string;
    slow?: string;
  };
  easing?: {
    default?: string;
    bounce?: string;
    smooth?: string;
  };
}

export interface CustomTheme extends ThemeDefinition {
  author?: string;
  version?: string;
  tags?: string[];
}