import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from './ImageUpload';

const ProductUploadForm = ({ onSubmit, currentSale }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const productImage = watch('productImage');

  const onSubmitWrapper = (data) => {
    if (!data.productImage) {
      alert('Please select an image for the product.');
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productName">
            اسم المنتج
          </label>
          <Input
            id="productName"
            {...register("productName", { required: "Product name is required" })}
            className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
          />
          {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productPrice">
            السعر
          </label>
          <Input
            id="productPrice"
            type="number"
            {...register("productPrice", { required: "Price is required" })}
            className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
          />
          {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="phoneNumber">
          رقم الهاتف
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", { required: "Phone number is required" })}
          className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productDescription">
          الوصف
        </label>
        <Textarea
          id="productDescription"
          {...register("productDescription", { required: "Description is required" })}
          className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition duration-200"
          rows="4"
        />
        {errors.productDescription && <p className="text-red-500 text-xs italic">{errors.productDescription.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="productImage">
          الصورة
        </label>
        <ImageUpload
          productImage={productImage}
          setProductImage={(file) => setValue('productImage', file)}
        />
        {errors.productImage && <p className="text-red-500 text-xs italic">{errors.productImage.message}</p>}
      </div>
      <input type="hidden" {...register("category")} value={currentSale.category} />
      <Button
        type="submit"
        className="w-full bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
      >
        رفع المنتج
      </Button>
    </form>
  );
};

export default ProductUploadForm;