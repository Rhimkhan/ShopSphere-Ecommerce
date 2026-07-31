const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get Admin Dashboard KPI Statistics
// @route   GET /api/admin/dashboard-stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'Customer' });
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    // Calculate total revenue from non-cancelled orders
    const orders = await Order.find({ orderStatus: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const recentOrders = await Order.find({})
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(6);

    const recentCustomers = await User.find({ role: 'Customer' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockAlerts = await Product.find({ stock: { $lte: 5 } }).select('name stock price category sku');

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      recentOrders,
      recentCustomers,
      lowStockAlerts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get monthly sales analytics chart data
// @route   GET /api/admin/sales-analytics
const getSalesAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: { $ne: 'Cancelled' } });

    // Group sales by month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = {};

    monthNames.forEach((m) => {
      monthlyData[m] = { month: m, revenue: 0, orders: 0 };
    });

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const mName = monthNames[date.getMonth()];
      if (monthlyData[mName]) {
        monthlyData[mName].revenue += order.totalPrice || 0;
        monthlyData[mName].orders += 1;
      }
    });

    const chartData = Object.values(monthlyData);
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export orders to CSV
// @route   GET /api/admin/export-orders-csv
const exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');

    let csvContent = 'Order ID,Customer Name,Customer Email,Status,Payment Method,Total Price,Created At\n';

    orders.forEach((o) => {
      const id = o._id;
      const name = `"${o.user ? o.user.name : 'Guest'}"`;
      const email = o.user ? o.user.email : 'N/A';
      const status = o.orderStatus;
      const payment = o.paymentMethod;
      const total = o.totalPrice;
      const date = new Date(o.createdAt).toISOString();
      csvContent += `${id},${name},${email},${status},${payment},${total},${date}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ShopSphere_Orders_Report.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  exportOrdersCSV,
};
