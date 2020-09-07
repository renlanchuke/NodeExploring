let obj1 = { a: 1 };
let obj2 = { b: 2 };
let obj3 = { b: 3, c: 5 };

const obj = Object.assign(obj1, obj3, obj2);
console.log(obj);