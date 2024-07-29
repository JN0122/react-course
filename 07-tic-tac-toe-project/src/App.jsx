import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import {
  getActivePlayer,
  checkWinner,
  fillGameBoard,
  initialGameBoard,
  gameBoardSymbols,
} from "./helpers/GameBoardHelper";

import { useState } from "react";
import GameOver from "./components/GameOver";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playersName, setPlayersName] = useState(["Player 1", "Player 2"]);
  const activePlayer = getActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  fillGameBoard(gameBoard, gameTurns);

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurns) => [
      { square: { row, col }, player: getActivePlayer(prevTurns) },
      ...prevTurns,
    ]);
  }

  function handleRestart() {
    setGameTurns([]);
  }

  const winner = checkWinner(gameTurns);
  const isDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {gameBoardSymbols.map((playerSymbol, playerIndex) => (
            <Player
              key={playerIndex}
              initialName={playersName[playerIndex]}
              symbol={playerSymbol}
              isActive={activePlayer === playerSymbol}
            />
          ))}
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
