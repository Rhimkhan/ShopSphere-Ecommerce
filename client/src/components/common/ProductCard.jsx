import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Rating from './Rating';
import Badge from './Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product._id);
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Badges & Wishlist Heart */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          {product.discount > 0 && (
            <Badge variant="danger" size="sm">
              -{product.discount}% OFF
            </Badge>
          )}
          {product.stock <= 0 && (
            <Badge variant="secondary" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="pointer-events-auto p-2.5 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-500 shadow-md transition-all active:scale-90"
        >
          {wishlisted ? (
            <FaHeart className="text-rose-500 text-sm" />
          ) : (
            <FaRegHeart className="text-sm" />
          )}
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/products/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900/50">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link to={`/products/${product._id}`}>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-0.5">
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          {/* Rating */}
          <Rating value={product.rating || 0} numReviews={product.numReviews} />

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock <= 0}
              className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
