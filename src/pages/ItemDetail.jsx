import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Bookmark, Share2, Heart, Phone } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-elegant-light to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
              >
                <img
                  src={getImageUrl()}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-right text-deal-dark">{item.name}</h1>
                <p className="text-3xl font-semibold text-deal mb-6 text-right">{formattedPrice} ريال</p>
                <p className="text-elegant-dark mb-6 text-right text-lg leading-relaxed">{item.description}</p>
              </div>
              <div className="space-y-6">
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
                    <Heart className={`mr-2 ${likes > 0 ? 'fill-current text-deal' : ''}`} />
                    {likes}
                  </motion.button>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${item.phoneNumber}`}
                  className="w-full bg-deal text-white px-6 py-4 rounded-full hover:bg-deal-dark transition-colors duration-300 flex items-center justify-center text-xl font-semibold"
                >
                  <Phone className="ml-2" size={24} />
                  اتصل الآن
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetail;