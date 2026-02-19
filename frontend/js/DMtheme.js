document.addEventListener('DOMContentLoaded', () => {
    const themeStorageKey = 'selectedTheme';
    const darkThemeClass = 'dark-mode';

    // 1. Apply saved theme immediately on load
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === 'dark') {
        document.body.classList.add(darkThemeClass);
        updateIcons(true);
    }

    // 2. Listen for clicks on the toggle button (works with dynamic navbars)
    document.addEventListener('click', (event) => {
        // Find the toggle button (either the button itself or the icon inside it)
        const toggleBtn = event.target.closest('#theme-toggle, #theme-icon');
        
        if (toggleBtn) {
            event.preventDefault(); // Stop it from acting like a link
            
            // Toggle the dark mode class
            document.body.classList.toggle(darkThemeClass);
            const isDark = document.body.classList.contains(darkThemeClass);

            // Save the user's choice
            localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');

            // Flip the icon
            updateIcons(isDark);
        }
    });

    // Helper to switch the icon between Moon and Sun
    function updateIcons(isDark) {
        const icons = document.querySelectorAll('.fa-moon, .fa-sun');
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});