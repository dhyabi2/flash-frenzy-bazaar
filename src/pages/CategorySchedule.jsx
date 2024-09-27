import React from 'react';
import { Link } from 'react-router-dom';
import { getFlashSaleSchedule } from '../utils/flashSaleData';

const CategorySchedule = () => {
  const schedule = getFlashSaleSchedule();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Flash Sale Schedule</h1>
      <div className="grid gap-4">
        {schedule.map((day, index) => (
          <div key={day.date} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{day.date}</h2>
            <p>{day.category}</p>
            {index === 0 && (
              <Link to="/" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                View Today's Sale
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySchedule;