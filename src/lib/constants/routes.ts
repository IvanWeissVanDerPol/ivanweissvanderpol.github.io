// Application routes and navigation constants
export const ROUTES = {
  home: '/',
  about: '/about',
  projects: '/projects',
  blog: '/blog',
  contact: '/contact'
} as const;

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  work: 'work',
  education: 'education',
  contact: 'contact'
} as const;

export const EXTERNAL_LINKS = {
  github: 'https://github.com/ivanweissvanderpol',
  linkedin: 'https://www.linkedin.com/in/ivanweissvanderpol/',
  twitter: 'https://twitter.com/ivanweiss',
  email: 'mailto:weissvanderpol.ivan@gmail.com'
} as const;

export type Route = keyof typeof ROUTES;
export type SectionId = keyof typeof SECTION_IDS;
export type ExternalLink = keyof typeof EXTERNAL_LINKS;