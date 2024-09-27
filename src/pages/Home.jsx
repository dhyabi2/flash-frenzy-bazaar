import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFlashSale, getFlashSaleSchedule, getFlashSaleItems } from '../utils/flashSaleData';

const TopBanner = () => {
  const currentSale = getCurrentFlashSale();
  return (
    <div className="bg-blue-600 text-white p-4 text-center">
      <h1 className="text-2xl font-bold">Today's Flash Sale: {currentSale.category}</h1>
      {/* TODO: Implement countdown timer */}
    </div>
  );
};

const CategoryNavigation = () => {
  const schedule = getFlashSaleSchedule();
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
      {schedule.map((day, index) => (
        <Link
          key={day.date}
          to={index === 0 ? '/' : '#'}
          className={`inline-block px-4 py-2 mr-2 rounded ${
            index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {day.date}: {day.category}
        </Link>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded shadow">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
    <h3 className="font-bold">{product.name}</h3>
    <p className="text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</p>
    <Link to={`/item/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
      View Details
    </Link>
  </div>
);

const FlashSaleSection = () => {
  const items = getFlashSaleItems();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
      <CategoryNavigation />
      <FlashSaleSection />
    </div>
  );
};

export default Home;