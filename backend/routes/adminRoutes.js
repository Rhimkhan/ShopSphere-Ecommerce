const express = require('express');
const {
  getDashboardStats,
  getSalesAnalytics,
  exportOrdersCSV,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard-stats', protect, admin, getDashboardStats);
router.get('/sales-analytics', protect, admin, getSalesAnalytics);
router.get('/export-orders-csv', protect, admin, exportOrdersCSV);

module.exports = router;
