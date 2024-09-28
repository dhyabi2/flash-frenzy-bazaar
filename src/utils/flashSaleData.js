import { format, addDays, setHours, setMinutes, setSeconds, differenceInSeconds } from 'date-fns';
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

const getGMT4Date = () => {
  const now = new Date();
  return new Date(now.getTime() + (4 * 60 * 60 * 1000)); // Add 4 hours for GMT+4
};

export const getFlashSaleSchedule = () => {
  const today = getGMT4Date();
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

export const getNextMidnight = () => {
  const now = getGMT4Date();
  return setSeconds(setMinutes(setHours(addDays(now, 1), 0), 0), 0);
};

export const getSecondsUntilNextMidnight = () => {
  const now = getGMT4Date();
  const nextMidnight = getNextMidnight();
  return differenceInSeconds(nextMidnight, now);
};

export const getFlashSaleItems = () => {
  return [
    { id: 1, name: 'حقيبة يد جلدية', price: 129.99, image: '/placeholder.svg' },
    { id: 2, name: 'حقيبة ظهر قماشية', price: 79.99, image: '/placeholder.svg' },
    { id: 3, name: 'حقيبة كتف', price: 89.99, image: '/placeholder.svg' },
    { id: 4, name: 'حقيبة سفر', price: 149.99, image: '/placeholder.svg' },
  ];
};