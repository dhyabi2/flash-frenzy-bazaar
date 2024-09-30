import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';
import CountdownTimer from '../components/CountdownTimer';

const TopBanner = () => {
  const currentSale = getCurrentFlashSale();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-800 to-red-600 text-white p-6 rounded-b-lg shadow-lg text-right"
    >
      <h1 className="text-3xl font-bold mb-2">اليوم البيع</h1>
      <p className="text-xl">{currentSale.category}</p>
      <div className="mt-4">
        <CountdownTimer />
      </div>
    </motion.div>
  );
};

const FlashSaleSection = ({ products, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

const dummyProducts = [
  { id: 1, name: 'منتج تجريبي 1', price: 99.99, image: '/placeholder.svg', category: 'عام' },
  { id: 2, name: 'منتج تجريبي 2', price: 149.99, image: '/placeholder.svg', category: 'عام' },
  { id: 3, name: 'منتج تجريبي 3', price: 79.99, image: '/placeholder.svg', category: 'عام' },
  { id: 4, name: 'منتج تجريبي 4', price: 199.99, image: '/placeholder.svg', category: 'عام' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const currentSale = getCurrentFlashSale();

  const fetchProductsData = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      const filteredProducts = fetchedProducts.filter(product => product.category === currentSale.category);
      setProducts(filteredProducts.length > 0 ? filteredProducts : dummyProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(dummyProducts);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [currentSale.category]);

  return (
    <div className="min-h-screen bg-red-50">
      <TopBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4 text-right text-red-800">منتجات اليوم</h2>
        {products.length > 0 ? (
          <FlashSaleSection products={products} onUpdate={fetchProductsData} />
        ) : (
          <p className="text-center text-gray-600">لا توجد منتجات متاحة حاليًا.</p>
        )}
        <Link to="/schedule" className="block mt-8 text-red-600 hover:text-red-800 transition-colors duration-300">
          <div className="flex items-center justify-center">
            <ChevronRight size={20} />
            <span className="mr-2">عرض الجدول الكامل</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;