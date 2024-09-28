import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleSchedule, getSecondsUntilNextMidnight } from '../utils/flashSaleData';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/indexedDB';

const CountdownTimer = ({ onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilNextMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimerEnd();
          return getSecondsUntilNextMidnight();
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimerEnd]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 text-6xl font-bold text-red-600" style={{ direction: 'ltr' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`time-${timeLeft}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const TopBanner = ({ onTimerEnd }) => {
  const [currentSale, setCurrentSale] = useState(getCurrentFlashSale());

  useEffect(() => {
    setCurrentSale(getCurrentFlashSale());
  }, []);

  const handleTimerEnd = () => {
    setCurrentSale(getCurrentFlashSale());
    onTimerEnd();
  };

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
        <CountdownTimer onTimerEnd={handleTimerEnd} />
      </div>
    </motion.div>
  );
};

const CategoryNavigation = () => {
  const schedule = getFlashSaleSchedule();
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 bg-red-50 rounded-lg my-4 shadow-inner">
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
    </div>
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

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts.sort((a, b) => (b.likes || 0) - (a.likes || 0)));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTimerEnd = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-red-50">
      <TopBanner onTimerEnd={handleTimerEnd} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryNavigation />
        <h2 className="text-2xl font-bold mb-4 text-right text-red-800">منتجات اليوم</h2>
        <FlashSaleSection products={products} onUpdate={fetchProducts} />
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