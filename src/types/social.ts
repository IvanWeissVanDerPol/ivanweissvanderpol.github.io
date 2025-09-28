// Social media and links type definitions
export interface SocialLinks {
  primary: SocialLink[];
  secondary?: SocialLink[];
  professional?: SocialLink[];
  settings?: SocialSettings;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label?: string;
  username?: string;
  color?: string;
  hoverColor?: string;
  target?: '_blank' | '_self';
  rel?: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
  priority?: number;
}

export interface SocialSettings {
  openInNewTab?: boolean;
  showLabels?: boolean;
  iconSize?: 'small' | 'medium' | 'large';
  style?: 'solid' | 'outline' | 'ghost';
}