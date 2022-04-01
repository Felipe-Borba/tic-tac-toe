const htmlBoxes = document.getElementsByClassName("box");
const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restartBtn");
const boxes = Array.from(htmlBoxes);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer;
const spaces = [];

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";

    const isFirstRow = index < 3;
    if (isFirstRow) {
      styleString += `border-bottom: 3px solid var(--purple);`;
    }

    const isLeftColumn = index % 3 === 0;
    if (isLeftColumn) {
      styleString += `border-right: 3px solid var(--purple);`;
    }

    const isRightColumn = index % 3 === 2;
    if (isRightColumn) {
      styleString += `border-left: 3px solid var(--purple);`;
    }

    const bottomRow = index > 5;
    if (bottomRow) {
      styleString += `border-top: 3px solid var(--purple);`;
    }

    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

const boxClicked = (e) => {
  const id = e.target.id;

  const isEmptyBox = !spaces[id];
  if (isEmptyBox) {
    spaces[id] = currentPlayer; // saves the play
    e.target.innerText = currentPlayer; // mark the box

    if (playerHasWon()) {
      playText.innerText = `${currentPlayer} has Won!`;
      return;
    }

    switchPlayer();
  }
};

const switchPlayer = () => {
  currentPlayer =
    currentPlayer === O_TEXT
      ? (currentPlayer = X_TEXT)
      : (currentPlayer = O_TEXT);
};

const playerHasWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      return true;
    }
  }

  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      return true;
    }
    if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
      return true;
    }
  }

  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      return true;
    }
    if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
      return true;
    }
  }
};

const restartGame = () => {
  boxes.forEach((box, index) => {
    spaces[index] = null;
    box.innerText = "";
  });

  playText.innerText = "Let's Play!";
  currentPlayer = O_TEXT;
};

restartBtn.addEventListener("click", restartGame);
restartGame();
drawBoard();
