const Producer = require('./producer.js');
const Consumer = require('./consumer.js');
const producer = new Producer();
const consumer = new Consumer();
// producer.sendQueueMsg('testQueue', 'my first message', (error) => {
//   console.log(error);
// });
consumer.receiveQueueMsg('testQueue', (msg) => {
  console.log('message: ', msg);
});
