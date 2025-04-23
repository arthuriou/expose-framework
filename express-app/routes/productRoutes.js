const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes pour les produits
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router; 