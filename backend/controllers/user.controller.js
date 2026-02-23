const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {
  User,
  validateUpdateUser,
} = require('../models/User');

/**
 * Get all users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

/**
 * Get user by ID
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * Update user
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const update = {};
  if (req.body.email !== undefined) update.email = req.body.email;
  if (req.body.username !== undefined) update.username = req.body.username;
  if (req.body.roles !== undefined) update.roles = req.body.roles;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: update },
    { new: true }
  ).select('-password');

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User is Updated', updatedUser });
});

/**
 * Delete user
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).json({ message: 'User has been deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
