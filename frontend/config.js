// Static API configuration for Render static hosting
// Set the backend URL here (override by editing this file or deploying a build step)
window.API_BASE = window.API_BASE || 'https://backend-xapobank-1.onrender.com';

// Remove trailing slash if present
window.API_BASE = String(window.API_BASE).replace(/\/$/, '');

console.log('API Base URL (static):', window.API_BASE);
