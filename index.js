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
// FIX: Use '.stats' instead of '.stats-section' to match the actual HTML class
const statsSection = document.querySelector('.stats');
let counterTriggered = false;

const checkStatsVisible = () => {
  // FIX: Guard against null statsSection before calling getBoundingClientRect
  if (!statsSection) return;

  if (!counterTriggered) {
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 200) {
      counterTriggered = true;
      document.querySelectorAll('.counter').forEach(counter => {
        animateCounter(counter);
      });
    }
  }
};

window.addEventListener('scroll', checkStatsVisible);
checkStatsVisible();

// Newsletter form
// FIX: Guard against null newsletterForm before adding event listener
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    e.target.reset();
  });
}