document.addEventListener('DOMContentLoaded', () => {
  // Replace existing newsletter form handler with enhanced validation
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      const messageDiv = document.getElementById('newsletterMessage') || createMessageDiv(newsletterForm);
      
      // Enhanced email validation - more comprehensive regex
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      // Clear previous messages
      messageDiv.textContent = '';
      messageDiv.className = 'newsletter-message';
      
      // Validate email format
      if (!emailRegex.test(email)) {
        showMessage(messageDiv, 'Please enter a valid email address (e.g., name@example.com)', 'error');
        emailInput.focus();
        return;
      }
      
      try {
        // Store in localStorage for demo
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
          showMessage(messageDiv, `Thank you for subscribing! We'll send updates to ${email}`, 'success');
          emailInput.value = '';
        } else {
          showMessage(messageDiv, 'This email is already subscribed!', 'info');
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again.', 'error');
      }
    });
  }
  
  // Helper function to create message div if it doesn't exist
  function createMessageDiv(form) {
    let messageDiv = document.getElementById('newsletterMessage');
    if (!messageDiv) {
      messageDiv = document.createElement('div');
      messageDiv.id = 'newsletterMessage';
      messageDiv.className = 'newsletter-message';
      form.appendChild(messageDiv);
    }
    return messageDiv;
  }
  
  // Helper function to show messages
  function showMessage(element, text, type) {
    element.textContent = text;
    element.classList.add(type);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        element.textContent = '';
        element.classList.remove(type);
      }, 5000);
    }
  }

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
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    function animateCounter(element, target, suffix, duration = 2000) {
      const startTime = performance.now();
      const startValue = 0;

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        let currentValue = Math.floor(easeOutQuart * target);
        
        // Format large numbers
        if (target >= 1000) {
          currentValue = Math.floor(currentValue / 1000);
          element.textContent = currentValue + 'K' + suffix;
        } else {
          element.textContent = currentValue + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure final value is exact
          if (target >= 1000) {
            element.textContent = Math.floor(target / 1000) + 'K' + suffix;
          } else {
            element.textContent = target + suffix;
          }
        }
      }

      requestAnimationFrame(updateCounter);
    }

    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numberElement = entry.target;
            
            if (numberElement && !numberElement.hasAttribute('data-animated')) {
              const target = parseInt(numberElement.getAttribute('data-target') || '0');
              const suffix = numberElement.getAttribute('data-suffix') || '';
              
              // Mark as animated to prevent re-running
              numberElement.setAttribute('data-animated', 'true');
              
              // Start animation with small delay
              setTimeout(() => {
                animateCounter(numberElement, target, suffix);
              }, 200);
              
              observer.unobserve(numberElement);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    statNumbers.forEach(item => statsObserver.observe(item));
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
});

// ===============================
// Scroll Progress Indicator (Top)
// ===============================
const scrollProgressBar = document.getElementById('scrollProgress');

if (scrollProgressBar) {
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) {
        scrollProgressBar.style.width = '0%';
        return;
      }

      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    },
    { passive: true }
  );
}

// ===============================
// Cursor Highlight (Feature #495)
// ===============================
(() => {
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cursor = document.getElementById('cursor-highlight');
  if (!cursor || prefersReducedMotion) return;

  document.body.classList.add('cursor-highlight-enabled');

  let x = 0;
  let y = 0;
  let rafId = null;

  const updateCursor = () => {
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    rafId = null;
  };

  document.addEventListener(
    'mousemove',
    (e) => {
      x = e.clientX;
      y = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '';
  });
})();

// ===============================
// Back to Top Button 
// ===============================
const scrollTopBtn = document.getElementById('scrollTopBtn');
const scrollThreshold = 300;

