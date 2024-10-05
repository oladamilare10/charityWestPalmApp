import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className='text-sm font-semibold text-gray-600 text-center'>
      {timeLeft.days > 0 && <span>{timeLeft.days} days </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours} hours </span>}
      {timeLeft.minutes > 0 && <span>{timeLeft.minutes} minutes </span>}
      <span>{timeLeft.seconds} seconds</span>
    </div>
  );
}

export default CountdownTimer;