var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {});

client.on('ready', function(err) {
  client.publish('chat', 'successful', function(err, result) {
    console.log('订阅结果');
    console.log(result);
  });
});
