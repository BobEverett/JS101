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
let totalGames = 0;
let validChoices = {
  'r' : 'ROCK',
  'p' : 'PAPER', 
  's' : 'SCISSORS', 
  'l' : 'LIZARD', 
  'k' : 'SPOCK'
  };
  
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

function getComputerInput() {
  let computerInput = Object.keys(validChoices)[Math.floor(Math.random() * 
    (Object.keys(validChoices).length-1))];
  return computerInput;
}

let validInput = (input) => Object.keys(validChoices).includes(input);

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

function displayResults(result, player, computer) {
    if (result === 'computer') {
      console.log(`\nYou played ` + colors.brightRed(`${validChoices[player]}...`) +
      `the Computer played ` + colors.brightYellow(`${validChoices[computer]}...` +
      colors.brightGreen('the Computer wins!\n')));
      computerScore++;
  } else if (result === 'user') {
      console.log(`\nYou played ` + colors.brightRed(`${validChoices[player]}...`) +
      `the Computer played ` + colors.brightYellow(`${validChoices[computer]}...`+
      colors.brightGreen('You win!\n')));
      userScore++;
  } else {
      console.log(`\nYou played ` + colors.brightRed(`${validChoices[player]}...`) +
      `the Computer played ` + colors.brightYellow(`${validChoices[computer]}...`+
      colors.brightGreen(`it's a tie!\n`)));
      tieGames++;
  }
  console.log(colors.bold(`\nCurrent Score: Player: ${userScore} | ` +
    `Computer: ${computerScore}\n`));  
  console.log('#'.repeat(50));
}

function playAgain() {
  let result;
  let answer;
  fModules.prompt(colors.brightYellow(MESSAGES['playAgain']));
  do {
    answer = rlsync.question('\t');
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
  playResult = getResults(player, computer);
  if (totalGames % 2 === 0) {console.clear()}
  displayResults(playResult, player, computer);
  totalGames++;
} while ((userScore < 5) && (computerScore < 5));

console.clear();
goodbye();
fModules.prompt(colors.bold(MESSAGES['goodbye']));

