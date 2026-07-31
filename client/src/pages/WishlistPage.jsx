import React from 'react';
import CustomerLayout from '../components/layout/CustomerLayout';
import ProductCard from '../components/common/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans flex items-center gap-2">
            <FaHeart className="text-rose-500 text-2xl" /> Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Keep track of items you want to purchase later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-500 text-2xl">
              <FaHeart />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore products and click the heart icon to save them to your personal wishlist.
            </p>
            <Link to="/products" className="btn-primary text-xs inline-flex items-center gap-2">
              <FaShoppingBag /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item._id || item} product={item._id ? item : { _id: item }} />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default WishlistPage;
