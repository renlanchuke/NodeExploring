'use strict';

var net = require('net');

var server = net.createServer();

var port = 4001;

server.on('listening', function() {
  console.log('Server is listening on port', port);
});

server.on('connection', function(socket) {
  console.log('Server has a new connection');
  socket.end();
});

server.on('close', function() {
  console.log('Server is now closed');
});

server.on('error', function(err) {
  console.log('Error occurred:', err.message);
});

server.listen(port);
