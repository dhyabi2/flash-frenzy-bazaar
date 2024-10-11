import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Share2, Bookmark, Heart } from 'lucide-react';
import { shareProduct } from '../utils/productUtils';
import { addLike, getLikes, addBookmark, removeBookmark } from '../utils/api';
import { toast } from 'sonner';

const ProductCard = ({ product, onUpdate }) => {
  const [likes, setLikes] = useState(product.likes || 0);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { count } = await getLikes(product.id);
        setLikes(count);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();

    // Check if the product is bookmarked
    // This would require a new API endpoint, for now we'll assume it's not bookmarked
    setIsBookmarkedState(false);
  }, [product.id]);

  const handleLike = async () => {
    try {
      await addLike(product.id);
      setLikes(prevLikes => prevLikes + 1);
      if (onUpdate) onUpdate();
      toast.success('تم الإعجاب بالمنتج');
    } catch (error) {
      console.error('Error adding like:', error);
      toast.error('حدث خطأ أثناء الإعجاب بالمنتج');
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarkedState) {
        await removeBookmark(product.id);
        toast.success('تمت إزالة المنتج من المفضلة');
      } else {
        await addBookmark(product);
        toast.success('تمت إضافة المنتج إلى المفضلة');
      }
      setIsBookmarkedState(!isBookmarkedState);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('حدث خطأ أثناء تحديث المفضلة');
    }
  };

  const handleShare = () => {
    shareProduct(product);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (!product.image) {
      return '/placeholder.svg';
    }
    if (product.image.startsWith('blob:')) {
      return '/placeholder.svg';
    } else if (product.image.startsWith('http')) {
      return product.image;
    } else {
      return `https://kul-yoom.replit.app${product.image}`;
    }
  };

  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : parseFloat(product.price || 0).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <img 
        src={imageError ? '/placeholder.svg' : getImageUrl()}
        alt={product.name} 
        className="w-full h-48 object-cover mb-4 rounded-md"
        onError={handleImageError}
      />
      <h3 className="font-bold text-lg mb-2 text-right">{product.name}</h3>
      <p className="text-2xl font-semibold text-deal mb-4 text-right">{formattedPrice} ريال</p>
      <div className="flex justify-between items-center mb-4">
        <a href={`tel:${product.phoneNumber}`} className="text-deal-dark hover:text-deal transition-colors duration-300">
          <Phone size={24} className="transform hover:scale-110" />
        </a>
        <button onClick={handleShare} className="text-deal-dark hover:text-deal transition-colors duration-300">
          <Share2 size={24} className="transform hover:scale-110" />
        </button>
        <button onClick={handleBookmark} className="text-deal-dark hover:text-deal transition-colors duration-300">
          <Bookmark size={24} className={`transform hover:scale-110 ${isBookmarkedState ? 'fill-current' : ''}`} />
        </button>
        <button onClick={handleLike} className="text-deal-dark hover:text-deal transition-colors duration-300 flex items-center">
          <Heart size={24} className="transform hover:scale-110 fill-current mr-1" />
          <span>{likes}</span>
        </button>
      </div>
      <Link
        to={`/item/${product.id}`}
        className="block w-full bg-deal text-white text-center px-4 py-2 rounded-full hover:bg-deal-dark transition-colors duration-300"
      >
        عرض التفاصيل
      </Link>
    </div>
  );
};

export default ProductCard;