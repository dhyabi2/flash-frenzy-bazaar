import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentFlashSale } from '../utils/flashSaleData';
import { addProduct } from '../utils/api';
import { toast } from 'sonner';
import ProductUploadForm from '../components/ProductUploadForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UploadManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();
  const currentSale = getCurrentFlashSale();

  const handleSubmit = async (formData) => {
    const productData = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'productImage') {
        productData.append('image', value);
      } else {
        productData.append(key, value);
      }
    }

    try {
      await addProduct(productData);
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
        <ProductUploadForm onSubmit={handleSubmit} currentSale={currentSale} />
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