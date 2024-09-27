import { format, addDays } from 'date-fns';

const categories = [
  { en: 'Bags', ar: 'حقائب' },
  { en: 'Abayas', ar: 'عبايات' },
  { en: 'Dresses', ar: 'فساتين' },
  { en: 'Shoes', ar: 'أحذية' },
  { en: 'Accessories', ar: 'إكسسوارات' },
  { en: 'Jewelry', ar: 'مجوهرات' },
  { en: 'Cosmetics', ar: 'مستحضرات تجميل' }
];

export const getFlashSaleSchedule = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);
    const category = categories[index % categories.length];
    return {
      date: format(date, 'EEEE'),
      category: category.en,
      categoryAr: category.ar,
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