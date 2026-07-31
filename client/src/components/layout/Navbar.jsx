import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../common/SearchBar';
import MobileMenu from './MobileMenu';

import {
  FaShoppingCart,
  FaHeart,
  FaSun,
  FaMoon,
  FaUser,
  FaBoxes,
  FaSignOutAlt,
  FaBars,
  FaBalanceScale,
  FaShieldAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <FaBoxes className="text-xl" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-primary-700 to-indigo-600 dark:from-white dark:via-primary-400 dark:to-indigo-400 bg-clip-text text-transparent font-sans">
              Shop<span className="text-primary-600 dark:text-primary-400">Sphere</span>
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Shop
            </Link>
            <Link to="/compare" className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <FaBalanceScale className="text-xs" /> Compare
            </Link>
            {user && !isAdmin && (
              <Link to="/orders" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold"
              >
                <FaShieldAlt className="text-xs" /> Admin Portal
              </Link>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <FaSun className="text-amber-400 text-lg" /> : <FaMoon className="text-indigo-600 text-lg" />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              title="Wishlist"
            >
              <FaHeart className="text-lg hover:text-rose-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              title="Shopping Cart"
            >
              <FaShoppingCart className="text-lg hover:text-primary-600 transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[11px] font-bold flex items-center justify-center shadow-glow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Account Menu */}
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-gray-800 dark:text-gray-200 max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-gray-200 dark:border-gray-800">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-300">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {isAdmin ? (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-600 rounded-xl transition-colors"
                        >
                          <FaShieldAlt className="text-primary-600" /> Admin Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-xl transition-colors"
                        >
                          <FaUser className="text-gray-400" /> My Profile
                        </Link>
                      )}

                      {!isAdmin && (
                        <Link
                          to="/orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-xl transition-colors"
                        >
                          <FaBoxes className="text-gray-400" /> Order History
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors mt-1"
                      >
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-xs py-2 px-3 sm:px-4">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-xs py-2 px-3 sm:px-4 hidden sm:flex">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
