
  
  
  // STEP 2: Rule-based resource recommendations (no backend)

// Map completed topics to recommended resources
const recommendationRules = {
  html: [
    "Learn CSS Basics",
    "Practice HTML Forms"
  ],
  css: [
    "Learn Flexbox & Grid",
    "Responsive Design Basics"
  ],
  javascript: [
    "DOM Manipulation",
    "ES6 Fundamentals"
  ]
};

// Get completed topics from localStorage
function getCompletedTopics() {
  return JSON.parse(localStorage.getItem("completedTopics")) || [];
}

// Generate recommendations based on completed topics
function generateRecommendations() {
  const completedTopics = getCompletedTopics();
  const recommendations = new Set();

  completedTopics.forEach(topic => {
    if (recommendationRules[topic]) {
      recommendationRules[topic].forEach(item => {
        recommendations.add(item);
      });
    }
  });

  return Array.from(recommendations);
}



// STEP 3: Display recommendations on the page
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("recommended-resources");

  // If the page doesn't have the section, do nothing
  if (!container) return;

  const recommendations = generateRecommendations();

  if (recommendations.length === 0) {
    container.innerHTML = "<p>No recommendations yet.</p>";
    return;
  }

  const heading = document.createElement("h3");
  heading.textContent = "Recommended for You";

  const ul = document.createElement("ul");

  recommendations.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  container.appendChild(heading);
  container.appendChild(ul);
});

