// Site configuration types
export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  url: string;
  baseUrl: string;
  language: string;
  locale: string;
  timezone: string;
  repository?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  analytics?: {
    google?: string;
    plausible?: string;
  };
  features?: {
    blog?: boolean;
    portfolio?: boolean;
    contact?: boolean;
    newsletter?: boolean;
  };
}

export interface ThemeConfig {
  defaultTheme: ThemeId;
  themes: Theme[];
  colorScheme: 'light' | 'dark' | 'auto';
  fontFamily?: {
    sans?: string;
    serif?: string;
    mono?: string;
  };
}

export interface Theme {
  id: ThemeId;
  name: string;
  description?: string;
  colors: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    heading: string;
  };
  border: {
    primary: string;
    secondary: string;
    light: string;
  };
  gradients?: {
    primary?: string;
    secondary?: string;
    hero?: string;
  };
}

export type ThemeId = 'midnight' | 'cosmic' | 'forest' | 'crimson' | 'arctic';

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
  maxWidth?: string;
  padding?: string;
}