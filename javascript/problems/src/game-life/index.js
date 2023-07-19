/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
export function next(board) {
  const newBoard = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      const neighbors = getNeighbors(board, row, col);
      const liveNeighbors = neighbors.filter(isAlive);

      // ensure new board has space
      newBoard[row] = newBoard[row] ?? [];

      if (isAlive(cell) && liveNeighbors.length < 2) {
        newBoard[row][col] = 0;
      } else if (isAlive(cell) && [2, 3].includes(liveNeighbors.length)) {
        newBoard[row][col] = 1;
      } else if (isAlive(cell) && liveNeighbors.length > 3) {
        newBoard[row][col] = 0;
      } else if (!isAlive(cell) && liveNeighbors.length === 3) {
        newBoard[row][col] = 1;
      } else {
        newBoard[row][col] = cell;
      }
    }
  }

  // copy new board to old board
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      board[row][col] = newBoard[row][col];
    }
  }
  // return newBoard;
}

export function getNeighbors(board, row, col) {
  const maxRow = board.length - 1;
  const maxCol = board[0].length - 1;
  const neighbors = [];

  const isOnBoard = (row, col) =>
    row >= 0 && row <= maxRow && col >= 0 && col <= maxCol;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  directions.forEach(([rowOffset, colOffset]) => {
    if (!isOnBoard(row + rowOffset, col + colOffset)) {
      return;
    }

    neighbors.push(board[row + rowOffset][col + colOffset]);
  });

  return neighbors;
}

function isAlive(cell) {
  return cell === 1;
}
