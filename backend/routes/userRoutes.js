const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('avatar'), updateUserProfile);

router.post('/addresses', protect, addAddress);
router.delete('/addresses/:id', protect, deleteAddress);
router.post('/wishlist/:productId', protect, toggleWishlist);

module.exports = router;
