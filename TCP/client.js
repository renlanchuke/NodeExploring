'use strict';

var net = require('net');

var HOST = 'localhost';
var PORT = 4011;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // 建立连接后立即向服务器发送数据，服务器将收到这些数据
  var i = 1;
  setInterval(() => {
    i++;
    client.write('I am Chuck ' + i + ' Norris!');
  }, 1000 * 5);


});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

  console.log('DATA: ' + data);
  // 完全关闭连接
  // client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
  console.log('Connection closed');
});
