import { useEffect, useState, forwardRef } from "react";

export default forwardRef(function ProgressBar(
  { startValue, max, step = -10, ...passThruProps },
  ref
) {
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
          clearInterval(timer);
        }
        return newValue;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <progress ref={ref} value={value} max={maxValue} {...passThruProps} />;
});
