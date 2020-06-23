// import functions and data from external files
const fModules = require("./functionModules.js");
const fs = require('fs');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./loanCalculatorMessages.json', 'utf8');
const MESSAGES = JSON.parse(fileData);

let loanAmount,
  monthlyPayment,
  newLoan,
  userName;

function isNotNumber(num) {
  return num.trimStart === '' ||
  Number.isNaN(Number(num)) ||
  Number(num) <= 0;
}

function getLoanAmount() {
  fModules.prompt(MESSAGES['loan']);
  loanAmount = rlsync.question('\t');

  while (isNotNumber(loanAmount)) {
    if (Number(loanAmount) < 0) {
      fModules.prompt(MESSAGES['negativeNumber']);
    } else {
      fModules.prompt(MESSAGES['loanAmountError']);
    }
    loanAmount = rlsync.question('>>\t');
  }
  return loanAmount;
}

function getAnnualInterestRate() {
  fModules.prompt(MESSAGES['interestRate']);
  let annualInterestRate = String((rlsync.question('\t')) / 100);

  while (isNotNumber(annualInterestRate)) {
    if (Number(annualInterestRate) < 0) {
      fModules.prompt(MESSAGES['negativeNumber']);
    } else {
      fModules.prompt(MESSAGES['interestRateError']);
    }
    annualInterestRate = String((rlsync.question('\t') / 100));
  }
  return annualInterestRate;
}

function getLoanDuration() {
  fModules.prompt(MESSAGES['loanLength']);
  let loanLengthYrs = (rlsync.question('\t'));
  while ((Number.isInteger(Number(loanLengthYrs)) === false ) ||
      (isNotNumber(loanLengthYrs)) ||
      (Number(loanLengthYrs) > 30 )) {
        if (!Number.isInteger(Number(loanLengthYrs))) {
          fModules.prompt(MESSAGES['loanLengthFloat']);
        } else if (Number(loanLengthYrs) > 30) {
          fModules.prompt(MESSAGES['loanLengthOver30']);         
        } else if ((Number(loanLengthYrs)) < 0) {
          fModules.prompt(MESSAGES['negativeNumber']);
        } else {
          fModules.prompt(MESSAGES['loanLengthError']);          
        }
    loanLengthYrs = (rlsync.question('\t'));
  }
  return loanLengthYrs;
}

function getMonthlyPayment(loanAmount, monthlyInterestRate, loanLengthMonths) {
  monthlyPayment = Number(loanAmount) *
  (monthlyInterestRate /
  (1 - Math.pow((1 + monthlyInterestRate), (-loanLengthMonths))));
  return monthlyPayment;
}

// Start Program

fModules.prompt(MESSAGES['welcome']);
userName = (rlsync.question('\t'));
fModules.prompt(MESSAGES['greeting'], userName.trimStart);


do {

  console.log('*'.repeat(50));

  monthlyPayment = getMonthlyPayment(Number(getLoanAmount()),
    (Number(getAnnualInterestRate()) / 12),
    (Number(getLoanDuration()) * 12));

  console.log('\nYour monthly payment is: $' +
    fModules.printAsCurrency(monthlyPayment.toFixed(2)));


  fModules.prompt(MESSAGES['calcAgain']);
  newLoan = rlsync.question('\t');

  while (newLoan.toLowerCase() !== 'y' && newLoan.toLowerCase() !== 'q') {
    fModules.prompt(MESSAGES['invalidResponse']);
    newLoan = rlsync.question('\t');
  }
  console.clear();
} while (newLoan !== 'q');

console.clear();
fModules.prompt(MESSAGES['goodbye']);