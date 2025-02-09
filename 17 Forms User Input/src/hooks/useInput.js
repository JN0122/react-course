import { useState } from "react";

export function useInput(defaultValue, validate) {
  const [value, setValue] = useState(defaultValue);
  const [isInputChanged, setIsInputChanged] = useState(false);

  const isValid = validate(value);

  function handleInputChange(event) {
    setValue(event.target.value);
    //setIsInputChanged(false);
  }

  function handleInputBlur() {
    setIsInputChanged(true);
  }

  return {
    value,
    handleInputBlur,
    handleInputChange,
    hasError: isInputChanged && !isValid,
  };
}
