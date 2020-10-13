const Producer = require('rocketmq').Producer;
const Message = require('rocketmq').Message;
const http = require('http');
const httpServer = http.createServer();

const producer = new Producer({
  namesrvAddr: 'localhost:9876', // for rocket mq
//   accessKey: 'your-accesskey',   // for aliyun-ons
//   secretKey: 'your-secretkey',    // for aliyun-ons
  producerGroup: 'pier',  // for aliyun-ons
  httpclient: httpServer,
});

producer.ready(() => {
  console.log('producer ready');
  const msg = new Message('test', // topic
                          'TagA', // tag
                          'Hello ONS !!! ' // body
  );

  producer.send(msg, (err, sendResult) => console.log(err, sendResult));
});
