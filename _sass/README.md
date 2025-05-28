# SCSS Architecture for Ivan Weiss's Resume

This document outlines the structure and organization of the SCSS (Sassy CSS) files used in this project. The goal is to maintain a modular, scalable, and easy-to-understand stylesheet architecture.

## Main Entry Point

All SCSS partials are ultimately imported into `assets/css/main.scss`. This file handles the loading of different themes (skins) and component styles based on the site's configuration.

## Directory Structure

The `_sass` directory is organized into several subdirectories, each with a specific purpose:

### 1. Top-Level Files

*   `_core.scss`: Contains foundational styles, resets (like normalize.css or a custom reset), and core HTML element styling that sets global defaults before `base` styles are applied. It might also include global box-sizing rules.
*   `_print.scss`: Contains styles specifically for the print version of the resume, ensuring it's formatted correctly when printed (e.g., hiding unnecessary elements, ensuring legible fonts).
*   `_responsive.scss`: Houses general responsive utilities or global responsive adjustments that don't fit into specific components, such as responsive typography settings or global container behavior at different breakpoints.
*   `_utilities.scss`: Contains utility classes (e.g., helper classes for margins, padding, text alignment, visibility like `.sr-only` for screen readers) and possibly globally used SCSS functions or mixins.

### 2. Subdirectories

*   **`abstracts/`**:
    *   This directory holds SCSS tools and helpers that don't output any CSS on their own.
    *   `_variables.scss`: Defines global SCSS variables for colors, fonts, typography, spacing, breakpoints, etc. These variables are used throughout the project to ensure consistency and ease of theming. All variables should ideally be defined with `!default` to allow overriding by skins.
    *   `_mixins.scss` (if present, or could be part of `_utilities.scss`): Contains reusable SCSS mixins.

*   **`base/`**:
    *   Contains boilerplate code for the project.
    *   `_base.scss`: Defines default styling for basic HTML elements (e.g., `body`, `p`, `h1-h6`, `ul`, `a`). It sets the foundational typographic and layout rules for standard HTML tags.

*   **`components/`**:
    *   This is where individual UI components are styled. Each distinct part of the site that can be considered a reusable component has its own SCSS file (e.g., `_experiences.scss`, `_sidebar.scss`, `_section-title.scss`).
    *   Styles here are specific to a component and should be self-contained as much as possible.
    *   Currently includes: `_cta.scss`, `_education.scss`, `_experiences.scss`, `_footer.scss` (component version), `_header.scss` (component version), `_projects.scss`, `_section-title.scss`, `_sidebar.scss`, `_skills.scss`, `_summary.scss`.

*   **`layout/`**:
    *   Manages the structural layout of the site.
    *   Includes files like `_grid.scss` (if using a custom grid system), `_wrapper.scss` (for the main content wrapper styling and constraints).
    *   `_footer.scss` (layout version): Styles for the footer area of the page structure.
    *   `_header.scss` (layout version): Styles for the header area of the page structure.

*   **`skins/`**:
    *   This directory handles the theming capabilities of the resume.
    *   Each `.scss` file (e.g., `_berry.scss`, `_blue.scss`) represents a different color scheme or "skin."
    *   These skin files primarily override the default color variables (and potentially other variables like fonts) defined in `abstracts/_variables.scss` to apply a unique look and feel.

## Theming / Skinning

The resume supports multiple themes (skins). The active skin is determined by the Jekyll configuration (`_config.yml` under the `skin` key).
`assets/css/main.scss` imports default variables first, then conditionally imports the SCSS variables specific to the selected skin (which override the defaults thanks to `!default` in `_variables.scss`). Finally, it imports all component and layout styles, which then use the effective (potentially overridden) variables.

This allows for easy switching between visual themes without altering the core structure or component styles.

## Adding New Components or Styles

1.  **New Component**:
    *   Create a new SCSS file for your component in the `_sass/components/` directory (e.g., `_my-new-component.scss`).
    *   Write your component-specific styles within this file.
    *   Import this new partial into `assets/css/main.scss` within the component import section (e.g., after existing `@import "components/...";` lines).

2.  **New Utility/Variable/Mixin**:
    *   **Variable**: Add to `_sass/abstracts/_variables.scss` with the `!default` flag.
    *   **Utility Class**: Add to `_sass/_utilities.scss`.
    *   **Mixin**: Add to `_sass/abstracts/_mixins.scss` (if it exists) or `_sass/_utilities.scss` if it's a general utility mixin.

## Best Practices

*   Keep SCSS files modular and focused on a single component or purpose.
*   Leverage variables extensively for colors, fonts, and spacing to maintain consistency and facilitate theming.
*   Use meaningful class names. Consider BEM (Block, Element, Modifier) if a stricter convention is desired, though not strictly enforced currently.
*   Comment complex or non-obvious SCSS rules.

This SCSS architecture aims to provide a clean, organized, and maintainable way to style the resume.
