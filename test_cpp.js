var adder = require('./lib/src/build/Release/addNums');
var simple = require('./lib/src/build/Release/helloWorld');

//console.log(adder.addNums());
console.log(adder.addNums(2, 3) + 4);
console.log(simple.helloWorld());