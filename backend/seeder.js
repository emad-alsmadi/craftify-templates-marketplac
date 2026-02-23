const { Book } = require('./models/Book');
const { Auther } = require('./models/Auther');
const { authers, books } = require('./data');
const { connectToDB } = require('./config/db');
require('dotenv').config();

// Import Books & Authers
const importData = async () => {
  try {
    await connectToDB();
    await Auther.deleteMany({});
    await Book.deleteMany({});
    await Auther.insertMany(authers);
    await Book.insertMany(books);
    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.log('Error', error);
    process.exit(1);
  }
};

// Remove Books & Authers
const removeData = async () => {
  try {
    await connectToDB();
    await Book.deleteMany({});
    await Auther.deleteMany({});
    console.log('Data removed');
    process.exit();
  } catch (error) {
    console.log('Error', error);
    process.exit(1);
  }
};
if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-remove') {
  removeData();
}
