// server/config/config.js

const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '..', process.env.DATABASE_URL || 'database.sqlite3'),
});

module.exports = sequelize;