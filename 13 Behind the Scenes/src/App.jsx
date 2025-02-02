import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  const [chosenCount, setChosenCount] = useState(0);
  log('<App /> rendered');

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetCounter={setChosenCount}/>
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
