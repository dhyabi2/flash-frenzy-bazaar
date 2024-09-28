import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../utils/productUtils';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft, Phone, Share2 } from 'lucide-react';
import { shareProduct, toggleBookmark } from '../utils/productUtils';

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
        <Bookmark size={24} className="transform hover:scale-110 fill-current" />
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

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await getBookmarks();
      setBookmarks(fetchedBookmarks);
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6">
          <ArrowLeft size={20} className="ml-2" />
          العودة إلى الرئيسية
        </Link>
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-end">
          المنتجات المحفوظة
          <Bookmark className="ml-3" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {bookmarks.length === 0 && (
          <p className="text-center text-gray-600 mt-8">لا توجد منتجات محفوظة حالياً.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;