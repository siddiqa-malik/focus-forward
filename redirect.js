// // redirect.js - Handle redirection flow between pages

// // Check authentication and redirect accordingly
// function checkAuthAndRedirect() {
//     const currentUser = localStorage.getItem('currentUser');

    
//     let page = window.location.pathname.split('/').pop();
//     if (page === '') page = 'root';
//     if (page === 'index') page = 'index.html';
//     if (page === 'completedTasks') page = 'completedTasks.html';

//     const isAuthRoute = (page === 'login.html' || page === 'registration.html' || page === 'root');
//     const isProtectedRoute = (page === 'index.html' || page === 'completedTasks.html');

//     if (currentUser) {
//         // Logged in: prevent going back to auth pages
//         if (isAuthRoute) {
//             window.location.href = 'index.html';
//         }
//     } else {
//         // Logged out: block protected pages
//         if (isProtectedPage || path === '/') {
//             window.location.href = 'login.html';
//         }
//     }
// }


// // Run on page load
// document.addEventListener('DOMContentLoaded', checkAuthAndRedirect);


function checkAuthAndRedirect() {
    const currentUser = localStorage.getItem('currentUser');
    const path = window.location.pathname;

    // Define your page groups based on URL keywords
    const isAuthPage = path.includes('login') || path.includes('registration') || path === '/';
    const isProtectedPage = path.includes('index') || path.includes('completedTasks');

    if (currentUser) {
        // If logged in and trying to access login/reg or the root/landing
        if (isAuthPage) {
            window.location.href = '/index.html'; 
        }
    } else {
        // If NOT logged in and trying to access protected pages
        // Also check if we are at root "/" - usually you want to force login from there too
        if (isProtectedPage || path === '/') {
            window.location.href = '/login.html';
        }
    }
}