/*
Ask the user for two numbers.
Ask the user for the type of operation to perform: add,
subtract, multiply or divide.
Perform the calculation and display the result.
*/
const fs = require('fs');


// declare initial variables
let num1, num2, operator, result, playAgain, userName;
const fileData = fs.readFileSync('./calculator_messages.json', 'utf8');
const rlsync = require('readline-sync');
const MESSAGES = JSON.parse(fileData);

// checks to see of user entered valid numbers
function isValidNum(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

// checks to see if operator is in the set of valid operators
function isValidOperator(operator) {
  let validOperators = ['*', '/', '+', '-'];
  if (validOperators.includes(operator)) {
    return true;
  } else {
    return false;
  }
}

// checks if the operator causes a zero division error
function zeroDivError(operator) {
  if ((Number(num2) === 0) && (operator === '/')) {
    return true;
  } else {
    return false;
  }
}

// helper function to make output more attractive
function prompt(message, name='') {
  console.log(`\n==> ${message} ${name}`);
}

// set language preference
function setLangPref(language) {
    switch (language){
        case '1':
            return 'english';
        case '2':
            return 'french';
        case '3':
            return'spanish';
        default:
            console.log('Sorry, your lanugage is not supported.');
    } 
}


// begin main program

let language = rlsync.question('Language? - (1) English (2) Francais (3) Spanish: ');
prompt(MESSAGES[setLangPref(language)]['welcome']);

userName = (rlsync.question('\t'));
prompt(MESSAGES[setLangPref(language)]['greeting'], userName);

do { //allows user to keep using calculator or to quit
  prompt(MESSAGES[setLangPref(language)]['firstNumber']);
  num1 = (rlsync.question('\t'));

  while (isValidNum(num1)) {
    prompt(MESSAGES[setLangPref(language)]['numberError']);
    num1 = (rlsync.question('\t'));
  }

  prompt(MESSAGES[setLangPref(language)]['secondNumber']);
  num2 = (rlsync.question('\t'));

  while (isValidNum(num2)) {
    prompt(MESSAGES[setLangPref(language)]['numberError']);
    num2 = (rlsync.question('\t'));
  }

  prompt(MESSAGES[setLangPref(language)]['selectOperator']);
  operator = rlsync.question('\t');

  while (!isValidOperator((operator))) {
    prompt(MESSAGES[setLangPref(language)]['operatorError']);
    operator = rlsync.question('\t');
  }

  while (zeroDivError(operator)) {
    prompt(MESSAGES[setLangPref(language)]['zeroDivError']);
    operator = rlsync.question('\t');
  }

  // calculate results from input
  switch (operator) {
    case '+':
      result = (Number(num1) + Number(num2));
      break;
    case '-':
      result = (Number(num1) - Number(num2));
      break;
    case '*':
      result = (Number(num1) * Number(num2));
      break;
    case '/':
      result = (Number(num1) / Number(num2));
      break;
  }

  // display results
  // decimals set at two places
  // very large/small numbers to exponential form

  if (result.toString().length > 6) {
    console.log(`\n${num1} ${operator} ${num2} = ${result.toExponential(3)}\n`);
  } else if (Number.isInteger(result)) {
    console.log(`\n${num1} ${operator} ${num2} = ${result}\n`);
  } else {
    console.log(`\n${num1} ${operator} ${num2} = ${result.toFixed(3)}\n`);
  }

  prompt(MESSAGES[setLangPref(language)]['calcAgain']);
  playAgain = rlsync.question('\t');

} while (!playAgain);

prompt(MESSAGES[setLangPref(language)]['goodbye']);