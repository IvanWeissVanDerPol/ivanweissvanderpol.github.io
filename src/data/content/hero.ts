// Hero section data
import type { HeroData } from '../../types';

export const heroData: HeroData = {
  // Text content
  greeting: "Hi, I'm",
  name: "Ivan Weiss Van Der Pol",
  role: "Data Engineer | AI Enthusiast | Python Developer",
  subtitle: "Technical Lead & Quality Engineering Expert",

  // Description text fragments
  rolePrefix: "I'm a",
  roleIntroduction: " with expertise in Python development, QA automation, and data engineering",

  // Complete description
  description: "I'm a Data Engineer and Technical Lead with expertise in Python development, QA automation, and data engineering. Currently leading Power Apps solutions at Stoic Finch while pursuing my Computer Science degree at FP-UNA.",

  // Additional professional info
  tagline: "Building scalable solutions with AI and automation",

  // University information
  university: {
    name: "FP-UNA",
    url: "https://www.pol.una.py/"
  },

  // Availability status
  availability: {
    status: 'available',
    message: 'Available for projects'
  },

  // Background image (optional)
  backgroundImage: "/images/hero-bg.jpg",

  // Animation configuration
  animation: {
    type: 'fade',
    duration: 800,
    delay: 0
  },

  // Call to action buttons
  cta: [
    {
      label: "View Projects",
      url: "#projects",
      type: "primary",
      icon: "fa-folder"
    },
    {
      label: "Contact Me",
      url: "#contact",
      type: "secondary",
      icon: "fa-envelope"
    }
  ]
};