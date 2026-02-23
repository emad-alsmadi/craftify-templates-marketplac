const express = require('express');
const router = express.Router();
const { verfiyToken } = require('../middlewares/verfiyToken');
const { checkRolePermission } = require('../middlewares/checkRolePermission');

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book.controller');

/**
 * @desc Get all books
 * @route /api/books
 * @method Get
 * @access public
 */
router.get('/books', getAllBooks);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method Get
 * @access public
 */
router.get('/books/:id', getBookById);

/**
 * @desc Create new book
 * @route /api/books
 * @method Post
 * @access private (requires books:write permission)
 */
router.post(
  '/books',
  verfiyToken,
  checkRolePermission('books:write'),
  createBook,
);

/**
 * @desc Update book
 * @route /api/books/:id
 * @method Put
 * @access private (requires books:write permission)
 */
router.put(
  '/books/:id',
  verfiyToken,
  checkRolePermission('books:write'),
  updateBook,
);

/**
 * @desc Delete book
 * @route /api/books/:id
 * @method Delete
 * @access private (requires books:delete permission)
 */
router.delete(
  '/books/:id',
  verfiyToken,
  checkRolePermission('books:delete'),
  deleteBook,
);

module.exports = router;
