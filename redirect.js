// redirect.js - Handle redirection flow between pages

// Check authentication and redirect accordingly
function checkAuthAndRedirect() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentUser) {
        // User is logged in
        if (currentPage === 'login.html' || currentPage === 'registration.html' || currentPage === '') {
            // Redirect to dashboard if on login/registration/root page
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is not logged in
        if (currentPage === 'dashboard.html' || currentPage === 'completedTasks.html') {
            // Redirect to login if trying to access protected pages
            window.location.href = 'login.html';
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkAuthAndRedirect);
