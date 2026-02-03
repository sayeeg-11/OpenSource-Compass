document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("successMessage").style.display = "block";
  this.reset();
});
