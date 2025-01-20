import {useState} from "react";

export default function Question({ content, onAnswerSelect, showAnswer, ...rest}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    function handleAnswerSelect(index) {
        setSelectedAnswer(index);
        onAnswerSelect(index);
    }

   const answers = content.answers.map((text, index) => {
    let className = "";
    if (showAnswer) {
      if (index === selectedAnswer) className = "wrong";
      if (index === content.correctAnswerIndex) className = "correct";
    } else if (index === selectedAnswer) className = "selected";
    return (
        <li className="answer" key={index}>
          <button
              onClick={() => handleAnswerSelect(index)}
              className={className}
              {...rest}
          >
            {text}
          </button>
        </li>
    );
  });

  return (
    <>
      <h2>{content.text}</h2>
      <ul id="answers">
        {answers}
      </ul>
    </>
  );
}
