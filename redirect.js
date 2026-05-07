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
    
    // 1. Get the current path and force it to lowercase to avoid case issues
    const path = window.location.pathname.toLowerCase();

    // DEBUG: This will show you exactly what Vercel sees in your browser console (F12)
    console.log("Current Path is:", path);
    console.log("User Logged In:", !!currentUser);

    // 2. Define the page types
    // This covers "/" (home), "index", "index.html", "login", "login.html", etc.
    const isHomePage = (path === '/' || path.includes('index'));
    const isAuthPage = (path.includes('login') || path.includes('registration'));
    const isProtectedRoute = (isHomePage || path.includes('completedtasks'));

    // 3. Logic
    if (currentUser) {
        // If logged in, don't let them see login/register pages
        if (isAuthPage) {
            window.location.href = '/index.html';
        }
    } else {
        // If NOT logged in, and they are on a protected page OR the home root
        if (isProtectedRoute) {
            window.location.href = '/login.html';
        }
    }
}