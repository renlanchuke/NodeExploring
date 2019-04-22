'use strict';

var fs = require('fs');

exports.saveFile = function(data) {

  fs.open('./test', 'a', (err, fd) => {
    var buffer = new Buffer(data);
    var offset = 0;
    var length = buffer.length;
    var position = null;

    fs.write(fd,
             buffer,
             offset,
             length,
             position,
             (err, writen) => {
               if (err) throw err;
               console.log('write file successfully');
               console.log('write ' + writen + ' bytes');
               fs.close(fd, (err) => {
                 if (err) throw err;
               });
             });
  });
};
