const User = require('../models/User');
const Product = require('../models/Product');
const { uploadImageToCloudinary } = require('../config/cloudinary');

// @desc    Get user profile
// @route   GET /api/user/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile & avatar
// @route   PUT /api/user/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
    user.phone = req.body.phone || user.phone;

    if (req.file) {
      const avatarUrl = await uploadImageToCloudinary(req.file.buffer, req.file.mimetype);
      user.avatar = avatarUrl;
    } else if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone,
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add address
// @route   POST /api/user/addresses
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAddress = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country || 'USA',
      isDefault: req.body.isDefault || user.addresses.length === 0,
    };

    if (newAddress.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete address
// @route   DELETE /api/user/addresses/:id
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== req.params.id);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle wishlist item
// @route   POST /api/user/wishlist/:productId
const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isWishlisted = user.wishlist.includes(productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json(updatedUser.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
};
