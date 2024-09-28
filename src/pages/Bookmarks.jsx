import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../utils/productUtils';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await getBookmarks();
      setBookmarks(fetchedBookmarks);
    };
    fetchBookmarks();
  }, []);

  const handleUpdate = async () => {
    const updatedBookmarks = await getBookmarks();
    setBookmarks(updatedBookmarks);
  };

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
            <ProductCard key={product.id} product={product} onUpdate={handleUpdate} />
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