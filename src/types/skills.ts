// Skills and proficiency type definitions
export interface SkillsData {
  sectionId: string;
  title: string;
  subtitle?: string;
  layout?: LayoutConfig;
  skillsets: Skillset[];
  categories?: SkillCategory[];
}

export interface Skillset {
  name: string;
  level: number; // 0-100
  description?: string;
  yearsExperience?: string;
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
  techColor?: string;
  hoverDescription?: string;
  tags?: string[];
  certifications?: Certification[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
  icon?: string;
}

export interface Skill {
  name: string;
  level?: number;
  icon?: string;
  color?: string;
  url?: string;
  description?: string;
  projects?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
  icon?: string;
}

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
}