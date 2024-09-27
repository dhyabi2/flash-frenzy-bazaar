import React from 'react';
import { useParams } from 'react-router-dom';
import { getFlashSaleItems } from '../utils/flashSaleData';

const ItemDetail = () => {
  const { id } = useParams();
  const items = getFlashSaleItems();
  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <img src={item.image} alt={item.name} className="w-full h-64 object-cover mb-4" />
        <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
        <p className="text-xl font-semibold text-blue-600 mb-4">${item.price.toFixed(2)}</p>
        <p className="mb-4">Detailed description of the product would go here.</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded">Buy Now</button>
      </div>
    </div>
  );
};

export default ItemDetail;