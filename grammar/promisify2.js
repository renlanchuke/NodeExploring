'use strict';

function promisify() {

  const args = [...arguments];
  const fn = args[0];
  args.shift();
  return new Promise(function(resolve) {
    args.push(function(result) {
      resolve(result);
    });
    fn.apply(null, args);
  });


}

function test(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}

promisify(test, 1, 2).then(console.log);

// test(1,5,console.log);
