addEventListener("load", () => {
  Loader();
});

function Loader() {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 3000);
}

var mainArray = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

var active = "user";
var clicks = 0;

function restartGame() {
  location.reload();
}

function checkBox(num) {
  var currentBox;
  switch (num) {
    case 1:
      currentBox = "box1";
      break;
    case 2:
      currentBox = "box2";
      break;
    case 3:
      currentBox = "box3";
      break;
    case 4:
      currentBox = "box4";
      break;
    case 5:
      currentBox = "box5";
      break;
    case 6:
      currentBox = "box6";
      break;
    case 7:
      currentBox = "box7";
      break;
    case 8:
      currentBox = "box8";
      break;
    case 9:
      currentBox = "box9";
      break;
  }
  return currentBox;
}

function computerTurn() {
  if (active == "comp") {
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    console.log(randomNumber);

    userClick(randomNumber);
  }
}

setInterval(() => {
  computerTurn();
}, 1000);

function userClick(num) {
  switch (num) {
    case 1:
      if (mainArray[0][0] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 2:
      if (mainArray[0][1] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 3:
      if (mainArray[0][2] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 4:
      if (mainArray[1][0] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 5:
      if (mainArray[1][1] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 6:
      if (mainArray[1][2] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 7:
      if (mainArray[2][0] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 8:
      if (mainArray[2][1] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
    case 9:
      if (mainArray[2][2] == null) {
        console.log("Empty");
      } else {
        return;
      }
      break;
  }

  clicks++;
  var thisBox = checkBox(num);
  updateScreen(thisBox);

  saveGameState(num);
  const CompWinner = validateResultComp(mainArray);
  const UserWinner = validateResultComps(mainArray);

  const resultBox = document.getElementById("resultBox");
  const UserWins = document.getElementById("userwins");
  if (UserWinner == 1) {
    console.log("User Wins");
    active = "Userwin";
    var sound = new Audio("./win.wav");
    sound.play();

    document.getElementById("compWins").style.display = "none";
    resultBox.style.display = "flex";
  } else if (CompWinner == 0) {
    console.log("Comp Wins");
    active = "Compwin";
    var sound = new Audio("./loss.wav");
    sound.play();
    document.getElementById("userwins").style.display = "none";
    resultBox.style.display = "flex";
  }

  if (clicks >= 9 && CompWinner != 0 && UserWinner != 1) {
    resultBox.style.display = "flex";
    active = "Draw";
    document.getElementById("compWins").style.display = "none";
    document.getElementById("userwins").style.display = "none";
    document.getElementById("matchdraw").style.display = "flex";
  }
}

function validateResultComp(board) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== 1 &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0]; // Horizontal win
    }

    if (
      board[0][i] !== 1 &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i]; // Vertical win
    }
  }

  // Check for diagonal wins
  if (
    board[0][0] !== 1 &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]; // Top-left to bottom-right diagonal win
  }

  if (
    board[0][2] !== 1 &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]; // Top-right to bottom-left diagonal win
  }

  return null;
}

function validateResultComps(board) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== 0 &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0]; // Horizontal win
    }

    if (
      board[0][i] !== 0 &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i]; // Vertical win
    }
  }

  // Check for diagonal wins
  if (
    board[0][0] !== 0 &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]; // Top-left to bottom-right diagonal win
  }

  if (
    board[0][2] !== 0 &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]; // Top-right to bottom-left diagonal win
  }

  return null;
}

function updateScreen(boxNumber) {
  if (active == "user") {
    var icon = document.createElement("i");
    icon.classList.add("bx");
    icon.classList.add("bx-circle");
    const myBox = document.getElementById(boxNumber);

    myBox.appendChild(icon);
  } else {
    var icon = document.createElement("i");
    icon.classList.add("bx");
    icon.classList.add("bx-x");
    const myBox = document.getElementById(boxNumber);

    myBox.appendChild(icon);
  }
}

function playerChange() {
  if (active == "user") {
    active = "comp";
  } else if (active == "comp") {
    active = "user";
  }
}

function saveGameState(boxnum) {
  var val;
  if (active == "user") {
    val = 1;
  } else {
    val = 0;
  }

  switch (boxnum) {
    case 1:
      mainArray[0][0] = val;
      playerChange();
      break;
    case 2:
      mainArray[0][1] = val;
      playerChange();
      break;
    case 3:
      mainArray[0][2] = val;
      playerChange();
      break;
    case 4:
      mainArray[1][0] = val;
      playerChange();
      break;
    case 5:
      mainArray[1][1] = val;
      playerChange();
      break;
    case 6:
      mainArray[1][2] = val;
      playerChange();
      break;
    case 7:
      mainArray[2][0] = val;
      playerChange();
      break;
    case 8:
      mainArray[2][1] = val;
      playerChange();
      break;
    case 9:
      mainArray[2][2] = val;
      playerChange();
      break;
  }
}
