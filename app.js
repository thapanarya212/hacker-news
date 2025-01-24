const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const scraper = require('./scraper');
const db = require('./database');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// REST API Routes
app.use('/api', apiRoutes);

// WebSocket Connection
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send the number of stories published in the last 5 minutes
  db.getStoriesLast5Minutes((err, stories) => {
    if (err) {
      ws.send(JSON.stringify({ type: 'error', message: 'Database error' }));
      return;
    }
    ws.send(JSON.stringify({ type: 'initial', count: stories.length }));
  });

  // Broadcast new stories to all clients
  scraper.on('new_story', (story) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'new_story', story }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  scraper.startScraping(); // Start periodic scraping
});