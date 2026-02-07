const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve config.js with backend URL
app.get('/config.js', (req, res) => {
  const backendUrl = process.env.BACKEND_URL || 'https://backend-xapobank-1.onrender.com';
  res.type('application/javascript');
  res.send(`window.API_BASE = '${backendUrl}';`);
});

// Root path - serve dashboard.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Fallback for any other routes - serve dashboard.html (SPA-like behavior)
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  // Check if the requested path is a file that exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.sendFile(filePath);
  } else {
    // If not a file, serve dashboard.html
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});
