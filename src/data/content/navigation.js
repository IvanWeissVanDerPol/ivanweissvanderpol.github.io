// Navigation data - Single-page with anchor links
export const navigationData = {
  // Main navigation menu items
  mainMenu: [
    {
      label: "Home",
      href: "#",
      active: true
    },
    {
      label: "About",
      href: "#about",
      active: true
    },
    {
      label: "Skills",
      href: "#skills",
      active: true
    },
    {
      label: "Projects",
      href: "#projects",
      active: true
    },
    {
      label: "Experience",
      href: "#work",
      active: true
    },
    {
      label: "Contact",
      href: "#contact",
      active: true
    }
  ],
  
  // Future sections that are currently commented out
  futureMenuItems: [
    {
      label: "Blog",
      href: "/blog", 
      active: false
    }
  ],
  
  // Navigation settings
  navId: "nav",
  containerClass: "container"
}; 