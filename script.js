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

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
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

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

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
        if (currentBorad[row][col].getValue() === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const playRound = (row, column) => {
    if (board.dropToken(row, column, getActivePlayer().token)) {
      if (checkForWin()) {
        board.printBoard();
        console.log(`${getActivePlayer().name} wins!`);
        return true;
      } else if (checkForDraw) {
        board.printBoard();
        console.log("It's a draw!");
        return true;
      } else {
        switchPlayerTurn();
        printNewRound();
      }
    } else {
      console.log("Invalid move. Try again.");
    }
    return false;
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
