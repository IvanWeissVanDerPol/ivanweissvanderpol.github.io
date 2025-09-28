# Troubleshooting Guide

## Common Issues and Solutions

This guide helps resolve common issues you might encounter while developing or deploying the portfolio website.

## Development Issues

### 1. Port Already in Use

**Error**: `Error: Port 4321 is already in use`

**Solutions**:

Windows:
```bash
# Find process using port
netstat -ano | findstr :4321

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

Mac/Linux:
```bash
# Find process
lsof -i :4321

# Kill process
kill -9 <PID>
```

### 2. Module Not Found

**Error**: `Cannot find module 'module-name'`

**Solutions**:
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# If specific module missing
npm install module-name
```

### 3. TypeScript Errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solutions**:
```bash
# Check for type errors
npm run typecheck

# Update TypeScript
npm update typescript

# Check tsconfig.json
cat tsconfig.json
```

### 4. Astro Build Errors

**Error**: `Failed to build site`

**Solutions**:
```bash
# Clean and rebuild
npm run clean
npm run build

# Verbose output for debugging
npm run build -- --verbose

# Check Astro version
npm list astro
```

## Styling Issues

### 1. Styles Not Applying

**Problem**: CSS changes not reflecting

**Solutions**:
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check CSS specificity
- Verify import order in Layout.astro
- Check for typos in class names
- Ensure CSS file is imported

### 2. Responsive Layout Broken

**Problem**: Layout issues on mobile/tablet

**Solutions**:
```css
/* Check viewport meta tag */
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

/* Use responsive units */
.container {
  width: 100%;
  max-width: 1200px;
  padding: clamp(1rem, 5vw, 3rem);
}

/* Test with DevTools device emulation */
```

### 3. Dark Theme Issues

**Problem**: Colors not displaying correctly

**Solutions**:
- Check CSS custom properties in :root
- Verify theme class on html element
- Check color contrast ratios
- Test in different browsers

## Component Issues

### 1. Component Not Rendering

**Problem**: Astro component shows blank

**Solutions**:
```astro
---
// Check imports
import Component from '../components/Component.astro';

// Verify props
const { prop1, prop2 } = Astro.props;
console.log('Props:', { prop1, prop2 });
---

<!-- Check conditional rendering -->
{prop1 && <Component prop1={prop1} />}

<!-- Check for errors in browser console -->
```

### 2. Data Not Loading

**Problem**: Content from data files not showing

**Solutions**:
```javascript
// Check import path
import { data } from '../data/content/file.js';

// Verify data structure
console.log('Data:', data);

// Handle undefined data
const items = data?.items || [];

// Check file exports
export const data = { /* ... */ };  // Named export
export default data;                 // Default export
```

### 3. Props Type Errors

**Problem**: TypeScript prop validation failing

**Solutions**:
```astro
---
// Define interface
export interface Props {
  title: string;
  optional?: boolean;
}

// Provide defaults
const {
  title,
  optional = false
} = Astro.props;
---
```

## Build & Deployment Issues

### 1. Build Failing on GitHub Actions

**Problem**: Local build works but CI fails

**Solutions**:
- Check Node version matches CI (18.x)
- Verify all files are committed
- Check for case-sensitive file names
- Review Actions logs for specific errors
- Ensure dependencies in package.json

### 2. 404 on GitHub Pages

**Problem**: Site shows 404 after deployment

**Solutions**:
```javascript
// Check astro.config.mjs
export default defineConfig({
  site: 'https://ivanweissvanderpol.github.io',
  base: '/',  // Adjust if using subdirectory
});
```

- Wait 10 minutes for deployment
- Check GitHub Pages settings
- Verify index.html in dist/
- Clear browser cache

### 3. Assets Not Loading

**Problem**: Images/CSS/JS return 404

**Solutions**:
- Use absolute paths from public/
- Check file names (case-sensitive)
- Verify build output in dist/
- Check base URL configuration

## Performance Issues

### 1. Slow Page Load

**Problem**: Site takes too long to load

