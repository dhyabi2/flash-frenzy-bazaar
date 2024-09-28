import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../utils/api';
import { toast } from 'sonner';

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('حدث خطأ أثناء جلب المنتجات');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success('تم حذف المنتج بنجاح');
      fetchProductsData(); // Refresh the product list
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف المنتج');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-right">صفحة الإدارة</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="text-lg font-semibold mb-2 text-right">{product.name}</h2>
            <p className="text-gray-600 mb-2 text-right">{product.price.toFixed(2)} ريال</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full"
            >
              حذف المنتج
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;