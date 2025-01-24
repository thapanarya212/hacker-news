const { Builder, By } = require('selenium-webdriver');
const cheerio = require('cheerio');
const EventEmitter = require('events');
const db = require('./database');
const cron = require('cron');

class Scraper extends EventEmitter {
  constructor() {
    super();
    this.driver = new Builder().forBrowser('chrome').build();
  }

  async scrape() {
    try {
      console.log('Scraping Hacker News...');
      await this.driver.get('https://news.ycombinator.com/');
      const html = await this.driver.getPageSource();
      const $ = cheerio.load(html);

      const stories = [];
      $('tr.athing').each((i, element) => {
        const title = $(element).find('.titleline > a').text().trim();
        const url = $(element).find('.titleline > a').attr('href');
        if (title && url) {
          stories.push({ title, url });
        }
      });

      console.log(`Found ${stories.length} stories.`);

      // Save stories to the database and emit new stories
      for (const story of stories) {
        db.saveStory(story, (err) => {
          if (err) {
            console.error('Error saving story to database:', err);
          } else {
            console.log('Story saved:', story);
            this.emit('new_story', story);
          }
        });
      }
    } catch (error) {
      console.error('Scraping error:', error);
    }
  }

  startScraping() {
    console.log('Starting periodic scraping...');
    // Scrape every 5 minutes
    const job = new cron.CronJob('*/5 * * * *', () => {
      this.scrape();
    });
    job.start();
  }
}

module.exports = new Scraper();