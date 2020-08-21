
const fs = require('fs');
const rlsync = require('readline-sync');
//const fModules = require("./functionModules.js");
//const fileData = fs.readFileSync('./ticTacToeMessages.json', 'utf8');
//const MESSAGES = JSON.parse(fileData);
let gamesWon = {
  player: 0,
  computer: 0,
  tie: 0
};

let squaresPlayed = {
  player : [],
  computer : []
};

let winner = false;

let gameBoard = {
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
  console.log(`\t   ${gameBoard['1']}    |    ${gameBoard['2']}    |    ${gameBoard['3']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${gameBoard['4']}    |    ${gameBoard['5']}    |    ${gameBoard['6']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${gameBoard['7']}    |    ${gameBoard['8']}    |    ${gameBoard['9']}    `);
  console.log(`\t        |         |         \n`);
}

function alreadyPlayed(input, squaresPlayed) {
  let result = Object.values(squaresPlayed).reduce((acc, elem) => {
     return acc.concat(elem)},[]).includes(input);
  return result;
}


function getPlayerInput() {
//  fModules.prompt(MESSAGES['player']);
  let playerInput = rlsync.question("Choose your square (1-9): ");
  
  while (gameBoard[playerInput] === undefined ||
         gameBoard[playerInput] !== ' ' || 
         alreadyPlayed(playerInput, squaresPlayed)) {
    if (alreadyPlayed(playerInput, squaresPlayed)) {
      console.log('\nSquare played already!\n');
    } else {
      console.log('\nInvalid input\n');
    }
    playerInput = rlsync.question("Choose your square: ");
  }
  
  gameBoard[playerInput] = 'X';
  squaresPlayed.player.push(playerInput);
}


function getComputerInput() {
  let grid = Object.keys(gameBoard);
  let computerInput = grid[Math.floor(Math.random() * grid.length)];
  
  while ((gameBoard[computerInput].trim().length === 1) || 
          alreadyPlayed(computerInput, squaresPlayed)) {
    computerInput = grid[Math.floor(Math.random() * grid.length)];
  }
  
  gameBoard[computerInput] = 'O';
  squaresPlayed.computer.push(computerInput);
}



function checkForWin(squaresPlayed, user) {
  let winningCombos = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'],
                       ['2', '5', '8'], ['3', '6', '9'], ['3', '5', '7'], ,
                       ['4', '5', '6'], ['7', '8', '9']];
 
  let result = winningCombos.filter(elem => {
    return elem.every(square => squaresPlayed.includes(square));
  });
  if (result.length > 0){
    if (user === 'computer') {
      console.log(`The ${user} won!`);
    } else {
      console.log('You won');
    }
    gamesWon[user] +=1;
    return true;
  } else {
    return false;
  }
} 


function checkForDraw() {
  if ((squaresPlayed.player.length + 
       squaresPlayed.computer.length) === 9) {
    console.log("Its a tie!\n");
    winner = 'tie';
    gamesWon.tie +=1;
    return true;
  } else { 
    return false;
  }
}
 
function resetNewGame() {
  squaresPlayed.player = [];
  squaresPlayed.computer = [];
  winner = false;
    for (let key in gameBoard) {
    gameBoard[key] = ' ';
  }
}

function displayResult() {
  console.log(`Computer: ${gamesWon.computer}\n
  Player: ${gamesWon.player}\n
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
    console.log("\nI'm sorry, the computer beat you and won the match!\n");
  } else if (gamesWon.computer < gamesWon.player) {
    console.log('\nCongratulations, you beat the computer!\n');
  } else {
    console.log('\nThere is no winner. The match is a draw!\n');
  }
  
  
}


do {
  resetNewGame();

  do {
    getComputerInput();
    console.clear();
    drawBoard();
    
    if (checkForWin(squaresPlayed.computer, 'computer')) {
      break;
    } else if (checkForDraw()) {
      break;
    }
    
    getPlayerInput();
    console.clear();
    drawBoard();
    
    if (checkForWin(squaresPlayed.player, 'player')) {
      break;
    } else if (checkForDraw()) {
      break;
    }
  
  } while (winner === false);

  resetNewGame();

} while (playAgain());


goodbye();
displayResult();
