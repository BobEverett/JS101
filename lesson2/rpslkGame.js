const fModules = require("./functionModules.js");
const colors = require('colors');
const fs = require('fs');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./rpslkMessages.json',
  'utf8');
const MESSAGES = JSON.parse(fileData);

console.clear();
let userScore = 0;
let computerScore = 0;
let tieGames = 0;
let validChoices = {
  r : 'ROCK',
  p : 'PAPER',
  s : 'SCISSORS',
  l : 'LIZARD',
  k : 'SPOCK'
};


function welcome() {
  fModules.prompt(colors.yellow(colors.bold(MESSAGES['greeting'] +
      (MESSAGES['rules']))));
}

let validInput = (input) => Object.keys(validChoices).includes(input);

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

function getComputerInput() {
  let computerInput = Object.keys(validChoices)[Math.floor(Math.random() *
    (Object.keys(validChoices).length - 1))];
  return computerInput;
}

function getResults(userInput, computerInput) {
  let result;
  if (userInput === computerInput) {
    result = 'draw';
  } else if (((userInput === 'r') &&
            ((computerInput === 'p') || (computerInput === 'k'))) ||
            ((userInput === 'p') &&
            ((computerInput === 's') || (computerInput === 'l'))) ||
            ((userInput === 's') &&
            ((computerInput === 'r') || (computerInput === 'k'))) ||
            ((userInput === 'l') &&
            ((computerInput === 'r') || (computerInput === 's'))) ||
            ((userInput === 'k') &&
            ((computerInput === 'p') || computerInput === 'l'))) {
    result = 'computer';
  } else {
    result = 'user';
  }
  return result;
}

function updateScore(playResult) {
  if (playResult === 'draw') {
    tieGames++;
  } else if (playResult === 'computer') {
    computerScore++;
  } else {
    userScore++;
  }
}

function displayResults(result, player, computer) {
  let phrase = [...(player + computer)].sort().join('');
  if (result === 'computer') {
    fModules.prompt(colors.bold(colors.brightGreen(MESSAGES['computer'] +
      MESSAGES[phrase])));

  } else if (result === 'user') {
    fModules.prompt(colors.bold(colors.brightGreen(MESSAGES['user'] +
      MESSAGES[phrase])));

  } else {
    fModules.prompt(colors.bold(colors.brightGreen(MESSAGES['draw'])));
  }

  if ((userScore < 5 && computerScore < 5)) {
    displayScore();

  } else {
    displayScore('final');
  }
}

function displayScore(score = 'current') {
  if (score === 'current') {
    console.log(colors.bold(`\nCurrent Score: Player: ${userScore} | ` +
      `Computer: ${computerScore}\n`));
    console.log('#'.repeat(50));

  } else {
    console.log(colors.bold(colors.brightYellow(`\nFinal Score: Player: ${userScore} | ` +
      `Computer: ${computerScore} | ` +
      `Tie Games: ${tieGames}`)));
  }
}


function goodbye() {
  if (userScore > computerScore) {
    fModules.prompt(colors.bold(MESSAGES['youWon']));
  } else if (computerScore > userScore) {
    fModules.prompt(colors.bold(MESSAGES['computerWon']));
  } else {
    fModules.prompt(colors.bold(MESSAGES['nobodyWon']));
  }
}

// Start Main Program

welcome();

do {

  let player = getUserInput();
  let computer = getComputerInput();
  let playResult = getResults(player, computer);

  updateScore(playResult);
  console.clear();
  displayResults(playResult, player, computer);

} while ((userScore < 5) && (computerScore < 5));

goodbye();


