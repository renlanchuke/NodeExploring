var ampq = require('amqplib');

var connection = ampq.createConnection({ url: 'amqp:127.0.0.1:5672' });

var bStop = false;

connection.on('ready', function() {
  connection.queue('topic', { durable: true, autoDelete: false }, function(queue) {
    // console.log('Queue ' + queue.name + ' is open!');
    queue.bind('topic', 'topic');
    queue.subscribe(function(message, header, deliveryInfo) {
      console.log(message.data.toString());
    });

  });
});
