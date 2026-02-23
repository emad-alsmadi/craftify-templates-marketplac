const asyncHandler = require('express-async-handler');
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require('../models/Book');

const getAllBooks = asyncHandler(async (req, res) => {
  const bookList = await Book.find();
  res.status(200).json(bookList);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

const createBook = asyncHandler(async (req, res) => {
  const error = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author || '',
    description: req.body.description || '',
    price: req.body.price || 0,
    cover: req.body.cover || '',
  });
  const result = await book.save();
  res.status(201).json(result);
});

const updateBook = asyncHandler(async (req, res) => {
  const error = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    },
    { new: true },
  );
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (book) {
    res.status(200).json({ message: 'book has been deleted' });
  } else {
    res.status(404).json({ message: 'book not found' });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
