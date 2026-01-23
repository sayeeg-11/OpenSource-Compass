document.addEventListener('DOMContentLoaded', () => {
  // Fade-in sections/cards
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fadeEls = Array.from(document.querySelectorAll('.fade-in'));
  if (fadeEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      fadeEls.forEach((el) => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
      );
      fadeEls.forEach((el) => observer.observe(el));
    }
  }

  // Stats counter animation
  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length && 'IntersectionObserver' in window) {
    // Function to animate counter
    function animateCounter(element, target, suffix, duration = 2000) {
      const startTime = performance.now();
      const startValue = 0;
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * target);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure final value is exact
          element.textContent = target + suffix;
        }
      }
      
      requestAnimationFrame(updateCounter);
    }

    // Create observer for stats
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const statItem = entry.target;
            const numberElement = statItem.querySelector('h2');
            
            if (numberElement && !numberElement.hasAttribute('data-animated')) {
              const target = parseFloat(numberElement.getAttribute('data-target') || '0');
              const suffix = numberElement.getAttribute('data-suffix') || '';
              
              // Mark as animated to prevent re-running
              numberElement.setAttribute('data-animated', 'true');
              
              // Start animation with small delay
              setTimeout(() => {
                animateCounter(numberElement, target, suffix);
              }, 200);
              
              observer.unobserve(statItem);
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe each stat item
    statItems.forEach(item => statsObserver.observe(item));
  }

  // Lightweight parallax: move only the visual block (not the whole hero)
  if (!prefersReducedMotion) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      let ticking = false;
      window.addEventListener(
        'scroll',
        () => {
          if (ticking) return;
          ticking = true;
          window.requestAnimationFrame(() => {
            const y = window.scrollY || window.pageYOffset || 0;
            heroVisual.style.transform = `translateY(${Math.min(28, y * 0.06)}px)`;
            ticking = false;
          });
        },
        { passive: true }
      );
    }
  }

  // Newsletter demo
  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      if (!email) return;
      alert(`Thanks! You'll get updates at ${email}.`);
      form.reset();
    });
  }
});