import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFlashSaleItems } from '../utils/flashSaleData';
import { toggleBookmark, shareProduct } from '../utils/productUtils';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Bookmark, Share2 } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const items = getFlashSaleItems();
  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">المنتج غير موجود</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    toggleBookmark(item);
  };

  const handleShare = () => {
    shareProduct(item);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6">
          <ArrowLeft size={20} className="ml-2" />
          العودة إلى البيع الفلاشي
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover mb-6 rounded-lg"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-4 text-right">{item.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-6 text-right">{item.price.toFixed(2)} ريال</p>
            <p className="text-gray-700 mb-6 text-right">
              وصف المنتج يظهر هنا. يمكن إضافة تفاصيل إضافية حول المنتج في هذا المكان.
            </p>
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleBookmark} className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300">
                <Bookmark className="mr-2" />
                حفظ
              </button>
              <button onClick={handleShare} className="flex items-center text-gray-600 hover:text-green-500 transition-colors duration-300">
                <Share2 className="mr-2" />
                مشاركة
              </button>
            </div>
            <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
              <ShoppingCart className="ml-2" />
              شراء الآن
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;