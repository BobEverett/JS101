/*

Ask the user for two numbers.
Ask the user for the type of operation to perform: add, subtract, multiply or divide.
Perform the calculation and display the result.

*/


// checks to see if input is either 0 or a valid number
function isValidNum(num) {
  if (num === 0) {
    return true
  }
  else if ((typeof num !== 'number') || (!num)) {
    console.log('\nInvalid number, try again\n')
    return false;
  }
  else {
    return true;
  }
}

// checks to see if operator is in the set of valid operators
function isValidOperator(operator) {
  let validOperators = ['*', '/', '+', '-']
  for (let i = 0; i <= validOperators.length - 1; i++) {
    if (operator === validOperators[i]) {
      return true
    }
  }
  console.log('\nInvalid operator, try again\n');
  return false
}

//checks if the operator causes a zero division error
function zeroDivError(operator) {
  if ((num2 === 0) && (operator === '/')) {
    console.log('\nCannot divide by zero! Try again\n')
    return false
  }
  return true
}


// begin main program
let num1, num2, operator, result, playAgain;
let rlsync = require('readline-sync');

do { //allows user to keep using calculator or to quit

  do {
    num1 = Number(rlsync.question('\nEnter number #1: '));
  } while (!isValidNum(num1))


  do {
    num2 = Number(rlsync.question('Enter number #2: '));
  } while (!isValidNum(num2))


  do {
    operator = rlsync.question('Enter a mathematical operator ( + | - | * | / ): ');
  } while (!isValidOperator(operator) || !zeroDivError(operator))


  // calculate results from input
  switch (operator) {
    case '+':
      result = (num1 + num1);
      break;
    case '-':
      result = (num1 - num2);
      break;
    case '*':
      result = (num1 * num2);
      break;
    case '/':
      result = (num1 / num2);
      break;
    default:
      throw "Unknown Error";

  }

  // display results; decimals set at two places; very large/small numbers to exponential form
  if (result.toString().length > 6) {
    console.log(`\n${num1} ${operator} ${num2} = ${result.toExponential(3)}\n`);
  }
  else {
    Number.isInteger(result) ?
      console.log(`\n${num1} ${operator} ${num2} = ${result}\n`) :
      console.log(`\n${num1} ${operator} ${num2} = ${result.toFixed(3)}\n`);
  }

  playAgain = rlsync.question('\nPress enter to keep going, or press any letter to stop: ');

} while (!playAgain)

console.log('\nSee you later!\n');
