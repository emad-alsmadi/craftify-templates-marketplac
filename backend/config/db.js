const mongoose = require('mongoose');

function withDbName(mongoUrl, dbName) {
  if (!mongoUrl) return mongoUrl;
  if (!dbName) return mongoUrl;

  const [base, query] = mongoUrl.split('?');
  const idx = base.lastIndexOf('/');
  if (idx === -1) return mongoUrl;

  const prefix = base.slice(0, idx + 1);
  const currentDb = base.slice(idx + 1);

  // If no db part (ends with '/'), append db name
  const nextBase = currentDb ? `${prefix}${dbName}` : `${base}${dbName}`;
  return query ? `${nextBase}?${query}` : nextBase;
}

// function Connnection To Database
const connectToDB = async () => {
  try {
    const dbName = process.env.DB_NAME || 'template_store';
    const mongoUrl = withDbName(process.env.MONGO_URL, dbName);
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Connection Failed To MongoDB', error);
  }
};

module.exports = {
  connectToDB,
};
