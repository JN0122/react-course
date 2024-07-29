import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

function getActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurns) => [
      { square: { row, col }, player: getActivePlayer(prevTurns) },
      ...prevTurns,
    ]);
  }

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
