const express = require('express');
const {
  getCoupons,
  createCoupon,
  validateCoupon,
  deleteCoupon,
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(protect, admin, getCoupons)
  .post(protect, admin, createCoupon);

router.post('/validate', protect, validateCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

module.exports = router;
