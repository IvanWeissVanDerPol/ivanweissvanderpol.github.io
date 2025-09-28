# Data Structure Documentation

## Overview

The portfolio uses a centralized data management approach with JavaScript/TypeScript modules storing all content. This enables easy content updates without modifying component code.

## Data Directory Structure

```
src/data/
├── content/              # Main content data
│   ├── hero.js/.ts      # Hero section data
│   ├── portfolio.js     # Project showcase data
│   ├── work.js          # Work experience
│   ├── skills.js        # Technical skills
│   ├── about.js         # About section
│   ├── education.js     # Educational background
│   ├── certifications.js # Professional certifications
│   ├── contact.js       # Contact information
│   ├── navigation.js    # Navigation menu items
│   ├── personal.js      # Personal information
│   ├── recommendations.js # Testimonials/recommendations
│   └── social.js        # Social media links
├── config/              # Configuration files
│   ├── site.ts          # Site configuration
│   └── theme.ts         # Theme configuration
├── assets/              # Data-related assets
├── i18n/                # Internationalization data
├── Logo/                # Logo assets
└── PersonalData/        # Personal documents
    ├── Certifications/  # Certificate files
    ├── oldResumes/      # Resume archives
    └── anaual salary review/
```

## Content Data Schemas

### 1. Hero Data (`hero.js` / `hero.ts`)

```javascript
{
  title: string,              // Main headline
  subtitle: string,           // Subheading
  tagline: string,            // Professional tagline
  description: string,        // Brief introduction
  buttons: [
    {
      text: string,         // Button label
      link: string,         // Target URL
      primary: boolean      // Primary/secondary style
    }
  ],
  backgroundImage: string,    // Hero background
  animations: {
    enabled: boolean,
    type: string            // Animation type
  }
}
```

### 2. Portfolio/Projects Data (`portfolio.js`)

```javascript
{
  projects: [
    {
      id: string,
      title: string,
      description: string,
      longDescription: string,
      category: string,      // Project type
      technologies: string[], // Tech stack
      image: string,         // Project thumbnail
      links: {
        demo: string,        // Live demo URL
        github: string,      // Repository URL
        documentation: string
      },
      featured: boolean,     // Featured project flag
      date: string,         // Completion date
      status: string        // Current status
    }
  ]
}
```

### 3. Work Experience Data (`work.js`)

```javascript
{
  experiences: [
    {
      company: string,
      position: string,
      location: string,
      duration: {
        start: string,      // Start date
        end: string         // End date or "Present"
      },
      description: string,
      responsibilities: string[],
      achievements: string[],
      technologies: string[],
      logo: string,         // Company logo
      type: string          // Full-time/Contract/Intern
    }
  ]
}
```

### 4. Skills Data (`skills.js`)

```javascript
{
  categories: [
    {
      name: string,         // Category name
      icon: string,         // Category icon
      skills: [
        {
          name: string,
          level: number,    // Proficiency 1-100
          years: number,    // Years of experience
          icon: string,     // Skill icon
          category: string  // Sub-category
        }
      ]
    }
  ],
  summary: {
    totalSkills: number,
    yearsExperience: number,
    specializations: string[]
  }
}
```

### 5. Education Data (`education.js`)

```javascript
{
  degrees: [
    {
      institution: string,
      degree: string,
      field: string,
      location: string,
      duration: {
        start: string,
        end: string
      },
      gpa: number,
      achievements: string[],
      relevantCourses: string[],
      thesis: {
        title: string,
        description: string
      }
    }
  ]
}
```

### 6. Certifications Data (`certifications.js`)

```javascript
{
  certifications: [
    {
      name: string,
      issuer: string,
      date: string,
      expiryDate: string,
      credentialId: string,
      url: string,          // Verification URL
      logo: string,
      category: string,     // Certification type
      skills: string[]      // Related skills
    }
  ]
}
```

### 7. Contact Data (`contact.js`)

```javascript
{
  email: string,
  phone: string,
  location: {
    city: string,
    state: string,
    country: string,
    timezone: string
  },
  availability: string,
  preferredContact: string,
  responseTime: string,
  languages: string[]
}
```

### 8. Navigation Data (`navigation.js`)

```javascript
{
  items: [
    {
      label: string,
      href: string,
      icon: string,
      external: boolean,
      order: number
    }
  ],
  logo: {
    text: string,
    image: string,
    href: string
  }
}
```

### 9. Social Links Data (`social.js`)

```javascript
{
  profiles: [
    {
      platform: string,
      username: string,
      url: string,
      icon: string,
      display: boolean
    }
  ]
}
```

### 10. Personal Data (`personal.js`)

```javascript
{
  name: {
    first: string,
    last: string,
    display: string
  },
  title: string,
  bio: string,
  avatar: string,
  resume: {
    pdf: string,
    docx: string
  },
  keywords: string[],      // SEO keywords
  languages: string[],
  interests: string[]
}
```

## Configuration Data

### Site Configuration (`config/site.ts`)

```typescript
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
  };
  creator: string;
  keywords: string[];
  language: string;
  theme: 'light' | 'dark' | 'system';
}
```

### Theme Configuration (`config/theme.ts`)

```typescript
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}
```

## Data Access Patterns

### 1. Direct Import
```javascript
// In Astro component
---
import { projects } from '../data/content/portfolio.js';
---
```

### 2. Dynamic Import
```javascript
// Lazy loading for performance
const { skills } = await import('../data/content/skills.js');
```

### 3. Data Transformation
```javascript
// Processing data before use
const featuredProjects = projects
  .filter(p => p.featured)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
```

## Data Management Best Practices

### 1. Data Validation
- Use TypeScript interfaces for type safety
- Validate required fields
- Sanitize user-facing content

### 2. Performance Optimization
- Minimize data file sizes
- Use lazy loading for large datasets
- Implement data caching strategies

### 3. Content Updates
- Keep data files version controlled
- Document data structure changes
- Maintain backwards compatibility

### 4. Security Considerations
- Never store sensitive data in public files
- Sanitize URLs and external links
- Validate image sources

## Data Flow Architecture

```
Data Files (JS/TS)
    ↓
Import in Components
    ↓
Transform/Filter Data
    ↓
Render in Templates
    ↓
Static HTML Output
```

## Internationalization Support

The data structure supports i18n through:
- Language-specific data files in `i18n/` directory
- Locale keys in content objects
- Translation function integration

## Personal Data Management

The `PersonalData/` directory contains:
- **Certifications/**: Professional certificates
  - FP_UNA/
  - LinkedInLearning/
  - Mentormate/
  - Test_Automation_University/
- **Companies/**: Company-related documents
  - MM/Contract/
- **oldResumes/**: Historical resume versions
- **skills/**: Skill assessments
- **lang/**: Language certifications

## Data Update Workflow

1. **Locate Data File**: Find relevant file in `src/data/`
2. **Update Content**: Modify JavaScript/TypeScript object
3. **Validate Structure**: Ensure schema compliance
4. **Test Changes**: Run development server
5. **Build & Deploy**: Generate static site

## Future Data Enhancements

1. **CMS Integration**: Headless CMS for content management
2. **API Integration**: Dynamic data fetching
3. **Database Support**: For dynamic content
4. **GraphQL Layer**: Unified data access
5. **Real-time Updates**: WebSocket integration
6. **Data Analytics**: Usage tracking and insights