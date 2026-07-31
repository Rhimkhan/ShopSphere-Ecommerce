const Coupon = require('../models/Coupon');

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new coupon (Admin)
// @route   POST /api/coupons
const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expirationDate, minPurchaseAmount } = req.body;

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountPercentage,
      expirationDate: new Date(expirationDate),
      minPurchaseAmount: minPurchaseAmount || 0,
    });

    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Validate coupon code (Customer)
// @route   POST /api/coupons/validate
const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    if (new Date(coupon.expirationDate) < new Date()) {
      return res.status(400).json({ message: 'Coupon code has expired' });
    }

    if (cartTotal && cartTotal < coupon.minPurchaseAmount) {
      return res.status(400).json({
        message: `Minimum order amount of $${coupon.minPurchaseAmount} required for this coupon`,
      });
    }

    res.json({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      message: `Coupon applied! ${coupon.discountPercentage}% discount granted.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    await Coupon.deleteOne({ _id: req.params.id });
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  validateCoupon,
  deleteCoupon,
};
