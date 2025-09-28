# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Git**: For version control
- **Code Editor**: VS Code recommended with Astro extension

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io.git
cd ivanweissvanderpol.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:4321
```

## Development Commands

### Core Commands

```bash
# Development server with hot reload
npm run dev

# Build production site
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

### Code Quality Commands

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Type checking
npm run typecheck

# Run all validations
npm run validate
```

## Project Structure

```
/
├── src/
│   ├── components/     # Astro components
│   ├── data/          # Content and configuration
│   ├── layouts/       # Page layouts
│   ├── lib/           # Utilities and helpers
│   ├── pages/         # Route pages
│   ├── scripts/       # Client-side JavaScript
│   ├── services/      # Business logic
│   ├── stores/        # State management
│   ├── styles/        # CSS files
│   └── types/         # TypeScript types
├── public/            # Static assets
├── docs/              # Documentation
└── dist/              # Build output (gitignored)
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# Add/modify components, styles, data

# Test locally
npm run dev

# Validate code
npm run validate

# Commit changes
git add .
git commit -m "feat: add your feature description"

# Push branch
git push origin feature/your-feature-name
```

### 2. Adding a New Component

1. Create component file:
```astro
<!-- src/components/NewComponent.astro -->
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="new-component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .new-component {
    /* Component styles */
  }
</style>
```

2. Create component styles:
```css
/* src/styles/components/new-component.css */
.new-component {
  /* External styles */
}
```

3. Import and use:
```astro
---
import NewComponent from '../components/NewComponent.astro';
---

<NewComponent title="Hello" description="World" />
```

### 3. Adding a New Page

```astro
<!-- src/pages/new-page.astro -->
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="New Page">
  <main>
    <h1>New Page</h1>
    <!-- Page content -->
  </main>
</Layout>
```

Access at: `http://localhost:4321/new-page`

### 4. Modifying Content Data

Edit relevant file in `src/data/content/`:

```javascript
// src/data/content/portfolio.js
export const projects = [
  {
    id: 'new-project',
    title: 'New Project',
    description: 'Project description',
    technologies: ['Astro', 'TypeScript'],
    // ... other fields
  },
  // ... existing projects
];
```

## Code Style Guidelines

### TypeScript/JavaScript

```typescript
// Use const/let, avoid var
const API_URL = 'https://api.example.com';
let counter = 0;

// Use arrow functions for callbacks
items.map((item) => item.name);

// Use async/await over promises
async function fetchData() {
  const response = await fetch(API_URL);
  return response.json();
}

// Use optional chaining
const city = user?.address?.city;

// Use nullish coalescing
const name = username ?? 'Anonymous';
```

### Astro Components

```astro
---
// Component script section
import { type ComponentProps } from './types';

export interface Props extends ComponentProps {
  title: string;
  optional?: boolean;
}

const {
  title,
  optional = false
} = Astro.props;

// Data processing
const processedData = await fetchData();
---

<!-- Component template -->
<section class="component">
  <h2>{title}</h2>
  {optional && <p>Optional content</p>}

  <!-- Use semantic HTML -->
  <article>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </article>
</section>

<style>
  /* Component styles */
  .component {
    /* Use design tokens */
    padding: var(--space-md);
    color: var(--color-text-primary);
  }
</style>
```

### CSS Guidelines

```css
/* Use BEM-like naming */
.component {}
.component__element {}
.component--modifier {}

/* Mobile-first responsive design */
.component {
  /* Base mobile styles */
  padding: 1rem;
}

@media (min-width: 768px) {
  .component {
    /* Tablet and up */
    padding: 2rem;
  }
}

/* Use CSS custom properties */
:root {
  --color-primary: #007bff;
  --space-md: 1rem;
}

/* Prefer modern CSS */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
}
```

## Environment Configuration

### Development Environment

```bash
# .env.development
SITE_URL=http://localhost:4321
NODE_ENV=development
```

### Production Environment

```bash
# .env.production
SITE_URL=https://ivanweissvanderpol.github.io
NODE_ENV=production
```

## Testing

### Manual Testing Checklist

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cross-browser compatibility
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Performance (Lighthouse score > 90)
- [ ] SEO (meta tags, structured data)
- [ ] Forms and interactions
- [ ] External links
- [ ] Error states

### Performance Testing

```bash
# Build and analyze bundle
npm run build

# Check bundle size
du -sh dist

# Run Lighthouse
# Open Chrome DevTools > Lighthouse tab
```

## Debugging

### Development Tools

1. **Browser DevTools**
   - Inspect elements
   - Network tab for requests
   - Console for errors
   - Performance profiling

2. **VS Code Debugging**
   - Install Astro extension
   - Set breakpoints in .astro files
   - Use Debug panel

3. **Astro Dev Toolbar**
   - Component inspector
   - Performance metrics
   - Accessibility checks

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

#### Style Issues
- Check CSS specificity
- Verify design token usage
- Inspect computed styles
- Check responsive breakpoints

#### Data Issues
- Validate data structure
- Check import paths
- Verify data transformations
- Console.log for debugging

## Deployment

### GitHub Pages Deployment

```bash
# Ensure you're on main branch
git checkout main

# Build the site
npm run build

# Commit and push
git add .
git commit -m "build: update production build"
git push origin main

# GitHub Actions will automatically deploy
```

### Manual Deployment

```bash
# Build production site
npm run build

# Contents of dist/ can be deployed to any static host
# Upload dist/ folder to hosting provider
```

## Performance Optimization

### Image Optimization
- Use WebP format when possible
- Implement lazy loading
- Provide appropriate sizes
- Use Astro's Image component

### Code Splitting
- Dynamic imports for large components
- Lazy load below-fold content
- Minimize JavaScript bundles

### CSS Optimization
- Inline critical CSS
- Defer non-critical styles
- Remove unused CSS
- Minify production CSS

## Security Best Practices

1. **Dependencies**
   - Regular updates
   - Security audits with `npm audit`
   - Lock file committed

2. **Content Security**
   - Sanitize user inputs
   - Validate URLs
   - Use HTTPS only

3. **Secrets Management**
   - Never commit secrets
   - Use environment variables
   - Secure API keys

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 4321
lsof -i :4321

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures
```bash
# Verbose logging
npm run build -- --verbose

# Check for TypeScript errors
npm run typecheck

# Validate all code
npm run validate
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Web.dev](https://web.dev)

## Support

For issues or questions:
1. Check existing documentation
2. Search GitHub issues
3. Create new issue with details
4. Contact maintainer