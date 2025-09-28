# Contributing Guidelines

Thank you for your interest in contributing to the Ivan Weiss Van Der Pol Portfolio project! This document provides guidelines and instructions for contributing.

## Code of Conduct

### Our Pledge
We pledge to make participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other contributors

## How to Contribute

### Reporting Issues

Before creating an issue, please check existing issues to avoid duplicates.

#### Bug Reports
Use the following template:
```markdown
**Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.x]
```

#### Feature Requests
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why this feature would be useful

**Proposed Solution**
How you envision it working

**Alternatives Considered**
Other solutions you've thought about
```

### Pull Request Process

#### 1. Fork and Clone
```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR-USERNAME/ivanweissvanderpol.github.io.git
cd ivanweissvanderpol.github.io

# Add upstream remote
git remote add upstream https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io.git
```

#### 2. Create Branch
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

Branch Naming Convention:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code style changes
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance tasks

#### 3. Make Changes
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Make your changes
```

#### 4. Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run typecheck

# Run all validations
npm run validate
```

#### 5. Commit Changes

Follow Conventional Commits specification:

```bash
# Format: <type>(<scope>): <subject>

# Examples:
git commit -m "feat(navigation): add mobile menu animation"
git commit -m "fix(hero): resolve text overflow on mobile"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(global): format CSS files"
git commit -m "refactor(components): simplify skills component"
git commit -m "test(utils): add unit tests for formatDate"
git commit -m "chore(deps): update dependencies"
```

Commit Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or fixes
- `chore`: Maintenance tasks
- `perf`: Performance improvements

#### 6. Push Changes
```bash
# Push to your fork
git push origin feature/your-feature-name
```

#### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code style update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No breaking changes
```

## Development Guidelines

### Code Style

#### JavaScript/TypeScript
```javascript
// Use const/let, no var
const MAX_ITEMS = 10;
let currentIndex = 0;

// Use arrow functions for callbacks
array.map(item => item.name);

// Use async/await
async function fetchData() {
  const response = await fetch(url);
  return response.json();
}

// Use optional chaining
const value = obj?.prop?.nested;

// Use nullish coalescing
const name = username ?? 'Anonymous';
```

#### Astro Components
```astro
---
// Import statements first
import Component from './Component.astro';

// Type definitions
export interface Props {
  title: string;
  optional?: boolean;
}

// Props destructuring with defaults
const { title, optional = false } = Astro.props;
---

<!-- Use semantic HTML -->
<section>
  <h2>{title}</h2>
  {optional && <p>Optional content</p>}
</section>

<style>
  /* Component-scoped styles */
</style>
```

#### CSS
```css
/* Use BEM naming */
.component {}
.component__element {}
.component--modifier {}

/* Mobile-first */
.element {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .element {
    /* Desktop styles */
  }
}

/* Use CSS variables */
.component {
  color: var(--color-primary);
  padding: var(--space-md);
}
```

### File Structure

```
src/
├── components/       # Reusable components
│   ├── Component.astro
│   └── ui/          # UI components
├── data/            # Data and content
│   └── content/     # Content files
├── layouts/         # Page layouts
├── pages/           # Route pages
├── styles/          # Global styles
│   └── components/  # Component styles
└── types/           # TypeScript types
```

### Component Guidelines

1. **Single Responsibility**: Each component should do one thing well
2. **Props Validation**: Define TypeScript interfaces for props
3. **Documentation**: Add JSDoc comments for complex components
4. **Accessibility**: Include ARIA labels and semantic HTML
5. **Performance**: Lazy load heavy components

### Testing

#### Manual Testing Checklist
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check responsive breakpoints
- [ ] Verify accessibility (keyboard navigation)
- [ ] Check for console errors
- [ ] Test with slow network
- [ ] Validate forms
- [ ] Check external links

#### Accessibility Testing
```bash
# Use axe DevTools extension
# Run Lighthouse audit
# Test with screen reader
```

### Documentation

#### Code Comments
```javascript
/**
 * Formats a date string to display format
 * @param {string} date - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(date) {
  // Implementation
}
```

#### README Updates
Update README when:
- Adding new features
- Changing setup process
- Modifying build process
- Adding dependencies

## Review Process

### Review Criteria

Your PR will be reviewed for:

1. **Code Quality**
   - Clean, readable code
   - Follows style guidelines
   - No linting errors

2. **Functionality**
   - Works as described
   - No breaking changes
   - Edge cases handled

3. **Performance**
   - No performance regressions
   - Optimized assets
   - Efficient algorithms

4. **Accessibility**
   - Keyboard navigable
   - Screen reader friendly
   - Proper ARIA labels

5. **Documentation**
   - Code comments where needed
   - README updated if necessary
   - Clear commit messages

### Response Time

- Initial review: 2-3 days
- Follow-up reviews: 1-2 days
- Please be patient!

## Getting Help

### Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org)
- [Project Documentation](./README.md)

### Contact

- Create an issue for questions
- Tag maintainers for urgent matters
- Be respectful and patient

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Thanked in commit messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Development Setup Tips

### VS Code Extensions

Recommended extensions:
- Astro
- ESLint
- Prettier
- GitLens
- Error Lens

### Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:4321",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Thank You!

Your contributions make this project better. We appreciate your time and effort in improving the portfolio website!

---

*Last updated: January 2024*