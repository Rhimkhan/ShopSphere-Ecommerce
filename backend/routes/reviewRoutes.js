const express = require('express');
const {
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProductReview);
router.get('/product/:productId', getProductReviews);
router.delete('/:id', protect, deleteReview);

module.exports = router;
