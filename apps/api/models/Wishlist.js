const mongoose = require('mongoose');
const Joi = require('joi');

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'wishlists',
  },
);

// Create unique compound index to prevent duplicate wishlist entries
WishlistSchema.index({ user: 1, template: 1 }, { unique: true });

// Create additional indexes for optimized lookups
WishlistSchema.index({ user: 1 });
WishlistSchema.index({ template: 1 });

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { Wishlist };
