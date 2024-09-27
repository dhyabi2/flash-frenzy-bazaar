import React, { useState } from 'react';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';

const UploadManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const currentSale = getCurrentFlashSale();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { productName, productDescription, productPrice, productImage });
    // Reset form after submission
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6">Upload Product for Today's Flash Sale</h1>
          <p className="mb-6 text-lg text-gray-700">Category: <span className="font-semibold">{currentSale.category}</span></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                Description
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                Price
              </label>
              <input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="productImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="productImage" name="productImage" type="file" className="sr-only" onChange={(e) => setProductImage(e.target.files[0])} required />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Upload className="mr-2" />
              Upload Product
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadManagement;