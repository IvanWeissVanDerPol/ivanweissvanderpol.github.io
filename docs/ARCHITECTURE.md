# Architecture Documentation

## System Architecture

### Overview
The portfolio is built as a static site using Astro's component-based architecture. It follows a modular design pattern with clear separation of concerns between data, presentation, and styling.

### Architecture Principles

1. **Component-Based Design**: Reusable Astro components for UI elements
2. **Data-Driven Content**: Centralized content management in data files
3. **Static Generation**: Pre-rendered HTML for optimal performance
4. **Progressive Enhancement**: JavaScript added for enhanced interactions
5. **Responsive First**: Mobile-first responsive design approach

## Component Architecture

### Component Hierarchy

```
Layout.astro
├── Navigation.astro
├── Page Components
│   ├── Hero.astro
│   ├── About.astro / AboutUnified.astro
│   ├── Work.astro
│   ├── Skills.astro / SkillsCompact.astro
│   ├── Projects.astro
│   └── Contact.astro
└── UI Components
    ├── ContactModal.astro
    └── Section Components
```

### Component Types

#### 1. Layout Components (`/src/layouts/`)
- **Layout.astro**: Main HTML document structure with meta tags, SEO, and global styles

#### 2. Page Components (`/src/pages/`)
- **index.astro**: Homepage aggregating multiple sections
- **about.astro**: Dedicated about page
- **projects.astro**: Projects showcase page

#### 3. Section Components (`/src/components/`)
- **Hero.astro**: Landing section with animated introduction
- **Navigation.astro**: Responsive navigation with mobile menu
- **Work.astro**: Work experience timeline
- **Skills.astro/SkillsCompact.astro**: Skills showcase variations
- **Projects.astro**: Portfolio projects grid
- **Contact.astro**: Contact form and information
- **AboutUnified.astro**: Comprehensive about section (75KB)

#### 4. UI Components (`/src/components/ui/`)
- Reusable interface elements
- Modal components
- Interactive widgets

## Data Architecture

### Data Organization (`/src/data/`)

```
data/
├── content/           # Content data files
│   ├── hero.js/ts     # Hero section content
│   ├── portfolio.js   # Projects data
│   ├── work.js        # Work experience
│   ├── skills.js      # Technical skills
│   ├── education.js   # Educational background
│   ├── certifications.js # Professional certifications
│   └── social.js      # Social media links
├── config/            # Configuration files
│   ├── site.ts        # Site-wide configuration
│   └── theme.ts       # Theme configuration
├── assets/            # Data assets
├── i18n/              # Internationalization
└── PersonalData/      # Personal documents and certificates
```

### Data Flow
1. Content defined in JavaScript/TypeScript modules
2. Imported into Astro components
3. Rendered server-side during build
4. Delivered as static HTML to client

## Styling Architecture

### CSS Organization (`/src/styles/`)

```
styles/
├── Core Styles
│   ├── global-styles.css     # Global styles and resets
│   ├── design-tokens.css     # Design system variables
│   ├── theme.css             # Theme-specific styles
│   └── critical.css          # Above-fold critical styles
├── Enhancement Layers
│   ├── professional-enhancements.css
│   ├── enhanced-visual-hierarchy.css
│   ├── modern-design-system.css
│   └── modern-portfolio.css
├── Responsive & Performance
│   ├── responsive-design.css
│   ├── mobile-optimization.css
│   ├── performance-animations.css
│   └── accessibility.css
├── Component Styles
│   └── components/
│       ├── modern-hero.css
│       ├── modern-navigation.css
│       ├── modern-projects.css
│       ├── modern-skills.css
│       └── modern-work-experience.css
└── Token System
    └── tokens/        # Design token definitions
```

### CSS Architecture Principles

1. **Design Tokens**: Centralized design system variables
2. **Layered Enhancement**: Progressive styling layers
3. **Component Scoping**: Component-specific styles
4. **Mobile-First**: Base styles for mobile, enhance for larger screens
5. **Performance Focus**: Critical CSS inline, non-critical deferred
6. **BEM-like Naming**: Consistent class naming convention

## JavaScript Architecture

### Script Organization (`/src/scripts/`)
- **modern-animations.js**: Animation initialization and control
- Component-specific scripts for interactivity

### JavaScript Loading Strategy
1. Minimal inline scripts for critical functionality
2. Deferred loading for non-critical scripts
3. Progressive enhancement approach
4. No framework dependencies for core functionality

## Build Architecture

### Build Pipeline
1. **Source Processing**: Astro processes `.astro` files
2. **Asset Optimization**: Images, CSS, JS optimization
3. **Static Generation**: HTML pages pre-rendered
4. **Output**: Static files in `/dist` directory

### Build Output Structure
```
dist/
├── index.html         # Homepage
├── about/index.html   # About page
├── projects/index.html # Projects page
├── assets/            # Processed assets
│   ├── css/          # Compiled CSS
│   └── js/           # Bundled JavaScript
├── images/           # Optimized images
└── _astro/           # Astro-generated assets
```

## Performance Architecture

### Optimization Strategies
1. **Static Site Generation**: Pre-rendered HTML
2. **Code Splitting**: Component-based splitting
3. **Asset Optimization**: Minification and compression
4. **Lazy Loading**: Images and non-critical resources
5. **Caching Strategy**: Long-term caching for assets
6. **Critical CSS**: Inline critical styles

### Performance Metrics Target
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: > 90

## Security Architecture

### Security Measures
1. **Static Site**: No server-side vulnerabilities
2. **Content Security Policy**: Restrictive CSP headers
3. **HTTPS Only**: Enforced via GitHub Pages
4. **No User Input Processing**: Static content only
5. **Dependency Security**: Regular dependency updates

## Deployment Architecture

### Deployment Pipeline
1. **Version Control**: Git-based source control
2. **Build Trigger**: Push to main branch
3. **Build Process**: GitHub Actions workflow
4. **Static Hosting**: GitHub Pages
5. **CDN**: GitHub's CDN for global distribution

### Environment Configuration
- **Development**: Local development server
- **Preview**: Build preview for testing
- **Production**: GitHub Pages deployment