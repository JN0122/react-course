import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  if (timeRemaining <= 0) {
    handleStop();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
