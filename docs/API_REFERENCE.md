# API Reference

## Component APIs

This document provides detailed API references for all components, their props, methods, and usage examples.

## Core Components API

### Layout Component

**Path**: `src/layouts/Layout.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Page title for SEO |
| `description` | `string` | No | "Ivan weiss van der pol..." | Meta description |

#### Usage
```astro
<Layout title="Home" description="Custom description">
  <!-- Page content -->
</Layout>
```

---

### Hero Component

**Path**: `src/components/Hero.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| - | - | - | - | Uses data from `hero.js` |

#### Data Structure
```typescript
interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  buttons: Button[];
}
```

---

### Navigation Component

**Path**: `src/components/Navigation.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentPath` | `string` | No | "/" | Current page path for active state |

#### Methods
- `toggleMobileMenu()`: Toggle mobile navigation
- `handleScroll()`: Manage sticky header behavior

---

### Projects Component

**Path**: `src/components/Projects.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `featured` | `boolean` | No | false | Show only featured projects |
| `limit` | `number` | No | - | Limit number of projects |
| `category` | `string` | No | - | Filter by category |

#### Data Structure
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  links: {
    demo?: string;
    github?: string;
  };
  featured: boolean;
}
```

---

### SkillsCompact Component

**Path**: `src/components/SkillsCompact.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `showAll` | `boolean` | No | true | Show all skills or compact view |
| `category` | `string` | No | - | Filter by skill category |

#### Data Structure
```typescript
interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
  icon?: string;
}
```

---

### Work Component

**Path**: `src/components/Work.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| - | - | - | - | Uses data from `work.js` |

#### Data Structure
```typescript
interface WorkExperience {
  company: string;
  position: string;
  duration: {
    start: string;
    end: string;
  };
  description: string;
  technologies: string[];
}
```

---

### Contact Component

**Path**: `src/components/Contact.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `showForm` | `boolean` | No | true | Display contact form |
| `showInfo` | `boolean` | No | true | Display contact information |

---

## UI Components API

### ContactModal Component

**Path**: `src/components/ui/ContactModal.astro`

#### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | No | false | Modal open state |
| `onClose` | `function` | No | - | Close callback |

#### Methods
- `open()`: Open modal
- `close()`: Close modal
- `submit()`: Handle form submission

---

## Data Module APIs

### Hero Data Module

**Path**: `src/data/content/hero.js`

```javascript
export const heroData = {
  title: string,
  subtitle: string,
  tagline: string,
  description: string,
  buttons: Array<{
    text: string,
    link: string,
    primary: boolean
  }>
}
```

---

### Portfolio Data Module

**Path**: `src/data/content/portfolio.js`

```javascript
export const projects = Array<{
  id: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  image: string,
  links: {
    demo?: string,
    github?: string
  },
  featured: boolean
}>
```

---

### Skills Data Module

**Path**: `src/data/content/skills.js`

```javascript
export const skills = {
  categories: Array<{
    name: string,
    skills: Array<{
      name: string,
      level: number,
      icon?: string
    }>
  }>
}
```

---

## JavaScript Module APIs

### Animation Module

**Path**: `src/scripts/modern-animations.js`

#### Functions

##### `initAnimations()`
Initialize all animations on page load.

```javascript
initAnimations(options?: {
  threshold?: number,
  duration?: number,
  easing?: string
})
```

##### `animateOnScroll()`
Trigger animations on scroll events.

```javascript
animateOnScroll(element: HTMLElement, options?: {
  offset?: number,
  duration?: number,
  once?: boolean
})
```

---

## Style Module APIs

### Design Tokens

**Path**: `src/styles/design-tokens.css`

#### Available Tokens

##### Colors
```css
var(--color-primary)
var(--color-secondary)
var(--color-accent)
var(--color-bg-primary)
var(--color-text-primary)
```

##### Spacing
```css
var(--space-xs)  /* 0.25rem */
var(--space-sm)  /* 0.5rem */
var(--space-md)  /* 1rem */
var(--space-lg)  /* 1.5rem */
var(--space-xl)  /* 2rem */
```

##### Typography
```css
var(--font-primary)
var(--text-base)
var(--text-lg)
var(--text-xl)
```

##### Breakpoints
```css
var(--breakpoint-sm)  /* 640px */
var(--breakpoint-md)  /* 768px */
var(--breakpoint-lg)  /* 1024px */
var(--breakpoint-xl)  /* 1280px */
```

---

## Utility Functions API

### Constants

**Path**: `src/lib/constants/`

```typescript
export const SITE_CONFIG = {
  name: string,
  url: string,
  description: string
}

export const SOCIAL_LINKS = {
  github: string,
  linkedin: string,
  twitter: string
}
```

### Helpers

**Path**: `src/lib/utils/`

#### `formatDate(date: string | Date): string`
Format date to display format.

#### `slugify(text: string): string`
Convert text to URL-safe slug.

#### `truncate(text: string, length: number): string`
Truncate text with ellipsis.

---

## Type Definitions

**Path**: `src/types/`

### Common Types

```typescript
// Component Props
export interface ComponentProps {
  class?: string;
  id?: string;
}

// Data Types
export interface Project {
  id: string;
  title: string;
  description: string;
  // ...
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: Duration;
  // ...
}

// Utility Types
export type Duration = {
  start: string | Date;
  end: string | Date | 'Present';
}

export type Link = {
  label: string;
  href: string;
  external?: boolean;
}
```

---

## Configuration API

### Site Configuration

**Path**: `src/data/config/site.ts`

```typescript
interface SiteConfig {
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
}
```

### Theme Configuration

**Path**: `src/data/config/theme.ts`

```typescript
interface ThemeConfig {
  colors: ColorScheme;
  fonts: FontStack;
  spacing: SpacingScale;
  animations: AnimationConfig;
}
```

---

## Hooks API (Future)

### Planned Hooks

```typescript
// Navigation Hook
useNavigation(): {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

// Theme Hook
useTheme(): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Scroll Hook
useScroll(): {
  scrollY: number;
  direction: 'up' | 'down';
  isScrolled: boolean;
}
```

---

## Event Emitters

### Navigation Events

```javascript
// Listen for navigation changes
document.addEventListener('navigation:change', (event) => {
  console.log('Navigated to:', event.detail.path);
});

// Emit navigation event
const event = new CustomEvent('navigation:change', {
  detail: { path: '/about' }
});
document.dispatchEvent(event);
```

### Modal Events

```javascript
// Listen for modal events
document.addEventListener('modal:open', handleModalOpen);
document.addEventListener('modal:close', handleModalClose);
```

---

## Error Handling

### Component Error Boundaries

```astro
---
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  // Fallback UI
}
---
```

### Data Validation

```javascript
function validateProject(project) {
  const required = ['id', 'title', 'description'];
  return required.every(field => project[field]);
}
```

---

## Performance APIs

### Lazy Loading

```javascript
// Image lazy loading
<img loading="lazy" src="..." />

// Component lazy loading
const Component = await import('./Component.astro');
```

### Prefetching

```html
<!-- Prefetch navigation links -->
<link rel="prefetch" href="/about" />
<link rel="prefetch" href="/projects" />
```

---

## Testing Utilities

### Mock Data

```javascript
export const mockProject = {
  id: 'test-1',
  title: 'Test Project',
  description: 'Test description',
  // ...
};

export const mockSkills = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 }
];
```

---

This API reference is continuously updated as new components and features are added to the project.