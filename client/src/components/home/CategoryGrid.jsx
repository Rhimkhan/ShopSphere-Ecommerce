import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLaptop,
  FaTshirt,
  FaBook,
  FaHome,
  FaBasketballBall,
  FaPumpSoap,
  FaAppleAlt,
  FaGlasses,
  FaCouch,
  FaShoePrints,
} from 'react-icons/fa';

const categories = [
  { name: 'Electronics', icon: FaLaptop, count: '1,200+ Products', color: 'from-blue-500 to-indigo-600', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fashion', icon: FaTshirt, count: '3,400+ Apparel', color: 'from-pink-500 to-rose-600', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80' },
  { name: 'Shoes', icon: FaShoePrints, count: '850+ Sneakers', color: 'from-amber-500 to-orange-600', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
  { name: 'Books', icon: FaBook, count: '5,000+ Titles', color: 'from-emerald-500 to-teal-600', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80' },
  { name: 'Home', icon: FaHome, count: '1,100+ Decor', color: 'from-purple-500 to-indigo-600', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sports', icon: FaBasketballBall, count: '750+ Gears', color: 'from-red-500 to-orange-600', img: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80' },
  { name: 'Beauty', icon: FaPumpSoap, count: '920+ Skincare', color: 'from-rose-400 to-pink-500', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Groceries', icon: FaAppleAlt, count: '2,300+ Fresh Items', color: 'from-green-500 to-emerald-600', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Accessories', icon: FaGlasses, count: '1,400+ Jewels', color: 'from-cyan-500 to-blue-600', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
  { name: 'Furniture', icon: FaCouch, count: '450+ Designs', color: 'from-amber-600 to-yellow-600', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80' },
];

const CategoryGrid = () => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse through our curated departments
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
        >
          View All Departments &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.name} whileHover={{ y: -4 }}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative block rounded-2xl overflow-hidden glass-card p-4 text-center border border-gray-200/60 dark:border-gray-800"
              >
                <div className="relative w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 dark:bg-dark-surface flex items-center justify-center text-gray-700 dark:text-gray-200 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-400 font-medium">{cat.count}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
