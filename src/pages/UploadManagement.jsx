import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
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
import ImageUpload from '../components/ImageUpload';

const UploadManagement = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const currentSale = getCurrentFlashSale();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productImage) {
      toast.error('الرجاء تحميل صورة للمنتج');
      return;
    }
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('category', currentSale.category);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', productImage);

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
              الصورة (مطلوبة)
            </label>
            <ImageUpload productImage={productImage} setProductImage={setProductImage} />
            {!productImage && <p className="text-red-500 text-sm mt-1 text-right">الرجاء تحميل صورة للمنتج</p>}
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