import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import ProductCard from '../components/common/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import Pagination from '../components/common/Pagination';
import Skeleton from '../components/common/Skeleton';
import productService from '../services/productService';
import { FaThLarge, FaList } from 'react-icons/fa';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    maxPrice: 1000,
    minRating: 0,
    inStock: false,
    sort: 'newest',
  });

  useEffect(() => {
    const keywordFromUrl = searchParams.get('keyword') || '';
    const categoryFromUrl = searchParams.get('category') || '';
    setFilters((prev) => ({
      ...prev,
      keyword: keywordFromUrl,
      category: categoryFromUrl,
    }));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        keyword: filters.keyword,
        category: filters.category,
        brand: filters.brand,
        maxPrice: filters.maxPrice,
        minRating: filters.minRating,
        inStock: filters.inStock,
        sort: filters.sort,
        page,
        pageSize: 12,
      });

      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
      setTotalProducts(data.totalProducts || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      brand: '',
      maxPrice: 1000,
      minRating: 0,
      inStock: false,
      sort: 'newest',
    });
    setSearchParams({});
    setPage(1);
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
              {filters.category ? `${filters.category} Collection` : 'All Products Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing {totalProducts} items available for immediate order
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sorting Dropdown */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="input-field text-xs py-2 w-44"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm' : 'text-gray-400'
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'list' ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm' : 'text-gray-400'
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filter */}
          <div className="lg:col-span-1">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Product Grid / List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-80" count={6} />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 glass-card rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  No Products Found
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Try adjusting your filter choices or search keywords.
                </p>
                <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ProductsPage;
