const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  adminLogin,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  validate,
  registerUser
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validate,
  loginUser
);

router.post(
  '/admin/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validate,
  adminLogin
);

router.post(
  '/forgot-password',
  [body('email', 'Please include a valid email').isEmail()],
  validate,
  forgotPassword
);

router.post(
  '/reset-password',
  [
    body('token', 'Token is required').notEmpty(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  validate,
  resetPassword
);

module.exports = router;
