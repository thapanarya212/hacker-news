// src/services/scraper.js

const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/story'); // Import your Story model

async function scrapeHackerNews() {
    try {
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.storylink').each((index, element) => {
            const title = $(element).text();
            const url = $(element).attr('href');
            stories.push({ title, url });
        });

        return stories;
    } catch (error) {
        console.error('Error scraping Hacker News:', error);
        return [];
    }
}

async function saveStories(stories) {
    for (const story of stories) {
        await Story.findOrCreate({
            where: { title: story.title },
            defaults: { url: story.url }
        });
    }
}

module.exports = { scrapeHackerNews, saveStories };