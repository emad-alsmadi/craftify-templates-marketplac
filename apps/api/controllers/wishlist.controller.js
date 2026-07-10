const asyncHandler = require('express-async-handler');
const { Wishlist } = require('../models/Wishlist');
const { Template } = require('../models/Template');

/**
 * Add a template to the authenticated user's wishlist.
 *
 * @route POST /api/wishlist/:templateId
 * @access Private
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON confirmation message
 */
const addToWishlist = asyncHandler(async (req, res) => {
  const { templateId } = req.params;
  const userId = req.user.id;

  // Verify template exists
  const template = await Template.findById(templateId);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  // Check if already in wishlist (duplicate prevention)
  const existingWishlist = await Wishlist.findOne({
    user: userId,
    template: templateId,
  });

  if (existingWishlist) {
    return res.status(400).json({ message: 'Template already in wishlist' });
  }

  // Create wishlist item
  const wishlist = new Wishlist({
    user: userId,
    template: templateId,
  });

  await wishlist.save();

  res.status(201).json({ message: 'Template added to wishlist' });
});

/**
 * Remove a template from the authenticated user's wishlist.
 *
 * @route DELETE /api/wishlist/:templateId
 * @access Private
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON confirmation message
 */
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { templateId } = req.params;
  const userId = req.user.id;

  // Find and delete wishlist item
  const wishlist = await Wishlist.findOneAndDelete({
    user: userId,
    template: templateId,
  });

  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist item not found' });
  }

  res.status(200).json({ message: 'Template removed from wishlist' });
});

/**
 * Get the authenticated user's wishlist.
 *
 * @route GET /api/wishlist/my
 * @access Private
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON array of wishlist items with populated template data
 */
const getMyWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const wishlist = await Wishlist.find({ user: userId })
    .populate('template')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(wishlist);
});

/**
 * Check if a template is in the authenticated user's wishlist.
 *
 * @route GET /api/wishlist/check/:templateId
 * @access Private
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON with isWishlisted boolean
 */
const checkWishlist = asyncHandler(async (req, res) => {
  const { templateId } = req.params;
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({
    user: userId,
    template: templateId,
  });

  res.status(200).json({ isWishlisted: !!wishlist });
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
  checkWishlist,
};
