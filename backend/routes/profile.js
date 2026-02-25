const express = require('express');
const router = express.Router();

const { verfiyToken } = require('../middlewares/verfiyToken');
const { User } = require('../models/User');
/**
 * @desc Get current user profile
 * @route /api/auth/profile
 * @method Get
 * @access private
 */
router.get('/auth/profile', verfiyToken, (req, res) => {
  const userId = req.user?.id ?? req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Token is not valid!' });
  }

  User.findById(userId)
    .select('-password')
    .lean()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }
      res.status(200).json({
        user,
        permissions: req.userPermissions || [],
      });
    })
    .catch(() => {
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;
