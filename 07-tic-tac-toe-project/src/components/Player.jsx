import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  let playerNameElement = <span className="player-name">{playerName}</span>;

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  if (isEditing) {
    playerNameElement = (
      <input
        type="text"
        value={playerName}
        onChange={handlePlayerNameChange}
        required
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => setIsEditing((editing) => !editing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
