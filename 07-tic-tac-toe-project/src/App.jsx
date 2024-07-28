import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        GameBoard
      </div>
      LOG
    </main>
  );
}

export default App;
