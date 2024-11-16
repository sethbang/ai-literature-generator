// server/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'An internal server error occurred.' });
}

module.exports = errorHandler;