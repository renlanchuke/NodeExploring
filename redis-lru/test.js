'use strict';
var redis = require('redis').createClient({
  host: 'localhost',
  port: '6379',
  retry_strategy: 3000
});
var lru = require('redis-lru');

var personCache = lru(redis, 5); // up to 5 items

personCache.set('john', { name: 'John Doe', age: 27 })
  .then(() => personCache.set('jane', { name: 'Jane Doe', age: 30 }))
  .then(() => personCache.get('john'))
  .then(console.log) // Prints {name: 'John Doe', age: 27}
  .then(() => personCache.reset()); // clear the cache

var bandCache = lru(redis, { max: 2, namespace: 'bands', maxAge: 15000 }); // Use a different namespace and set expiration

bandCache.set('beatles', 'john, paul, george, ringo')
  .then(() => bandCache.set('zeppelin', 'jimmy, robert, john, bonzo'))
  .then(() => bandCache.get('beatles')) // Now beatles are the most recently accessed
  .then(console.log) // 'john, paul, george, ringo'
  .then(() => bandCache.set('floyd', 'david, roger, syd, richard, nick')) // Cache full, remove least recently accessed
  .then(() => bandCache.get('zeppelin'))
  .then(console.log); // Null, was evicted from cache