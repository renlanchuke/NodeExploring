// redis封装
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {});
var client1 = redis.createClient(6379, '127.0.0.1', {});
client.on('error', function(err) {
  console.log('Redis Error:' + err);
});

client.on('ready', function(err) {
  // 准备就绪后订阅chat频道
  client1.subscribe('chat');
  client.subscribe('chat');
  console.log('订阅chat成功。');
  console.log('redis is ready ok');
});
client.on('connect', function() {
  console.log('redis connect ok');
});
// 监听订阅成功事件
client1.on('subscribe', function(channel, count) {
  console.log('client subscribed to ' + channel + ',' + count + ' total subscriptions');
});
// 收到消息后执行回调，message是redis发布的消息
client1.on('message', function(channel, message) {
  console.log('client1 接收到信息了' + message);
});
client.on('message', function(channel, message) {
  console.log('client接收到信息了' + message);
});
// 监听取消订阅事件
client1.on('unsubscribe', function(channel, count) {
  console.log('client unsubscribed from' + channel + ', ' + count + ' total subscriptions');
});

client.on('subscribe', function(channel, count) {
  console.log('client subscribed to ' + channel + ',' + count + ' total subscriptions');
});
