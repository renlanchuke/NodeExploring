'use strict';

// path包含处理路径的方法
var path = require('path');
// fs模块包含所有文件操作函数
var fs = require('fs');

var str1 = '/home';
var str2 = '/git';
var str3 = '/NodeExploring';
// 路径拼接
var dirPath = path.join(str1, str2, str3);
console.log(dirPath);

var str4 = './IO';
// path.resolve将多个路径解析未一个规范的绝对路径
var dirPath2 = path.resolve(dirPath, str4);
console.log(dirPath2);

var str5 = 'aaa';
var str6 = './bbb';
// 如过解析的路径不是绝对路径则将，将将当前路径加到前面构成绝对路径
var dirPath3 = path.resolve(str5, str6);
console.log(dirPath3);

var str7 = '/home/renlan/tem';
// 计算一个路径到另一个路径的相对路径
var dirPath4 = path.relative(dirPath, str7);
console.log(dirPath4);

var str8 = '/home/renlan/tem.txt';
// 获取文件所在目录
var dirPath5 = path.dirname(str8);
console.log(dirPath5);

// 获取文件的扩展名
var extName = path.extname(str8);
console.log(extName);

// 获取文件名,第二个参数未文件的扩展名
var fileName = path.basename(str8, extName);
console.log(fileName);

// 获取系统路径的分隔符unix:'/', windows:'\\'
var sep = path.sep;
console.log(sep);

/** **********
 * 获取或目录信息
 * fs.stat() 返回一个stats对象
 *
 * atime "Access Time"
 * mtime "Modified Time"
 * ctime "Change Time"
 * birthtime "Birth Time"
 * ************ */
fs.stat('./test', function(err, stats) {
  if (err) throw err;
  // console.log(stats);
});

// 读取整个文件
fs.readFile('./test', 'UTF-8', function(err, data) {
  if (err) throw err;
  console.log('read whole file: ' + data);
});

/** *************
 * fs.write(fd, buffer, offset, length[, position], callback)
 * fd 文件指针
 * buffer 写入数据的缓存
 * offset 缓存写入时开始的地方
 * position 写入文件开始的地方，null表示从当前位置读取
 * callback 三个参数 (err, written, buffer)
 * written 写入的字节数
 * ********************** */
fs.open('./test', 'a', (err, fd) => {
  var buffer = new Buffer('Writing to this file');
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


/** *************
 * fs.read(fd, buffer, offset, length, position, callback)
 * buffer 写入数据的缓存
 * offset 缓存写入时开始的地方
 * length 读取的字节数
 * position 读取文件开始的地方，null表示从当前位置读取
 * callback 三个参数 (err, bytesRead, buffer)
 * ******************* */
fs.open('./test', 'r', (err, fd) => {
  if (err) throw err;
  var readBuffer = new Buffer(1024);
  var bufferOffset = 0;
  var bufferLength = readBuffer.length;
  var filePosition = 0;
  fs.read(fd,
          readBuffer,
          bufferOffset,
          bufferLength,
          filePosition,
          (err, readBytes, buffer) => {
            if (err) throw err;
            console.log('read ' + readBytes + ' bytes');
            if (readBytes > 0) {
              // 切分缓冲区，取出读入的数据部分
              console.log(buffer.slice(0, readBytes));
              console.log('read file from buffer: ' + buffer.slice(0, readBytes).toString());
            }
            // 关闭文件
            fs.close(fd, (err) => {
              if (err) throw err;
            });

          });
});
