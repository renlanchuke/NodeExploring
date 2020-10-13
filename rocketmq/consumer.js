const Consumer = require('rocketmq').Consumer;
const http = require('http');
const httpServer = http.createServer();
const consumer = new Consumer({
  namesrvAddr: 'localhost:9876', // for rocket mq
//   accessKey: 'your-accesskey',  // for aliyun-ons
//   secretKey: 'your-secretkey',  // for aliyun-ons
//   onsAddr: '',                   // for aliyun-ons
  httpclient: httpServer,
  consumerGroup: 'pier',  // for aliyun-ons
  isBroadcast: false, // Default is false, that mean messages will be pushed to consumer cluster only once.
});

consumer.subscribe('test', '*', function*(msg) {
  console.log(`receive message, msgId: ${msg.msgId}, body: ${msg.body.toString()}`);
});

consumer.on('error', (err) => console.log(err));
