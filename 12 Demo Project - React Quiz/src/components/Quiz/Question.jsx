import ProgressBar from "./ProgressBar";
import { useState } from "react";

const TIME_TO_ANSWER = 6000;
const TIME_AFTER_ANSWER = 1500;

export default function Question({ content }) {
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [showAnswers, setShowAnswers] = useState(false);

  function checkAnswer(answerIndex) {
    setSelectedAnswer(answerIndex);
  }

  function onAnswerTimeUp() {
    setSelectedAnswer(null);
  }

  function onTimeUpAfterAnswer() {
    setShowAnswers(true);
  }

  const progressBarProps = {
    startValue: TIME_TO_ANSWER,
    onTimeUp: onAnswerTimeUp,
    className: "",
  };

  if (selectedAnswer !== undefined) {
    progressBarProps.onTimeUp = onTimeUpAfterAnswer;
    progressBarProps.startValue = TIME_AFTER_ANSWER;
    progressBarProps.className = " answered";
  }

  return (
    <div id="question">
      <ProgressBar
        onTimeUp={progressBarProps.onTimeUp}
        startValue={progressBarProps.startValue}
        className={progressBarProps.className}
      />
      <h2>{content.text}</h2>
      <ul id="answers">
        {content.answers.map((text, index) => {
          let className = "";
          if (showAnswers) {
            if (index === selectedAnswer) className = "wrong";
            if (index === content.correctAnswerIndex) className = "correct";
          } else if (index === selectedAnswer) className = "selected";
          return (
            <li className="answer" key={index}>
              <button
                onClick={() => checkAnswer(index)}
                className={className}
                disabled={selectedAnswer !== undefined}
              >
                {text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
