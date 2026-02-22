document.querySelectorAll('.filter-pill').forEach(button => {
  button.addEventListener('click', () => {
    // UI Update: Toggle active class
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    document.querySelectorAll('.resource-card').forEach(card => {
      // Logic fix: card.dataset.type now exists in the HTML
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const resourcesList = document.querySelector(".resources-list");
  const emptyState = document.getElementById("resources-empty");

  if (resourcesList && emptyState) {
    const hasResources = resourcesList.querySelector(".resource-tile");

    if (!hasResources) {
  emptyState.style.display = "block";
}

  }
});
/* ===== Category Tabs Filtering ===== */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".resource-category");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;

      // Active tab styling
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Show/Hide sections
      sections.forEach((section) => {
        if (category === "all") {
          section.classList.remove("hidden");
        } else {
          if (section.dataset.category === category) {
            section.classList.remove("hidden");
          } else {
            section.classList.add("hidden");
          }
        }
      });

      // Smooth scroll to top of resources
      document.querySelector(".resources-section")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
});