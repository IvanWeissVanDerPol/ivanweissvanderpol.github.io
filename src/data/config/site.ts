// Site configuration and metadata
import type { SiteConfig } from '../../types';

export const siteConfig: SiteConfig = {
  // Basic site information
  title: "Ivan Weiss Van Der Pol - Portfolio",
  description: "Data Engineer | AI Enthusiast | Python Developer - Technical Lead at Stoic Finch",
  author: "Ivan Weiss Van Der Pol",
  url: "https://ivanweissvanderpol.github.io",
  baseUrl: "/",

  // SEO and meta information
  keywords: [
    "Data Engineer",
    "Python Developer",
    "Technical Lead",
    "QA Automation",
    "AI Enthusiast",
    "Power Apps",
    "Apache Spark",
    "Paraguay",
    "FP-UNA",
    "Portfolio"
  ],

  // Localization
  language: "en",
  locale: "en-US",
  timezone: "America/Asuncion",

  // Repository information
  repository: "https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io",

  // Social media profiles
  social: {
    twitter: "@ivanweiss",
    github: "ivanweissvanderpol",
    linkedin: "ivanweissvanderpol"
  },

  // Feature flags
  features: {
    blog: false,
    portfolio: true,
    contact: true,
    newsletter: false
  }
};