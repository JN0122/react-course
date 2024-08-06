import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  function handleEditButton() {
    setIsEditing((editing) => !editing);
    if (isEditing) onNameSave(symbol, playerName);
  }

  let playerNameElement = <span className="player-name">{playerName}</span>;

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
      <button onClick={handleEditButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
