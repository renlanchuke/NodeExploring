'use strict';

try {
  // eslint-disable-next-line no-undef
  variable = 11;
} catch (e) {
  console.log('->FORBIDDEN: default assign a non declaration' +
  'variable to global (global or window)');
  if (e instanceof ReferenceError)
    console.log(e);
}

try {
  // eslint-disable-next-line no-global-assign
  NaN = '11';
} catch (e) {
  console.log('->FORBIDDEN: assign to a read only property');
  console.log(e);
}

var readonlyObj = {};
Object.defineProperty(readonlyObj, 'x', { value: 11, writable: false });
try {
  readonlyObj.x = 22;
} catch (e) {
  console.log(e);
}

var getterOnlyObj = { get x() { return 11; } };

try {
  getterOnlyObj.x = 22;
} catch (e) {
  console.log('->FORBIDDEN: assign to a getter only property');
  console.log(e);
}

var peObj = {};
Object.preventExtensions(peObj);

try {
  peObj.x = '22';
  console.log(peObj.x);
} catch (e) {
  console.log('->FORBIDDEN: extend a non extensible object');
  console.log(e);
}

try {
  delete Object.prototype;
} catch (e) {
  console.log('->FORBIDDEN: delete a non delete property');
  console.log(e);
}

// FORBIDDEN: duplicate paramerter in function
//     function test(a,a,c){
//         return a+c;
//     }


// FORBIDDEN: Octal literals are not allowed in strict mode
// use 0o15 instead
// var sum=015+197+142;
// console.log(sum);
