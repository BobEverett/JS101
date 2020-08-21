let gameState = {
    '1': ' ',
    '2': 'X',
    '3': ' ',
    '4': ' ',
    '5': ' ',
    '6': ' ',
    '7': ' ',
    '8': ' ',
    '9': ' '
};


function drawBoard(){
  console.log(`        |         |         `);
  console.log(`   ${gameState['1']}    |    ${gameState['2']}    |    ${gameState['3']}    `);
  console.log(`________|_________|_________`);
  console.log(`        |         |         `);
  console.log(`   ${gameState['4']}    |    ${gameState['5']}    |    ${gameState['6']}    `);
  console.log(`________|_________|_________`);
  console.log(`        |         |         `);
  console.log(`   ${gameState['7']}    |    ${gameState['8']}    |    ${gameState['9']}    `);
  console.log(`        |         |         `);
}

drawBoard();