const express = require('express');
const router = express.Router();
const { verfiyToken } = require('../middlewares/verfiyToken');

const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
  checkWishlist,
} = require('../controllers/wishlist.controller');

// All wishlist routes require authentication
router.post('/wishlist/:templateId', verfiyToken, addToWishlist);
router.delete('/wishlist/:templateId', verfiyToken, removeFromWishlist);
router.get('/wishlist/my', verfiyToken, getMyWishlist);
router.get('/wishlist/check/:templateId', verfiyToken, checkWishlist);

module.exports = router;
