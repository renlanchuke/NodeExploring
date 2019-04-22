'use strict';

var fs = require('fs');
var net = require('net');

fs.readFile('./test', 'UTF-8', function(err, data) {
  if (err) throw err;
  var dest_socket = net.createConnection({
    host: 'localhost',
    port: 9200
  });

  dest_socket.write(data);

});
