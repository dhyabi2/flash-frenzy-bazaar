import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleSchedule } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';
import CountdownTimer from '../components/CountdownTimer';
import { Helmet } from 'react-helmet';

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

const CategoryNavigation = () => {
  const schedule = getFlashSaleSchedule();
  return (
    <nav className="overflow-x-auto whitespace-nowrap p-4 bg-red-50 rounded-lg my-4 shadow-inner">
      {schedule.map((day, index) => (
        <Link
          key={day.date}
          to={index === 0 ? '/' : '#'}
          className={`inline-block px-4 py-2 ml-2 rounded-full ${
            index === 0 ? 'bg-red-600 text-white' : 'bg-white text-red-800 border border-red-300'
          } transition-all duration-300 hover:shadow-md`}
        >
          {day.date}: {day.category}
        </Link>
      ))}
    </nav>
  );
};

const FlashSaleSection = ({ products, onUpdate }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onUpdate={onUpdate} />
      ))}
    </section>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const currentSale = getCurrentFlashSale();

  const fetchProductsData = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      console.log('Fetched products:', fetchedProducts);
      const filteredProducts = fetchedProducts.filter(product => product.category === currentSale.category);
      console.log('Filtered products:', filteredProducts);
      setProducts(filteredProducts.sort((a, b) => (b.likes || 0) - (a.likes || 0)));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [currentSale.category]);

  return (
    <>
      <Helmet>
        <title>سوق كل يوم🇴🇲 - البيع اليومي للمنتجات في عمان</title>
        <meta name="description" content="اكتشف أفضل العروض اليومية على المنتجات في عمان. تسوق الآن واحصل على صفقات حصرية كل يوم!" />
        <link rel="canonical" href="https://www.souqkulyoom.com/" />
      </Helmet>
      <main className="min-h-screen bg-red-50">
        <TopBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryNavigation />
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
      </main>
    </>
  );
};

export default Home;