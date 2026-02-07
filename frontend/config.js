// API Configuration
// Set the API base URL - can be overridden by setting window.API_BASE before loading the app
window.API_BASE = window.API_BASE || (function() {
  // Auto-detect environment
  if (typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }
  
  // Production
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return `https://${window.location.hostname}`;
  }
  
  // Development - Default to port 5000
  return 'http://localhost:5000';
})();

// Remove trailing slash if present
window.API_BASE = String(window.API_BASE).replace(/\/$/, '');

console.log('API Base URL:', window.API_BASE);
window.API_BASE = 'https://backend-xapobank-1.onrender.com';
