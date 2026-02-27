document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("successMessage").style.display = "block";
  this.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const successMessage = document.getElementById("successMessage");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Get form values (optional but useful)
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value.trim();

    // Basic validation (message + type required)
    if (!type || !message) {
      alert("Please fill in the required fields.");
      return;
    }

    // Simulate successful submission (since no backend)
    successMessage.style.display = "block";
    successMessage.textContent = "Thank you! Your feedback has been submitted successfully.";

    // Reset form fields
    form.reset();

    // Auto-hide after 4 seconds (better UX)
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  });
});