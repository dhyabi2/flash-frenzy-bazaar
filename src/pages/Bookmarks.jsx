import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBookmarks } from '../utils/api';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarksData();
  }, []);

  const fetchBookmarksData = async () => {
    try {
      const fetchedBookmarks = await fetchBookmarks();
      setBookmarks(fetchedBookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  return (
    <div className="min-h-screen bg-elegant-light">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-deal-dark hover:text-deal mb-6">
          <ArrowLeft size={20} className="ml-2" />
          العودة إلى الرئيسية
        </Link>
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-end text-deal-dark">
          المنتجات المحفوظة
          <Bookmark className="ml-3" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((product) => (
            <ProductCard key={product.id} product={product} onUpdate={fetchBookmarksData} />
          ))}
        </div>
        {bookmarks.length === 0 && (
          <p className="text-center text-elegant-dark mt-8">لا توجد منتجات محفوظة حالياً.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;