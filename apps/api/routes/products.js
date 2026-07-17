const express = require('express');
const router = express.Router();
const { verfiyToken } = require('../middlewares/verfiyToken');
const { checkRolePermission } = require('../middlewares/checkRolePermission');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

router.post(
  '/products',
  verfiyToken,
  checkRolePermission('products:write'),
  createProduct,
);

router.put(
  '/products/:id',
  verfiyToken,
  checkRolePermission('products:write'),
  updateProduct,
);

router.delete(
  '/products/:id',
  verfiyToken,
  checkRolePermission('products:delete'),
  deleteProduct,
);

module.exports = router;
