import { useEffect, useState } from "react";

const step = 10;

export default function ProgressBar({
  maxValue,
  onTimeUp,
  ...rest
}) {
  const [value, setValue] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    if(!timeUp) return;
    onTimeUp();
  }, [timeUp]);

  useEffect(() => {
    setValue(0);
    setTimeUp(false);
    const timer = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + step;
        if (newValue > 0 && newValue < maxValue) return newValue;
        clearInterval(timer);
        setTimeUp(true);
        return maxValue;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeUp, maxValue]);

  return <progress value={value} max={maxValue} {...rest} />;
}
