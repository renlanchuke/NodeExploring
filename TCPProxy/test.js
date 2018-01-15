var fs = require('fs');
var config = require('./config');
var net = require('net');

var dest = config.elasticsearch_remote_destination;
fs.readFile('./test', 'UTF-8', function (err, data) {
    if (err) throw err;
    var dest_socket = net.createConnection({
        host: "localhost",
        port: 9200
    });

    dest_socket.write(data);

});







