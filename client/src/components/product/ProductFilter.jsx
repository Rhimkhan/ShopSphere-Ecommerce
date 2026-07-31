import React from 'react';
import { FaFilter, FaStar, FaUndo } from 'react-icons/fa';

const categories = [
  'All',
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

const brands = ['All', 'AeroAudio', 'Quantum', 'ProGlide', 'DenimCraft', 'ErgoMax', 'BaristaPro', 'Botanica', 'TechPress'];

const ProductFilter = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FaFilter className="text-primary-600" /> Filter Products
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
        >
          <FaUndo className="text-[10px]" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === (cat === 'All' ? '' : cat)}
                onChange={() => onFilterChange('category', cat === 'All' ? '' : cat)}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
            Max Price: ${filters.maxPrice}
          </h4>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 font-medium mt-1">
          <span>$10</span>
          <span>$1,000+</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-3">
          Brand
        </h4>
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value === 'All' ? '' : e.target.value)}
          className="input-field text-xs py-2"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1">
          {[4, 3, 2].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 cursor-pointer"
            >
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === r}
                onChange={() => onFilterChange('minRating', r)}
                className="text-primary-600"
              />
              <span className="flex items-center gap-1">
                {r} <FaStar className="text-amber-400 text-xs" /> & Up
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
