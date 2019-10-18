'use strict';

function test(...args) {
  console.log(args);
  console.log(Array.isArray(arguments));
  console.log(arguments.length);
  console.log(...arguments);
  const args1 = Array.prototype.slice.call(arguments);
  console.log(args1);
  const args2 = [].slice.call(arguments);
  console.log(args2);

  // ES2015
  const args3 = Array.from(arguments);
  console.log(args3);
  const args4 = [...arguments];
  console.log(args4);
}

test(1, 2, 3);
