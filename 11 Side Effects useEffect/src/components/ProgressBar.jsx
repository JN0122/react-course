import { useState, useEffect } from "react";

export default function ProgressBar({
  timerStartValue = 0,
  timerStep,
  ...passThruProps
}) {
  const [remainingTime, setRemainingTime] = useState(timerStartValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime + timerStep);
    }, Math.abs(timerStep));

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} {...passThruProps} />;
}
