var net = require('net');
var config = require("./config");
pass = require('stream').PassThrough;
streamz = require('streamz').PassThrough;
var Promise = require('bluebird');

pass1 = new pass();
pass2 = new pass();


// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
// var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;
// var addr = {
//     from: addrRegex.exec(process.argv[2]),
//     to: addrRegex.exec(process.argv[3])
// };

// if (!addr.from || !addr.to) {
//     console.log('Usage: <from> <to>');
//     return;
// }

var dest = config.remote_destination;

net.createServer(function (source_socket) {
    var dest_socket = net.createConnection({
        host: dest[0].ip,
        port: dest[0].port
    });

    var local_dest_socket = net.createConnection({
        host: dest[1].ip,
        port: dest[1].port
    });

    source_socket.pipe(pass1);
    source_socket.pipe(pass2);


    pass1.pipe(dest_socket);
    pass2.pipe(local_dest_socket);

    dest_socket.pipe(source_socket);
    local_dest_socket.pipe(process.stdout);
}).listen(config.local_port);