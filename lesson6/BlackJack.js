
const fs = require('fs');
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

let deck; 
  
const BET_AMOUNT = 5;
const BUY_IN_AMOUNT = 100;

let personHand=[];
let dealerHand=[];
let PLAYER_BALANCE;


function initializeHand(playerHand) {
  return [];
}

function shuffleCards(){
  deck = Object.keys(CARDS).reduce((combine,elem) => {
  return combine.concat(Object.keys(CARDS[elem]))}, []);
  
  for (let i = deck.length; i > 0; i--){
    let randNum = Math.floor(Math.random() * i);
    deck.push(deck.splice(randNum, 1)[0]);
  }
  return deck;
}

deck = shuffleCards();

function cutDeck(){
  
}

function dealHand(number, deck) {
  for (let i = number; i>0; i--){
    personHand.push(deck.shift());
    dealerHand.push(deck.shift());
  }
}


function displayCards(number) {
  if (number === 1){
    console.log(`\nPlayer Cards: ${personHand.join(' | ')} | Hand = ${countHandValue(personHand)}\n`);
    console.log(`Dealer Card:  ${dealerHand[1]}\n\n`);
  } else {
    console.log(`\nPlayer Cards: ${personHand.join(' | ')} | Hand = ${countHandValue(personHand)}\n`);
    console.log(`Dealer Card: ${dealerHand.join(' | ')} | Hand = ${countHandValue(dealerHand)}\n\n`);
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

function isBlackJack(personHand) {
  return personHand.every(card => findCardValue(card) === 10 || 
    Array.isArray(findCardValue(card)));
}

function countAceHandValue(hand) {
  let handValue = 0;
  let tempValue = (hand.filter(card => !isAce(card))).reduce((sum, card) => {
    return sum + findCardValue(card)}, 0);
  if (tempValue > 10) {
    handValue = tempValue + 1;
  } else {
    handValue = tempValue + 11;
  }
  return handValue;
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
  let playerInput = rlsync.question(`Press 'h' for a hit and 's' to stay: `);
  if (playerInput.toLowerCase() === 's' ) {
    return false;  
  } else {
  return true;
  }
}

function hitOrStay(player, deck){
  if (player === 'person'){
    return personHand.push(deck.shift());
  } else {
    return dealerHand.push(deck.shift());
  }
}

function isBusted(hand) {
  if (countHandValue(hand) > 21) {
    return true;
  }
  return false;
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
    if (countHandValue(personHand) === countHandValue(dealerHand)) {
      return 'draw';
    }
  }
}

function loseBet() {
  
}

function collectPayOut() {
  
}

function newHand() {
  let playerInput = rlsync.question(`Press 'p' to play a new hand or 'q' to quit playing: `);
  if (playerInput.toLowerCase() === 'q' ) return false;  
  return true;  
}

function cashOut() {
  let playerInput = rlsync.question(`Press 'p' to play a new hand or 'q' to quit playing: `);
  if (playerInput.toLowerCase() === 'q' ) return false;  
  return true;  
}

function displayResults() {
  let result = determineHandWinner(personHand, dealerHand); 
  if (result === 'person') {
    console.log('Congrats, you won\n');
   } else if (result === 'dealer'){
     console.log('Sorry, you lost\n');
   } else {
     console.log("It's a draw!\n")
   }
}



// Game Play

  
  do {
   personHand = [];
   dealerHand = [];
   shuffleCards();
  
  dealHand(2, deck);
  displayCards(1);
  
  if (isBlackJack(personHand)) {
     continue;
   }
   
  while (playerChoice() === true) {
       hitOrStay('person', deck);
       displayCards(1);
       if (isBusted(personHand)){
         console.log('Busted!\n');
         break;
       }
  }
  if (!isBusted(personHand)) {
    displayCards(2); 
    while (!isBusted(dealerHand) && (countHandValue(dealerHand) < 17)) {
      hitOrStay('dealer', deck);
      displayCards(2)
     }
  }

  displayResults();


} while (newHand());



/*
     hitOrStay(personHand);
     countHandValue(personHand);
     if (isBusted(personHand)) {
       loseBet();
       break;
     }
     
     displayCards(2);
     countHandValue(dealerHand);
     hitOrStay(dealerHand);
     if (isBusted(dealerHand)) {
       collectPayOut();
       break;
     }
     
     determineHandWinner();
     if (personHand) {
       collectPayOut();
     } else {
       loseBet();
     }
*/


