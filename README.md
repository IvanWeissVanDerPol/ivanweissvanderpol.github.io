# Ivan weiss van der pol - Portfolio Website

A modern portfolio website built with **Astro** and enhanced with scroll animations. Originally based on the HTML5 UP "Miniport" template, migrated to a component-based architecture for better maintainability and development experience.

🌐 **Live Site**: [ivanweissvanderpol.github.io](https://ivanweissvanderpol.github.io)

## ✨ Features

- **Modern Architecture**: Built with Astro for fast, static site generation
- **Smooth Animations**: SAL.js for performant scroll animations
- **Component-Based**: Reusable, maintainable Astro components
- **Responsive Design**: Mobile-first approach with SCSS breakpoints
- **SEO Optimized**: Static generation for fast loading and search visibility
- **Developer Experience**: Hot reload, TypeScript support, modern build tools

## 🚀 Project Structure

```text
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Navigation.astro # Site navigation
│   │   ├── Hero.astro      # Hero section with personal info
│   │   └── Contact.astro   # Contact section with social links
│   ├── layouts/
│   │   └── Layout.astro    # Main HTML structure and scripts
│   └── pages/
│       └── index.astro     # Main page composition
├── public/                 # Static assets
│   ├── assets/            # CSS, JS, fonts (preserved from original)
│   └── images/            # Profile and project images
├── docs/                  # Documentation and implementation plans
└── dist/                  # Built static files (generated)
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Want to learn more?

check [Astro documentation](https://docs.astro.build).
