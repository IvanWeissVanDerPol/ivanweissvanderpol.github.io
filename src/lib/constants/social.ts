// Social media constants
export const SOCIAL_PLATFORMS = {
  github: {
    name: 'GitHub',
    baseUrl: 'https://github.com/',
    icon: 'fab fa-github',
    color: '#181717'
  },
  linkedin: {
    name: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/in/',
    icon: 'fab fa-linkedin',
    color: '#0077B5'
  },
  twitter: {
    name: 'Twitter',
    baseUrl: 'https://twitter.com/',
    icon: 'fab fa-twitter',
    color: '#1DA1F2'
  },
  facebook: {
    name: 'Facebook',
    baseUrl: 'https://www.facebook.com/',
    icon: 'fab fa-facebook',
    color: '#1877F2'
  },
  instagram: {
    name: 'Instagram',
    baseUrl: 'https://www.instagram.com/',
    icon: 'fab fa-instagram',
    color: '#E4405F'
  },
  youtube: {
    name: 'YouTube',
    baseUrl: 'https://www.youtube.com/',
    icon: 'fab fa-youtube',
    color: '#FF0000'
  },
  email: {
    name: 'Email',
    baseUrl: 'mailto:',
    icon: 'fas fa-envelope',
    color: '#EA4335'
  }
} as const;

export type SocialPlatform = keyof typeof SOCIAL_PLATFORMS;