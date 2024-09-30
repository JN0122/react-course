import ProgressBar from "./ProgressBar";
import { useState, useRef } from "react";

const TIME_TO_ANSWER = 6000;
const TIME_AFTER_ANSWER = 3000;

export default function Question({ content }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const progressBarRef = useRef();

  function checkAnswer(answerIndex) {
    setSelectedAnswer(answerIndex);
  }

  return (
    <div id="question">
      <ProgressBar
        ref={progressBarRef}
        startValue={selectedAnswer == null ? TIME_TO_ANSWER : TIME_AFTER_ANSWER}
        className={selectedAnswer == null || "answered"}
      />
      <h2>{content.text}</h2>
      <ul id="answers">
        {content.answers.map((text, index) => (
          <li className="answer" key={index}>
            <button onClick={() => checkAnswer(index)}>{text}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
