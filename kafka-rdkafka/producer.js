var Kafka = require('node-rdkafka');

var producer = new Kafka.Producer({
  // 'debug' : 'all',
  'metadata.broker.list': 'localhost:9092',
  'dr_cb': true  // Delivery report callback
});

var topicName = 'test';

// Logging debug messages, if debug is enabled
producer.on('event.log', function(log) {
  console.log(log);
});

// Logging all errors
producer.on('event.error', function(err) {
  console.error('Error from producer');
  console.error(err);
});

// Counter to stop this sample after maxMessages are sent
var counter = 0;
var maxMessages = 10;

producer.on('delivery-report', function(err, report) {
  console.log('delivery-report: ' + JSON.stringify(report));
  counter++;
});

// Wait for the ready event before producing
producer.on('ready', function(arg) {
  console.log('producer ready.' + JSON.stringify(arg));

  for (var i = 0; i < maxMessages; i++) {
    var value = Buffer.from('value-' + i);
    var key = 'key-' + i;
    // If partition is set to -1, librdkafka will use the default partitioner
    var partition = -1;
    var headers = [
      { header: 'header value' }
    ];
    producer.produce(topicName, partition, value, key, Date.now(), '', headers);
  }

  // Need to keep polling for a while to ensure the delivery reports are received
  var pollLoop = setInterval(function() {
    producer.poll();
    if (counter === maxMessages) {
      clearInterval(pollLoop);
      producer.disconnect();
    }
  }, 1000);

});

producer.on('disconnected', function(arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg));
});

// Starting the producer
producer.connect();
