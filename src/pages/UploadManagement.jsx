import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload, Camera, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct } from '../utils/api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UploadManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const currentSale = getCurrentFlashSale();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('category', currentSale.category);
    formData.append('phoneNumber', phoneNumber);
    if (productImage) {
      formData.append('image', productImage);
    }

    try {
      await addProduct(formData);
      setDialogMessage('تم رفع المنتج بنجاح');
      setIsError(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error adding product:', error);
      setDialogMessage('حدث خطأ أثناء رفع المنتج. يرجى المحاولة مرة أخرى.');
      setIsError(true);
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (!isError) {
      navigate('/');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-right text-red-800">رفع منتج لبيع اليوم</h1>
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
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-300 border-dashed rounded-lg hover:border-red-500 transition duration-300 cursor-pointer"
              onClick={triggerFileInput}
            >
              <div className="space-y-1 text-center">
                {productImage ? (
                  <div className="relative">
                    <img src={URL.createObjectURL(productImage)} alt="Product" className="mx-auto h-48 w-48 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProductImage(null);
                      }}
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
                    <input 
                      id="productImage" 
                      name="productImage" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      accept="image/*"
                    />
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isError ? 'خطأ' : 'تم بنجاح'}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDialogClose}>موافق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadManagement;