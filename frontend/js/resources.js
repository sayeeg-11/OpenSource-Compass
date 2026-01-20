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
document.querySelectorAll('.resource-card').forEach(card => {
  const difficulty = card.dataset.difficulty; // read data-difficulty
  if (!difficulty) return;

  // Create badge element
  const badge = document.createElement('span');
  badge.classList.add('badge', `difficulty-${difficulty.toLowerCase()}`);
  badge.textContent = difficulty;

  // Insert the badge at the top of the card
  card.insertBefore(badge, card.firstChild);
});
document.querySelectorAll('.resource-card').forEach(card => {
  const difficulty = card.dataset.difficulty; // Read the difficulty

  if (!difficulty) return; // Skip if no difficulty found

  const badge = document.createElement('span');
  badge.classList.add('badge', `difficulty-${difficulty.toLowerCase()}`);
  badge.textContent = difficulty;

  // Add badge at the top of the card
  card.insertBefore(badge, card.firstChild);
});
