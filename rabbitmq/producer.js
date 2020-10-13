const amqp = require('amqplib');

class Producer {
  constructor() {
    this.conn;
    this.channel;
  }
  async sendQueueMsg(queueName, msg, errCallBack) {
    this.conn = await amqp.connect();
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(queueName);
    await this.channel.sendToQueue(queueName, new Buffer(msg), {
      persistent: true
    });
  }

  close() {
    if (this.channel) {
      this.channel.close();
    }
  }
}

module.exports = Producer;
