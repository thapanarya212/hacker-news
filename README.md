# Hacker News Scraper

A Node.js service that scrapes real-time stories from Hacker News, stores them in a MySQL database, and provides real-time updates via WebSocket.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [WebSocket Streaming](#websocket-streaming)
- [Database Initialization](#database-initialization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Periodically scrapes stories from Hacker News.
- Stores scraped stories in a MySQL database.
- Provides a REST API to fetch stories.
- Real-time updates via WebSocket for new stories.

## Technologies Used

- Node.js
- Express
- Sequelize (ORM for MySQL)
- MySQL
- Axios (for HTTP requests)
- Cheerio (for web scraping)
- WebSocket

## Setup Instructions

1. **Clone the Repository**

   ```bash
   
   cd hacker-news