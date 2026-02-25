const asyncHandler = require('express-async-handler');
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require('../models/Book');

/**
 * Get all books with filtering, sorting and pagination.
 *
 * Supported query params:
 * - q: search term in title/description
 * - minPrice/maxPrice: price range
 * - author: author id
 * - page/limit: pagination
 * - sort: comma-separated fields, prefix with '-' for desc
 *
 * @route GET /api/books
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON containing data and meta
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const {
    q,
    minPrice,
    maxPrice,
    author,
    page = 1,
    limit = 3,
    sort = 'createdAt',
  } = req.query;

  // Build query
  const query = {};
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (author) {
    query.author = author;
  }
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  // Build sort
  const sortObj = {};
  sort.split(',').forEach((field) => {
    const direction = field.startsWith('-') ? -1 : 1;
    const fieldName = field.replace(/^-/, '');
    sortObj[fieldName] = direction;
  });

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));
  const skip = (pageNum - 1) * limitNum;

  const [books, total] = await Promise.all([
    Book.find(query)
      .populate('author', ['name', 'country', 'bio'])
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Book.countDocuments(query),
  ]);

  const pages = Math.ceil(total / limitNum);

  res.status(200).json({
    data: books,
    meta: {
      total,
      page: pageNum,
      pages,
      limit: limitNum,
    },
  });
});

/**
 * Get a single book by id.
 *
 * @route GET /api/books/:id
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON book document
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author', [
    'name',
    'country',
    'bio',
  ]);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/**
 * Create a new book.
 *
 * @route POST /api/books
 * @access Private (typically admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON created book document
 */
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

/**
 * Update a book by id.
 *
 * @route PUT /api/books/:id
 * @access Private (typically admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON updated book document
 */
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

/**
 * Delete a book by id.
 *
 * @route DELETE /api/books/:id
 * @access Private (typically admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON confirmation message
 */
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
