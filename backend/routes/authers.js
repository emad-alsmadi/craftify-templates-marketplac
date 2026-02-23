const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { verfiyToken } = require('../middlewares/verfiyToken');
const { checkRolePermission } = require('../middlewares/checkRolePermission');
const {
  getAllAuthers,
  getAutherById,
  createAuther,
  updateAuther,
  deleteAuther,
} = require('../controllers/author.controller');

/**
 * @desc Get all authers
 * @route /api/authers
 * @method Get
 * @access public
 */
router.get('/authers', getAllAuthers);

/**
 * @desc Get single auther by id
 * @route /api/authers/:id
 * @method Get
 * @access public
 */
router.get('/authers/:id', getAutherById);

/**
 * @desc Create new auther
 * @route /api/authers
 * @method Post
 * @access private (requires authers:write permission)
 */
router.post(
  '/authers',
  verfiyToken,
  checkRolePermission('authers:write'),
  createAuther,
);

/**
 * @desc Update auther
 * @route /api/authers/:id
 * @method Put
 * @access private (requires authers:write permission)
 */
router.put(
  '/authers/:id',
  verfiyToken,
  checkRolePermission('authers:write'),
  updateAuther,
);

/**
 * @desc Delete auther
 * @route /api/authers/:id
 * @method Delete
 * @access private (requires authers:delete permission)
 */
router.delete(
  '/authers/:id',
  verfiyToken,
  checkRolePermission('authers:delete'),
  deleteAuther,
);

module.exports = router;
