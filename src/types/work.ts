// Work experience type definitions
export interface WorkData {
  sectionId: string;
  title: string;
  subtitle?: string;
  layout?: LayoutConfig;
  experiences: WorkExperience[];
  timeline?: TimelineConfig;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  description?: string;
  responsibilities?: string[];
  achievements?: Achievement[];
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  locationType?: 'onsite' | 'remote' | 'hybrid';
  companyUrl?: string;
  companyLogo?: string;
  technologies?: string[];
  team?: TeamInfo;
  references?: Reference[];
}

export interface Achievement {
  title: string;
  description?: string;
  metric?: string;
  impact?: string;
  date?: string;
}

export interface TeamInfo {
  size?: number;
  role?: string;
  directReports?: number;
}

export interface Reference {
  name: string;
  title: string;
  company?: string;
  relationship?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  recommendation?: string;
}

export interface TimelineConfig {
  enabled?: boolean;
  style?: 'vertical' | 'horizontal';
  showDates?: boolean;
  animate?: boolean;
}

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
}