// Skills and technology constants
export const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend Development',
    icon: 'fas fa-laptop-code',
    color: '#61DAFB'
  },
  backend: {
    name: 'Backend Development',
    icon: 'fas fa-server',
    color: '#68A063'
  },
  database: {
    name: 'Database',
    icon: 'fas fa-database',
    color: '#336791'
  },
  devops: {
    name: 'DevOps',
    icon: 'fas fa-infinity',
    color: '#FF6F00'
  },
  testing: {
    name: 'Testing & QA',
    icon: 'fas fa-bug',
    color: '#FF6B6B'
  },
  tools: {
    name: 'Tools & Technologies',
    icon: 'fas fa-tools',
    color: '#4A90E2'
  },
  languages: {
    name: 'Programming Languages',
    icon: 'fas fa-code',
    color: '#8B5CF6'
  },
  soft: {
    name: 'Soft Skills',
    icon: 'fas fa-users',
    color: '#10B981'
  }
} as const;

export const PROFICIENCY_LEVELS = {
  beginner: {
    label: 'Beginner',
    min: 0,
    max: 25,
    color: '#6B7280'
  },
  intermediate: {
    label: 'Intermediate',
    min: 26,
    max: 50,
    color: '#3B82F6'
  },
  advanced: {
    label: 'Advanced',
    min: 51,
    max: 75,
    color: '#10B981'
  },
  expert: {
    label: 'Expert',
    min: 76,
    max: 100,
    color: '#8B5CF6'
  }
} as const;

export type SkillCategory = keyof typeof SKILL_CATEGORIES;
export type ProficiencyLevel = keyof typeof PROFICIENCY_LEVELS;

export function getProficiencyLevel(percentage: number): ProficiencyLevel {
  if (percentage <= 25) return 'beginner';
  if (percentage <= 50) return 'intermediate';
  if (percentage <= 75) return 'advanced';
  return 'expert';
}