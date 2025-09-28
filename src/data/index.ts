// Main data export - central hub for all website content
// Import all data modules
import { siteConfig } from './config/site';
import { themeConfig } from './config/theme';
import { personalData } from './content/personal';
import { navigationData } from './content/navigation';
import { heroData } from './content/hero';
import { contactData } from './content/contact';
import { socialLinks } from './content/social';
import { aboutData } from './content/about';
import { skillsData } from './content/skills';
import { portfolioData } from './content/portfolio';
import { workData } from './content/work';
import { educationData } from './content/education';
import { certificationsData } from './content/certifications';
import { recommendationsData } from './content/recommendations';
import { images } from './assets/images';
import { scripts } from './assets/scripts';

// Export all data for components to use
export {
  siteConfig,
  themeConfig,
  personalData,
  navigationData,
  heroData,
  contactData,
  socialLinks,
  aboutData,
  skillsData,
  portfolioData,
  workData,
  educationData,
  certificationsData,
  recommendationsData,
  images,
  scripts
};

// Default export with all data
export default {
  site: siteConfig,
  theme: themeConfig,
  personal: personalData,
  navigation: navigationData,
  hero: heroData,
  contact: contactData,
  social: socialLinks,
  about: aboutData,
  skills: skillsData,
  portfolio: portfolioData,
  work: workData,
  education: educationData,
  certifications: certificationsData,
  recommendations: recommendationsData,
  images,
  scripts
};