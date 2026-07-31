import React, { useEffect, useState } from 'react';
import CustomerLayout from '../components/layout/CustomerLayout';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';
import Testimonials from '../components/home/Testimonials';
import productService from '../services/productService';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getProducts({ pageSize: 12 })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <CustomerLayout>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts products={products} loading={loading} />
      <PromoBanner />
      <Testimonials />
    </CustomerLayout>
  );
};

export default HomePage;
