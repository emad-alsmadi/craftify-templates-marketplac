const mongoose = require('mongoose');

// function Connnection To Database
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Connection Failed To MongoDB', error);
  }
};

module.exports = {
  connectToDB,
};
