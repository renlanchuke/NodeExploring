'use strict';

const Promise = require('bluebird');
const co = Promise.coroutine;
const fs = require('fs');
const Thread = require('node-threadobject');
const thread = new Thread();
const readdirAsync = Promise.promisify(fs.readdir, fs);
const delayBySecAsync = Promise.promisify(thread.delayBySec, thread);

console.log('promise start');

const hco = co(function* () {
  console.log('co begin');

  const ret = yield readdirAsync(__dirname);
  console.log(ret);

  yield delayBySecAsync(1);

  console.log('co end');
});

hco().catch(function(e) {
  console.error(e);
});

console.log('hco end');
