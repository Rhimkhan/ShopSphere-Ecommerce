import React, { useState } from 'react';
import ProductCard from '../common/ProductCard';
import Skeleton from '../common/Skeleton';

const FeaturedProducts = ({ products = [], loading = false }) => {
  const [activeTab, setActiveTab] = useState('featured');

  const filtered = activeTab === 'featured'
    ? products.filter((p) => p.featured)
    : products.filter((p) => p.trending);

  const displayList = filtered.length > 0 ? filtered : products.slice(0, 8);

  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            Handpicked Collections
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Top rated items curated for supreme quality & style
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'featured'
                ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Featured Picks
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'trending'
                ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Trending Now 🔥
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-80" count={4} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
