# Components Documentation

## Component Overview

This document details all components in the portfolio application, their purpose, props, and usage patterns.

## Core Components

### 1. Hero Component
**Location**: `src/components/Hero.astro`
**Size**: 19.3 KB
**Purpose**: Landing section with animated introduction and call-to-action

**Features**:
- Animated text reveal
- Gradient text effects
- Responsive layout
- Call-to-action buttons
- Background animations

**Data Source**: `src/data/content/hero.js` and `hero.ts`

**Key Elements**:
- Hero title with typing animation
- Professional tagline
- Navigation buttons
- Visual effects and gradients

---

### 2. Navigation Component
**Location**: `src/components/Navigation.astro`
**Size**: 12.6 KB
**Purpose**: Responsive navigation bar with mobile menu

**Features**:
- Sticky header on scroll
- Mobile hamburger menu
- Smooth scroll navigation
- Active section highlighting
- Logo/brand display

**Data Source**: `src/data/content/navigation.js`

**Functionality**:
- Desktop: Horizontal navigation bar
- Mobile: Collapsible menu drawer
- Scroll-based transparency effects

---

### 3. AboutUnified Component
**Location**: `src/components/AboutUnified.astro`
**Size**: 75.5 KB (Large comprehensive component)
**Purpose**: Comprehensive about section combining multiple data sources

**Sections Included**:
- Personal introduction
- Professional summary
- Education history
- Certifications
- Skills overview
- Work experience summary

**Data Sources**:
- `src/data/content/about.js`
- `src/data/content/education.js`
- `src/data/content/certifications.js`
- `src/data/content/skills.js`

**Note**: This is a unified mega-component that aggregates multiple sections

---

### 4. Work Component
**Location**: `src/components/Work.astro`
**Size**: 6.6 KB
**Purpose**: Professional work experience timeline

**Features**:
- Timeline layout
- Company logos
- Role descriptions
- Date ranges
- Achievement highlights

**Data Source**: `src/data/content/work.js`

**Structure**:
- Company information
- Position/role
- Duration
- Key responsibilities
- Technologies used

---

### 5. Skills Components

#### Skills.astro
**Location**: `src/components/Skills.astro`
**Size**: 1.7 KB
**Purpose**: Basic skills display component

#### SkillsCompact.astro
**Location**: `src/components/SkillsCompact.astro`
**Size**: 10.4 KB
**Purpose**: Compact, categorized skills showcase

**Features**:
- Skill categories (Frontend, Backend, Tools, etc.)
- Proficiency indicators
- Icon integration
- Responsive grid layout
- Hover effects

**Data Source**: `src/data/content/skills.js`

---

### 6. Projects Component
**Location**: `src/components/Projects.astro`
**Size**: 10.7 KB
**Purpose**: Portfolio projects showcase grid

**Features**:
- Project cards with images
- Technology tags
- Project descriptions
- Links to demos/repositories
- Filter capabilities
- Responsive grid

**Data Source**: `src/data/content/portfolio.js`

**Card Elements**:
- Project thumbnail
- Title and description
- Technology stack
- External links

---

### 7. Contact Component
**Location**: `src/components/Contact.astro`
**Size**: 5.8 KB
**Purpose**: Contact information and form

**Features**:
- Contact form
- Email/phone display
- Social media links
- Location information
- Call-to-action messaging

**Data Source**: `src/data/content/contact.js`

---

### 8. About Component
**Location**: `src/components/About.astro`
**Size**: 1.7 KB
**Purpose**: Simple about section (lighter alternative to AboutUnified)

**Features**:
- Personal introduction
- Professional summary
- Key highlights

---

## Section Components

**Location**: `src/components/sections/`

### EnhancedWorkExperience.astro
**Purpose**: Enhanced version of work experience with advanced features
- Interactive timeline
- Detailed role information
- Achievement metrics
- Technology badges

## UI Components

**Location**: `src/components/ui/`

### ContactModal.astro
**Purpose**: Modal dialog for contact form
- Overlay backdrop
- Form validation
- Submit handling
- Close functionality

## Component Patterns

### 1. Data Integration Pattern
```astro
---
import { data } from '../data/content/[section].js';
// Process data
---
<section>
  {/* Render data */}
</section>
```

### 2. Responsive Pattern
- Mobile-first base styles
- Progressive enhancement for larger screens
- Conditional rendering based on viewport

### 3. Animation Pattern
- Scroll-triggered animations using sal.js
- CSS transitions for micro-interactions
- Performance-optimized keyframe animations

### 4. Accessibility Pattern
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management

## Component Style Integration

Each component typically has:
1. **Inline styles**: Component-specific critical styles
2. **External stylesheet**: `src/styles/components/[component].css`
3. **Global styles**: Inherited from layout
4. **Design tokens**: Using CSS custom properties

## Component Performance

### Optimization Strategies:
1. **Lazy Loading**: Images and heavy content
2. **Code Splitting**: Component-based bundles
3. **Static Generation**: Pre-rendered at build time
4. **Minimal JavaScript**: Only essential interactivity

### Size Guidelines:
- Small components: < 5KB
- Medium components: 5-15KB
- Large components: 15-30KB
- Mega components: > 30KB (should be split if possible)

## Component Testing Checklist

For each component verify:
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (keyboard, screen reader)
- [ ] Performance (loading, animations)
- [ ] Cross-browser compatibility
- [ ] Data handling (empty states, errors)
- [ ] SEO metadata
- [ ] Print styles (if applicable)

## Future Component Roadmap

Potential components to add:
1. **Testimonials**: Client recommendations
2. **Blog**: Article listing and detail views
3. **Gallery**: Image/video showcase
4. **Timeline**: Interactive career timeline
5. **Newsletter**: Email subscription form
6. **Search**: Site-wide search functionality
7. **Theme Switcher**: Light/dark mode toggle