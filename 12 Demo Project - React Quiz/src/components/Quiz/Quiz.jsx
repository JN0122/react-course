import questions from "../../assets/questions";
import { useState} from "react";
import Question from "./Question";
import ProgressBarGrow from "../ProgressBar/ProgressBarGrow.jsx";

const timeIntervals = {ANSWER: 3000, AFTER_ANSWER: 1500, SHOW_CORRECT_ANSWER: 2000}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(timeIntervals.ANSWER);

  function handleNextQuestion() {
      setShowAnswer(false);
      setTimer(timeIntervals.ANSWER);
      setSelectedAnswer(undefined);
      setCurrentQuestionIndex((prev) => prev + 1);
  }

  function handleShowAnswer() {
      setShowAnswer(true);
      setTimer(timeIntervals.SHOW_CORRECT_ANSWER);
  }

  function handleAnswerSelect(answerIndex){
      setSelectedAnswer(answerIndex);
      setTimer(timeIntervals.AFTER_ANSWER);
  }

  function handleTimeUp(){
    if(selectedAnswer === undefined){
        handleAnswerSelect(null);
    }else if(showAnswer === false){
        handleShowAnswer();
    }else{
        handleNextQuestion();
    }
  }

  return (
      <div id="quiz">
          <div id="question">
              <ProgressBarGrow
                  key={timer}
                  maxValue={timer}
                  onTimeUp={handleTimeUp}
                  className={selectedAnswer !== undefined && showAnswer === false ? "answered":""}
              />
              <Question
                  key={currentQuestionIndex}
                  content={questions[currentQuestionIndex]}
                  onAnswerSelect={handleAnswerSelect}
                  showAnswer={showAnswer}
                  disabled={selectedAnswer !== undefined}
              />
          </div>
      </div>
  );
}
