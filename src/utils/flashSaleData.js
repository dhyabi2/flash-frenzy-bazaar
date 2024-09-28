import { format, addDays, differenceInSeconds, startOfDay, addHours } from 'date-fns';
import { ar } from 'date-fns/locale';

const categories = [
  { en: 'Bags', ar: 'حقائب' },
  { en: 'Abayas', ar: 'عبايات' },
  { en: 'Dresses', ar: 'فساتين' },
  { en: 'Shoes', ar: 'أحذية' },
  { en: 'Accessories', ar: 'إكسسوارات' },
  { en: 'Jewelry', ar: 'مجوهرات' },
  { en: 'Cosmetics', ar: 'مستحضرات تجميل' }
];

const getMuscatTime = () => {
  const now = new Date();
  return addHours(now, 4); // GMT+4
};

export const getFlashSaleSchedule = () => {
  const today = getMuscatTime();
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);
    const category = categories[index % categories.length];
    return {
      date: format(date, 'EEEE', { locale: ar }),
      category: category.ar,
      categoryEn: category.en,
    };
  });
};

export const getCurrentFlashSale = () => {
  const schedule = getFlashSaleSchedule();
  return schedule[0];
};

export const getTimeUntilNextDay = () => {
  const now = getMuscatTime();
  const nextDay = addDays(startOfDay(now), 1);
  return differenceInSeconds(nextDay, now);
};

export const getFlashSaleItems = () => {
  return [
    { id: 1, name: 'حقيبة يد جلدية', price: 129.99, image: '/placeholder.svg' },
    { id: 2, name: 'حقيبة ظهر قماشية', price: 79.99, image: '/placeholder.svg' },
    { id: 3, name: 'حقيبة كتف', price: 89.99, image: '/placeholder.svg' },
    { id: 4, name: 'حقيبة سفر', price: 149.99, image: '/placeholder.svg' },
  ];
};