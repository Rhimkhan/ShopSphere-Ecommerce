import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaBookmark, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, saveForLaterItem } = useCart();

  const price = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl glass-card border border-gray-200/60 dark:border-gray-800">
      {/* Product info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-2xl bg-gray-100 flex-shrink-0"
        />
        <div className="space-y-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {item.category}
          </span>
          <Link
            to={`/products/${item._id}`}
            className="block text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600"
          >
            {item.name}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </span>
            {item.discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
        {/* Counter */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-card transition-colors"
          >
            <FaMinus className="text-xs" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-card transition-colors"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <span className="text-sm font-extrabold text-gray-900 dark:text-white">
            ${(price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => saveForLaterItem(item)}
            className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="Save for later"
          >
            <FaBookmark className="text-xs" />
          </button>
          <button
            onClick={() => removeFromCart(item._id)}
            className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Remove item"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
