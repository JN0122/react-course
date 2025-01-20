import { useEffect, useState } from "react";

export default function CustomProgressBar({
  maxValue,
  onTimeUp,
  step,
  ...rest
}) {
  const [value, setValue] = useState(step > 0 ? 0 : maxValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + step;
        if (newValue > 0 && newValue < maxValue) return newValue;
        onTimeUp();
        clearInterval(timer);
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeUp]);

  return <progress value={value} max={maxValue} {...rest} />;
}
