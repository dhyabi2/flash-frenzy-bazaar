import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../utils/productUtils';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft } from 'lucide-react';

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
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-indigo-600 font-bold">{product.price} ريال</p>
              <Link
                to={`/item/${product.id}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                عرض التفاصيل
              </Link>
            </motion.div>
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