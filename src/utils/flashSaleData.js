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
      category: category.ar, // Changed to use Arabic category
      categoryEn: category.en, // Keep English category for reference if needed
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
    { id: 1, name: 'حقيبة يد جلدية', price: 129.99, image: '/placeholder.svg' },
    { id: 2, name: 'حقيبة ظهر قماشية', price: 79.99, image: '/placeholder.svg' },
    { id: 3, name: 'حقيبة كتف', price: 89.99, image: '/placeholder.svg' },
    { id: 4, name: 'حقيبة سفر', price: 149.99, image: '/placeholder.svg' },
  ];
};