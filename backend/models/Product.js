const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, required: true, unique: true },
    images: [{ type: String }],
    specifications: [specSchema],
    weight: { type: String, default: '0.5 kg' },
    dimensions: { type: String, default: '10 x 10 x 5 cm' },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Draft', 'Out of Stock'], default: 'Active' },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
