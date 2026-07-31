const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shopsphere_secret_key_2026');

      // Fetch user from db if mongoose is connected, or mock from decoded token
      if (User.db && User.db.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        // Fallback user object from token payload if DB query fails or in-memory
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          role: decoded.role || 'Customer',
          email: decoded.role === 'Admin' ? 'admin@shopsphere.com' : 'customer@shopsphere.com',
          name: decoded.role === 'Admin' ? 'System Admin' : 'Valued Customer',
        };
      }

      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an Admin' });
  }
};

module.exports = { protect, admin };
