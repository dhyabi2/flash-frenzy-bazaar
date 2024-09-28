import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Share2, Bookmark, Heart } from 'lucide-react';
import { shareProduct, toggleBookmark } from '../utils/productUtils';
import { addLike, getLikes } from '../utils/indexedDB';
import { getUserIP } from '../utils/ipUtils';

const ProductCard = ({ product, onUpdate }) => {
  const [likes, setLikes] = useState(product.likes || 0);

  useEffect(() => {
    const fetchLikes = async () => {
      const likeCount = await getLikes(product.id);
      setLikes(likeCount);
    };
    fetchLikes();
  }, [product.id]);

  const handleLike = async () => {
    const ip = await getUserIP();
    if (ip) {
      const liked = await addLike(product.id, ip);
      if (liked) {
        setLikes(prevLikes => prevLikes + 1);
        if (onUpdate) onUpdate();
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 className="font-bold text-lg mb-2 text-right">{product.name}</h3>
      <p className="text-2xl font-semibold text-red-600 mb-4 text-right">{product.price.toFixed(2)} ريال</p>
      <div className="flex justify-between items-center mb-4">
        <a href={`tel:${product.phoneNumber}`} className="text-red-800 hover:text-red-600 transition-colors duration-300">
          <Phone size={24} className="transform hover:scale-110" />
        </a>
        <button onClick={() => shareProduct(product)} className="text-red-800 hover:text-red-600 transition-colors duration-300">
          <Share2 size={24} className="transform hover:scale-110" />
        </button>
        <button onClick={() => toggleBookmark(product)} className="text-red-800 hover:text-red-600 transition-colors duration-300">
          <Bookmark size={24} className="transform hover:scale-110 fill-current" />
        </button>
        <button onClick={handleLike} className="text-red-800 hover:text-red-600 transition-colors duration-300 flex items-center">
          <Heart size={24} className="transform hover:scale-110 fill-current mr-1" />
          <span>{likes}</span>
        </button>
      </div>
      <Link
        to={`/item/${product.id}`}
        className="block w-full bg-red-600 text-white text-center px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
      >
        عرض التفاصيل
      </Link>
    </div>
  );
};

export default ProductCard;