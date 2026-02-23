const express = require('express');
const router = express.Router();
const { verfiyToken } = require('../middlewares/verfiyToken');
const { checkRolePermission } = require('../middlewares/checkRolePermission');

const { registerUser, loginUser } = require('../controllers/auth.controller');

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method Post
 * @access public
 */
router.post('/auth/register', registerUser);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method Post
 * @access public
 */
router.post('/auth/login', loginUser);

/**
 * @desc Get current user profile
 * @route /api/auth/profile
 * @method Get
 * @access private
 */
router.get('/auth/profile', verfiyToken, (req, res) => {
  res.status(200).json({
    user: req.user,
    permissions: req.userPermissions || [],
  });
});

module.exports = router;
