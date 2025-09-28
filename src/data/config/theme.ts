// Theme configuration and visual settings
import type { ThemeConfig, ThemeId, AnimationConfig } from '../../types';

interface ExtendedThemeConfig extends ThemeConfig {
  animations: {
    threshold: number;
    once: boolean;
    duration: number;
    hero: SectionAnimations;
    about: SectionAnimations;
    skills: SectionAnimations;
    projects: SectionAnimations;
    contact: ContactAnimations;
  };
  classes: {
    gradientText: string;
    imageFilter: string;
    imageFit: string;
  };
  layout: {
    containerClass: string;
    wrapperClass: string;
    mediumContainer: string;
  };
}

interface SectionAnimations {
  container: AnimationConfig;
  [key: string]: AnimationConfig;
}

interface ContactAnimations extends SectionAnimations {
  button: AnimationConfig;
  title: AnimationConfig;
  social: AnimationConfig;
  hr: AnimationConfig;
  copyright: AnimationConfig;
}

export const themeConfig: ExtendedThemeConfig = {
  // Theme settings
  defaultTheme: 'midnight' as ThemeId,
  colorScheme: 'dark',
  themes: [],

  // Font configuration
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono: '"Fira Code", "Cascadia Code", Monaco, "Courier New", monospace'
  },

  // Animation settings for SAL.js
  animations: {
    threshold: 0.2,
    once: true,
    duration: 600,

    // Specific animation configurations
    hero: {
      container: {
        type: "fade",
        duration: 800
      },
      image: {
        type: "slide-right",
        delay: 200,
        duration: 600
      },
      content: {
        type: "slide-left",
        delay: 400,
        duration: 600
      },
      social: {
        type: "slide-up",
        delay: 600,
        duration: 400
      }
    },

    about: {
      container: {
        type: "fade",
        duration: 800
      },
      title: {
        type: "slide-up",
        delay: 100,
        duration: 600
      },
      content: {
        type: "fade",
        delay: 300,
        duration: 600
      },
      highlights: {
        type: "zoom-in",
        delay: 400,
        duration: 500
      }
    },

    skills: {
      container: {
        type: "fade",
        duration: 800
      },
      category: {
        type: "slide-right",
        delay: 200,
        duration: 600
      },
      skillItem: {
        type: "fade",
        delay: 300,
        duration: 500
      },
      progressBar: {
        type: "slide-right",
        delay: 400,
        duration: 800
      }
    },

    projects: {
      container: {
        type: "fade",
        duration: 800
      },
      projectCard: {
        type: "zoom-in",
        delay: 300,
        duration: 600
      },
      stats: {
        type: "slide-up",
        delay: 200,
        duration: 500
      }
    },

    contact: {
      container: {
        type: "fade",
        duration: 600
      },
      button: {
        type: "zoom-in",
        delay: 200,
        duration: 500
      },
      title: {
        type: "slide-up",
        delay: 300,
        duration: 400
      },
      social: {
        type: "slide-up",
        delay: 400,
        duration: 500
      },
      hr: {
        type: "slide-up",
        delay: 500,
        duration: 300
      },
      copyright: {
        type: "fade",
        delay: 600,
        duration: 400
      }
    }
  },

  // CSS classes and styling
  classes: {
    gradientText: "gradient-text",
    imageFilter: "blackAndWhite",
    imageFit: "image fit"
  },

  // Layout settings
  layout: {
    containerClass: "container",
    wrapperClass: "wrapper style4",
    mediumContainer: "container medium"
  }
};