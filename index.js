
      // Scroll Reveal Animation
      const revealElements = document.querySelectorAll('.reveal');
      
      const revealOnScroll = () => {
        revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
          }
        });
      };

      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll(); // Initial check

      // Animated Counter
      const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            if (target >= 1000) {
              element.textContent = (target / 1000) + 'K+';
            } else if (target >= 5) {
              element.textContent = target + 'Y+';
            } else {
              element.textContent = target + '+';
            }
          }
        };

        updateCounter();
      };

      // Trigger counters when stats section is visible
      const statsSection = document.querySelector('.stats-section');
      let counterTriggered = false;

      const checkStatsVisible = () => {
        if (!counterTriggered) {
          const sectionTop = statsSection.getBoundingClientRect().top;
          if (sectionTop < window.innerHeight - 200) {
            counterTriggered = true;
            document.querySelectorAll('.stat-number').forEach(counter => {
              animateCounter(counter);
            });
          }
        }
      };

      window.addEventListener('scroll', checkStatsVisible);
      checkStatsVisible();

      // Scroll to top button
      const scrollTopBtn = document.getElementById('scrollTopBtn');
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollTopBtn.style.display = 'flex';
        } else {
          scrollTopBtn.style.display = 'none';
        }
      });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Newsletter form
      const newsletterForm = document.querySelector('.newsletter-form');
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        e.target.reset();
      });
    