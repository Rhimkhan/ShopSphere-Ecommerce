import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import productService from '../../services/productService';

const SearchBar = ({ placeholder = 'Search 10,000+ items...' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 1) {
        try {
          const res = await productService.getProducts({ keyword: query, pageSize: 5 });
          setSuggestions(res.products || []);
          setIsOpen(true);
        } catch (error) {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (productId) => {
    navigate(`/products/${productId}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-2.5 rounded-full bg-gray-100 dark:bg-dark-surface/90 border border-gray-200 dark:border-gray-700/80 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-card outline-none transition-all"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </form>

      {/* Live Search Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-gray-200 dark:border-gray-800">
          <p className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Matching Products
          </p>
          {suggestions.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelectSuggestion(item._id)}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface cursor-pointer transition-colors"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {item.category} • <span className="font-bold text-primary-600">${item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
