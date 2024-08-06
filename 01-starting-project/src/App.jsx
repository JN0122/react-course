import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import { ResultTable } from "./components/ResultTable";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isInputValid = userInput.duration >= 1;

  function handleUserInputChange(variable, value) {
    setUserInput((prev) => {
      return { ...prev, [variable]: +value };
    });
  }

  return (
    <>
      <Header />
      <main>
        <UserInput
          userInput={userInput}
          onValueChange={handleUserInputChange}
        />
        {!isInputValid && (
          <p className="center">Please insert a duration greater than 0!</p>
        )}
        {isInputValid && <ResultTable userInput={userInput} />}
      </main>
    </>
  );
}

export default App;
