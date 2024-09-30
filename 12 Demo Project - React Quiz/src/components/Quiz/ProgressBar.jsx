import { useEffect, useState } from "react";

export default function ProgressBar({
  startValue,
  onTimeUp,
  max,
  step = -10,
  ...passThruProps
}) {
  const [value, setValue] = useState(startValue || max);
  const maxValue = max || startValue;

  useEffect(() => {
    setValue(startValue);
  }, [startValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + step;
        if (newValue <= 0) {
          onTimeUp();
          clearInterval(timer);
        }
        return newValue;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeUp]);

  return <progress value={value} max={maxValue} {...passThruProps} />;
}