**Solutions**:
```bash
# Analyze bundle size
npm run build
du -sh dist/

# Optimize images
# Convert to WebP format
# Use appropriate sizes
# Implement lazy loading
```

```html
<!-- Lazy load images -->
<img loading="lazy" src="image.jpg" alt="Description" />

<!-- Preload critical resources -->
<link rel="preload" href="/font.woff2" as="font" crossorigin />
```

### 2. Large Bundle Size

**Problem**: JavaScript bundle too large

**Solutions**:
- Remove unused dependencies
- Use dynamic imports
- Check for duplicate modules
- Enable tree shaking
- Analyze with bundle analyzer

### 3. Animation Jank

**Problem**: Animations stuttering

**Solutions**:
```css
/* Use transform instead of position */
.animated {
  transform: translateX(100px);
  will-change: transform;
}

/* Reduce paint areas */
.component {
  contain: layout style paint;
}

/* Use GPU acceleration */
.smooth {
  transform: translateZ(0);
}
```

## Browser Compatibility

### 1. Feature Not Working in Safari

**Solutions**:
```css
/* Add vendor prefixes */
.element {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Check caniuse.com for support */
/* Use feature detection */
```

### 2. Internet Explorer Issues

**Note**: IE is not supported, but for legacy needs:
- Add polyfills
- Use fallback styles
- Display upgrade notice

## SEO Issues

### 1. Missing Meta Tags

**Solutions**:
```astro
<!-- In Layout.astro -->
<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
</head>
```

### 2. Poor Lighthouse Scores

**Solutions**:
- Optimize images
- Minimize CSS/JS
- Enable text compression
- Use font-display: swap
- Remove render-blocking resources

## Debugging Tools

### Browser DevTools

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor requests and load times
3. **Elements**: Inspect HTML and CSS
4. **Performance**: Profile runtime performance
5. **Lighthouse**: Audit site quality

### VS Code

1. **Astro Extension**: Syntax highlighting and IntelliSense
2. **Prettier**: Code formatting
3. **ESLint**: Code quality
4. **GitLens**: Git insights

### Command Line

```bash
# Check for errors
npm run validate

# Analyze dependencies
npm ls

# Check for vulnerabilities
npm audit

# Update dependencies
npm update
```

## Error Messages Reference

### Common Astro Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Expected ";" but found "}"` | Syntax error in frontmatter | Check JavaScript syntax |
| `Cannot read properties of undefined` | Missing data/prop | Add null checks |
| `Astro.glob() is not supported` | Using deprecated API | Use import.meta.glob() |
| `Failed to parse frontmatter` | Invalid YAML/JS | Check frontmatter syntax |

### Common Build Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `ENOENT: no such file` | Missing file | Check file paths |
| `Module not found` | Missing dependency | Run npm install |
| `Unexpected token` | Syntax error | Check for typos |
| `Out of memory` | Large build | Increase Node memory |

## Getting Help

### Resources

1. **Documentation**
   - [Astro Docs](https://docs.astro.build)
   - [MDN Web Docs](https://developer.mozilla.org)
   - Project README

2. **Community**
   - [Astro Discord](https://astro.build/chat)
   - [GitHub Discussions](https://github.com/withastro/astro/discussions)
   - Stack Overflow

3. **Debugging Steps**
   1. Read error message carefully
   2. Check browser console
   3. Review recent changes
   4. Search for error online
   5. Create minimal reproduction
   6. Ask for help with details

### Reporting Issues

When reporting issues, include:
- Error message (full text)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, browser)
- Relevant code snippets
- Screenshots if visual issue

## Prevention Tips

### Best Practices

1. **Regular Updates**
```bash
# Check for updates
npm outdated

# Update carefully
npm update
```

2. **Version Control**
```bash
# Commit often
git add .
git commit -m "descriptive message"

# Branch for features
git checkout -b feature/new-feature
```

3. **Testing**
- Test locally before deploying
- Check multiple browsers
- Test responsive design
- Validate accessibility

4. **Code Quality**
```bash
# Run before committing
npm run validate
```

5. **Documentation**
- Document changes
- Update README
- Comment complex code
- Keep dependencies documented