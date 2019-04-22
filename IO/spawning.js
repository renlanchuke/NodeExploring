'use strict';

/** *************
 * spawn创建了一个子进程，并返回一个进程描述符，即句柄
 * 进程句柄都有一个stdout属性，以流的形式输出进程的标准输出信息
 * 可以在这个输出流上绑定事件，监视每个输出
 * *************** */
var spawn = require('child_process').spawn;

// Tail命令会监控一个文件（不存在则退出），
// 如果文件发生改变则在标准输出流中输出文件内容
var child = spawn('tail', ['-f', './test']);

child.stdout.on('data', function(data) {
  console.log('tail output: ' + data);
});

// 终止进程
setTimeout(() => {
  // 默认发送SIGTERM
  child.kill();
}, 1000);

// 监听子进程退出事件
child.on('exit', (code, signal) => {
  if (code) {
    // 正常退出会有一个退出码，0为正常退出，非0一般表示错误
    console.log('child process terminated with code ' + code);
  } else {
    // 非正常退出，输出退出信号
    console.log('child process terminated with signal ' + signal);
  }
});

// 创建子进程2
var child2 = spawn('node', ['add1']);

// 产生一个随机数
var number = Math.ceil(Math.random() * 1000);

// 向子进程输入一个数字
child2.stdin.write(number + '\n');
// 获取子进程的标准输出
child2.stdout.once('data', (data) => {
  console.log('child2 get number ' + number + ' replies with ' + data);
});

child.stderr.on('data', (data) => {
  process.stdout.write(data);
});

setTimeout(() => {
  // 可以发送一个信号终止进程
  child2.kill('SIGINT');
}, 5000);
