require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {}); // Use the MONGODB_URI environment variable

module.exports = mongoose.connection;
