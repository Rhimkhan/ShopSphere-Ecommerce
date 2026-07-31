import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaArrowRight, FaShieldAlt, FaStar } from 'react-icons/fa';

const HeroBanner = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-primary-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl mb-12 border border-white/10">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-primary-200"
          >
            <FaStar className="text-amber-400" /> Premium Summer Collection 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-sans"
          >
            Experience the Future of{' '}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-primary-300 bg-clip-text text-transparent">
              Smart Shopping
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed"
          >
            Discover curated electronics, luxury apparel, footwear, and home decor with lightning-fast delivery, 30-day returns, and encrypted checkout.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/products"
              className="btn-primary text-sm px-6 py-3 bg-gradient-to-r from-primary-500 to-indigo-500 hover:from-primary-600 hover:to-indigo-600"
            >
              <FaShoppingBag /> Explore Catalog
            </Link>
            <Link
              to="/products?featured=true"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all flex items-center gap-2"
            >
              Trending Products <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

          {/* Social Proof */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-6">
            <div>
              <div className="text-xl font-bold text-white">50,000+</div>
              <div className="text-[11px] text-gray-400">Happy Customers</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-xl font-bold text-amber-400 flex items-center gap-1">
                4.9 <FaStar className="text-xs" />
              </div>
              <div className="text-[11px] text-gray-400">Verified Product Reviews</div>
            </div>
          </div>
        </div>

        {/* Right Floating Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Hero Showcase"
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Flash Sale • 20% OFF</span>
              <h3 className="text-lg font-bold text-white">AeroPulse Wireless ANC Headphones</h3>
              <p className="text-xs text-gray-300 font-medium mt-1">$249.99 <span className="line-through text-gray-400">$289.99</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
