import React, { useState } from "react";

export default function Greeting() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      <p>{isButtonClicked ? "It is good to see you!" : "Click button!"}</p>
      <button onClick={handleButtonClick}>Click me!</button>
    </div>
  );
}
