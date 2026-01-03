/* ============================
   OpenSource Compass - Main JS
   ============================ */

/* ---------- Dark / Light Mode ---------- */
const themeToggleBtn = document.getElementById("themeToggle");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Optional: save preference
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

/* ---------- Load saved theme ---------- */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

/* ---------- Smooth Scrolling ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

/* ---------- FAQ / Accordion Toggle ---------- */
/* Use this structure:
   <div class="faq-question">Question</div>
   <div class="faq-answer">Answer</div>
*/

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    if (answer) {
      answer.classList.toggle("open");
    }
  });
});

/* ---------- Section Toggle (Optional Utility) ---------- */
/* Use buttons with data-target="#sectionId" */

const toggleButtons = document.querySelectorAll("[data-target]");

toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    if (target) {
      target.classList.toggle("hidden");
    }
  });
});