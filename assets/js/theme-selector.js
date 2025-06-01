// assets/js/theme-selector.js (adapted for select dropdown)
document.addEventListener('DOMContentLoaded', function () {
  const themeSelect = document.getElementById('theme-select');
  const themeButtons = document.querySelectorAll('.theme-button');
  // Use the value from the body's data attribute as the ultimate fallback for default skin
  const siteDefaultSkin = document.body.dataset.defaultTheme || (themeSelect ? themeSelect.options[0].value : 'ceramic');

  function applyTheme(skinName) {
    // Remove any existing theme-SKIN_NAME class from the body
    document.body.className = document.body.className.replace(/\btheme-\S+\b/g, '').trim();

    // Add the new theme class ONLY if it's different from the site's default skin.
    // The default skin's styles are applied directly to the body without a specific theme-SKIN_NAME class.
    if (skinName !== siteDefaultSkin) {
      document.body.classList.add('theme-' + skinName);
    }
    // Always save to localStorage, even if it's the default, to remember user preference across sessions
    localStorage.setItem('selectedTheme', skinName);
    console.log('Applied theme:', skinName);

    // If dropdown exists, update its value to reflect the current theme
    if (themeSelect) {
      themeSelect.value = skinName;
    }
  }

  // Initial theme application (saved or default)
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(siteDefaultSkin); // Apply default skin if no saved theme
  }

  // Logic for the dropdown theme selector
  if (themeSelect) {
    themeSelect.value = savedTheme || siteDefaultSkin; // Set initial value
    themeSelect.addEventListener('change', function () {
      applyTheme(this.value);
    });
    console.log('Dropdown theme selector initialized. Current theme:', savedTheme || siteDefaultSkin);
  }

  // Logic for the button-based theme selector
  if (themeButtons.length > 0) {
    themeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const skinName = this.dataset.theme;
        if (skinName) {
          applyTheme(skinName);
        }
      });
    });
    console.log('Button-based theme selector initialized.');
  }

  if (!themeSelect && themeButtons.length === 0) {
    console.log('No theme selector UI elements found (neither #theme-select nor .theme-button).');
  }
});
