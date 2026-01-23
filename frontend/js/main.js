/**
 * OpenSource Compass - Interactivity Script
 * Handles scroll-triggered reveal animations, micro-interactions, and data fetching.
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

    // 3. Load Programs from JSON (Solves Issue #64)
    loadHomePagePrograms();
    
      // Back to Top Button
     // Back to Top Button
   const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
      if (!scrollTopBtn) return;

      if (window.scrollY > 200) {
         scrollTopBtn.style.display = "block";
      } else {
          scrollTopBtn.style.display = "none";
      }
    });
    
   if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}     
});

// Function to fetch and render programs on the home page
function loadHomePagePrograms() {
    const container = document.getElementById('programs-container');
    
    // Check if container exists (to avoid errors on pages without this section)
    if (!container) return;

    fetch('../data/programs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(programs => {
            container.innerHTML = programs.map(program => `
                <div class="card">
                    <h4>${program.name}</h4>
                    <p>${program.description}</p>
                    <span class="badge">${program.difficulty}</span>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading programs:', error);
            container.innerHTML = `
                <div class="error-message">
                    <p>Failed to load programs. Please try refreshing the page.</p>
                </div>
            `;
        });
}

console.log("Progress tracker JS loaded");
// STEP 5: Progress Tracker - Save Done State

const STORAGE_KEY = "resourcesProgress";

// load saved progress
function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

// save progress
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

const progress = loadProgress();

document.querySelectorAll(".mark-done-btn").forEach((btn) => {
  const id = btn.getAttribute("data-id");

  // if already done, update UI
  if (progress[id]) {
    btn.innerText = "Completed";
    btn.disabled = true;
  }

  btn.addEventListener("click", () => {
    progress[id] = true;
    saveProgress(progress);

    btn.innerText = "Completed";
    btn.disabled = true;
    updateProgressBar();

  });
});
// STEP 6: Update progress bar and percentage

function updateProgressBar() {
  const allButtons = document.querySelectorAll(".mark-done-btn");
  const total = allButtons.length;
  const completed = Object.keys(progress).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  if (bar) bar.style.width = percent + "%";
  if (text) text.innerText = percent + "% completed";
}

// update on page load
updateProgressBar();
 main

