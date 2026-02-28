// SEARCH FILTER
// SEARCH FILTER (Safe)
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".section");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  });
}

// SCROLL TO TOP
// SCROLL TO TOP (Safe)
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 500 ? "flex" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
