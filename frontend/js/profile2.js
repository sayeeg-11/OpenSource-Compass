const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        msg.textContent = "Updating...";
        msg.style.color = "var(--text-mid)";

        try {
            const response = await fetch(`${API_URL}/auth/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    password: password || undefined
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Update current session object in localStorage
                const updatedUser = { ...currentUser, name: data.user.name };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                msg.textContent = "Profile updated successfully! ✨";
                msg.style.color = "#27ae60";

                // Update the UI via auth.js if available
                if (typeof checkAuthStatus === "function") await checkAuthStatus();

                // Clear password field
                passwordInput.value = "";
            } else {
                msg.textContent = data.message || "Failed to update profile";
                msg.style.color = "#c53030";
            }
        } catch (error) {
            console.error('Update profile error:', error);
            msg.textContent = "Server error. Please try again later.";
            msg.style.color = "#c53030";
        }
    });
});