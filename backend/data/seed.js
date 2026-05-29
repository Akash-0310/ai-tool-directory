require('dotenv').config();
const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const tools = require('./tools.seed');

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-tool-directory'
    );
    await Tool.deleteMany({});
    await Tool.insertMany(tools);
    console.log(`  Seeded ${tools.length} tools.`);
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
