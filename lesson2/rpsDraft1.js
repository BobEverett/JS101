const fModules = require("./functionModules.js");
const colors = require('colors');
const fs = require('fs');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./rpsMessages.json',
  'utf8');
const MESSAGES = JSON.parse(fileData);

console.clear();
let userScore = 0;
let computerScore = 0;
let tieGames = 0;
let validChoices = ['rock', 'paper', 'scissors'];

function welcome() {
  fModules.prompt(colors.yellow(colors.bold(MESSAGES['greeting'])));
  fModules.prompt(colors.yellow(MESSAGES['rules']));
}

function getUserInput() {
  let userInput;
  fModules.prompt(colors.brightYellow(MESSAGES['userInput']));
  do {
    userInput = rlsync.question('\t');
    if (!validInput(userInput.toLowerCase())) {
      fModules.prompt(colors.brightYellow(MESSAGES['notValidChoice']));
    }
  } while (!validInput(userInput.toLowerCase()));
  return userInput.toLowerCase();
}

function validInput(input) {
  return (input === 'r' ||
  input === 'p' ||
  input === 's');
}

function getComputerInput() {
  let computerInput =
    validChoices[Math.floor(Math.random() * validChoices.length)];
  return computerInput;
}

function getResults(userInput, computerInput) {
  let result;
  if (userInput === computerInput) {
    result = 'draw';
  } else if (((userInput === 'r') && (computerInput === 'p')) ||
            ((userInput === 'p') && (computerInput === 's')) ||
            ((userInput === 's') && (computerInput === 'r'))) {
    result = 'computer';
  } else {
    result = 'user';
  }
  return result;
}

function displayResults(result, computerInput) {
  if (result === 'computer') {
    fModules.prompt(colors.brightGreen(colors.bold(MESSAGES['compPlay'] +
      `${computerInput.toUpperCase()}...` +
      MESSAGES['computer'])));
    computerScore++;
  } else if (result === 'user') {
    fModules.prompt(colors.brightGreen(colors.bold(MESSAGES['compPlay'] +
      `${computerInput.toUpperCase()}...` + MESSAGES['user'])));
    userScore++;
  } else {
    fModules.prompt(colors.brightGreen(colors.bold(MESSAGES['compPlay'] +
      `${computerInput.toUpperCase()}...` + MESSAGES['draw'])));
    tieGames++;
  }
  console.log('#'.repeat(50));
  console.log(colors.bold(`\nCurrent Score: Player: ${userScore} | ` +
    `Computer: ${computerScore}`));

}

function playAgain() {
  let result;
  let answer;
  fModules.prompt(colors.brightYellow(MESSAGES['playAgain']));
  do {
    answer = rlsync.question('\t');
    console.clear();
    if (answer.toLowerCase() === 'y') {
      result = true;
    } else if (answer.toLowerCase() === 'q') {
      result = false;
    } else {
      fModules.prompt(colors.brightYellow(MESSAGES['invalidResponse']));
      result = 'invalid';
    }
  } while (result === 'invalid');
  return result;
}

function goodbye() {
  console.log('#'.repeat(50));
  if (userScore > computerScore) {
    fModules.prompt(colors.bold(MESSAGES['youWon']));
  } else if (computerScore > userScore) {
    fModules.prompt(colors.bold(MESSAGES['computerWon']));
  } else {
    fModules.prompt(colors.bold(MESSAGES['nobodyWon']));
  }
  console.log(colors.bold(colors.brightGreen(`\nFinal Score: Player: ${userScore} | ` +
  `Computer: ${computerScore} | ` +
  `Tie Games: ${tieGames}`)));
}

// Start Main Program

welcome();
do {
  let playResult;
  let player = getUserInput();
  let computer = getComputerInput();
  playResult = getResults(player, computer[0]);
  displayResults(playResult, computer);
} while (playAgain());

console.clear();
goodbye();
fModules.prompt(colors.bold(MESSAGES['goodbye']));

