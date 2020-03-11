'use strict';

const demo = require('./demo');

async function run() {
  const res = await demo.Create();
  console.log(res);
  return res;
}

run().then(console.log).catch((err) => {
  if (err) {
    console.log(err.body);
  }
});
