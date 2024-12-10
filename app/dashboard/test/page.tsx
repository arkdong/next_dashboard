'use client';
import React, { useState, useEffect } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get the current date
    const today = new Date();
    // Format the date as a string
    const formattedDate = today.toLocaleDateString('en-EU', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div>
      <h1>Today's Date</h1>
      <p>{currentDate}</p>
    </div>
  );
};

export default CurrentDate;
