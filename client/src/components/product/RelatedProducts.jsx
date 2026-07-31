import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';

const RelatedProducts = ({ category, currentProductId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (category) {
      productService
        .getProducts({ category, pageSize: 5 })
        .then((res) => {
          const filtered = (res.products || []).filter((p) => p._id !== currentProductId);
          setRelated(filtered.slice(0, 4));
        })
        .catch(() => {});
    }
  }, [category, currentProductId]);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-sans mb-6">
        You May Also Like
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
