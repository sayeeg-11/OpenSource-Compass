document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Check LocalStorage on load and apply theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true); // Helper function to set icon
    }

    // 2. Navigation Active State Logic (Fix for Issue #316)
    // This identifies the current page and highlights the corresponding navbar link
    const highlightActiveLink = () => {
        // Get the current page name from the URL (e.g., 'programs.html')
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".nav-links a");

        navLinks.forEach(link => {
            // Get the filename from the href attribute
            const linkPath = link.getAttribute("href").split("/").pop();
            
            // If the paths match, add the 'active' class
            if (linkPath === currentPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    };

    // Run the highlighter on load
    highlightActiveLink();

    // 3. Event Delegation for the Theme Button
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#themeToggle');
        if (toggleBtn) {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            updateThemeIcon(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    });

    // 4. Scroll to Top Logic
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// Helper function to update the icon safely
function updateThemeIcon(isDark) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}