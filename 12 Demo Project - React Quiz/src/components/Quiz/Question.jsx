import {useMemo, useState} from "react";

export default function Question({ content, onAnswerSelect, showAnswer, ...rest}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const answers = useMemo(()=>{
        const answers = [...content.answers];
        return answers.sort(() => Math.random() - 0.5);
    },[content]);

    function handleAnswerSelect(index, isCorrect) {
        setSelectedAnswer(index);
        onAnswerSelect(index, isCorrect);
    }

  return (
    <>
      <h2>{content.text}</h2>
      <ul id="answers">
        {answers.map((text, index) => {
            let className = "";
            if (showAnswer) {
                if (index === selectedAnswer) className = "wrong";
                if (text === content.answers[0]) className = "correct";
            } else if (index === selectedAnswer) className = "selected";
            return (
                <li className="answer" key={index}>
                    <button
                        onClick={() => handleAnswerSelect(index, text === content.answers[0])}
                        className={className}
                        {...rest}
                    >
                        {text}
                    </button>
                </li>
            );
        })}
      </ul>
    </>
  );
}
