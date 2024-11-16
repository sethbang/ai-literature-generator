// server/models/Story.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    theme: DataTypes.STRING,
    genre: DataTypes.STRING,
    setting: DataTypes.STRING,
    pov: DataTypes.STRING,
    tone: DataTypes.STRING,
    audience: DataTypes.STRING,
    characterProfiles: DataTypes.TEXT,
    plotPoints: DataTypes.TEXT,
    outline: DataTypes.TEXT,
    generatedText: DataTypes.TEXT,
    editedText: DataTypes.TEXT, // New field for the edited draft
});

module.exports = Story;