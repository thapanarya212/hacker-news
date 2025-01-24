const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Save a story to the database
const saveStory = (story, callback) => {
  const query = 'INSERT INTO stories (title, url) VALUES (?, ?)';
  connection.query(query, [story.title, story.url], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err);
    } else {
      console.log('Story saved successfully:', results);
      callback(null);
    }
  });
};

// Get stories published in the last 5 minutes
const getStoriesLast5Minutes = (callback) => {
  const query = 'SELECT * FROM stories WHERE timestamp >= NOW() - INTERVAL 5 MINUTE';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching stories:', err);
      callback(err, null);
    } else {
      console.log('Fetched stories:', results);
      callback(null, results);
    }
  });
};

module.exports = { saveStory, getStoriesLast5Minutes };