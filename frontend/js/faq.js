

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  
  // Don't proceed if no FAQ items found
  if (!faqItems.length) return;

  // Initialize each FAQ item
  faqItems.forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    
    // Skip if button doesn't exist
    if (!button) return;

    // Add keyboard and ARIA attributes
    button.setAttribute('tabindex', '0');
    button.setAttribute('role', 'button');
    
    // Set initial ARIA expanded state based on active class
    const isInitiallyActive = item.classList.contains("active");
    button.setAttribute('aria-expanded', isInitiallyActive ? 'true' : 'false');
    
    // Add aria-controls to associate button with answer
    const answerId = `faq-answer-${index}`;
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      answer.id = answerId;
      button.setAttribute('aria-controls', answerId);
    }

    // Click handler
    button.addEventListener("click", (e) => {
      e.preventDefault();
      toggleFAQ(item, button);
    });

    // Keyboard handler for navigation
    button.addEventListener("keydown", (e) => {
      const key = e.key;
      
      
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        toggleFAQ(item, button);
      }
      
      // Arrow Down - Move to next FAQ
      else if (key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < faqItems.length) {
          const nextButton = faqItems[nextIndex].querySelector('.faq-question');
          if (nextButton) {
            nextButton.focus();
          }
        }
      }
      
      // Arrow Up - Move to previous FAQ
      else if (key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          const prevButton = faqItems[prevIndex].querySelector('.faq-question');
          if (prevButton) {
            prevButton.focus();
          }
        }
      }
      
      // Home - Move to first FAQ
      else if (key === 'Home') {
        e.preventDefault();
        const firstButton = faqItems[0].querySelector('.faq-question');
        if (firstButton) {
          firstButton.focus();
        }
      }
      
      // End - Move to last FAQ
      else if (key === 'End') {
        e.preventDefault();
        const lastButton = faqItems[faqItems.length - 1].querySelector('.faq-question');
        if (lastButton) {
          lastButton.focus();
        }
      }
    });

    
    button.addEventListener('focus', () => {
      
    });
  });

  /**
   * Toggle FAQ item open/closed
   * @param {HTMLElement} item - The FAQ item container
   * @param {HTMLElement} button - The button element
   */
  function toggleFAQ(item, button) {
    // Check if current item is active
    const isActive = item.classList.contains("active");
    
    // Close all FAQ items first (for accordion behavior)
    faqItems.forEach(i => {
      i.classList.remove("active");
      const btn = i.querySelector('.faq-question');
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
      item.classList.add("active");
      button.setAttribute('aria-expanded', 'true');
      
      // Announce to screen readers that the panel is expanded
      const answer = item.querySelector('.faq-answer p');
      if (answer) {
        answer.setAttribute('aria-live', 'polite');
      }
    }
  }

  // Optional: Add keyboard shortcut hint for screen reader users
  const addKeyboardHint = () => {
    const container = document.querySelector('.faq-container');
    if (container && !document.querySelector('.keyboard-hint')) {
      const hint = document.createElement('div');
      hint.className = 'keyboard-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.style.cssText = `
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
        text-align: center;
      `;
      hint.innerHTML = '💡 Use arrow keys (↑/↓), Home, and End to navigate between questions';
      container.parentNode.insertBefore(hint, container);
    }
  };
  
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleFAQ };
}