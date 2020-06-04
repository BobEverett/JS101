/*

Ask the user for two numbers.
Ask the user for the type of operation to perform: add, subtract, multiply or divide.
Perform the calculation and display the result.

*/

// initialize variables num1, num2, result
let num1, num2, operator, result;

// ask the user to input first number and coerce input to a Number
let rlsync = require('readline-sync');
num1 = Number(rlsync.question('Enter a number: '));

// check if first number is valid
if ((typeof num1 !== 'number') || (!num1)) {
  throw 'Input is not a valid number\n';
}

// ask the user to input a second number and coerce input to a Number
num2 = Number(rlsync.question('Enter a second number: '));

//check if first number is valid
if ((typeof num2 !== 'number') || isNaN(num2)) {
  throw 'Input is not a valid number\n';
}

// ask user to enter a mathematical operator
operator = rlsync.question('Enter a mathematical operator ( + | - | * | / ): ');

// check for zero division error
if ((num2 === 0) && (operator === '/')) {
  throw 'Not allowed to divide by ZERO!\n';
}

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
    throw (`${operator} is not a valid operation\n`)
}

// display results; decimals displayed two places

Number.isInteger(result) ?
  console.log(`${num1} ${operator} ${num2} = ${result}`) :
  console.log(`${num1} ${operator} ${num2} = ${result.toFixed(3)}`);
