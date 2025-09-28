// Navigation type definitions
export interface NavigationData {
  brand: BrandConfig;
  items: NavigationItem[];
  mobile?: MobileNavConfig;
  settings?: NavigationSettings;
}

export interface BrandConfig {
  name: string;
  logo?: string;
  url: string;
  tagline?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  target?: '_blank' | '_self';
  active?: boolean;
  children?: NavigationItem[];
  badge?: {
    text: string;
    type: 'new' | 'hot' | 'beta' | 'pro';
  };
}

export interface MobileNavConfig {
  breakpoint?: number;
  position?: 'left' | 'right' | 'top' | 'bottom';
  animation?: 'slide' | 'fade' | 'none';
}

export interface NavigationSettings {
  sticky?: boolean;
  transparent?: boolean;
  hideOnScroll?: boolean;
  showProgress?: boolean;
}