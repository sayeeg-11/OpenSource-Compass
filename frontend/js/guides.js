
function calculateReadTime() {
  // Select all paragraphs that contain guide content
  const guides = document.querySelectorAll('.guide-list p, .pr-steps p, .timeline-list p, .practice-item p, .contributing-best-practices > p');
  let totalWords = 0;
  
  // Count total words across all guide content
  guides.forEach(p => {
    const text = p.textContent || p.innerText;
    // Split by whitespace and filter empty strings
    const words = text.split(/\s+/).filter(word => word.length > 0);
    totalWords += words.length;
  });
  
  // Calculate read time (round up to nearest minute)
  const readTime = Math.ceil(totalWords / 200); 
  
  // Add read time badge to each major section
  const sections = document.querySelectorAll('.guide, .pull-request-guide, .github-guide-timeline, .contributing-best-practices');
  
  sections.forEach(section => {
    const heading = section.querySelector('h3');
    if (heading && !heading.querySelector('.read-time')) {
      const timeBadge = document.createElement('span');
      timeBadge.className = 'read-time-badge';
      timeBadge.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
      heading.appendChild(timeBadge);
    }
  });
  
  console.log(`Total read time calculated: ${readTime} minutes`); // Debug log
}

const TRACK_API_URL = 'http://localhost:5000/api/auth/track-guide';
const STATUS_API_URL = 'http://localhost:5000/api/auth/me';

/**
 * Initialize progress tracking functionality
 */
function initProgressTracking() {
  // Check and mark completed guides on page load
  checkCompletedGuides();

  // Add click handlers to all track guide buttons
  document.querySelectorAll('.track-guide-btn').forEach(btn => {
    btn.addEventListener('click', handleGuideCompletion);
  });
}

/**
 * Handle guide completion button click
 */
async function handleGuideCompletion(event) {
  const btn = event.currentTarget;
  const guideId = btn.getAttribute('data-guide-id');
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    alert('Please sign in to save your learning progress!');
    window.location.href = 'login.html';
    return;
  }

  // UI Feedback - saving state
  const originalText = btn.textContent;
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const response = await fetch(TRACK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ guideId })
    });

    if (response.ok) {
      const data = await response.json();
      setButtonCompleted(btn);
      // Update local storage with new progress
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    } else {
      // Reset button on error
      btn.textContent = originalText;
      btn.disabled = false;
      const data = await response.json();
      alert(data.message || 'Error tracking progress');
    }
  } catch (error) {
    console.error('Failed to track progress:', error);
    btn.textContent = originalText;
    btn.disabled = false;
    alert('Network error. Please try again.');
  }
}

/**
 * Check which guides are completed and update UI
 */
async function checkCompletedGuides() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    try {
      const res = await fetch(STATUS_API_URL, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        markCompletedGuides(data.user.completedGuides);
      } else {
        markCompletedGuides(currentUser.completedGuides);
      }
    } catch (e) {
      console.warn('Using cached user data for completed guides');
      markCompletedGuides(currentUser.completedGuides);
    }
  }
}

function markCompletedGuides(completedGuides) {
  if (!completedGuides || !Array.isArray(completedGuides)) return;

  document.querySelectorAll('.track-guide-btn').forEach(btn => {
    const guideId = btn.getAttribute('data-guide-id');
    if (completedGuides.some(g => g.guideId === guideId)) {
      setButtonCompleted(btn);
    }
  });
}

function setButtonCompleted(btn) {
  btn.textContent = '✓ Completed';
  btn.classList.add('completed');
  btn.style.background = '#2ecc71';
  btn.style.color = '#ffffff';
  btn.style.border = 'none';
  btn.disabled = true;
}

function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initSidebar() {
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
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const codeBlock = button.closest('.code-block')?.querySelector('pre');
      if (!codeBlock) return;
      
      const code = codeBlock.innerText;

      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Error!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Update active state
      document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }

      // Close sidebar on mobile after click
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      if (window.innerWidth <= 992) {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
      }
    });
  });
}

function initScrollSpy() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) {
        currentSection = '#' + section.getAttribute('id');
      }
    });

    document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  });
}

function initGuidePage() {
  // Calculate and display read time
  calculateReadTime();
  
  // Initialize progress tracking
  initProgressTracking();
  
  // Initialize UI components
  initScrollToTop();
  initSidebar();
  initCopyButtons();
  initSmoothScroll();
  initScrollSpy();
  
  console.log('Guide page initialized with read time feature'); 
}

document.addEventListener('DOMContentLoaded', initGuidePage);

window.recalculateReadTime = calculateReadTime;

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateReadTime,
    initProgressTracking,
    setButtonCompleted
  };
}