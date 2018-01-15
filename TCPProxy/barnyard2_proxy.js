var net = require('net');
var config = require("./config");
pass = require('stream').PassThrough;
var domain = require('domain');
// var streamz = require('streamz').PassThrough;
// var Promise = require('bluebird');


pass1 = new pass();
pass2 = new pass();



var dest = config.barnyard2_remote_destination;


// function combineStreamOperations(data, next) {
//     Promise.join(pass1, pass2, function (pass1, pass2) { //perform n operations on the same data
//         next(); //request more
//     });
// }




net.createServer(function (source_socket) {


    var dest_socket = net.createConnection({
        host: dest[0].ip,
        port: dest[0].port
    });

    dest_socket.on("error", function (err) {
        dest_socket = net.createConnection({
            host: dest[1].ip,
            port: dest[1].port
        });
    })
    var local_dest_socket = net.createConnection({
        host: dest[1].ip,
        port: dest[1].port
    });

    //source_socket.pipe(streamz(combineStreamOperations));

    source_socket.pipe(pass1);
    source_socket.pipe(pass2);



    pass1.pipe(dest_socket);
    pass2.pipe(local_dest_socket);



    dest_socket.pipe(process.stdout);
    //local_dest_socket.pipe(source_socket);

    // source_socket.on('data', (data) => {
    //     local_dest_socket.write(data);
    //     dest_socket.write(data);

    // });
    // source_socket.pipe(local_dest_socket);
    // local_dest_socket.pipe(source_socket)
}).listen(config.barnyard2_local_port);