import Header from "./components/Header";
import Quiz from "./components/Quiz/Quiz";
import Summary from "./components/Summary";

import { useState } from "react";

function App() {
  const [isQuizRunning, setIsQuizRunning] = useState(true);

  let content = <Summary />;
  if (isQuizRunning) {
    content = <Quiz />;
  }
  return (
    <>
      <Header />
      {content}
    </>
  );
}

export default App;
