const Person = require(__dirname + '/className');
const employee = require(__dirname + '/employee');


const p1 = new Person('Bill',20);
const p2 = new employee('David',31,"D007")

console.log(p1);
console.log('' + p1);
console.log('' + p2);
console.log(p2);