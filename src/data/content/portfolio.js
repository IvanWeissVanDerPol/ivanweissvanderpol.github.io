// Portfolio projects data - Real professional projects
export const portfolioData = {
  // Section configuration
  sectionId: "projects",
  title: "Featured Projects",
  subtitle: "Real-world solutions delivering measurable business impact",

  // Professional projects showcasing technical leadership and impact
  projects: [
    {
      id: "sturgeon-county-platform",
      title: "Sturgeon County Power Apps Solution",
      description: "Led the development of a comprehensive Power Apps platform for Sturgeon County, delivering a 40% efficiency improvement across 5+ departments through automated workflows and centralized document management.",
      category: "Enterprise Solution",
      technologies: ["Power Apps", "Power Automate", "SharePoint", "Power BI", "Technical Leadership"],
      image: "/images/programmer.jpg",
      featured: true,
      status: "completed",
      company: "Stoic Finch",
      duration: "October 2024 - Present",
      businessImpact: [
        "40% efficiency improvement across departments",
        "60% reduction in case processing time",
        "50% improvement in document management",
        "85% increase in user satisfaction"
      ],
      highlights: [
        "Led cross-functional team of 8+ developers and stakeholders",
        "Architected role-based access control system",
        "Implemented automated task management workflows",
        "Integrated SharePoint for centralized document management",
        "Collaborated with UI/UX developers for enhanced design"
      ],
      technicalAchievements: [
        "Automated case handling and assignment processes",
        "Built comprehensive Power BI dashboards",
        "Established best practices for Power Platform development"
      ]
    },
    {
      id: "flyte-medical-qa",
      title: "FDA-Compliant Medical Device QA Platform",
      description: "Oversaw comprehensive quality assurance for Flyte Project's FDA-cleared medical device platform, ensuring 100% compliance across web, mobile, and hardware components for women's pelvic health solutions.",
      category: "Healthcare Technology",
      technologies: ["FDA Compliance", "API Testing", "MongoDB", "Bluetooth Testing", "Medical Device QA"],
      image: "/images/pic01.jpg",
      featured: true,
      status: "completed",
      company: "MentorMate",
      duration: "August 2023 - October 2024",
      businessImpact: [
        "100% FDA compliance achieved",
        "99.5% uptime maintained",
        "75% improvement in feature adoption",
        "60% enhanced testing robustness"
      ],
      highlights: [
        "Managed quality assurance for FDA-cleared medical device",
        "Ensured compliance across web, mobile, and hardware platforms",
        "Developed comprehensive test strategies for patient scenarios",
        "Created detailed documentation for industry compliance",
        "Executed API testing with Postman for medical integrations"
      ],
      technicalAchievements: [
        "Bluetooth connectivity testing for medical devices",
        "MongoDB test data generation for patient scenarios",
        "Risk assessment and mitigation strategies"
      ]
    },
    {
      id: "python-automation-suite",
      title: "Enterprise Python Automation Suite",
      description: "Developed comprehensive Python automation tools at WPG.srl, reducing manual testing effort by 85% and increasing testing efficiency by 300% through automated report generation and XML processing systems.",
      category: "Automation & Data Processing",
      technologies: ["Python", "Test Automation", "XML Processing", "Data Generation", "Reporting Systems"],
      image: "/images/pic02.jpg",
      featured: true,
      status: "completed",
      company: "WPG.srl",
      duration: "October 2018 - December 2022",
      businessImpact: [
        "85% reduction in manual testing effort",
        "300% increase in testing efficiency",
        "100% quality standards maintained",
        "90% documentation coverage achieved"
      ],
      highlights: [
        "Built Python tools for automated test data generation",
        "Developed XML processing and transformation systems",
        "Created automated report generation pipelines",
        "Maintained 100% quality standards across 50+ releases",
        "Contributed to 25+ system architecture improvements"
      ],
      technicalAchievements: [
        "Automated complex XML data transformations",
        "Built reusable testing framework components",
        "Streamlined development-to-production workflows"
      ]
    },
    {
      id: "modern-portfolio-architecture",
      title: "Modern Portfolio Website Architecture",
      description: "Designed and built a performance-optimized portfolio website using modern web technologies, featuring component-based architecture, responsive design, and comprehensive accessibility compliance.",
      category: "Web Development",
      technologies: ["Astro", "Modern CSS", "Accessibility", "Performance Optimization", "Responsive Design"],
      image: "/images/pic03.jpg",
      githubUrl: "https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io",
      liveUrl: "https://ivanweissvanderpol.github.io",
      featured: false,
      status: "ongoing",
      highlights: [
        "Modern component-based architecture with Astro",
        "WCAG 2.1 AA accessibility compliance",
        "Mobile-first responsive design approach",
        "Performance-optimized with critical CSS loading",
        "Modern animation framework with reduced motion support"
      ],
      technicalAchievements: [
        "Lighthouse performance score optimization",
        "Comprehensive design system implementation",
        "Advanced CSS architecture with modular approach"
      ]
    }
  ],
  
  // Project categories for filtering
  categories: [
    {
      name: "All",
      filter: "*",
      active: true
    },
    {
      name: "Web Development",
      filter: "web-development",
      active: false
    },
    {
      name: "Academic",
      filter: "academic",
      active: false
    },
    {
      name: "Algorithms",
      filter: "algorithms", 
      active: false
    }
  ],
  
  // GitHub statistics (can be populated via API)
  githubStats: {
    publicRepos: 12,
    totalCommits: 250,
    languagesUsed: 8,
    contributionStreak: 45
  },
  
  // Call to action
  callToAction: {
    title: "Want to collaborate?",
    description: "I'm always interested in working on new projects and learning from experienced developers.",
    buttonText: "Get in Touch",
    buttonLink: "#contact"
  },
  
  // Layout configuration
  layout: {
    wrapperClass: "wrapper style1",
    containerClass: "container",
    gridClass: "row gtr-uniform"
  }
};