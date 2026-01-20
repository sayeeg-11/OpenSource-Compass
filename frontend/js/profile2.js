document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const nameInput = document.getElementById('editName');
    const emailInput = document.getElementById('editEmail');
    const passwordInput = document.getElementById('editPassword');
    const msg = document.getElementById('profileMessage');

    // Load current data
    nameInput.value = currentUser.name;
    emailInput.value = currentUser.email;

    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Find user in the master users array
        const userIndex = users.findIndex(u => u.email === currentUser.email);

        if (userIndex !== -1) {
            // 1. Update master users array
            users[userIndex].name = nameInput.value.trim();
            if (passwordInput.value.trim() !== "") {
                users[userIndex].password = passwordInput.value;
            }

            // 2. Update current session object
            currentUser.name = nameInput.value.trim();

            // 3. Save back to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            msg.textContent = "Profile updated successfully!";
            msg.style.color = "green";

            // Update the icon in the nav immediately
            if (typeof updateProfileIcon === "function") updateProfileIcon();
            
            // Clear password field
            passwordInput.value = "";
        }
    });
});