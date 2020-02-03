/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//variables
let scores, roundScore, activePlayer, gamePlaying, previousDice, winScore;

//initialize
init();

//Click on Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    let dice1 = generateRandomNumber();
    let dice2 = generateRandomNumber();

    changeDicePicture(dice1, dice2);

    checkDice(dice1, dice2);
  }
});

//Generate Number for Dice
function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

//Change picture with dice
function changeDicePicture(diceValue1, diceValue2) {
  let diceDom1 = document.querySelector("#dice1");
  let diceDom2 = document.querySelector("#dice2");

  diceDom1.src = "images/dice-" + diceValue1 + ".png";
  diceDom2.src = "images/dice-" + diceValue2 + ".png";

  showHideDice(true);
}

function showHideDice(visible) {
  if (visible) {
    document
      .querySelectorAll(".dice")
      .forEach(element => (element.style.display = "block"));
  } else {
    document
      .querySelectorAll(".dice")
      .forEach(element => (element.style.display = "none"));
  }
}

//Check dice value
function checkDice(diceValue1, diceValue2) {
  if (diceValue1 === 1 || diceValue2 === 1) {
    nextPlayer();
  } else {
    roundScore += diceValue1 + diceValue2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  }
}

//Initialize main vairables and html elements
function init() {
  initializeVariables();
  initializeHtmlElements();
}

//Initialize main vairables
function initializeVariables() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousDice = 0;
  gamePlaying = true;
}

//Initialize html elements
function initializeHtmlElements() {
  showHideDice(false);

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  changeButtonColor(false);
}

//Total Score of a player
function showPlayerScore() {
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
}

//Change Player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousDice = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  showHideDice(false);
}

//Click on Hold
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    showPlayerScore();

    setWinScore();

    checkWinner(scores[activePlayer]);
  }
});

//Check if the player is Winner
function checkWinner(amount) {
  if (amount >= winScore) {
    setPropertiesForWinner();
  } else {
    nextPlayer();
  }
}

//Set properties for Winner player
function setPropertiesForWinner() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";

  showHideDice(false);

  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  gamePlaying = false;

  if (activePlayer === 0) {
    changeButtonColor(true);
  }
}

//Change Icon color if Winner is Player 0
function changeButtonColor(add) {
  let btns = document.querySelectorAll("button");

  if (add) {
    btns.forEach(element => {
      element.classList.add("winner-btn");
    });
  } else {
    btns.forEach(element => {
      element.classList.remove("winner-btn");
    });
  }
}

//Click on New Game
document.querySelector(".btn-new").addEventListener("click", init);

function setWinScore() {
  let scoreVal = parseInt(document.getElementById("winningScore").value);
  if (scoreVal > 0) {
    winScore = scoreVal;
  } else {
    winScore = 100;
  }
}
