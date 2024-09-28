import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleSchedule, getFlashSaleItems } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Phone, Share2, Bookmark } from 'lucide-react';
import { shareProduct, toggleBookmark } from '../utils/productUtils';

const TopBanner = () => {
  const currentSale = getCurrentFlashSale();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-deal-dark to-deal text-white p-6 rounded-b-lg shadow-lg text-right"
    >
      <h1 className="text-3xl font-bold mb-2">كل يوم</h1>
      <p className="text-xl">{currentSale.category}</p>
      <div className="flex items-center mt-4 justify-end">
        <span>ينتهي في 12:34:56</span>
        <Clock className="mr-2" />
      </div>
    </motion.div>
  );
};

const CategoryNavigation = () => {
  const schedule = getFlashSaleSchedule();
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 bg-elegant rounded-lg my-4 shadow-inner">
      {schedule.map((day, index) => (
        <Link
          key={day.date}
          to={index === 0 ? '/' : '#'}
          className={`inline-block px-4 py-2 ml-2 rounded-full ${
            index === 0 ? 'bg-deal text-white' : 'bg-white text-elegant-dark border border-elegant'
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
    <p className="text-2xl font-semibold text-deal-dark mb-4 text-right">{product.price.toFixed(2)} ريال</p>
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => window.location.href = `tel:+1234567890`} className="text-elegant-dark hover:text-deal transition-colors duration-300">
        <Phone size={24} className="transform hover:scale-110" />
      </button>
      <button onClick={() => shareProduct(product)} className="text-elegant-dark hover:text-deal transition-colors duration-300">
        <Share2 size={24} className="transform hover:scale-110" />
      </button>
      <button onClick={() => toggleBookmark(product)} className="text-elegant-dark hover:text-deal transition-colors duration-300">
        <Bookmark size={24} className="transform hover:scale-110" />
      </button>
    </div>
    <Link
      to={`/item/${product.id}`}
      className="block w-full bg-deal text-white text-center px-4 py-2 rounded-full hover:bg-deal-dark transition-colors duration-300"
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
    <div className="min-h-screen bg-elegant-light">
      <TopBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryNavigation />
        <h2 className="text-2xl font-bold mb-4 text-right text-elegant-dark">منتجات اليوم</h2>
        <FlashSaleSection />
        <Link to="/schedule" className="block mt-8 text-deal hover:text-deal-dark transition-colors duration-300">
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