const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-tool-directory';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`  MongoDB connection failed: ${err.message}`);
    console.warn('  Continuing with in-memory fallback data (see data/tools.seed.js)');
  }
};

module.exports = connectDB;
