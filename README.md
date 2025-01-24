FrontPage Backend Intern Assignment
Overview
This project is a Node.js service that scrapes real-time stories from Hacker News, streams updates to clients via WebSocket, and stores the data in a MySQL database. The service is designed to be scalable, modular, and easy to extend.

Technologies Used
Node.js: Runtime environment for the backend service.

Express.js: Framework for handling HTTP requests and routing.

WebSocket: For real-time communication with clients.

MySQL: Database for storing scraped stories.

Selenium: For scraping dynamic content from Hacker News.

Cheerio: For parsing HTML and extracting story details.

Cron: For scheduling periodic scraping tasks.

XAMPP: For running the MySQL database locally.

Features
Scraping Hacker News:

Periodically scrapes the Hacker News homepage (https://news.ycombinator.com/) to fetch the latest stories.

Uses Selenium to handle dynamic content and Cheerio to parse HTML.

Real-Time Updates:

Broadcasts new stories to all connected clients via WebSocket.

Sends the number of stories published in the last 5 minutes on initial connection.

Database Integration:

Stores scraped stories in a MySQL database for persistence and management.

Uses a stories table to store story details (title, URL, and timestamp).

REST API:

Provides an endpoint to fetch all stories stored in the database.

Setup Instructions
Prerequisites
Node.js: Install Node.js from here.

XAMPP: Install XAMPP from here.

ChromeDriver: Download ChromeDriver from here.

Git: Install Git from here.

