/**
 * accessibility.js
 * Enhanced accessibility features for OpenSource Compass
 */

// Initialize accessibility features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAccessibilityFeatures();
});

function initAccessibilityFeatures() {
    // Add skip to main content link
    addSkipToMainLink();
    
    // Detect keyboard navigation
    detectKeyboardNavigation();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add ARIA live regions for dynamic content
    setupAriaLiveRegions();
    
    // Improve form accessibility
    enhanceFormAccessibility();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
}

/**
 * Add skip to main content link for screen readers
 */
function addSkipToMainLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Skip to main content';
    
    // Add id to main content if it doesn't exist
    const mainContent = document.querySelector('main, section, .hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Detect when user is navigating with keyboard
 */
function detectKeyboardNavigation() {
    let usingKeyboard = false;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            usingKeyboard = true;
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.addEventListener('mousedown', function() {
        usingKeyboard = false;
        document.body.classList.remove('keyboard-user');
    });
}

/**
 * Enhance focus management for better keyboard navigation
 */
function enhanceFocusManagement() {
    // Trap focus in modals
    const modals = document.querySelectorAll('.modal, [role="dialog"]');
    modals.forEach(modal => {
        modal.addEventListener('keydown', trapFocus);
    });
    
    // Add focus indicators to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
            // Add descriptive aria-label for icon-only buttons
            if (element.tagName === 'BUTTON' && element.querySelector('.fas, .far, .fab')) {
                const icon = element.querySelector('.fas, .far, .fab');
                if (icon) {
                    const iconClass = Array.from(icon.classList).find(c => c.startsWith('fa-'));
                    if (iconClass) {
                        const iconName = iconClass.replace('fa-', '').replace(/-/g, ' ');
                        element.setAttribute('aria-label', `${iconName} button`);
                    }
                }
            }
        }
    });
}

/**
 * Trap focus within modal dialogs
 */
function trapFocus(e) {
    if (e.key === 'Tab') {
        const modal = e.currentTarget;
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
    
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const closeButton = modal.querySelector('.close-btn, [aria-label*="Close"], [aria-label*="Cancel"]');
        if (closeButton) {
            closeButton.click();
        }
    }
}

/**
 * Setup ARIA live regions for dynamic content announcements
 */
function setupAriaLiveRegions() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only aria-live';
    liveRegion.id = 'aria-live-region';
    document.body.appendChild(liveRegion);
    
    // Make announcements function available globally
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

/**
 * Enhance form accessibility
 */
function enhanceFormAccessibility() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add form submission feedback
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
                submitButton.setAttribute('aria-busy', 'true');
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.removeAttribute('aria-busy');
                }, 3000);
            }
        });
        
        // Add field validation announcements
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('invalid', function(e) {
                e.preventDefault();
                const fieldName = field.getAttribute('aria-label') || field.name || 'Field';
                announceToScreenReader(`${fieldName} is required and cannot be empty`);
                field.focus();
            });
        });
    });
}

/**
 * Setup keyboard shortcuts for common actions
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + H: Go to home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            const homeLink = document.querySelector('a[href*="index.html"], a[href="/"]');
            if (homeLink) homeLink.click();
        }
        
        // Alt + S: Focus search (if search exists)
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
            if (searchInput) searchInput.focus();
        }
        
        // Alt + T: Toggle theme
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
        
        // Alt + N: Skip to navigation
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            const nav = document.querySelector('nav, [role="navigation"]');
            if (nav) {
                const firstNavLink = nav.querySelector('a, button');
                if (firstNavLink) firstNavLink.focus();
            }
        }
    });
}

/**
 * Add keyboard navigation support for dropdown menus
 */
function enhanceDropdownAccessibility() {
    const dropdowns = document.querySelectorAll('[aria-haspopup="true"]');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            }
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const menu = document.getElementById(this.getAttribute('aria-controls'));
                if (menu) {
                    const menuItems = menu.querySelectorAll('[role="menuitem"]');
                    const currentIndex = Array.from(menuItems).indexOf(document.activeElement);
                    let nextIndex;
                    
                    if (e.key === 'ArrowDown') {
                        nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                    } else {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                    }
                    
                    menuItems[nextIndex].focus();
                }
            }
            
            if (e.key === 'Escape') {
                this.setAttribute('aria-expanded', 'false');
                this.focus();
            }
        });
    });
}

/**
 * Initialize dropdown accessibility
 */
enhanceDropdownAccessibility();

/**
 * Add page load announcement for screen readers
 */
window.addEventListener('load', function() {
    const pageTitle = document.title;
    announceToScreenReader(`${pageTitle} page loaded`);
});

/**
 * Handle dynamic content changes
 */
function observeContentChanges() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if new content has important information
                        if (node.matches('[role="alert"], .error, .success, .notification')) {
                            announceToScreenReader(node.textContent);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

observeContentChanges();
