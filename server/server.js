// server/server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config'); // Sequelize instance
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const storyRoutes = require('./routes/story');
app.use('/api/stories', storyRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app; // Export app for testing purposes