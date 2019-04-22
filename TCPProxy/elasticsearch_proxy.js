'use strict';

var net = require('net');
var config = require('./config');

// var count = 0;

var dest = config.elasticsearch_remote_destination;


// Function combineStreamOperations(data, next) {
//     Promise.join(pass1, pass2, function (pass1, pass2) { //perform n operations on the same data
//         next(); //request more
//     });
// }

net.createServer(function(source_socket) {

  // source_socket.on("data", (data) => {
  //     process.stdout(data);
  //     source_socket.end();
  // });

  var dest_socket = net.createConnection({
    host: dest[0].ip,
    port: dest[0].port
  });

  var local_dest_socket = net.createConnection({
    host: dest[1].ip,
    port: dest[1].port
  });


  source_socket.on('end', function() {
    console.log('source_socket end');
  });

  local_dest_socket.on('end', function() {
    console.log('local dest socket end');
  });

  dest_socket.on('end', function() {
    console.log('remote dest socket end');
  });

  source_socket.on('data', function(data) {
    // console.log(data.toString());
    dest_socket.write(data);
    local_dest_socket.write(data);
  });


  dest_socket.on('data', function(data) {
    // console.log(data.toString());
    source_socket.write(data);
  });

  local_dest_socket.on('data', function(data) {
    // console.log(data.toString());
    // source_socket.write(data);

  });

}).listen(config.elastic_local_port);
