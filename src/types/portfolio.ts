// Portfolio and project type definitions
export interface PortfolioData {
  sectionId: string;
  title: string;
  subtitle?: string;
  layout?: LayoutConfig;
  projects: Project[];
  categories?: ProjectCategory[];
  filters?: FilterConfig;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  images?: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  status: 'planning' | 'in-progress' | 'completed' | 'ongoing' | 'archived';
  highlights?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: ProjectResult[];
  startDate?: string;
  endDate?: string;
  team?: TeamMember[];
  role?: string;
  client?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface ProjectResult {
  metric: string;
  value: string | number;
  improvement?: string;
  description?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  url?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface FilterConfig {
  enabled?: boolean;
  defaultCategory?: string;
  showCount?: boolean;
}

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
}