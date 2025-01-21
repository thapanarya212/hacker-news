const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the database connection

class Story extends Model {}

Story.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Story',
});

module.exports = Story;