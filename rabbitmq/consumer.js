const amqp = require('amqplib');

class Consumer {
  constructor() {
    this.conn;
    this.channel;
  }
  async receiveQueueMsg(queueName, receiveCallBack, errCallBack) {
    if (!this.conn) {
      this.conn = await amqp.connect();
    }
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(queueName);
    this.channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const data = msg.content.toString();
        this.channel.ack(msg);
        receiveCallBack && receiveCallBack(data);
      }
    });
  }

  close() {
    if (this.channel) {
      this.channel.close();
    }
  }
}

module.exports = Consumer;
