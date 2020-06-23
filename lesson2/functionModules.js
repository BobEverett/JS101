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

//test values:

//console.log(printAsCurrency((1234567891.23)));
//console.log(printAsCurrency(342342034));