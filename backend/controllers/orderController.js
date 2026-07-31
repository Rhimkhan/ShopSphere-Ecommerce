const Order = require('../models/Order');
const Product = require('../models/Product');
const generateInvoicePDF = require('../utils/generateInvoice');

// @desc    Create new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items in cart' });
    }

    const order = new Order({
      user: req.user._id,
      products: orderItems.map((item) => ({
        product: item.product || item._id,
        name: item.name,
        image: item.image || (item.images && item.images[0]),
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'Stripe' || paymentMethod === 'Credit Card' ? 'Completed' : 'Pending',
      isPaid: paymentMethod === 'Stripe' || paymentMethod === 'Credit Card',
      paidAt: paymentMethod === 'Stripe' || paymentMethod === 'Credit Card' ? Date.now() : null,
      orderStatus: 'Pending',
      itemsPrice: Number(itemsPrice) || 0,
      taxPrice: Number(taxPrice) || 0,
      shippingPrice: Number(shippingPrice) || 0,
      discountPrice: Number(discountPrice) || 0,
      totalPrice: Number(totalPrice) || 0,
      trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    const createdOrder = await order.save();

    // Deduct stock for ordered products
    for (const item of orderItems) {
      const prodId = item.product || item._id;
      await Product.findByIdAndUpdate(prodId, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify permission (Owner or Admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status || order.orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (status === 'Cancelled' || status === 'Refunded') {
      order.paymentStatus = status === 'Refunded' ? 'Refunded' : 'Pending';
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download PDF Invoice
// @route   GET /api/orders/:id/invoice
const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${order._id}.pdf`);

    generateInvoicePDF(order, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
  downloadInvoice,
};
