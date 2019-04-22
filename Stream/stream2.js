'use strict';

// 生产者大于消费者，就会缓存数据
var http = require('http');
var fs = require('fs');

/** *************
console.log('http server listen on 3000');
http.createServer((req, res) => {
    var rs = fs.createReadStream('./test');

    rs.on('data', (data) => {
        res.write(data);
    });

    rs.on('end', function () {
        res.end();
    });
}).listen(3000);
***************** */

console.log('http server listen on 3000');
http.createServer((req, res) => {
  var rs = fs.createReadStream('./test');

  // 如果网络流太慢则暂停读文件流，避免数据填满缓存区
  rs.on('data', (data) => {
    if (!res.write(data)) {
      rs.pause();
    }
  });
  // 如果流刷新了缓冲区，会发送drain事件，此时恢复读文件数据流
  res.on('drain', function() {
    rs.resume();
  });

  // 读文件流结束，网络流也结束
  rs.on('end', function() {
    res.end();
  });
}).listen(3000);


/** *****************
 * 可用pipe集成上面的功能
 * readable.pipe(destination[, options])
    destination <stream.Writable> The destination for writing data
    options <Object> Pipe options
        end <Boolean> End the writer when the reader ends. Default = true


http.createServer((req, res) => {
    var rs = fs.createReadStream('./test');

    //{end:false}避免rs结束时在可写流调用
    rs.pipe(res,{end:false});

    rs.on('end',function () {
        res.write("ALl is over");
        res.end();
    });
}).listen(3000);
******************** */
