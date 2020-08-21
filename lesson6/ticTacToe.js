
const fs = require('fs');
const rlsync = require('readline-sync');
//const fModules = require("./functionModules.js");
//const fileData = fs.readFileSync('./ticTacToeMessages.json', 'utf8');
//const MESSAGES = JSON.parse(fileData);
let gamesWon = {
  'player': 0,
  'computer': 0,
  'tie': 0
}

let playerSquares = [];
let computerSquares = [];
let grid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let gameState = {
    '1': ' ',
    '2': ' ',
    '3': ' ',
    '4': ' ',
    '5': ' ',
    '6': ' ',
    '7': ' ',
    '8': ' ',
    '9': ' '
};


function drawBoard(){
  console.log(`\n\t        |         |         `);
  console.log(`\t   ${gameState['1']}    |    ${gameState['2']}    |    ${gameState['3']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${gameState['4']}    |    ${gameState['5']}    |    ${gameState['6']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${gameState['7']}    |    ${gameState['8']}    |    ${gameState['9']}    `);
  console.log(`\t        |         |         \n`);
}


function getPlayerInput() {
//  fModules.prompt(MESSAGES['player']);
  let playerInput = rlsync.question("Choose your square: ");
  while (!gameState[playerInput] || !grid.includes(playerInput)) {
    if (!gameState[playerInput]) {
      console.log('Square played already!\n');
    } else {
    console.log('Invalid input\n');
    }
    playerInput = rlsync.question("Choose your square: ");
  }
  gameState[playerInput] = 'X';
  playerSquares.push(playerInput);
  grid.splice((grid.indexOf(playerInput)), 1);
}


function getComputerInput() {
  let computerInput = grid[Math.floor(Math.random() * grid.length)];
  while (!gameState[computerInput] || !grid.includes(computerInput)) {
    computerInput = grid[Math.floor(Math.random() * grid.length)];
  }
  gameState[computerInput] = 'O';
  computerSquares.push(computerInput);
  grid.splice((grid.indexOf(computerInput)), 1);
}



function checkForWin(squaresPlayed) {
  let winningCombos = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'],
                       ['2', '5', '8'], ['3', '6', '9'], ['3', '5', '7'], ,
                       ['4', '5', '6'], ['7', '8', '9']];
 
  let result = winningCombos.filter(elem => {
    return elem.every(square => squaresPlayed.includes(square));
  });
  if (result.length > 0){
    return true;
  } else {
    return false;
  }
} 


function checkForDraw() {
  if ((playerSquares.length + computerSquares.length) === 9) {
    return true;
  } else { 
    return false;
  }
}
 
function resetNewGame() {
  playerSquares = [];
  computerSquares = [];
  grid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  winner = false;
}

function displayResult() {
  console.log(`\nComputer: ${gamesWon.computer}
  Player: ${gamesWon.player}
    Ties: ${gamesWon.tie} \n`);
}

function playAgain() {
  let userInput; 
  do {
    userInput = rlsync.question("Press 'p' to play again or press 's' to stop: ");
    if (userInput.toLowerCase() === 'p') {
    return true;
  } else if (userInput.toLowerCase() === 's') {
    return false;
  } else {
    console.log("Invalid entry!\n");
  }
  } while (!['p', 's'].includes(userInput));
}


function goodbye() {
  if (gamesWon.computer > gamesWon.player) {
    console.log("I'm sorry, the computer won the match!\n");
  } else if (gamesWon.computer < gamesWon.player) {
    console.log('Congratulations, you beat the computer!\n');
  } else {
    console.log('The match is a draw!  There is no winner\n');
  }
  
  
}

let winner = false;
do {
  

  do {
    getComputerInput();
    console.clear();
    drawBoard();
    
    if (checkForWin(computerSquares)) {
      console.log('Computer Wins!\n');
      winner = 'true';
      gamesWon.computer += 1;
      break;
    } else if (checkForDraw()) {
      console.log("Its a tie!")
      winner = 'tie'
      gamesWon.tie +=1;
      break;
    }
    
    getPlayerInput();
    console.clear();
    drawBoard();
    
    if (checkForWin(playerSquares)) {
      console.log('You Win!\n');
      winner = 'true';
      gamesWon.player += 1;
      break;
    } else if (checkForDraw()) {
      console.log("It's a tie!\n");
      winner = 'tie';
      gamesWon.tie +=1;
      break;
    }
  
  } while (winner === false);
  for (let key in gameState) {
    gameState[key] = ' ';
  }
  resetNewGame();

} while (playAgain());


goodbye();
displayResult();