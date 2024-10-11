import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'السعر يجب أن يكون رقمًا موجبًا',
  }),
  phoneNumber: z.string().regex(/^[0-9]{8,}$/, 'رقم الهاتف يجب أن يكون 8 أرقام على الأقل'),
});

const UploadManagement = () => {
  const [productImage, setProductImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const currentSale = getCurrentFlashSale();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    if (!productImage) {
      toast.error('الرجاء تحميل صورة للمنتج');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('category', currentSale.category);
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
    } finally {
      setIsUploading(false);
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
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-right text-red-800">رفع منتج لبيع اليوم</h1>
        <p className="mb-8 text-lg sm:text-xl text-gray-600 text-right">الفئة: <span className="font-semibold text-red-600">{currentSale.category}</span></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productName">
              اسم المنتج
            </label>
            <Input
              id="productName"
              {...register('name')}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
            />
            {errors.name && <p className="text-red-500 text-xs italic text-right mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productPrice">
              السعر
            </label>
            <Input
              id="productPrice"
              {...register('price')}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
            />
            {errors.price && <p className="text-red-500 text-xs italic text-right mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="phoneNumber">
              رقم الهاتف
            </label>
            <Input
              id="phoneNumber"
              {...register('phoneNumber')}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs italic text-right mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productDescription">
              الوصف
            </label>
            <Textarea
              id="productDescription"
              {...register('description')}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-xs italic text-right mt-1">{errors.description.message}</p>}
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
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الرفع...
              </>
            ) : (
              <>
                <Upload className="ml-2" />
                رفع المنتج
              </>
            )}
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