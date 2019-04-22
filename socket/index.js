'use strict';

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var path = require('path');

app.listen(8000);
console.log(__dirname);
function handler(req, res) {
  fs.readFile(path.join(__dirname, '/index.html'),
              function(err, data) {
                if (err) {
                  res.writeHead(500);
                  return res.end('Error loading index.html');
                }
                res.writeHead(200);
                res.end(data);
              });
}

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
