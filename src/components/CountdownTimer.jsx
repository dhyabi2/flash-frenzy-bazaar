import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Function to calculate time until midnight in Oman (UTC+4)
const getTimeUntilNextDay = () => {
  const now = new Date();

  // Get current time in milliseconds and adjust for UTC+4 (Oman timezone)
  const currentUTCOffset = now.getTimezoneOffset() * 60000; // in milliseconds
  const omanTimeOffset = 4 * 60 * 60000; // UTC+4 in milliseconds
  const omanNow = new Date(now.getTime() + currentUTCOffset + omanTimeOffset);

  // Set the next day to midnight (00:00 AM) of the next day in Oman time
  const nextDay = new Date(omanNow);
  nextDay.setHours(24, 0, 0, 0); // Set to 24:00:00.000 for next midnight

  // Calculate the remaining time in seconds
  return Math.floor((nextDay - omanNow) / 1000);
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextDay());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeUntilNextDay();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        window.location.reload(); // Refresh the page at 00:00 AM
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center space-x-2 text-6xl font-bold text-red-600" style={{ direction: 'ltr' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`hours-${hours}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(hours)}
        </motion.span>
      </AnimatePresence>
      <span className="text-4xl">:</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`minutes-${minutes}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(minutes)}
        </motion.span>
      </AnimatePresence>
      <span className="text-4xl">:</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`seconds-${seconds}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(seconds)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default CountdownTimer;
