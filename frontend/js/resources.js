/**
 * Resource Filter Logic
 * Handles filter pills and resource card visibility
 */

document.addEventListener('DOMContentLoaded', initResourceFilters);

function initResourceFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.resource-card');

  if (!pills.length || !cards.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => applyFilter(pill, pills, cards));
  });
}

function applyFilter(activePill, allPills, cards) {
  // UI: active state
  allPills.forEach(p => p.classList.remove('active'));
  activePill.classList.add('active');

  const filter = activePill.dataset.filter;

  cards.forEach(card => {
    const type = card.dataset.type;
    card.style.display =
      filter === 'all' || type === filter ? 'flex' : 'none';
  });
}
