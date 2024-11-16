// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config'); // Sequelize instance
const app = express();
const PORT = process.env.PORT || 5001;
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

// Routes
const storyRoutes = require('./routes/story');
app.use('/api/stories', storyRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// **Synchronize database schema**
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(errorHandler);

module.exports = app; // Export app for testing purposes