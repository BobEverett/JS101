const fModules = require("./functionModules.1.js");
const fs = require('fs');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./ticTacToeMessages.json', 'utf8');
const MESSAGES = JSON.parse(fileData);

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WIN_COMBOS = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'],
  ['2', '5', '8'], ['3', '6', '9'], ['3', '5', '7'],
  ['4', '5', '6'], ['7', '8', '9']];
const MATCH_SCORE = {
  human: 0,
  computer: 0
};


function initializeBoard() {
  return {
    1: INITIAL_MARKER,
    2: INITIAL_MARKER,
    3: INITIAL_MARKER,
    4: INITIAL_MARKER,
    5: INITIAL_MARKER,
    6: INITIAL_MARKER,
    7: INITIAL_MARKER,
    8: INITIAL_MARKER,
    9: INITIAL_MARKER
  };
}

function drawBoard(board) {
  console.log(`\n\t        |         |         `);
  console.log(`\t   ${board['1']}    |    ${board['2']}    |    ${board['3']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${board['4']}    |    ${board['5']}    |    ${board['6']}    `);
  console.log(`\t________|_________|_________`);
  console.log(`\t        |         |         `);
  console.log(`\t   ${board['7']}    |    ${board['8']}    |    ${board['9']}    `);
  console.log(`\t        |         |         \n`);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function getComputerSquares(board) {
  return Object.keys(board).filter(key => board[key] === COMPUTER_MARKER);
}

function getHumanSquares(board) {
  return Object.keys(board).filter(key => board[key] === HUMAN_MARKER);
}

function getInput(board, player) {
  if (player === 'human') return getPlayerInput(board);
  return getComputerInput(board);
}

function takeTurns(player) {
  if (player === 'human') return 'computer';
  return 'human';
}

function getPlayerInput(board) {
  let playerInput = rlsync.question(`Choose your square ${emptySquares(board)}: `);

  while (!emptySquares(board).includes(playerInput.trim())) {   // only allow player to choose a value that is an open square
    fModules.prompt(MESSAGES['invalidEntry']);
    playerInput = rlsync.question(fModules.prompt(MESSAGES['chooseSquare']));
  }
  board[playerInput] = HUMAN_MARKER;
  drawBoard(board);
}

function getComputerInput(board) {

  let computerInput = bestMove(board);

  board[computerInput] = COMPUTER_MARKER;
  console.clear();
  drawBoard(board);
}

function moveToWin(board) {
  let oSquares = getComputerSquares(board);
  let computerInput;
  for (let num of emptySquares(board)) {
    for (let elem of WIN_COMBOS) {
      if (elem.every(value => oSquares.concat(num).includes(value))) {
        computerInput = num;
        break;
      }
      if (computerInput !== undefined) {
        break;
      }
    }
  }
  return computerInput;
}

function moveToBlock(board) {
  let xSquares = getHumanSquares(board);
  let computerInput;
  for (let num of emptySquares(board)) {
    for (let elem of WIN_COMBOS) {
      if (elem.every(value => xSquares.concat(num).includes(value))) {
        computerInput = num;
        break;
      }
      if (computerInput !== undefined) {
        break;
      }
    }
  }
  return computerInput;
}

function bestMove(board) {
  let openSquares = emptySquares(board);

  if (openSquares.includes('5'))  return '5';

  let move = moveToWin(board);
  if (move !== undefined) return move;

  move = moveToBlock(board);
  if (move !== undefined) return move;

  return openSquares[Math.floor(Math.random() * openSquares.length)];
}

function checkForWinner(board, player) {
  let result;
  let xSquares = getHumanSquares(board);
  let oSquares = getComputerSquares(board);

  if (player === 'human') {
    result = WIN_COMBOS.filter(elem => {
      return elem.every(square => xSquares.includes(square));
    });
  } else {
    result = WIN_COMBOS.filter(elem => {
      return elem.every(square => oSquares.includes(square));
    });
  }
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
}

function checkForFullBoard(board) {
  return (emptySquares(board).length === 0);
}

function determineWinner(player) {
  if (player === 'human') {
    fModules.prompt(MESSAGES['youWon']);
    MATCH_SCORE.human += 1;
  } else {
    fModules.prompt(MESSAGES['computerWon']);
    MATCH_SCORE.computer += 1;
  }
}

function displayResult() {
  console.clear();
  console.log(`\nFinal Match Score:\n 
  Computer: ${MATCH_SCORE.computer}
  Human: ${MATCH_SCORE.human}\n`);
}

function playAgain() {
  while (true) {
    let userInput = rlsync.question(fModules.prompt(MESSAGES['playAgain']));

    if (userInput.toLowerCase() === 'p') return true;
    if (userInput.toLowerCase() === 's') return false;
    fModules.prompt(MESSAGES['invalidEntry']);
  }
}

function goodbye() {
  if (MATCH_SCORE.computer > MATCH_SCORE.human) {
    fModules.prompt(MESSAGES['sorry']);
  } else if (MATCH_SCORE.computer < MATCH_SCORE.human) {
    fModules.prompt(MESSAGES['congrats']);
  } else {
    fModules.prompt(MESSAGES['draw']);
  }
}

// Start Game
fModules.prompt((MESSAGES['welcome']));

do {

  let board = initializeBoard();
  drawBoard(board);
  let player = 'human';

  while (true) {
    getInput(board, player);
    if (checkForWinner(board, player) || checkForFullBoard(board)) break;
    player = takeTurns(player);
  }

  if (checkForFullBoard(board)) {
    fModules.prompt(MESSAGES['draw']);
    continue;
  }

  determineWinner(player);

} while (playAgain());

displayResult();
goodbye();
