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
let scores, roundScore, activePlayer, gamePlaying;

//initialize
init();

//Click on Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;

    let diceDom = document.querySelector(".dice");

    changeDicePicture(diceDom, dice);

    checkDice(dice);
  }
});

//Change picture with dice
function changeDicePicture(element, diceValue) {
  element.style.display = "block";
  element.src = "images/dice-" + diceValue + ".png";
}

//Check dice value
function checkDice(diceValue) {
  if (diceValue !== 1) {
    roundScore += diceValue;

    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
}

//Click on Hold
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    checkWinner(scores[activePlayer]);
  }
});

//Check if the player is Winner
function checkWinner(amount) {
  if (amount >= 100) {
    setPropertiesForWinner();
  } else {
    nextPlayer();
  }
}

//Set properties for Winner player
function setPropertiesForWinner() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document.querySelector(".dice").style.display = "none";
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

//Change Player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

//Click on New Game
document.querySelector(".btn-new").addEventListener("click", init);

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
  gamePlaying = true;
}

//Initialize html elements
function initializeHtmlElements() {
  document.querySelector(".dice").style.display = "none";

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
