const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined. Skipping DB connection.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

const UserDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastUpdated: { type: Date, default: Date.now }
});

const UserData = mongoose.models.UserData || mongoose.model('UserData', UserDataSchema);

module.exports = { connectToDatabase, UserData };
