const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

// Connect to DB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