if (scrollTopBtn) {
  const toggleScrollButton = () => {
    if (window.scrollY > scrollThreshold) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleScrollButton);
  toggleScrollButton();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===============================
// Modal Functions
// ===============================
function openModal(program) {
  const modal = document.getElementById("programModal");
  const title = document.getElementById("modalTitle");
  const basicInfo = document.getElementById("modalBasicInfo");
  const skills = document.getElementById("modalSkills");
  const prepare = document.getElementById("modalPrepare");
  const tips = document.getElementById("modalTips");

  const data = {
    gsoc: {
      title: "Google Summer of Code",
      basic: `
        📅 <b>Duration:</b> 12 Weeks <br>
        🌍 <b>Eligibility:</b> Students worldwide <br>
        💰 <b>Stipend:</b> Paid <br>
        ⏳ <b>Timeline:</b> May–Aug
      `,
      skills: [
        "Strong problem solving",
        "Git & GitHub workflow",
        "Open source contribution experience"
      ],
      prepare: [
        "Start contributing early",
        "Fix good first issues",
        "Interact with mentors",
        "Understand project roadmap"
      ],
      tips: [
        "Write strong proposal",
        "Be active in discussions",
        "Submit quality PRs",
        "Show consistency"
      ]
    },
    gssoc: {
      title: "GirlScript Summer of Code",
      basic: `
        📅 <b>Duration:</b> 3 Months <br>
        🎓 <b>Eligibility:</b> Students & beginners <br>
        🏆 <b>Perks:</b> Certificate & swag <br>
        ⏳ <b>Timeline:</b> Feb–May
      `,
      skills: [
        "Basic programming knowledge",
        "Git & GitHub basics",
        "Willingness to learn"
      ],
      prepare: [
        "Join the community",
        "Start with beginner issues",
        "Follow project guidelines"
      ],
      tips: [
        "Be consistent",
        "Ask for help when stuck",
        "Document your learning"
      ]
    },
    hack: {
      title: "Hacktoberfest",
      basic: `
        📅 <b>Duration:</b> 1 Month <br>
        🌍 <b>Eligibility:</b> Everyone <br>
        🎁 <b>Perks:</b> Swags & goodies <br>
        ⏳ <b>Timeline:</b> October
      `,
      skills: [
        "Basic Git knowledge",
        "Ability to read code",
        "Problem solving"
      ],
      prepare: [
        "Find repositories you like",
        "Look for hacktoberfest-labeled issues",
        "Understand contribution guidelines"
      ],
      tips: [
        "Quality over quantity",
        "Don't spam PRs",
        "Engage with maintainers"
      ]
    },
    swoc: {
      title: "Social Winter of Code",
      basic: `
        📅 <b>Duration:</b> 3 Months <br>
        👩‍💻 <b>Eligibility:</b> Beginners <br>
        🏅 <b>Perks:</b> Certificate <br>
        ⏳ <b>Timeline:</b> Dec–Feb
      `,
      skills: [
        "Basic programming",
        "Enthusiasm to learn",
        "Git basics"
      ],
      prepare: [
        "Explore the platform",
        "Join Discord/Slack",
        "Find a mentor"
      ],
      tips: [
        "Start early",
        "Be active in community",
        "Complete tasks consistently"
      ]
    },
    linux: {
      title: "Linux Foundation Mentorship",
      basic: `
        📅 <b>Duration:</b> Varies <br>
        👨‍💻 <b>Eligibility:</b> Developers <br>
        💰 <b>Stipend:</b> Paid mentorship <br>
        🌐 <b>Timeline:</b> Yearly
      `,
      skills: [
        "Strong programming skills",
        "Linux/Unix familiarity",
        "Open source experience"
      ],
      prepare: [
        "Contribute to LF projects",
        "Learn about the ecosystem",
        "Connect with mentors"
      ],
      tips: [
        "Show long-term commitment",
        "Build a portfolio",
        "Network in the community"
      ]
    },
    outreachy: {
      title: "Outreachy",
      basic: `
        📅 <b>Duration:</b> 3 Months <br>
        🌍 <b>Eligibility:</b> Underrepresented groups <br>
        💰 <b>Stipend:</b> Paid internship <br>
        ⏳ <b>Timeline:</b> Twice a year
      `,
      skills: [
        "Project-specific skills",
        "Communication",
        "Self-motivation"
      ],
      prepare: [
        "Make initial contributions",
        "Complete the application",
        "Engage with community"
      ],
      tips: [
        "Apply early",
        "Be thorough in application",
        "Show genuine interest"
      ]
    },
    mlh: {
      title: "MLH Fellowship",
      basic: `
        📅 <b>Duration:</b> 12 Weeks <br>
        🎓 <b>Eligibility:</b> Students <br>
        💰 <b>Stipend:</b> Paid <br>
        ⏳ <b>Timeline:</b> Spring/Fall
      `,
      skills: [
        "Team collaboration",
        "Project-based learning",
        "Open source interest"
      ],
      prepare: [
        "Build personal projects",
        "Join MLH events",
        "Practice coding"
      ],
      tips: [
        "Show passion for tech",
        "Be a team player",
        "Learn continuously"
      ]
    },
    kde: {
      title: "Season of KDE",
      basic: `
        📅 <b>Duration:</b> 3 Months <br>
        🌍 <b>Eligibility:</b> Everyone <br>
        🏆 <b>Perks:</b> Mentorship <br>
        ⏳ <b>Timeline:</b> Jan–Apr
      `,
      skills: [
        "Qt/C++ basics",
        "Open source interest",
        "Git skills"
      ],
      prepare: [
        "Try KDE applications",
        "Join the community",
        "Look at beginner bugs"
      ],
      tips: [
        "Start with documentation",
        "Ask questions",
        "Be patient"
      ]
    },
    hyperledger: {
      title: "Hyperledger Mentorship",
      basic: `
        📅 <b>Duration:</b> 3 Months <br>
        🔗 <b>Focus:</b> Blockchain <br>
        💰 <b>Stipend:</b> Paid <br>
        ⏳ <b>Timeline:</b> Summer
      `,
      skills: [
        "Blockchain basics",
        "Programming (Go/JavaScript)",
        "Distributed systems interest"
      ],
      prepare: [
        "Learn Hyperledger projects",
        "Join the community calls",
        "Explore documentation"
      ],
      tips: [
        "Focus on one project",
        "Show blockchain interest",
        "Contribute early"
      ]
    }
  };

  const programData = data[program];
  
  if (programData) {
    title.innerHTML = programData.title;
    basicInfo.innerHTML = programData.basic;

    skills.innerHTML = "<ul>" + programData.skills.map(item => `<li>${item}</li>`).join("") + "</ul>";
    prepare.innerHTML = "<ul>" + programData.prepare.map(item => `<li>${item}</li>`).join("") + "</ul>";
    tips.innerHTML = "<ul>" + programData.tips.map(item => `<li>${item}</li>`).join("") + "</ul>";

    modal.style.display = "flex";
  }
}

function closeModal() {
  document.getElementById("programModal").style.display = "none";
}

// Accordion Toggle
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("accordion-header")) {
    const body = e.target.nextElementSibling;
    
    // Close other accordions
    const allBodies = document.querySelectorAll('.accordion-body');
    allBodies.forEach(b => {
      if (b !== body) {
        b.style.display = 'none';
      }
    });
    
    // Toggle current
    body.style.display = body.style.display === "block" ? "none" : "block";
  }
});

// Close modal when clicking outside
window.onclick = function(e) {
  const modal = document.getElementById("programModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};