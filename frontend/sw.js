// Service Worker for proxying API calls
let API_BASE = 'https://backend-xapobank-1.onrender.com';

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'setApiBase') {
    API_BASE = event.data.value || API_BASE;
    console.log('Service worker API_BASE updated to:', API_BASE);
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only intercept /api calls
  if (!url.pathname.startsWith('/api/')) {
    return; // Let normal requests through
  }

  // If already an absolute API URL, pass through
  if (url.origin !== self.location.origin) {
    return;
  }

  // Build the backend URL
  const backendUrl = API_BASE.replace(/\/$/, '') + url.pathname + url.search;

  // Create a new request to the backend
  const newRequest = new Request(backendUrl, {
    method: event.request.method,
    headers: event.request.headers,
    body: event.request.body,
    credentials: 'include',
    mode: 'cors'
  });

  // Proxy the request to the backend
  event.respondWith(
    fetch(newRequest)
      .then(response => {
        // Clone response so it can be read multiple times
        return response.clone();
      })
      .catch(err => {
        console.error('Service worker fetch error:', err);
        // Return error response
        return new Response(JSON.stringify({ error: 'Network error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      })
  );
});

self.addEventListener('install', () => {
  console.log('Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service worker activated');
  self.clients.claim();
});
