import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import ImageZoom from '../components/product/ImageZoom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import ReviewList from '../components/product/ReviewList';
import ReviewForm from '../components/product/ReviewForm';
import RelatedProducts from '../components/product/RelatedProducts';
import Skeleton from '../components/common/Skeleton';
import productService from '../services/productService';
import reviewService from '../services/reviewService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaHeart, FaRegHeart, FaTruck, FaShieldAlt, FaUndo, FaShareAlt, FaMinus, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
      const revData = await reviewService.getProductReviews(id);
      setReviews(revData || []);
    } catch (error) {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CustomerLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </CustomerLayout>
    );
  }

  if (!product) return null;

  const wishlisted = isWishlisted(product._id);
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <CustomerLayout>
      <div className="space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 font-medium">
          <Link to="/" className="hover:underline">Home</Link> /{' '}
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:underline">
            {product.category}
          </Link>{' '}
          / <span className="text-gray-900 dark:text-white font-bold">{product.name}</span>
        </nav>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Image Magnifier View */}
          <div className="lg:col-span-6">
            <ImageZoom images={product.images} />
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">{product.category}</Badge>
                <span className="text-xs text-gray-400 font-semibold">• Brand: {product.brand}</span>
                <span className="text-xs text-gray-400 font-semibold">• SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <Rating value={product.rating || 0} numReviews={product.numReviews} size="md" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-surface/50 border border-gray-200/60 dark:border-gray-800 flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900 dark:text-white font-sans">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="danger" size="sm">Save {product.discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action buttons */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-card"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-card"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                  className="btn-primary text-xs py-3 px-6 flex-1"
                >
                  <FaShoppingCart /> Add To Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="btn-accent text-xs py-3 px-6 flex-1"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-rose-500"
                >
                  {wishlisted ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
                </button>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaTruck className="text-primary-600" /> Fast Delivery
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-500" /> 1-Yr Warranty
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-amber-500" /> 30-Day Return
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Specifications & Customer Reviews */}
        <div className="pt-8">
          <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Specifications & Info
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Technical Specifications</h3>
              {product.specifications && product.specifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface/50">
                      <span className="font-semibold text-gray-500">{spec.key}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface/50">
                    <span className="font-semibold text-gray-500">Weight</span>
                    <span className="font-bold text-gray-900 dark:text-white">{product.weight}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface/50">
                    <span className="font-semibold text-gray-500">Dimensions</span>
                    <span className="font-bold text-gray-900 dark:text-white">{product.dimensions}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500">Standard manufacturer specifications apply.</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <ReviewForm productId={product._id} onReviewAdded={fetchProductDetails} />
              <ReviewList reviews={reviews} onReviewDeleted={fetchProductDetails} />
            </div>
          )}
        </div>

        {/* Related Products */}
        <RelatedProducts category={product.category} currentProductId={product._id} />
      </div>
    </CustomerLayout>
  );
};

export default ProductDetailPage;
