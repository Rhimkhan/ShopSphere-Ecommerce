const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, default: 'FaBoxes' },
    description: { type: String, default: '' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
