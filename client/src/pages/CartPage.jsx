import React from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { FaShoppingBag, FaArrowRight, FaBookmark } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, savedForLater, moveToCartFromSaved } = useCart();

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            Shopping Cart ({cartItems.length} items)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review your selected items and apply available discount promo codes
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary-600 text-2xl">
              <FaShoppingBag />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Your Cart is Currently Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore thousands of electronics, fashion, and home decor items.
            </p>
            <Link to="/products" className="btn-primary text-xs inline-flex items-center gap-2">
              Start Shopping Now <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Right Summary Panel */}
            <div className="lg:col-span-4">
              <CartSummary />
            </div>
          </div>
        )}

        {/* Saved For Later Section */}
        {savedForLater.length > 0 && (
          <div className="pt-10 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white font-sans flex items-center gap-2">
              <FaBookmark className="text-indigo-500" /> Saved For Later ({savedForLater.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedForLater.map((item) => (
                <div
                  key={item._id}
                  className="p-4 rounded-2xl glass-card flex items-center justify-between border border-gray-200/60 dark:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.images?.[0]} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                      <span className="text-xs font-bold text-primary-600">${item.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => moveToCartFromSaved(item)}
                    className="btn-secondary text-[11px] py-1.5 px-3"
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CartPage;
