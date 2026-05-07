// redirect.js - Handle redirection flow between pages

// Check authentication and redirect accordingly
function checkAuthAndRedirect() {
    const currentUser = localStorage.getItem('currentUser');

    
    let page = window.location.pathname.split('/').pop();
    if (page === '') page = 'root';
    if (page === 'index') page = 'index.html';
    if (page === 'completedTasks') page = 'completedTasks.html';

    const isAuthRoute = (page === 'login.html' || page === 'registration.html' || page === 'root');
    const isProtectedRoute = (page === 'index.html' || page === 'completedTasks.html');

    if (currentUser) {
        // Logged in: prevent going back to auth pages
        if (isAuthRoute) {
            window.location.href = 'index.html';
        }
    } else {
        // Logged out: block protected pages
        if (isProtectedRoute) {
            window.location.href = 'login.html';
        }
    }
}


// Run on page load
document.addEventListener('DOMContentLoaded', checkAuthAndRedirect);
