// script.js

// Example of adding dynamic functionality using JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Example: Add event listener to a button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission
            logout(); // Call logout function when the button is clicked
        });
    }
});

// Example function to handle logout
function logout() {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redirect to login page after logout
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
        // Handle error
    });
}
