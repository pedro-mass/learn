/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function gameOfLife(board) {
  // create board copy
  const nextBoard = [];

  // loop through board
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      nextBoard[row] = nextBoard[row] || [];
      nextBoard[row][col] = getNextCell(board, row, col);
    }
  }

  // copy nextBoard to current board
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      board[row][col] = nextBoard[row][col];
    }
  }
}

function getNextCell(board, row, col) {
  const cellValue = board[row][col];

  const neighbors = getNeighbors(board, row, col);
  const aliveNeighbors = neighbors.filter(isAlive);
  const aliveNeighborsCount = aliveNeighbors.length;

  if (isAlive(cellValue)) {
    if (aliveNeighborsCount < 2) {
      return 0;
    }
    if ([2, 3].includes(aliveNeighborsCount)) {
      return 1;
    }
    if (aliveNeighborsCount > 3) {
      return 0;
    }
  } else if (aliveNeighborsCount === 3) {
    return 1;
  }

  return cellValue;
}

function getNeighbors(board, row, col) {
  const neighbors = [];

  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = col - 1; y <= col + 1; y++) {
      if (board?.[x]?.[y] === undefined || (x === row && y === col)) {
        continue;
      }

      neighbors.push(board[x][y]);
    }
  }

  return neighbors;
}

function isAlive(cellValue) {
  return cellValue === 1;
}

export { getNeighbors, gameOfLife };
