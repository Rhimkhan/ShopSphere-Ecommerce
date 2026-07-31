const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, upload.array('images', 5), createProduct);

router.get('/inventory/low-stock', protect, admin, getLowStockProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, upload.array('images', 5), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
