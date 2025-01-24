const express = require('express');
const db = require('../database');

const router = express.Router();

// GET all stories
router.get('/stories', (req, res) => {
  db.getStoriesLast5Minutes((err, stories) => {
    if (err) {
      console.error('Error fetching stories:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(stories);
  });
});

module.exports = router;