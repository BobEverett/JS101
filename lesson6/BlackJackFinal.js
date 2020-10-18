const fModules = require("./functionModules.js");
const fs = require('fs');
const colors = require('colors');
const rlsync = require('readline-sync');
const fileData = fs.readFileSync('./blackJackMessages.json', 'utf8');
const MESSAGES = JSON.parse(fileData);


const CARDS = {
  hearts : { '2H' : 2, '3H': 3, '4H' : 4, '5H' : 5, '6H' : 6, '7H' : 7, '8H' : 8,
    '9H' : 9, '10H' : 10, 'JH' : 10, 'QH' : 10, 'KH' : 10, 'AH' : [11, 1]},
  diamonds : { '2D' : 2, '3D': 3, '4D' : 4, '5D' : 5, '6D' : 6, '7D' : 7, '8D' : 8,
    '9D' : 9, '10D' : 10, 'JD' : 10, 'QD' : 10, 'KD' : 10, 'AD' : [11, 1]},
  clubs : { '2C' : 2, '3C': 3, '4C' : 4, '5C' : 5, '6C' : 6, '7C' : 7, '8C' : 8,
    '9C' : 9, '10C' : 10, 'JC' : 10, 'QC' : 10, 'KD' : 10, 'AC' : [11, 1]},
  spades : { '2S' : 2, '3S': 3, '4S' : 4, '5S' : 5, '6S' : 6, '7S' : 7, '8S' : 8,
    '9S' : 9, '10S' : 10, 'JS' : 10, 'QS' : 10, 'KS' : 10, 'AS' : [11, 1]}
};

let personHand = [];
let dealerHand = [];
let deck;

function shuffleCards() {
  deck = Object.keys(CARDS).reduce((combine,elem) => {
    return combine.concat(Object.keys(CARDS[elem]));
  }, []);

  for (let cards = deck.length; cards > 0; cards--) {
    let randNum = Math.floor(Math.random() * cards);
    deck.push(deck.splice(randNum, 1)[0]);
  }
  return deck;
}

deck = shuffleCards();

function dealHand(number, deck) {
  for (let numCards = number; numCards > 0; numCards--) {
    personHand.push(deck.shift());
    dealerHand.push(deck.shift());
  }
}

function displayCards(number) {
  if (number === 1) {
    console.log(`\nYour Cards: ${personHand.join(' | ')}` +
      ` | Hand = ${countHandValue(personHand)}\n`);
    console.log(colors.green.bold(`Dealer Cards:  ${dealerHand[0]} | ?\n`));
  } else {
    console.log(`\nYour Cards: ${personHand.join(' | ')}` +
      ` | Hand = ${countHandValue(personHand)}\n`);
    console.log(colors.green.bold(`Dealer Cards: ${dealerHand.join(' | ')}` +
      ` | Hand = ${countHandValue(dealerHand)}\n`));
  }
}

function findCardValue(card) {
  let cardValue;
  for (const suit of Object.keys(CARDS)) {
    if (Object.keys(CARDS[suit]).includes(card)) {
      cardValue = CARDS[suit][card];
    }
  }
  return cardValue;
}

function isAce(card) {
  return Array.isArray(findCardValue(card));
}

function countAceHandValue(hand) {
  let tempValue = (hand.filter(card => !isAce(card))).reduce((sum, card) => {
    return sum + findCardValue(card);
  }, 0);
  let numAces = hand.filter(card => (isAce(card)));
  for (let num = numAces.length; num > 0; num--) {
    if (tempValue > 10) {
      tempValue += 1;
    } else {
      tempValue += 11;
    }
  }
  return tempValue;
}

function countHandValue(hand) {
  if (hand.some(card => isAce(card))) {
    return countAceHandValue(hand);
  } else {
    let handValue = 0;
    for (let card of hand) {
      handValue += findCardValue(card);
    }
    return (handValue);
  }
}

