import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaHome, FaShoppingBag, FaHeart, FaBalanceScale, FaUser, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../common/SearchBar';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-dark-card border-l border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-2xl z-10"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white font-sans">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

              <div className="mt-4">
                <SearchBar />
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface font-semibold text-sm text-gray-800 dark:text-gray-200"
                >
                  <FaHome className="text-primary-600" /> Home
                </Link>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface font-semibold text-sm text-gray-800 dark:text-gray-200"
                >
                  <FaShoppingBag className="text-primary-600" /> Shop Catalog
                </Link>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface font-semibold text-sm text-gray-800 dark:text-gray-200"
                >
                  <FaHeart className="text-rose-500" /> Wishlist
                </Link>
                <Link
                  to="/compare"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface font-semibold text-sm text-gray-800 dark:text-gray-200"
                >
                  <FaBalanceScale className="text-indigo-500" /> Compare Products
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm"
                  >
                    <FaShieldAlt /> Admin Dashboard
                  </Link>
                )}

                {user && !isAdmin && (
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface font-semibold text-sm text-gray-800 dark:text-gray-200"
                  >
                    <FaUser className="text-gray-400" /> My Profile
                  </Link>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-sm"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="btn-primary w-full text-center text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="btn-secondary w-full text-center text-sm"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
