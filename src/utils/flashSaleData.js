import { format, addDays, differenceInSeconds, startOfDay, addHours, setHours, setMinutes, setSeconds } from 'date-fns';
import { ar } from 'date-fns/locale';

const categories = [
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' },
  { en: 'Dresses for Rent', ar: 'فساتين للايجار' }
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
  const midnight = setHours(setMinutes(setSeconds(now, 0), 0), 0);
  const nextDay = addDays(midnight, 1);
  return differenceInSeconds(nextDay, now);
};

export const getFlashSaleItems = () => {
  return [
    { id: 1, name: 'فستان سهرة أحمر', price: 129.99, image: '/placeholder.svg', category: 'فساتين للايجار' },
    { id: 2, name: 'فستان زفاف أبيض', price: 199.99, image: '/placeholder.svg', category: 'فساتين للايجار' },
    { id: 3, name: 'فستان حفلة أزرق', price: 89.99, image: '/placeholder.svg', category: 'فساتين للايجار' },
    { id: 4, name: 'فستان سهرة أسود', price: 149.99, image: '/placeholder.svg', category: 'فساتين للايجار' },
  ];
};