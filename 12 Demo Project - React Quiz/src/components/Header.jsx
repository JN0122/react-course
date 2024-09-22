import headerLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={headerLogo} />
      <h1>ReactQuiz</h1>
    </header>
  );
}
