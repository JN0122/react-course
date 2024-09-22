import questions from "../../assets/questions";
import { useState } from "react";
import Question from "./Question";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function nextQuestion() {
    setCurrentQuestion((prev) => prev + 1);
  }

  return (
    <div id="quiz">
      <Question
        content={questions[currentQuestion]}
        onNextQuestion={nextQuestion}
      />
    </div>
  );
}
