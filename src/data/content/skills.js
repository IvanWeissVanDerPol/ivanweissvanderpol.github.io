// Skills and technologies data
export const skillsData = {
  // Section configuration
  sectionId: "skills",
  title: "Skills & Proficiency",
  subtitle: "Technical expertise across development, quality assurance, and data engineering",
  
  // Layout configuration
  layout: {
    wrapperClass: "wrapper style3",
    containerClass: "container",
    gridClass: "row gtr-uniform"
  },
  
  // Skills with proficiency levels (matching profile percentages)
  skillsets: [
    {
      name: "Python Development",
      level: 98,
      description: "Expert-level Python development across multiple domains",
      yearsExperience: "6+ years",
      proficiencyLevel: "Expert",
      icon: "fab fa-python",
      techColor: "#3776ab",
      hoverDescription: "Advanced Python development for automation, data processing, web development, and machine learning applications",
      tags: [
        "Python",
        "Pandas",
        "Selenium",
        "PySpark",
        "NumPy",
        "Matplotlib"
      ]
    },
    {
      name: "QA Automation",
      level: 95,
      description: "Comprehensive test automation and quality assurance expertise",
      yearsExperience: "5+ years",
      proficiencyLevel: "Expert",
      icon: "fas fa-bug",
      techColor: "#ff6b6b",
      hoverDescription: "End-to-end test automation, API testing, mobile testing, and CI/CD integration with modern frameworks",
      tags: [
        "Selenium",
        "PyTest",
        "Jenkins",
        "TestRail",
        "Selenium WebDriver",
        "Hexawise",
        "QTest",
        "Test Automation",
        "BDD (Cucumber)",
        "Applitools",
        "Cypress",
        "WebdriverIO"
      ]
    },
    {
      name: "Data Engineering",
      level: 90,
      description: "Building scalable data pipelines and processing systems",
      yearsExperience: "3+ years",
      proficiencyLevel: "Advanced",
      icon: "fas fa-database",
      techColor: "#4dabf7",
      hoverDescription: "Design and implementation of large-scale data processing systems, ETL pipelines, and real-time analytics",
      tags: [
        "Airflow",
        "Spark",
        "Delta Lake",
        "Databricks",
        "Apache Spark",
        "Spark SQL",
        "Azure DevOps",
        "Data Pipelines",
        "ETL",
        "Big Data"
      ]
    },
    {
      name: "Software Development",
      level: 90,
      description: "Full-stack development with focus on backend systems",
      yearsExperience: "6+ years",
      proficiencyLevel: "Advanced",
      icon: "fas fa-code",
      techColor: "#28a745",
      hoverDescription: "Full-stack development expertise with strong focus on backend architecture, API development, and system design",
      tags: [
        "Python",
        "Java",
        "Git",
        "RESTful APIs",
        "Postman",
        "API Automation",
        "Jenkins",
        "CI/CD",
        "Azure DevOps"
      ]
    },
    {
      name: "Web Technologies",
      level: 85,
      description: "Modern web development and responsive design",
      yearsExperience: "4+ years",
      proficiencyLevel: "Advanced",
      icon: "fas fa-globe",
      techColor: "#fd7e14",
      hoverDescription: "Modern web development using HTML5, CSS3, JavaScript, and frameworks like React for creating responsive and interactive user interfaces",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Flask",
        "HTML5",
        "CSS3",
        "Responsive Design",
        "Web Development",
        "Bootstrap"
      ]
    },
    {
      name: "Database Management",
      level: 80,
      description: "Database design, optimization, and management",
      yearsExperience: "4+ years",
      proficiencyLevel: "Advanced",
      icon: "fas fa-server",
      techColor: "#6c757d",
      hoverDescription: "Comprehensive database management including SQL optimization, NoSQL databases, data modeling, and cloud-based data solutions",
      tags: [
        "MongoDB",
        "SQL",
        "Database Design",
        "Query Optimization",
        "Databricks",
        "Relational Databases",
        "Azure Data Lake",
        "Apache Spark",
        "PySpark"
      ]
    },
    {
      name: "AI & Automation Tools",
      level: 75,
      description: "Leveraging AI for automation and efficiency",
      yearsExperience: "2+ years",
      proficiencyLevel: "Intermediate",
      icon: "fas fa-brain",
      techColor: "#e83e8c",
      hoverDescription: "Implementation of AI-powered automation solutions, prompt engineering for LLMs, and building intelligent workflow automation systems",
      tags: [
        "Prompt Engineering",
        "Automation Scripts",
        "AI Agents",
        "OpenAI"
      ]
    },
    {
      name: "Project Management & DevOps",
      level: 70,
      description: "Agile methodologies and DevOps practices",
      yearsExperience: "5+ years",
      proficiencyLevel: "Intermediate",
      icon: "fas fa-project-diagram",
      techColor: "#20c997",
      hoverDescription: "Project leadership using Agile methodologies, DevOps pipeline implementation, and team coordination across multiple projects and stakeholders",
      tags: [
        "JIRA",
        "CI/CD Practices",
        "Agile Methodologies",
        "Scrum",
        "Kanban",
        "Version Control",
        "DevOps Tools"
      ]
    }
  ],
  
  // Additional skills categorization for AboutUnified component
  categories: [
    {
      name: "Programming Languages",
      skills: [
        {
          name: "Python",
          icon: "fab fa-python",
          proficiency: "Expert",
          proficiencyPercentage: 98,
          yearsExperience: "6+ years",
          description: "Expert-level Python development for automation, data processing, and backend systems",
          techColor: "#3776ab",
          specialties: ["Data Processing", "Automation", "API Development", "Testing"]
        },
        {
          name: "Java",
          icon: "fab fa-java",
          proficiency: "Advanced",
          proficiencyPercentage: 85,
          yearsExperience: "3+ years",
          description: "Backend development with Spring framework and enterprise applications",
          techColor: "#ed8b00",
          specialties: ["Spring Framework", "REST APIs", "Enterprise Development"]
        },
        {
          name: "JavaScript",
          icon: "fab fa-js-square",
          proficiency: "Intermediate",
          proficiencyPercentage: 75,
          yearsExperience: "2+ years",
          description: "Frontend development and test automation with modern JS frameworks",
          techColor: "#f7df1e",
          specialties: ["Frontend Development", "Test Automation", "Node.js"]
        }
      ]
    },
    {
      name: "Data Engineering & Analytics",
      skills: [
        {
          name: "Apache Spark",
          icon: "fas fa-fire",
          proficiency: "Advanced",
          proficiencyPercentage: 88,
          yearsExperience: "2+ years",
          description: "Large-scale data processing and distributed computing with PySpark",
          techColor: "#e25a1c",
          specialties: ["PySpark", "Spark SQL", "Data Pipelines", "ETL"]
        },
        {
          name: "Databricks",
          icon: "fas fa-cloud",
          proficiency: "Advanced",
          proficiencyPercentage: 82,
          yearsExperience: "2+ years",
          description: "Cloud-based data engineering and analytics platform expertise",
          techColor: "#ff3621",
          specialties: ["Data Processing", "ML Integration", "Collaborative Analytics"]
        },
        {
          name: "ETL Pipelines",
          icon: "fas fa-cogs",
          proficiency: "Advanced",
          proficiencyPercentage: 90,
          yearsExperience: "3+ years",
          description: "Design and implementation of Extract, Transform, Load workflows",
          techColor: "#4a90e2",
          specialties: ["Data Transformation", "Pipeline Automation", "Scheduling"]
        }
      ]
    },
    {
      name: "Quality Assurance & Testing",
      skills: [
        {
          name: "Test Automation",
          icon: "fas fa-robot",
          proficiency: "Expert",
          yearsExperience: "5+ years",
          description: "Comprehensive test automation frameworks and strategies",
          specialties: ["Selenium", "PyTest", "API Testing", "CI/CD Integration"]
        },
        {
          name: "Quality Assurance",
          icon: "fas fa-check-circle",
          proficiency: "Expert",
          yearsExperience: "6+ years",
          description: "Manual and automated testing, compliance, and quality standards",
          specialties: ["FDA Compliance", "Healthcare Testing", "Manual Testing"]
        },
        {
          name: "API Testing",
          icon: "fas fa-exchange-alt",
          proficiency: "Advanced",
          yearsExperience: "4+ years",
          description: "RESTful API testing and validation using various tools",
          specialties: ["Postman", "REST APIs", "JSON Validation", "Performance Testing"]
        }
      ]
    },
    {
      name: "Tools & Platforms",
      skills: [
        {
          name: "Power Platform",
          icon: "fas fa-bolt",
          proficiency: "Advanced",
          yearsExperience: "1+ years",
          description: "Power Apps, Power Automate, and Power BI development",
          specialties: ["Power Apps", "SharePoint Integration", "Workflow Automation"]
        },
        {
          name: "Jenkins",
          icon: "fas fa-cog",
          proficiency: "Intermediate",
          yearsExperience: "3+ years",
          description: "CI/CD pipeline automation and deployment orchestration",
          specialties: ["Pipeline Configuration", "Automated Testing", "Deployment"]
        },
        {
          name: "Git",
          icon: "fab fa-git-alt",
          proficiency: "Advanced",
          yearsExperience: "6+ years",
          description: "Version control and collaborative development workflows",
          specialties: ["Branching Strategies", "Code Review", "Team Collaboration"]
        }
      ]
    }
  ],
  
  // Skill statistics
  statistics: {
    totalSkills: 50,
    expertLevel: 2,
    advancedLevel: 3,
    intermediateLevel: 3,
    certifications: 5
  }
};