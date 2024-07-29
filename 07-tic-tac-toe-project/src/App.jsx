import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { getActivePlayer, checkWinner } from "./helpers/GameBoardHelper";

import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurns) => [
      { square: { row, col }, player: getActivePlayer(prevTurns) },
      ...prevTurns,
    ]);
  }

  const winner = checkWinner(gameTurns);
  console.log(winner);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
