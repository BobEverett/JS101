/*
Ask the user for two numbers.
Ask the user for the type of operation to perform: add,
subtract, multiply or divide.
Perform the calculation and display the result.
*/

// declare initial variables
let num1, num2, operator, result, playAgain;
const rlsync = require('readline-sync');


// checks to see if input is a valid number
/*function isValidNum(num) {
  if (num === 0) {
    return true;
  } else if ((typeof num !== 'number') || (!num)) {
    console.log('\nInvalid number, try again\n');
    return false;
  } else {
    return true;
  }
}*/

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
function prompt(message) {
  console.log(`\n==> ${message}`);
}


// begin main program
prompt('Welcome to Calculator!');

do { //allows user to keep using calculator or to quit
  prompt('Enter your first number:');
  num1 = (rlsync.question('\t'));
  while (isValidNum(num1)) {
    prompt('Hmm... that doesn\'t look like a valid number.');
    num1 = (rlsync.question('\t'));
  }

  prompt('Enter your second number:');
  num2 = (rlsync.question('\t'));

  while (isValidNum(num2)) {
    prompt('Hmm... that doesn\'t look like a valid number.');
    num2 = (rlsync.question('\t'));
  }

  prompt('Enter a mathematical operator ( + | - | * | / ): ');
  operator = rlsync.question('\t');

  while (!isValidOperator((operator))) {
    prompt('Hmm... that doesn\'t look like a valid operator');
    operator = rlsync.question('\t');
  }

  while (zeroDivError(operator)) {
    prompt('Hmm... can\'t divide by zero. Try again');
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

  prompt('Press enter to keep going, or press any letter to stop: ');
  playAgain = rlsync.question('\t');

} while (!playAgain);

prompt('See you later!');