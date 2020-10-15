
//const fs = require('fs');
const rlsync = require('readline-sync');
//const fileData = fs.readFileSync('./myBlackJackMessages.json', 'utf8');
//const MESSAGES = JSON.parse(fileData);


const CARDS = {
  hearts : { '2H' : 2, '3H': 3, '4H' : 4, '5H' : 5, '6H' : 6, '7H' : 7, '8H' : 8,
    '9H' : 9, '10H' : 10, 'JH' : 10, 'QH' : 10, 'KH' : 10, 'AH' : [10, 1]},
  diamonds : { '2D' : 2, '3D': 3, '4D' : 4, '5D' : 5, '6D' : 6, '7D' : 7, '8D' : 8,
    '9D' : 9, '10D' : 10, 'JD' : 10, 'QD' : 10, 'KD' : 10, 'AD' : [10, 1]},
  clubs : { '2C' : 2, '3C': 3, '4C' : 4, '5C' : 5, '6C' : 6, '7C' : 7, '8C' : 8,
    '9C' : 9, '10C' : 10, 'JC' : 10, 'QC' : 10, 'KD' : 10, 'AC' : [10, 1]},
  spades : { '2S' : 2, '3S': 3, '4S' : 4, '5S' : 5, '6S' : 6, '7S' : 7, '8S' : 8,
    '9S' : 9, '10S' : 10, 'JS' : 10, 'QS' : 10, 'KS' : 10, 'AS' : [10, 1]}
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
    console.log(`\nYour Cards: ${personHand.join(' | ')} | Hand = ${countHandValue(personHand)}\n`);
    console.log(`Dealer Cards:  ${dealerHand[1]} | ?\n\n`);
  } else {
    console.log(`\nYour Cards: ${personHand.join(' | ')} | Hand = ${countHandValue(personHand)}\n`);
    console.log(`Dealer Cards: ${dealerHand.join(' | ')} | Hand = ${countHandValue(dealerHand)}\n\n`);
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

function playerChoice() {
  let playerInput;
  do {
    playerInput = rlsync.question(`Press 'h' for a hit and 's' to stay: `);
    if ((!['h', 's'].includes(playerInput.toLowerCase()))) {
      console.log("\nInvalid input.  Enter and 'h' or 's' only.\n");
    }
  } while (!['h', 's'].includes(playerInput.toLowerCase()));

  if (playerInput.toLowerCase() === 's' ) {
    return false;
  } else {
    return true;
  }
}

function hitOrStay(player, deck) {
  if (player === 'person') {
    return personHand.push(deck.shift());
  } else {
    return dealerHand.push(deck.shift());
  }
}

function isBusted(hand) {
  return countHandValue(hand) > 21;
}

function determineHandWinner(personHand, dealerHand) {
  if (isBusted(personHand) && !isBusted(dealerHand)) return 'dealer';
  if (isBusted(dealerHand) && !isBusted(personHand)) return 'person';
  if (!isBusted(personHand) && !isBusted(dealerHand)) {
    if (countHandValue(personHand) > countHandValue(dealerHand)) {
      return 'person';
    }
    if (countHandValue(personHand) < countHandValue(dealerHand)) {
      return 'dealer';
    }
  }
  return 'draw';
}

function newHand() {
  let playerInput;
  do {
    playerInput = rlsync.question(`Press 'p' to play a new hand or 'q' to quit playing: `);
    if ((!['p', 'q'].includes(playerInput.toLowerCase()))) {
      console.log("\nInvalid input.  Enter and 'p' or 'q' only.\n");
    }
  } while (!['p','q'].includes(playerInput.toLowerCase()));

  if (playerInput.toLowerCase() === 'q' ) return false;
  return true;
}

function displayResults(personHand, dealerHand) {
  let result = determineHandWinner(personHand, dealerHand);
  if (result === 'person') {
    console.log('Good Job! You won.\n');
  } else if (result === 'dealer') {
    console.log('Sorry, the dealer won this hand.\n');
  } else {
    console.log("It's a draw!\n");
  }
  return result;
}

function pauseGame() {
  let playerInput;
  do {
    playerInput = rlsync.question(`Press 'r' when you're ready for the next hand to begin: `);
    if (playerInput.toLowerCase() !== 'r') {
      console.log("\nInvalid input.  Enter and 'r' to resume match: \n");
    }
  } while (playerInput.toLowerCase() !== 'r');
  console.clear();
}

function noMatchWinner(playerHandsWon, dealerHandsWon) {
  if ((playerHandsWon < 2) && dealerHandsWon < 2) {
    return true;
  }
  return false;
}

// Game Play
{
  let playerHandsWon = 0;
  let dealerHandsWon = 0;

  do {
    personHand = [];
    dealerHand = [];
    shuffleCards();

    dealHand(2, deck);
    displayCards(1);

    while (playerChoice()) {
      hitOrStay('person', deck);
      displayCards(1);
      if (isBusted(personHand)) {
        break;
      }
    }

    if (!isBusted(personHand)) {
      displayCards(2);
      while (!isBusted(dealerHand) && (countHandValue(dealerHand) < 17)) {
        hitOrStay('dealer', deck);
        displayCards(2);
      }
    }
    let result = displayResults(personHand, dealerHand);
    if (result === 'person') {
      playerHandsWon += 1;
    } else if (result === 'dealer') {
      dealerHandsWon += 1;
    }
    if (noMatchWinner(playerHandsWon, dealerHandsWon)) {
      console.log(`\nCurrent Score: You = ${playerHandsWon} | Dealer = ${dealerHandsWon}\n`);
      pauseGame();
    }
  } while (noMatchWinner(playerHandsWon, dealerHandsWon));

  console.log(`\nFinal Score: You = ${playerHandsWon} | Dealer = ${dealerHandsWon}\n`);
}
