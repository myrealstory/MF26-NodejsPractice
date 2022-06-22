const Person = require(__dirname + '/className');


const p1 = new Person('Bill',20);
const p2 = new Person('James');

console.log(p1);
console.log('' + p1);
console.log( JSON.stringify(p2 , null , 4));