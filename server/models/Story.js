// server/models/Story.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Story = sequelize.define('Story', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theme: DataTypes.STRING,
    genre: DataTypes.STRING,
    setting: DataTypes.STRING,
    pov: DataTypes.STRING,
    tone: DataTypes.STRING,
    audience: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Change to false if using authentication
    },
});

module.exports = Story;