

const fs = require('fs');
const rlsync = require('readline-sync');


function playAgain() {
  while (true) {
    let userInput = rlsync.question("\nPress 'p' to play again or press 's' to stop: ");

    if (userInput.toLowerCase() === 'p') return true;
    if (userInput.toLowerCase() === 's') return false;
    console.log("\nInvalid entry!");
    }
}

console.log(playAgain());


/*
while (true) {
  for (let i=0; i<10; i++) {
    console.log(i);
  if (i === 5) {
    return false;
  }
    
  }
}
*/

/*

function initializeBoard() {
  return {
    '1': 'X',
    '2': ' ',
    '3': ' ',
    '4': 'X',
    '5': 'O',
    '6': ' ',
    '7': 'O',
    '8': ' ',
    '9': ' '
  };
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}


function bestMoveDefense(board) {
  let winningCombos = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'],
                       ['2', '5', '8'], ['3', '6', '9'], ['3', '5', '7'], 
                       ['4', '5', '6'], ['7', '8', '9']];

  let openSquares = emptySquares(board);
  console.log(openSquares);
  let xSquares = Object.keys(board).filter(key => board[key] === 'X');
  console.log(xSquares);
  let computerInput;
  console.log(computerInput);
  
  for (let num of openSquares) {
      for (let elem of winningCombos) {
        console.log(num + ' | ', elem);
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

function bestMoveOffense(board) {
  let winningCombos = [['1', '2', '3'], ['1', '4', '7'], ['1', '5', '9'],
                       ['2', '5', '8'], ['3', '6', '9'], ['3', '5', '7'], 
                       ['4', '5', '6'], ['7', '8', '9']];

  let openSquares = emptySquares(board);
  console.log(openSquares);
  let oSquares = Object.keys(board).filter(key => board[key] === 'O');
  console.log(oSquares);
  let computerInput;
  console.log(computerInput);
  
  for (let num of openSquares) {
      for (let elem of winningCombos) {
        console.log(num + ' | ', elem);
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

let board = initializeBoard();

console.log(bestMoveOffense(board));
console.log(bestMoveDefense(board));

*/