/* helper function to print a number in US dollar format
including a comma separating thousands position*/

module.exports.printAsCurrency = function(value) {
  let start;

  if (typeof value !== 'string') {
    value = String(value);
  }

  let arrayValues = value.split('');

  if (value.includes('.')) {
    start = value.indexOf('.');
  } else {
    start = arrayValues.length;
  }

  for (let index = 3; index < start; index += 3) {
    arrayValues.splice((start - index), 0, ',');
  }

  return arrayValues.join('');
};


// helper function to make output more attractive
module.exports.prompt = function(message, name = '') {
  console.log(`\n==> ${message} ${name}`);
};


// helper function to find the number of occurances of a string within a string

function charCount(text, substr) {
  let count = 0;
  let position = text.indexOf(substr);
  while (text.indexOf(substr, position) !== -1) {
    count++;
    position + 1;
  }
  return count;
}

console.log(charCount('Robert John Everett', 'e'));

//test values:

//console.log(printAsCurrency((1234567891.23)));
//console.log(printAsCurrency(342342034));