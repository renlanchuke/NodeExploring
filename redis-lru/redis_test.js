'use strict';
const redis = require('redis');
const client = redis.createClient();

const args = ['myzset', 1, 'one', 2, 'two', 3, 'three', 99, 'ninety-nine'];

client.zadd(args, function(addError, addResponse) {
  if (addError) throw addError;
  console.log('added ' + addResponse + ' items.');
 
  // -Infinity and +Infinity also work
  const args1 = ['myzset', '+inf', '-inf'];
  client.zrevrangebyscore(args1, function(rangeError, rangeResponse) {
    if (rangeError) throw rangeError;
    console.log('response1', rangeResponse);
    // ...
  });

  const max = 3;
  const min = 1;
  const offset = 1;
  const count = 2;
  const args2 = ['myzset', max, min, 'WITHSCORES', 'LIMIT', offset, count];
  client.zrevrangebyscore(args2, function(rangeError, rangeResponse) {
    if (rangeError) throw rangeError;
    console.log('response2', rangeResponse);
    // ...
  });
});
