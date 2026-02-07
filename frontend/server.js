const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve config.js with backend URL
app.get('/config.js', (req, res) => {
  const backendUrl = process.env.BACKEND_URL || 'https://backend-xapobank-1.onrender.com';
  res.type('application/javascript');
  res.send(`window.API_BASE = '${backendUrl}';`);
});

// Serve static files
app.use(express.static(__dirname));

// SPA fallback - serve index.html for all unknown routes
// Since we don't have an index.html, redirect root to dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Fallback for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
