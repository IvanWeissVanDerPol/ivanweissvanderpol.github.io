// assets/js/theme-switcher.js
document.addEventListener('DOMContentLoaded', function () {
  const themeSelect = document.getElementById('theme-select');
  // Determine the site's configured default skin from the select element's first option.
  const siteDefaultSkin = themeSelect ? themeSelect.options[0].value : 'ceramic'; // Fallback if needed

  function applyTheme(skinName) {
    // Remove any existing theme-SKIN_NAME class from the body
    document.body.className = document.body.className.replace(/\btheme-\S+\b/g, '').trim();
    
    // Add the new theme class ONLY if it's different from the site's default skin.
    // The default skin's styles are applied directly to the body without a specific theme-SKIN_NAME class.
    if (skinName && skinName !== siteDefaultSkin) {
      document.body.classList.add('theme-' + skinName);
    }
    // Save the selected skin to localStorage, whether it's the default or another skin.
    localStorage.setItem('selectedTheme', skinName);
  }

  if (themeSelect) {
    const savedTheme = localStorage.getItem('selectedTheme');

    if (savedTheme) {
      themeSelect.value = savedTheme;
      applyTheme(savedTheme); // Apply the saved theme on page load
    } else {
      // If no theme is saved in localStorage, ensure the select matches the actual default skin.
      // This handles the first visit or if localStorage was cleared.
      themeSelect.value = siteDefaultSkin;
      // No need to call applyTheme here if it's the default, as styles are already base styles.
    }

    themeSelect.addEventListener('change', function () {
      applyTheme(this.value);
    });
  }
});
