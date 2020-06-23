// import functions and data from external files
const fModules = require("./functionModules.js");
const fs = require('fs');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./loanCalculatorMessagesRefractored.json',
  'utf8');
const MESSAGES = JSON.parse(fileData);

let monthlyPayment,
  newLoan,
  userName;

function isNotNumber(num) {
  return num.trimStart === '' ||
    Number.isNaN(Number(num)) ||
    Number(num) <= 0;

}

function loanDurationError (num, type) {
  if (type === 'duration') {
    return !Number.isInteger(Number(num)) ||
    Number(num) > 30;
  } else {
    return false;
  }
}


function retrieveInput(inputType) {
  fModules.prompt(MESSAGES[inputType]['requestInput']);
  let input = rlsync.question('\t');

  while (isNotNumber(input) ||
  (loanDurationError(input, inputType))) {
    if (Number(input) < 0) {
      fModules.prompt(MESSAGES['global']['negativeNumber']);
    } else if (inputType === 'duration') {
      if (!Number.isInteger(Number(input))) {
        fModules.prompt(MESSAGES['duration']['noDecimal']);
      } else if (Number(input) > 30) {
        fModules.prompt(MESSAGES['duration']['over30']);
      }
    } else {
      fModules.prompt(MESSAGES['global']['invalidEntry']);
    }
    input = rlsync.question('>>\t');
  }
  return input;
}

function getMonthlyPayment(loanAmount, monthlyInterestRate, loanLengthMonths) {
  monthlyPayment = Number(loanAmount) *
  (monthlyInterestRate /
  (1 - Math.pow((1 + monthlyInterestRate), (-loanLengthMonths))));
  return monthlyPayment;
}

// Start Program

fModules.prompt(MESSAGES['global']['welcome']);
userName = (rlsync.question('\t'));
fModules.prompt(MESSAGES['global']['greeting'], userName.trimStart());


do {

  console.log('*'.repeat(50));

  monthlyPayment = getMonthlyPayment(Number(retrieveInput('loan')),
    ((Number(retrieveInput('apr')) / 100) / 12),
    (Number(retrieveInput('duration')) * 12));

  console.log('\nYour monthly payment is: $' +
    fModules.printAsCurrency(monthlyPayment.toFixed(2)));


  fModules.prompt(MESSAGES['global']['calcAgain']);
  newLoan = rlsync.question('\t');

  while (newLoan.toLowerCase() !== 'y' && newLoan.toLowerCase() !== 'q') {
    fModules.prompt(MESSAGES['global']['invalidResponse']);
    newLoan = rlsync.question('\t');
  }
  console.clear();
} while (newLoan.toLowerCase() !== 'q');

console.clear();
fModules.prompt(MESSAGES['global']['goodbye']);