function hitOrStay() {
  let playerInput;
  do {
    playerInput = rlsync.question(fModules.prompt(colors.bold.italic(MESSAGES['userInput'])));
    if ((!['h', 's'].includes(playerInput.toLowerCase()))) {
      fModules.prompt(colors.red.italic(MESSAGES['invalidInput']));
    }
  } while (!['h', 's'].includes(playerInput.toLowerCase()));

  if (playerInput.toLowerCase() === 's' ) {
    return false;
  } else {
    return true;
  }
}

function newCard(player, deck) {
  if (player === 'person') {
    return personHand.push(deck.shift());
  } else {
    pauseGame();
    return dealerHand.push(deck.shift());
  }
}

function isBusted(hand) {
  return countHandValue(hand) > 21;
}

function determineHandWinner(personHand, dealerHand) {
  let playerBusted = isBusted(personHand);
  let dealerBusted = isBusted(dealerHand);

  if (playerBusted) return 'dealer';
  if (dealerBusted) return 'person';

  if (!playerBusted && !dealerBusted) {
    if (countHandValue(personHand) > countHandValue(dealerHand)) {
      return 'person';
    }
    if (countHandValue(personHand) < countHandValue(dealerHand)) {
      return 'dealer';
    }
  }
  return 'draw';
}

function displayHandResult(personHand, dealerHand) {
  let result = determineHandWinner(personHand, dealerHand);

  if (result === 'person') {
    fModules.prompt(colors.brightYellow.bold.italic(MESSAGES['youWonHand']));
  } else if (result === 'dealer') {
    fModules.prompt(colors.brightYellow.bold.italic(MESSAGES['dealerWonHand']));
  } else {
    fModules.prompt(colors.brightYellow.bold.italic(MESSAGES['draw']));
  }
  return result;
}

function pauseGame() {
  let playerInput;
  do {
    playerInput = rlsync.question(fModules.prompt(colors.brightBlue.bold(MESSAGES['nextPlay'])));
    if (playerInput.toLowerCase() !== 'n') {
      fModules.prompt(colors.brightBlue.bold(MESSAGES['invalidEntry']));
    }
  } while (playerInput.toLowerCase() !== 'n');
  console.clear();
}

function checkForMatchWinner(playerHandsWon, dealerHandsWon) {
  if ((playerHandsWon < 5) && dealerHandsWon < 5) {
    return true;
  }
  return false;
}

function displayMatchScore(playerHandsWon, dealerHandsWon) {
  if (checkForMatchWinner(playerHandsWon, dealerHandsWon)) {
    fModules.prompt(colors.bold(MESSAGES['currentScore'] +
       ` You = ${playerHandsWon} | Dealer = ${dealerHandsWon}\n`));
    pauseGame();
  } else {

    console.log('$'.repeat(80));
    fModules.prompt(colors.red.bold(MESSAGES['finalScore'] +
       ` You = ${playerHandsWon} | Dealer = ${dealerHandsWon}\n`));
    if (playerHandsWon > dealerHandsWon) {
      fModules.prompt(MESSAGES['youWonMatch']);
    } else {
      fModules.prompt(MESSAGES['dealerWonMatch']);
    }
    console.log('$'.repeat(80) + '\n');
  }
}

// Game Play
{
  fModules.prompt(colors.bold(MESSAGES['greeting']));
  let playerHandsWon = 0;
  let dealerHandsWon = 0;

  do {
    personHand = [];
    dealerHand = [];
    shuffleCards();

    dealHand(2, deck);
    displayCards(1);

    while (hitOrStay()) {
      newCard('person', deck);
      displayCards(1);
      if (isBusted(personHand)) {
        break;
      }
    }

    if (!isBusted(personHand)) {
      displayCards(2);
      while (!isBusted(dealerHand) && (countHandValue(dealerHand) < 17)) {
        newCard('dealer', deck);
        displayCards(2);
      }
    }

    let result = displayHandResult(personHand, dealerHand);

    if (result === 'person') {
      playerHandsWon += 1;
    } else if (result === 'dealer') {
      dealerHandsWon += 1;
    }

    displayMatchScore(playerHandsWon, dealerHandsWon);

  } while (checkForMatchWinner(playerHandsWon, dealerHandsWon));
}
