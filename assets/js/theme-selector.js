// assets/js/theme-selector.js
document.addEventListener('DOMContentLoaded', () => {
  const themeSelectorWrapper = document.getElementById('theme-selector-wrapper');
  if (!themeSelectorWrapper) {
    // Not in development mode or theme selector not present
    return;
  }

  const body = document.body;
  const themeButtons = document.querySelectorAll('.theme-button');
  const defaultTheme = document.body.dataset.defaultTheme || 'ceramic'; // Get default from _config.yml via body data attr
  const localStorageKey = 'selectedTheme';

  function applyTheme(themeName) {
    // Remove any existing theme- class
    body.className = body.className.replace(/\btheme-\S+/g, '');
    // Add the new theme class
    body.classList.add(`theme-${themeName}`);
    localStorage.setItem(localStorageKey, themeName);

    // Update button active state
    themeButtons.forEach(btn => {
      if (btn.dataset.theme === themeName) {
        btn.style.backgroundColor = '#e0e0e0'; // Active style
        btn.style.borderColor = '#bbb';
      } else {
        btn.style.backgroundColor = '#fff';
        btn.style.borderColor = '#ddd';
      }
    });
    console.log(`Theme changed to: ${themeName}`);
  }

  // Load saved theme or apply default
  const savedTheme = localStorage.getItem(localStorageKey);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // If no saved theme, and the body doesn't already have a theme class from SCSS (unlikely with new setup)
    // apply the default theme from config.
    // The SCSS setup should already apply the default theme styles globally to body,
    // and then specific .theme-X classes override it.
    // So, we just need to ensure the correct .theme-X class is on the body.
    applyTheme(defaultTheme);
  }

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const themeName = button.dataset.theme;
      applyTheme(themeName);
    });
  });

  console.log('Theme selector initialized. Default theme:', defaultTheme);
  if (savedTheme) {
    console.log('Applied saved theme:', savedTheme);
  }
});
