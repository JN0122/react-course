import questions from "../../assets/questions";
import {useMemo, useReducer, useState} from "react";
import Question from "./Question";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import Summary from "../Summary.jsx";

const timeIntervals = {ANSWER: 6000, AFTER_ANSWER: 100, SHOW_CORRECT_ANSWER: 100}

function quizReducer(state, action) {
    switch (action.type) {
        case "ADD_ANSWER":
            return{
                ...state,
                answers: [...state.answers, action.payload]
            }
    }
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(timeIntervals.ANSWER);
  const [quiz, quizDispatch] = useReducer(quizReducer, {
      answers: []
  })

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

    const handleAnswerSelect = function(answerIndex){
      setSelectedAnswer(answerIndex);
      quizDispatch({
          type: "ADD_ANSWER",
          payload: {
              id: questions[currentQuestionIndex].id,
              answerIndex
          }
      });
      setTimer(timeIntervals.AFTER_ANSWER);
  }

  const handleTimeUp = function() {
      if (selectedAnswer === undefined) {
          handleAnswerSelect(null);
      } else if (showAnswer === false) {
          handleShowAnswer();
      } else {
          handleNextQuestion();
      }
  }

  const question = useMemo(()=> questions[currentQuestionIndex], [currentQuestionIndex]);

  if(!question)
      return <Summary quiz={quiz} />;

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
