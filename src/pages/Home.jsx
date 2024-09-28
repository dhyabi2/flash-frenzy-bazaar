import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleItems, getFlashSaleSchedule } from '../utils/flashSaleData';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Phone, Share2, Bookmark } from 'lucide-react';
import { shareProduct, toggleBookmark } from '../utils/productUtils';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        let newSeconds = prevTime.seconds - 1;
        let newMinutes = prevTime.minutes;
        let newHours = prevTime.hours;
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center space-x-2 text-6xl font-bold text-red-600" style={{ direction: 'ltr' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`hours-${timeLeft.hours}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.hours)}
        </motion.span>
      </AnimatePresence>
      <span className="text-4xl">:</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`minutes-${timeLeft.minutes}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.minutes)}
        </motion.span>
      </AnimatePresence>
      <span className="text-4xl">:</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`seconds-${timeLeft.seconds}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.seconds)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

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

const ProductCard = ({ product }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl"
  >
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
    <h3 className="font-bold text-lg mb-2 text-right">{product.name}</h3>
    <p className="text-2xl font-semibold text-red-600 mb-4 text-right">{product.price.toFixed(2)} ريال</p>
    <div className="flex justify-between items-center mb-4">
      <a href={`tel:${product.phoneNumber}`} className="text-red-800 hover:text-red-600 transition-colors duration-300">
        <Phone size={24} className="transform hover:scale-110" />
      </a>
      <button onClick={() => shareProduct(product)} className="text-red-800 hover:text-red-600 transition-colors duration-300">
        <Share2 size={24} className="transform hover:scale-110" />
      </button>
      <button onClick={() => toggleBookmark(product)} className="text-red-800 hover:text-red-600 transition-colors duration-300">
        <Bookmark size={24} className="transform hover:scale-110" />
      </button>
    </div>
    <Link
      to={`/item/${product.id}`}
      className="block w-full bg-red-600 text-white text-center px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
    >
      عرض التفاصيل
    </Link>
  </motion.div>
);

const FlashSaleSection = () => {
  const items = getFlashSaleItems();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-red-50">
      <TopBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryNavigation />
        <h2 className="text-2xl font-bold mb-4 text-right text-red-800">منتجات اليوم</h2>
        <FlashSaleSection />
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