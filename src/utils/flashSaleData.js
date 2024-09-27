import { format, addDays } from 'date-fns';

const categories = [
  'Bags', 'Abayas', 'Dresses', 'Shoes', 'Accessories', 'Jewelry', 'Cosmetics'
];

export const getFlashSaleSchedule = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);
    return {
      date: format(date, 'EEEE'),
      category: categories[index % categories.length],
    };
  });
};

export const getCurrentFlashSale = () => {
  const schedule = getFlashSaleSchedule();
  return schedule[0];
};

export const getFlashSaleItems = () => {
  // This is a mock function. In a real application, you would fetch this data from an API.
  return [
    { id: 1, name: 'Leather Tote Bag', price: 129.99, image: '/placeholder.svg' },
    { id: 2, name: 'Canvas Backpack', price: 79.99, image: '/placeholder.svg' },
    { id: 3, name: 'Crossbody Purse', price: 89.99, image: '/placeholder.svg' },
    { id: 4, name: 'Weekender Duffel', price: 149.99, image: '/placeholder.svg' },
  ];
};