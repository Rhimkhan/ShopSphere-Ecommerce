const Product = require('../models/Product');
const { uploadImageToCloudinary } = require('../config/cloudinary');

// @desc    Fetch all products with Search, Filter, Sort, Pagination
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.page) || 1;

    // Search query
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { tags: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    // Filter rules
    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {};
    const featured = req.query.featured === 'true' ? { featured: true } : {};
    const trending = req.query.trending === 'true' ? { trending: true } : {};
    
    // Price range
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 10000;
    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };

    // Rating filter
    const minRating = Number(req.query.minRating) || 0;
    const ratingFilter = { rating: { $gte: minRating } };

    // Stock availability filter
    const inStock = req.query.inStock === 'true' ? { stock: { $gt: 0 } } : {};

    const filterQuery = {
      ...keyword,
      ...category,
      ...brand,
      ...featured,
      ...trending,
      ...priceFilter,
      ...ratingFilter,
      ...inStock,
    };

    // Sort order
    let sort = {};
    switch (req.query.sort) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'popular':
        sort = { numReviews: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'newest':
      default:
        sort = { createdAt: -1 };
        break;
    }

    const count = await Product.countDocuments(filterQuery);
    const products = await Product.find(filterQuery)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadImageToCloudinary(file.buffer, file.mimetype));
      images = await Promise.all(uploadPromises);
    } else if (req.body.images && Array.isArray(req.body.images)) {
      images = req.body.images;
    } else {
      images = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];
    }

    let specs = [];
    if (typeof req.body.specifications === 'string') {
      try {
        specs = JSON.parse(req.body.specifications);
      } catch (e) {
        specs = [];
      }
    } else if (Array.isArray(req.body.specifications)) {
      specs = req.body.specifications;
    }

    const sku = req.body.sku || `SKU-${Date.now()}`;

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      price: Number(req.body.price),
      discount: Number(req.body.discount) || 0,
      stock: Number(req.body.stock) || 0,
      sku,
      images,
      specifications: specs,
      weight: req.body.weight || '0.5 kg',
      dimensions: req.body.dimensions || '10 x 10 x 5 cm',
      tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',')) : [],
      featured: req.body.featured === 'true' || req.body.featured === true,
      trending: req.body.trending === 'true' || req.body.trending === true,
      status: req.body.status || 'Active',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.discount = req.body.discount !== undefined ? Number(req.body.discount) : product.discount;
    product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
    product.sku = req.body.sku || product.sku;
    product.weight = req.body.weight || product.weight;
    product.dimensions = req.body.dimensions || product.dimensions;
    product.status = req.body.status || product.status;
    product.featured = req.body.featured !== undefined ? req.body.featured === 'true' || req.body.featured === true : product.featured;
    product.trending = req.body.trending !== undefined ? req.body.trending === 'true' || req.body.trending === true : product.trending;

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadImageToCloudinary(file.buffer, file.mimetype));
      const newImages = await Promise.all(uploadPromises);
      product.images = newImages;
    } else if (req.body.images && Array.isArray(req.body.images)) {
      product.images = req.body.images;
    }

    if (req.body.specifications) {
      if (typeof req.body.specifications === 'string') {
        try {
          product.specifications = JSON.parse(req.body.specifications);
        } catch (e) {}
      } else {
        product.specifications = req.body.specifications;
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock products for inventory alerts
// @route   GET /api/products/inventory/low-stock
const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
};
