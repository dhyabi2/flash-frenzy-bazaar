import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';

const ImageUpload = ({ productImage, setProductImage }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const triggerFileInput = (e) => {
    e.preventDefault(); // Prevent default behavior
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
              capture="environment"
            />
          </label>
          <p className="pr-1">أو اسحب وأفلت</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
      </div>
    </div>
  );
};

export default ImageUpload;