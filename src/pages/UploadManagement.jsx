import React, { useState, useEffect } from 'react';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload, X, Camera } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct, getProducts } from '../utils/indexedDB';

const UploadManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [products, setProducts] = useState([]);

  const currentSale = getCurrentFlashSale();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      image: productImage ? URL.createObjectURL(productImage) : null,
      category: currentSale.category,
      phoneNumber: phoneNumber,
    };

    try {
      await addProduct(newProduct);
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      
      // Reset form after submission
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage(null);
      setPhoneNumber('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 sm:p-6 md:p-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto mb-16"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-right text-red-800">رفع منتج لبيع اليوم الفلاشي</h1>
        <p className="mb-8 text-lg sm:text-xl text-gray-600 text-right">الفئة: <span className="font-semibold text-red-600">{currentSale.category}</span></p>
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
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
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
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="phoneNumber">
              رقم الهاتف
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productDescription">
              الوصف
            </label>
            <Textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productImage">
              الصورة
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-300 border-dashed rounded-lg hover:border-red-500 transition duration-300">
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
                  <Camera className="mx-auto h-16 w-16 text-red-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="productImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 transition duration-200"
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
            className="w-full bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Upload className="ml-2" />
            رفع المنتج
          </Button>
        </form>
      </motion.div>
      
      {/* Display uploaded products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-right text-red-800">المنتجات المرفوعة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />}
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-red-600 font-bold">{product.price} ريال</p>
              <p className="text-gray-600">رقم الهاتف: {product.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadManagement;