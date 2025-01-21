import QUESTIONS from "../assets/questions";
import quizCompleteImg from "../assets/quiz-complete.png";

function getPercent(value, total){
  return ((value/total)*100).toFixed(0);
}

export default function Summary({answers}) {
  const totalQuestions = QUESTIONS.length;
  const answersCount = {
    correct: 0,
    incorrect: 0
  };

  answers.forEach((answer) => {
    if(answer.isCorrect) answersCount.correct++;
    else if(answer.isCorrect === false) answersCount.incorrect++;
  })

  const answersStats = {
    correct: getPercent(answersCount.correct, totalQuestions),
    incorrect: getPercent(answersCount.incorrect, totalQuestions),
  }

  const stats = [{
    text: "skipped",
    value: 100 - answersStats.correct - answersStats.incorrect,
  },{
    text: "answered correctly",
    value: answersStats.correct,
  },{
    text: "answered incorrectly",
    value: answersStats.incorrect,
  }]

  return <div id="summary">
    <img src={quizCompleteImg} alt="Trophy icon"/>
    <h2>Quiz Completed!</h2>
    <div id="summary-stats">
      {stats.map((stat, index)=> {
        return <p key={index}>
          <span className="number">{stat.value}</span>
          <span className="text">{stat.text}</span>
        </p>
      })}
    </div>
    <ol>
      {answers.map((answer, index) => {
        let className = "user-answer";

        if(answer.answerIndex === null) className += " skipped";
        else if(answer.isCorrect === true) className += " correct";
        else className += " wrong";

        return <li key={index}>
          <h3>{index+1}</h3>
          <p className="question">{QUESTIONS[index].text}</p>
          <p className={className}>{answer.answerIndex=== null ?
              "Skipped" : QUESTIONS[index].answers[answer.answerIndex]}</p>
        </li>
      })}
    </ol>
  </div>;
}
