import questions from "../../assets/questions";
import {useMemo, useReducer, useState} from "react";
import Question from "./Question";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import Summary from "../Summary.jsx";

const timeIntervals = {ANSWER: 6000, AFTER_ANSWER: 1500, SHOW_CORRECT_ANSWER: 3000}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(timeIntervals.ANSWER);
  const [userAnswers, setUserAnswers] = useState([])

  const handleNextQuestion = function() {
      setShowAnswer(false);
      setTimer(timeIntervals.ANSWER);
      setSelectedAnswer(undefined);
      setCurrentQuestionIndex((prev) => prev + 1);
  }

  const handleShowAnswer = function() {
      setShowAnswer(true);
      setTimer(timeIntervals.SHOW_CORRECT_ANSWER);
  }

    const handleAnswerSelect = function(answerIndex, isCorrect){
      setSelectedAnswer(answerIndex);
        setUserAnswers((prev)=>{
            return [
                ...prev,
                {
                    answerIndex,
                    isCorrect
                }
            ]
        }
      );
      setTimer(timeIntervals.AFTER_ANSWER);
  }

  const handleTimeUp = function() {
      if (selectedAnswer === undefined) {
          handleAnswerSelect(null, null);
      } else if (showAnswer === false) {
          handleShowAnswer();
      } else {
          handleNextQuestion();
      }
  }

  const question = useMemo(()=> questions[currentQuestionIndex], [currentQuestionIndex]);

  if(!question)
      return <Summary answers={userAnswers} />;

  return (
      <div id="quiz">
          <div id="question">
              <ProgressBar
                  maxValue={timer}
                  onTimeUp={handleTimeUp}
                  className={selectedAnswer !== undefined && !showAnswer ? "answered":""}
              />
              <Question
                  key={currentQuestionIndex}
                  content={question}
                  onAnswerSelect={handleAnswerSelect}
                  showAnswer={showAnswer}
                  disabled={selectedAnswer !== undefined}
              />
          </div>
      </div>
  );
}
