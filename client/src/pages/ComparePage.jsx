import React, { useState, useEffect } from 'react';
import CustomerLayout from '../components/layout/CustomerLayout';
import productService from '../services/productService';
import Rating from '../components/common/Rating';
import { useCart } from '../context/CartContext';
import { FaBalanceScale, FaShoppingCart, FaTimes } from 'react-icons/fa';

const ComparePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    productService
      .getProducts({ pageSize: 30 })
      .then((data) => {
        const prods = data.products || [];
        setAllProducts(prods);
        if (prods.length >= 2) {
          setSelectedIds([prods[0]._id, prods[1]._id]);
        }
      })
      .catch(() => {});
  }, []);

  const selectedProducts = allProducts.filter((p) => selectedIds.includes(p._id));

  const addProductToCompare = (id) => {
    if (!id || selectedIds.includes(id)) return;
    if (selectedIds.length >= 4) return;
    setSelectedIds((prev) => [...prev, id]);
  };

  const removeProduct = (id) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans flex items-center gap-2">
            <FaBalanceScale className="text-indigo-500" /> Side-by-Side Product Comparison
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Compare prices, specifications, ratings, and stock status across products
          </p>
        </div>

        {/* Product selector dropdown */}
        {selectedIds.length < 4 && (
          <div className="flex items-center gap-3 p-4 rounded-2xl glass-card border border-gray-200/60 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Add Product to Compare:
            </span>
            <select
              onChange={(e) => addProductToCompare(e.target.value)}
              className="input-field text-xs py-2 max-w-xs"
            >
              <option value="">Choose product...</option>
              {allProducts
                .filter((p) => !selectedIds.includes(p._id))
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} (${p.price})
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Comparison Table */}
        {selectedProducts.length === 0 ? (
          <p className="text-xs text-gray-500 italic">Select products above to compare.</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-lg">
            <table className="w-full text-left border-collapse bg-white dark:bg-dark-card">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-surface/50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase w-48">Feature</th>
                  {selectedProducts.map((p) => (
                    <th key={p._id} className="p-4 min-w-[220px]">
                      <div className="relative space-y-2">
                        <button
                          onClick={() => removeProduct(p._id)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                        <img src={p.images?.[0]} alt={p.name} className="w-24 h-24 object-cover rounded-xl mx-auto" />
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 text-center">
                          {p.name}
                        </h4>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Price</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4 font-black text-primary-600 text-sm">
                      ${p.price.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Category</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4 text-gray-600 dark:text-gray-400">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Brand</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4 text-gray-600 dark:text-gray-400">{p.brand}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Rating</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4">
                      <Rating value={p.rating || 0} numReviews={p.numReviews} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Stock Status</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4">
                      <span className={`font-bold ${p.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Action</td>
                  {selectedProducts.map((p) => (
                    <td key={p._id} className="p-4">
                      <button
                        onClick={() => addToCart(p, 1)}
                        disabled={p.stock <= 0}
                        className="btn-primary text-xs py-2 px-4 w-full flex items-center justify-center gap-1.5"
                      >
                        <FaShoppingCart /> Add To Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default ComparePage;
