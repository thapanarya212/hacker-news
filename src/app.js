const express = require('express');
const { scrapeHackerNews, saveStories } = require('./services/scraper');
const { wss, broadcastNewStory } = require('./services/websocket');
const sequelize = require('./database'); // Ensure this is the correct import
const Story = require('./models/story'); // Import the Story model

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Hacker News Scraper API!');
});

// Define a route to get all stories
app.get('/stories', async (req, res) => {
    try {
        const stories = await Story.findAll(); // Assuming you have a Story model
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Define the startScraping function
async function startScraping() {
    const stories = await scrapeHackerNews();
    await saveStories(stories);
    stories.forEach(broadcastNewStory);
}
// src/app.js

async function startScraping() {
    console.log('Starting scraping process...');
    const stories = await scrapeHackerNews();
    console.log(`Scraped ${stories.length} stories.`);
    await saveStories(stories);
    stories.forEach(broadcastNewStory);
}
// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await sequelize.sync(); // Ensure the database is synced
    await startScraping(); // Initial scrape on server start
    setInterval(startScraping, 5 * 60 * 1000); // Set interval for periodic scraping
});