# Styling System Documentation

## Design System Overview

The portfolio implements a comprehensive, modern design system built on CSS custom properties (design tokens) with a layered architecture for maintainability and performance.

## Design Tokens

### Core Token Categories (`src/styles/design-tokens.css`)

#### 1. Color System
```css
/* Primary Colors */
--color-primary: Electric blue/purple gradient
--color-secondary: Teal accents
--color-accent: Vibrant highlights

/* Neutral Palette */
--color-bg-primary: Deep midnight (#0a0a0f)
--color-bg-secondary: Dark surfaces
--color-text-primary: High contrast white
--color-text-secondary: Muted gray

/* Semantic Colors */
--color-success: Green indicators
--color-warning: Yellow alerts
--color-error: Red warnings
```

#### 2. Typography System
```css
/* Font Families */
--font-primary: System font stack
--font-mono: Monospace for code

/* Type Scale (Perfect Fourth 1.333) */
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
--text-5xl: 3rem

/* Font Weights */
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

#### 3. Spacing System
```css
/* Mathematical Spacing Scale */
--space-xs: 0.25rem  /* 4px */
--space-sm: 0.5rem   /* 8px */
--space-md: 1rem     /* 16px */
--space-lg: 1.5rem   /* 24px */
--space-xl: 2rem     /* 32px */
--space-2xl: 3rem    /* 48px */
--space-3xl: 4rem    /* 64px */
--space-4xl: 6rem    /* 96px */
```

#### 4. Layout System
```css
/* Container Widths */
--container-xs: 480px
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px

/* Grid System */
--grid-columns: 12
--grid-gap: var(--space-md)
```

#### 5. Animation Tokens
```css
/* Durations */
--duration-fast: 150ms
--duration-normal: 300ms
--duration-slow: 500ms

/* Easing Functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0.0, 0, 0.2, 1)
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

## CSS Architecture Layers

### 1. Base Layer (`global-styles.css`)
- CSS Reset and normalization
- Base element styles
- Root variable definitions
- Global utility classes

### 2. Theme Layer (`theme.css`, `modern-design-system.css`)
- Theme-specific color schemes
- Dark mode optimizations
- Brand-specific styling
- Custom component themes

### 3. Layout Layer (`responsive-design.css`)
- Grid systems
- Flexbox utilities
- Container queries
- Breakpoint definitions

### 4. Component Layer (`/components/*.css`)
Individual component styles:
- `modern-hero.css`: Hero section styling
- `modern-navigation.css`: Navigation components
- `modern-projects.css`: Project cards and grid
- `modern-skills.css`: Skills showcase
- `modern-work-experience.css`: Timeline and experience cards

### 5. Enhancement Layer
- `professional-enhancements.css`: Business-oriented improvements
- `enhanced-visual-hierarchy.css`: Typography and spacing refinements
- `performance-animations.css`: Optimized animations
- `mobile-optimization.css`: Mobile-specific enhancements

### 6. Utility Layer (`accessibility.css`)
- Screen reader utilities
- Focus management
- Keyboard navigation
- ARIA enhancements

## Responsive Design System

### Breakpoints
```css
/* Mobile First Breakpoints */
--breakpoint-sm: 640px   /* Small tablets */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Desktops */
--breakpoint-xl: 1280px  /* Large desktops */
--breakpoint-2xl: 1536px /* Extra large screens */
```

### Responsive Patterns
1. **Mobile-First**: Base styles for mobile, enhance upward
2. **Fluid Typography**: Clamp() for responsive text sizing
3. **Flexible Grid**: CSS Grid with auto-fit/auto-fill
4. **Container Queries**: Component-based responsive design

## Animation System

### Animation Categories

#### 1. Micro-interactions
- Button hovers
- Link transitions
- Focus states
- Loading indicators

#### 2. Scroll Animations (sal.js)
- Fade in/out
- Slide animations
- Scale effects
- Parallax scrolling

#### 3. Page Transitions
- Route changes
- Section reveals
- Modal animations

### Performance Guidelines
```css
/* Prefer transform and opacity for animations */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Hardware acceleration */
}

/* Use CSS containment */
.component {
  contain: layout style paint;
}
```

## Color Schemes

### Midnight Theme (Default)
- **Background**: Deep blue-black (#0a0a0f)
- **Surface**: Elevated dark (#151521)
- **Primary**: Electric blue/purple
- **Accent**: Cyan/teal highlights
- **Text**: High contrast white/gray

### Accessibility Considerations
- WCAG AAA contrast ratios
- Focus indicators (3px minimum)
- Color-blind safe palettes
- Reduced motion support

## Typography System

### Font Hierarchy
1. **Display**: Large headings (3rem+)
2. **Heading**: Section titles (1.5-2.5rem)
3. **Body**: Content text (1rem)
4. **Caption**: Small text (0.875rem)
5. **Code**: Monospace blocks

### Text Styling
```css
/* Responsive fluid typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Readable body text */
p {
  line-height: 1.6;
  max-width: 65ch;
}
```

## Component Styling Patterns

### BEM-like Naming Convention
```css
.component-name { }              /* Block */
.component-name__element { }     /* Element */
.component-name--modifier { }    /* Modifier */
```

### Utility Classes
```css
.text-center     /* Text alignment */
.flex-center     /* Flexbox centering */
.grid-auto       /* Auto grid */
.space-y-4       /* Vertical spacing */
.animate-fade    /* Animation triggers */
```

## Critical CSS Strategy

### Above-the-fold Styles (`critical.css`)
1. Reset and base styles
2. Layout structure
3. Navigation styles
4. Hero section styles
5. Core typography

### Deferred Styles
- Animation libraries
- Below-fold components
- Interactive elements
- Enhancement layers

## Performance Optimizations

### CSS Loading Strategy
1. **Inline Critical CSS**: First paint optimization
2. **Preload Key Styles**: Priority resource hints
3. **Async Non-critical**: Deferred loading
4. **Code Splitting**: Component-based chunks

### Optimization Techniques
- CSS minification
- Unused CSS removal
- CSS custom properties for theming
- Logical properties for internationalization
- Modern CSS features (Grid, Flexbox, Clamp)

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Fallbacks for older browsers
- Feature queries (@supports)
- Graceful degradation
- Polyfills for critical features

## Style Guide Rules

### Do's
- Use design tokens for consistency
- Follow mobile-first approach
- Optimize for performance
- Maintain high contrast ratios
- Use semantic class names

### Don'ts
- Avoid inline styles (except critical)
- Don't use !important (except utilities)
- Avoid deep nesting (max 3 levels)
- Don't hardcode values
- Avoid pixel-perfect designs

## Future Enhancements

1. **CSS Container Queries**: Component-responsive design
2. **CSS Cascade Layers**: Better specificity management
3. **Variable Fonts**: Enhanced typography control
4. **Dark/Light Mode Toggle**: User preference support
5. **CSS Houdini**: Custom paint worklets
6. **Subgrid**: Advanced grid layouts