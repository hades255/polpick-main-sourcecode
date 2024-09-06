import { useEffect, useState } from "react";

const useCountdown = (targetTimestamp: number) => {
  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000);
    const difference = targetTimestamp - now;

    if (difference > 0) {
      return {
        hours: Math.floor(difference / 3600),
        minutes: Math.floor((difference % 3600) / 60),
        seconds: difference % 60
      };
    } else {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
};

export default useCountdown;
