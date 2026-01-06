// Toggle sidebar on mobile
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const codeBlock = button.closest('.code-block').querySelector('pre');
        const code = codeBlock.innerText;
        
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        });
    });
});

// Progress checkboxes functionality
document.querySelectorAll('.progress-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if(this.checked) {
            this.nextElementSibling.style.textDecoration = 'line-through';
            this.nextElementSibling.style.color = '#666';
        } else {
            this.nextElementSibling.style.textDecoration = 'none';
            this.nextElementSibling.style.color = 'inherit';
        }
    });
});

// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        
        // Close sidebar on mobile after clicking
        if(window.innerWidth <= 992) {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
});

// Handle active sidebar item on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if(pageYOffset >= sectionTop) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});