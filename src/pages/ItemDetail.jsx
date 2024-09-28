import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Bookmark, Share2, Heart } from 'lucide-react';
import { fetchProducts, addLike, getLikes } from '../utils/api';
import { shareProduct } from '../utils/productUtils';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        const foundItem = products.find(product => product.id === parseInt(id));
        if (foundItem) {
          setItem(foundItem);
          setIsBookmarked(false); // You might want to fetch the actual bookmark status here
          const likesData = await getLikes(foundItem.id);
          setLikes(likesData.count);
        } else {
          setError('المنتج غير موجود');
        }
      } catch (err) {
        setError('حدث خطأ أثناء جلب بيانات المنتج');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'تمت إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة');
  };

  const handleShare = () => {
    if (item) {
      shareProduct(item);
    }
  };

  const handleLike = async () => {
    if (item) {
      try {
        await addLike(item.id);
        setLikes(prevLikes => prevLikes + 1);
        toast.success('تم الإعجاب بالمنتج');
      } catch (error) {
        console.error('Error adding like:', error);
        toast.error('حدث خطأ أثناء الإعجاب بالمنتج');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-elegant-light">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-elegant-dark"
        >
          جاري التحميل...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-elegant-light">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-deal-dark">{error}</h1>
          <Link to="/" className="text-deal hover:text-deal-dark transition-colors">
            العودة إلى الصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const formattedPrice = typeof item.price === 'number' 
    ? item.price.toFixed(2) 
    : parseFloat(item.price || 0).toFixed(2);

  const getImageUrl = () => {
    if (item.image.startsWith('blob:')) {
      return '/placeholder.svg';
    } else if (item.image.startsWith('http')) {
      return item.image;
    } else {
      return `https://kul-yoom.replit.app${item.image}`;
    }
  };

  return (
    <div className="min-h-screen bg-elegant-light p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center text-deal hover:text-deal-dark transition-colors mb-6">
          <ArrowLeft size={20} className="ml-2" />
          العودة إلى البيع الفلاشي
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={getImageUrl()}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4 text-right text-deal-dark">{item.name}</h1>
                <p className="text-3xl font-semibold text-deal mb-6 text-right">{formattedPrice} ريال</p>
                <p className="text-elegant-dark mb-6 text-right text-lg">{item.description}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookmark}
                    className="flex items-center text-elegant-dark hover:text-deal transition-colors duration-300"
                  >
                    <Bookmark className={`mr-2 ${isBookmarked ? 'fill-current text-deal' : ''}`} />
                    {isBookmarked ? 'تمت الإضافة للمفضلة' : 'إضافة للمفضلة'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center text-elegant-dark hover:text-deal transition-colors duration-300"
                  >
                    <Share2 className="mr-2" />
                    مشاركة
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className="flex items-center text-elegant-dark hover:text-deal transition-colors duration-300"
                  >
                    <Heart className="mr-2" />
                    {likes}
                  </motion.button>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${item.phoneNumber}`}
                  className="w-full bg-deal text-white px-6 py-4 rounded-full hover:bg-deal-dark transition-colors duration-300 flex items-center justify-center text-xl font-semibold"
                >
                  <ShoppingCart className="ml-2" size={24} />
                  اتصل الآن
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetail;