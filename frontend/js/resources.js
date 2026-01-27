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
