// src/database.js

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('hacker_news', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Default MySQL port
});

// Test the connection (optional)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the MySQL database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the test connection function (optional)
testConnection();

module.exports = sequelize; // Ensure you are exporting the sequelize instance