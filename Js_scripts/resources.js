// resources.js
document.querySelectorAll('.filter-pill').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter; // e.g., "guide", "tool"
    document.querySelectorAll('.resource-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});