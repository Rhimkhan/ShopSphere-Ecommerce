const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'Customer') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'shopsphere_secret_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = generateToken;
