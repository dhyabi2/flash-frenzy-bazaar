import React, { useState } from 'react';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload, X, Camera } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const UploadManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const currentSale = getCurrentFlashSale();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('جاري الإرسال:', { productName, productDescription, productPrice, productImage });
    // Reset form after submission
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-right text-indigo-800">رفع منتج لبيع اليوم الفلاشي</h1>
        <p className="mb-8 text-lg sm:text-xl text-gray-600 text-right">الفئة: <span className="font-semibold text-indigo-600">{currentSale.category}</span></p>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productName">
                اسم المنتج
              </label>
              <Input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productPrice">
                السعر
              </label>
              <Input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right transition duration-200"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productDescription">
              الوصف
            </label>
            <Textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right transition duration-200"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productImage">
              الصورة
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition duration-300">
              <div className="space-y-1 text-center">
                {productImage ? (
                  <div className="relative">
                    <img src={URL.createObjectURL(productImage)} alt="Product" className="mx-auto h-48 w-48 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setProductImage(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600 transition duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <Camera className="mx-auto h-16 w-16 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="productImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition duration-200"
                  >
                    <span>رفع ملف</span>
                    <input id="productImage" name="productImage" type="file" className="sr-only" onChange={(e) => setProductImage(e.target.files[0])} required />
                  </label>
                  <p className="pr-1">أو اسحب وأفلت</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Upload className="ml-2" />
            رفع المنتج
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadManagement;