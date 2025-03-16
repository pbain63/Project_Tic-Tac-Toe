function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(player);
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j].addToken(0);
      }
    }
  };

  return { getBoard, dropToken, resetBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(playerOneName, playerTwoName) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];
  let gameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const checkForWin = () => {
    const currentBoard = board.getBoard();

    // check rows for a win
    // currentBoard[row][0] checks the leftmost cell in the row
    // currentBoard[row][1] checks the middle cell in the row
    // currentBoard[row][2] checks the rightmost cell in the row
    for (let row = 0; row < 3; row++) {
      if (
        currentBoard[row][0].getValue() !== 0 &&
        currentBoard[row][0].getValue() === currentBoard[row][1].getValue() &&
        currentBoard[row][1].getValue() === currentBoard[row][2].getValue()
      ) {
        return true;
      }
    }

    // Check columns for a win
    // currentBoard[0][col] checks the top cell in the column.
    // currentBoard[1][col] checks the middle cell in the column.
    // currentBoard[2][col] checks the bottom cell in the column.

    for (let col = 0; col < 3; col++) {
      if (
        currentBoard[0][col].getValue() !== 0 &&
        currentBoard[0][col].getValue() === currentBoard[1][col].getValue() &&
        currentBoard[1][col].getValue() === currentBoard[2][col].getValue()
      ) {
        return true;
      }
    }

    // check diagonals for a win
    if (
      currentBoard[0][0].getValue() !== 0 &&
      currentBoard[0][0].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[1][1].getValue() === currentBoard[2][2].getValue()
    ) {
      return true;
    }

    if (
      currentBoard[0][2].getValue() !== 0 &&
      currentBoard[0][2].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[1][1].getValue() === currentBoard[2][0].getValue()
    ) {
      return true;
    }
    return false;
  };

  const checkForDraw = () => {
    const currentBoard = board.getBoard();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (currentBoard[row][col].getValue() === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const playRound = (row, column) => {
    // if (gameOver) return "Game over. Please reset the game.";
    if (board.dropToken(row, column, getActivePlayer().token)) {
      if (checkForWin()) {
        gameOver = true;
        return `${getActivePlayer().name} wins!`;
      } else if (checkForDraw()) {
        gameOver = true;
        return "It's a draw!";
      } else {
        switchPlayerTurn();
        return `${getActivePlayer().name} turn`;
      }
    }
    // else {
    //   return "Invalid move. Try again!";
    // }
  };

  const resetGame = () => {
    board.resetBoard();
    activePlayer = players[0];
    gameOver = false;
    updateUI();
  };

  const updateUI = () => {
    const currentBoard = board.getBoard();
    const boardElement = document.querySelector(".board");
    const statusElement = document.querySelector(".status");

    // update board
    boardElement.innerHTML = "";
    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell.getValue() === 0 ? "" : cell.getValue();
        if (!gameOver && cell.getValue() === 0) {
          cellElement.addEventListener("click", () => {
            const result = playRound(rowIndex, colIndex);
            statusElement.textContent = result;
            updateUI();
          });
        }
        boardElement.appendChild(cellElement);
      });
    });

    // update status
    if (gameOver) {
      statusElement.textContent = statusElement.textContent;
    } else {
      statusElement.textContent = `${getActivePlayer().name}'s turn`;
    }
  };

  return { playRound, resetGame, updateUI };
}

// initialize the game
let game;

// Add event listener for start button 
document.querySelector(".start-button").addEventListener("click", () => {
  const player1Name = document.getElementById("player1").value || "Player One";
  const player2Name = document.getElementById("player2").value || "Player Two";

  // Hide the form and show the board
  document.querySelector(".player-form").style.display = "none";
})