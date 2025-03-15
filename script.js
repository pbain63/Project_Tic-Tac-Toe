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

  printNewRound();

  return { playRound, getActivePlayer };
}

// Function to start the game in the browser console
function startConsoleGame() {
  const game = GameController();

  const getMove = () => {
    const input = prompt(`Enter row and column (0 to 2) separated by a comma:`);
    if (input === null) {
      console.log("Game exited.");
      return;
    }

    const [row, col] = input.split(",").map(Number);
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      const gameOver = game.playRound(row, col);
      if (!gameOver) {
        getMove();
      }
    } else {
      console.log("Invalid input. Please enter numbers between 0 and 2.");
      getMove();
    }
  };
  getMove();
}

// Start the game
startConsoleGame();
