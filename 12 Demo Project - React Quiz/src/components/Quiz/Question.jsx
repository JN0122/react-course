export default function Question({ content, onNextQuestion }) {
  function checkAnswer(answer) {
    onNextQuestion();
  }

  return (
    <div id="question">
      <progress value={50} max={100} className="answered" />
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
