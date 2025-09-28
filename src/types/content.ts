// Content-related type definitions
export interface HeroData {
  greeting: string;
  name: string;
  subtitle: string;
  role: string;
  rolePrefix?: string;
  roleIntroduction?: string;
  description?: string;
  tagline?: string;
  university?: {
    name: string;
    url: string;
  };
  availability?: {
    status: 'available' | 'busy' | 'offline';
    message?: string;
  };
  cta?: CallToAction[];
  backgroundImage?: string;
  animation?: AnimationConfig;
}

export interface AboutData {
  sectionId: string;
  title: string;
  subtitle?: string;
  bio: string | string[];
  highlights?: string[];
  interests?: string[];
  values?: Value[];
  stats?: Stat[];
  image?: ImageAsset;
  resume?: {
    url: string;
    label?: string;
  };
}

export interface Value {
  title: string;
  description: string;
  icon?: string;
}

export interface Stat {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
}

export interface CallToAction {
  label: string;
  url?: string;
  action?: string;
  type: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  target?: '_blank' | '_self';
}

export interface AnimationConfig {
  type: string;
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}