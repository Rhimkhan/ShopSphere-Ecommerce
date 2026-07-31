import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes, FaLock, FaTruck, FaUndo, FaHeadset, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200/80 dark:border-gray-800 transition-colors mt-20">
      {/* Value Proposition Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
              <FaTruck className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Free Express Shipping</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">On all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <FaLock className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Secure Payments</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Encrypted Stripe & COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <FaUndo className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">30-Day Money Back</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">No questions asked return</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <FaHeadset className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Live chat & phone support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white">
                <FaBoxes className="text-lg" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white font-sans">
                Shop<span className="text-primary-600 dark:text-primary-400">Sphere</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              ShopSphere is a next-generation full-stack e-commerce application delivering premium product selections, seamless checkout, and real-time order tracking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="p-2 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/products?category=Electronics" className="hover:text-primary-600 transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="hover:text-primary-600 transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=Shoes" className="hover:text-primary-600 transition-colors">Footwear</Link></li>
              <li><Link to="/products?category=Furniture" className="hover:text-primary-600 transition-colors">Furniture</Link></li>
              <li><Link to="/products?category=Beauty" className="hover:text-primary-600 transition-colors">Beauty & Care</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Customer Portal
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/cart" className="hover:text-primary-600 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-600 transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/orders" className="hover:text-primary-600 transition-colors">Order Tracking</Link></li>
              <li><Link to="/compare" className="hover:text-primary-600 transition-colors">Product Comparison</Link></li>
              <li><Link to="/profile" className="hover:text-primary-600 transition-colors">Account Settings</Link></li>
            </ul>
          </div>

          {/* Contact / Demo Account Info */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Demo Credentials
            </h4>
            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface/50 p-3 rounded-xl border border-gray-200/50 dark:border-gray-800">
              <p><strong className="text-gray-700 dark:text-gray-300">Admin:</strong> admin@shopsphere.com</p>
              <p><strong className="text-gray-700 dark:text-gray-300">Pass:</strong> Admin@123456</p>
              <hr className="my-1 border-gray-200 dark:border-gray-800" />
              <p><strong className="text-gray-700 dark:text-gray-300">Customer:</strong> customer@shopsphere.com</p>
              <p><strong className="text-gray-700 dark:text-gray-300">Pass:</strong> Customer@123456</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Built with React, Node.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
