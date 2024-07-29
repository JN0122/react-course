export function getActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

export function getBoardSummary(gameTurns) {
  const boardSummary = new Map();
  for (let player of ["X", "O"]) {
    boardSummary.set(player, {
      col: { 0: 0, 1: 0, 2: 0 },
      row: { 0: 0, 1: 0, 2: 0 },
      diagonal: { ltr: 0, rtl: 0 },
    });
  }

  for (let { square, player } of gameTurns) {
    const { col, row } = square;
    boardSummary.get(player).col[col]++;
    boardSummary.get(player).row[row]++;
    if (col === row) boardSummary.get(player).diagonal.ltr++;
    if (col + row === 2) boardSummary.get(player).diagonal.rtl++;
  }
  return boardSummary;
}

export function checkWinner(gameTurns) {
  const boardSummary = getBoardSummary(gameTurns);

  for (let player of boardSummary.keys()) {
    const playerBoard = boardSummary.get(player);
    for (let i = 0; i < 3; i++) {
      if (playerBoard.col[i] === 3 || playerBoard.row[i] === 3) return player;
    }
    if (playerBoard.diagonal.ltr === 3 || playerBoard.diagonal.rtl === 3)
      return player;
  }
  return undefined;
}

export function fillGameBoard(gameBoard, gameTurns) {
  for (const { square, player } of gameTurns) {
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
