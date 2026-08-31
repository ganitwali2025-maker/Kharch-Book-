const { connectToDatabase, UserData } = require('./db');
const cors = require('cors');

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function handler(req, res) {
  await connectToDatabase();
  
  // In a real app, you would get userId from JWT authentication.
  // For this prototype, we'll use a hardcoded or header-provided ID.
  const userId = req.headers['x-user-id'] || 'demo-user';

  if (req.method === 'GET') {
    if (!process.env.DATABASE_URL) {
      return res.status(200).json({ status: 'no_db', data: null });
    }
    const doc = await UserData.findOne({ userId });
    return res.status(200).json(doc ? doc.data : null);
  }

  if (req.method === 'POST') {
    if (!process.env.DATABASE_URL) {
      return res.status(200).json({ status: 'simulated_save' });
    }
    const { data } = req.body;
    await UserData.findOneAndUpdate(
      { userId },
      { data, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json({ status: 'success' });
  }

  res.status(405).send('Method Not Allowed');
}

module.exports = allowCors(handler);
