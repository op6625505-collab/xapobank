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

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Fallback - serve dashboard.html for any not-found routes (SPA behavior)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});
