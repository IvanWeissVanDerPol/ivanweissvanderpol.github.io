// Component prop type definitions
export interface LayoutProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
  children?: any;
}

export interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  className?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageProps;
  actions?: ButtonProps[];
  tags?: string[];
  badge?: BadgeProps;
  href?: string;
  target?: '_blank' | '_self';
  className?: string;
  featured?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  className?: string;
}

export interface BadgeProps {
  text: string;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  className?: string;
}

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  ariaLabel?: string;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  decorated?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: any;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface SkillItemProps {
  name: string;
  level?: number;
  description?: string;
  icon?: string;
  color?: string;
  tags?: string[];
  className?: string;
}

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image?: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
  };
  variant?: 'compact' | 'detailed';
  className?: string;
}

export interface WorkExperienceProps {
  experience: {
    company: string;
    position: string;
    description?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    location?: string;
    technologies?: string[];
  };
  showTimeline?: boolean;
  className?: string;
}

export interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  link?: {
    url: string;
    label: string;
  };
  highlighted?: boolean;
  className?: string;
}

export interface NavigationProps {
  items?: any[];
  brand?: any;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export interface HeroProps {
  data?: any;
  showSocial?: boolean;
  showCTA?: boolean;
  className?: string;
}

export interface ContactProps {
  data?: any;
  showForm?: boolean;
  showMethods?: boolean;
  className?: string;
}