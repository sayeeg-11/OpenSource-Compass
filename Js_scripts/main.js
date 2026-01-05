/**
 * OpenSource Compass - Interactivity Script
 * Handles scroll-triggered reveal animations and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll-Triggered Animations
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the CSS transition
                entry.target.classList.add('active');
                
                // Once the animation has played, stop observing to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that should fade in on scroll
    const hiddenElements = document.querySelectorAll('.fade-in-up');
    hiddenElements.forEach(el => observer.observe(el));

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});