# Deployment Documentation

## Overview

This portfolio is automatically deployed to GitHub Pages using GitHub Actions. The deployment process is triggered on every push to the `master` branch.

## Deployment Architecture

### Hosting Platform
- **Service**: GitHub Pages
- **URL**: https://ivanweissvanderpol.github.io
- **Type**: Static site hosting
- **CDN**: GitHub's global CDN

### CI/CD Pipeline
- **Platform**: GitHub Actions
- **Trigger**: Push to master branch
- **Build Tool**: Astro with Node.js 18
- **Package Manager**: npm (latest)

## GitHub Actions Workflow

### Workflow File
**Location**: `.github/workflows/deploy.yml`

### Workflow Stages

#### 1. Build Stage
```yaml
- Checkout repository
- Setup Node.js 18
- Install dependencies (npm install)
- Build static site (npm run build)
- Upload artifacts for deployment
```

#### 2. Deploy Stage
```yaml
- Download build artifacts
- Deploy to GitHub Pages
- Update deployment URL
```

### Permissions Required
- `contents: read` - Read repository content
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for deployment

## Deployment Process

### Automatic Deployment

1. **Commit Changes**
```bash
git add .
git commit -m "feat: your changes"
```

2. **Push to Master**
```bash
git push origin master
```

3. **Monitor Deployment**
- Go to repository on GitHub
- Click "Actions" tab
- Watch deployment progress
- Check for green checkmark

4. **Verify Deployment**
- Visit https://ivanweissvanderpol.github.io
- Check browser console for errors
- Verify all features work

### Manual Deployment

#### Option 1: GitHub Actions Manual Trigger
1. Go to Actions tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select master branch
5. Click "Run workflow" button

#### Option 2: Local Build and Deploy
```bash
# Build locally
npm run build

# The dist/ folder contains the static site
# Can be uploaded to any static hosting service
```

## Configuration

### GitHub Pages Settings

1. **Source**: GitHub Actions
2. **Branch**: Not applicable (using Actions)
3. **Custom Domain**: Not configured
4. **HTTPS**: Enforced

### Repository Settings Required

```yaml
Settings → Pages:
  Source: GitHub Actions

Settings → Actions → General:
  Actions permissions: Allow all actions
  Workflow permissions: Read and write permissions
```

### Astro Configuration

**File**: `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://ivanweissvanderpol.github.io',
  base: '/',
  output: 'static'
});
```

## Environment Variables

### Production Environment
No environment variables required for static deployment.

### Optional Variables (Future)
```bash
# Analytics (example)
PUBLIC_GA_ID=GA-XXXXXXXXX

# API endpoints (example)
PUBLIC_API_URL=https://api.example.com
```

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run format:check`
- [ ] Run `npm run validate`

### Testing
- [ ] Test locally with `npm run dev`
- [ ] Build locally with `npm run build`
- [ ] Preview build with `npm run preview`
- [ ] Check responsive design
- [ ] Test all links and interactions

### Performance
- [ ] Run Lighthouse audit
- [ ] Check bundle sizes
- [ ] Verify image optimization
- [ ] Test loading speed

### SEO
- [ ] Update meta descriptions
- [ ] Verify Open Graph tags
- [ ] Check sitemap generation
- [ ] Validate structured data

## Deployment Monitoring

### GitHub Actions Dashboard
- View at: `https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io/actions`
- Check workflow runs
- Review build logs
- Monitor deployment status

### Error Monitoring
Check for common issues:
- Build failures
- Missing dependencies
- TypeScript errors
- Asset loading issues

### Performance Monitoring
Tools to use:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools Lighthouse

## Rollback Procedures

### Quick Rollback
1. Go to Actions tab
2. Find last successful deployment
3. Click "Re-run all jobs"

### Git Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin master

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin master
```

## Custom Domain Setup (Future)

### Steps to Add Custom Domain
1. Purchase domain
2. Add CNAME file to repository root
3. Configure DNS records:
   - A records pointing to GitHub Pages IPs
   - CNAME record for www subdomain
4. Enable HTTPS in repository settings

### DNS Configuration Example
```
Type  Host   Value
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    ivanweissvanderpol.github.io
```

## Troubleshooting

### Build Failures

#### Node Version Issues
```yaml
# Ensure Node 18+ in workflow
node-version: 18
```

#### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check for type errors
npm run typecheck
```

### Deployment Failures

#### Pages Not Updating
1. Check Actions tab for errors
2. Verify GitHub Pages is enabled
3. Clear browser cache
4. Wait 10 minutes for CDN propagation

#### 404 Errors
1. Check `base` path in astro.config.mjs
2. Verify file paths are correct
3. Ensure dist/ folder has index.html

#### MIME Type Errors
1. Verify file extensions
2. Check public/ folder structure
3. Ensure proper asset imports

### Performance Issues

#### Slow Loading
1. Optimize images
2. Enable caching headers
3. Minify CSS/JS
4. Use CDN for assets

#### Large Bundle Size
1. Analyze with `npm run build`
2. Remove unused dependencies
3. Implement code splitting
4. Lazy load components

## Backup Strategies

### Repository Backup
```bash
# Clone with full history
git clone --mirror https://github.com/ivanweissvanderpol/ivanweissvanderpol.github.io.git

# Update backup
cd ivanweissvanderpol.github.io.git
git remote update
```

### Build Artifact Backup
- Download artifacts from Actions
- Store dist/ folder after build
- Keep version history

## Security Considerations

### Deployment Security
- Use GitHub Actions secrets for sensitive data
- Never commit API keys or tokens
- Enable branch protection rules
- Require PR reviews for master

### Content Security
- Sanitize user inputs
- Validate external URLs
- Use Content Security Policy
- Enable HTTPS only

## Deployment Metrics

### Success Criteria
- Build time: < 2 minutes
- Deployment time: < 5 minutes
- Zero downtime deployment
- 100% deployment success rate

### Monitoring Checklist
- [ ] Build duration
- [ ] Deployment frequency
- [ ] Error rate
- [ ] Page load time
- [ ] CDN cache hit rate

## Alternative Deployment Options

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### AWS S3 + CloudFront
```bash
aws s3 sync dist/ s3://your-bucket
aws cloudfront create-invalidation
```

### Docker Container
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
```

## Future Improvements

1. **Preview Deployments**: PR preview environments
2. **Staging Environment**: Test before production
3. **Blue-Green Deployment**: Zero downtime updates
4. **Automated Testing**: Pre-deployment test suite
5. **Monitoring Integration**: Real-time alerts
6. **Performance Budgets**: Automated size checks