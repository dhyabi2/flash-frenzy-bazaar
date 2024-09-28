import React from 'react';
import { Link } from 'react-router-dom';
import { getFlashSaleSchedule } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';

const CategorySchedule = () => {
  const schedule = getFlashSaleSchedule();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6">
          <ArrowLeft size={20} className="ml-2" />
          العودة إلى الرئيسية
        </Link>
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-end">
          جدول كل يوم الأسبوعي
          <Calendar className="ml-3" />
        </h1>
        <div className="grid gap-4">
          {schedule.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-white p-6 rounded-lg shadow-md ${
                index === 0 ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h2 className="text-xl font-semibold mb-2 text-right">{day.date}</h2>
              <p className="text-lg text-gray-700 text-right">{day.category}</p>
              {index === 0 && (
                <Link
                  to="/"
                  className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  عرض كل يوم
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySchedule;