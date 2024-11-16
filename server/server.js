// server/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/config');
const storyRoutes = require('./routes/story');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', storyRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


app.use(errorHandler);

module.exports = app; // For testing purposes