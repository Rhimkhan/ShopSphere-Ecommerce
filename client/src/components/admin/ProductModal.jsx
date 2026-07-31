import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import productService from '../../services/productService';
import toast from 'react-hot-toast';

const categories = [
  'Electronics',
  'Fashion',
  'Shoes',
  'Books',
  'Home',
  'Sports',
  'Beauty',
  'Groceries',
  'Accessories',
  'Furniture',
];

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    brand: '',
    price: '',
    discount: '0',
    stock: '',
    sku: '',
    weight: '0.5 kg',
    dimensions: '10 x 10 x 5 cm',
    featured: false,
    trending: false,
    status: 'Active',
    imageUrl: '',
  });

  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || 'Electronics',
        brand: product.brand || '',
        price: product.price || '',
        discount: product.discount || 0,
        stock: product.stock || 0,
        sku: product.sku || '',
        weight: product.weight || '0.5 kg',
        dimensions: product.dimensions || '10 x 10 x 5 cm',
        featured: product.featured || false,
        trending: product.trending || false,
        status: product.status || 'Active',
        imageUrl: product.images?.[0] || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Electronics',
        brand: '',
        price: '',
        discount: '0',
        stock: '',
        sku: `SKU-${Date.now().toString().slice(-6)}`,
        weight: '0.5 kg',
        dimensions: '10 x 10 x 5 cm',
        featured: false,
        trending: false,
        status: 'Active',
        imageUrl: '',
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'imageUrl') {
          data.append(key, formData[key]);
        }
      });

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          data.append('images', files[i]);
        }
      } else if (formData.imageUrl) {
        data.append('images', formData.imageUrl);
      }

      if (product) {
        await productService.updateProduct(product._id, data);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(data);
        toast.success('New product created!');
      }

      onSave();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to save product';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product Details' : 'Create New Product'}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="e.g. AeroPulse Noise-Canceling Headphones"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field text-xs py-2"
              required
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Brand Name *
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="e.g. Sony, Nike, Apple"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Price ($ USD) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="199.99"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Discount (% OFF)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="15"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Stock Quantity *
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              SKU Identifier *
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="input-field text-xs py-2 uppercase"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Product Description *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="Comprehensive product features, materials, and warranty information..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Image URL (Direct link)
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="input-field text-xs py-2"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Or Upload Local Files
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 dark:file:bg-primary-950 dark:file:text-primary-300"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded text-primary-600"
            />
            Featured Product
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.trending}
              onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
              className="rounded text-primary-600"
            />
            Trending Now 🔥
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary text-xs py-2.5">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary text-xs py-2.5">
            {submitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
