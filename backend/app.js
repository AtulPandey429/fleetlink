const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 
// API Routes (centralized)
app.use('/api', routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
