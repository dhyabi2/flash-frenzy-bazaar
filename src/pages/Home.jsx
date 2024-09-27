import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleSchedule, getFlashSaleItems } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

const TopBanner = () => {
  const currentSale = getCurrentFlashSale();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-b-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-2">Today's Flash Sale</h1>
      <p className="text-xl">{currentSale.category}</p>
      <div className="flex items-center mt-4">
        <Clock className="mr-2" />
        <span>Ends in 12:34:56</span>
      </div>
    </motion.div>
  );
};

const CategoryNavigation = () => {
  const schedule = getFlashSaleSchedule();
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 bg-gray-100 rounded-lg my-4">
      {schedule.map((day, index) => (
        <Link
          key={day.date}
          to={index === 0 ? '/' : '#'}
          className={`inline-block px-4 py-2 mr-2 rounded-full ${
            index === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
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
    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
    <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
    <Link
      to={`/item/${product.id}`}
      className="block w-full bg-blue-500 text-white text-center px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
    >
      View Details
    </Link>
  </motion.div>
);

const FlashSaleSection = () => {
  const items = getFlashSaleItems();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {items.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <div className="container mx-auto px-4">
        <CategoryNavigation />
        <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
        <FlashSaleSection />
        <Link to="/schedule" className="block mt-8 text-blue-500 hover:text-blue-600 transition-colors duration-300">
          <div className="flex items-center justify-center">
            <span className="mr-2">View Full Schedule</span>
            <ChevronRight size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;