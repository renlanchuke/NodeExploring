'use strict';

var childProcess = require('child_process');
var spawn = childProcess.spawn;


// exec设置可选的参数
var options = {
  timeout: 10000,  // 超时
  killSignal: 'SIGKILL', // 超时或超出缓存发送终止信号给子进程
};

// exec("node barnyard2_proxy.js", options, (err, stdout, stderr) => {
//     if (err) throw err;
//     console.log("stdout: ", stdout);
//     console.log("stderr: " + stderr);
// });

function barnyard_exec() {

  const barnyard2_proxy = spawn('node', ['barnyard2_proxy.js'], options);
  barnyard2_proxy.stdout.on('data', (data) => {
    console.log('barnyard2_proxy %s\n', data);

  });

  barnyard2_proxy.stderr.on('error', (err) => {
    console.log(err);
  });

  barnyard2_proxy.stderr.on('end', (err) => {
    console.log(err);
  });

  barnyard2_proxy.on('close', (code) => {
    console.log(code);
  });

}


function elastic_exec() {

  const elasticsearch_proxy = spawn('node', ['elasticsearch_proxy.js'], options);
  elasticsearch_proxy.stdout.on('data', (data) => {
    console.log('elasticsearch_proxy %s', data);

  });

  elasticsearch_proxy.stderr.on('error', (err) => {
    console.log('elasticsearch_proxy err: %s', err);
  });

  elasticsearch_proxy.stderr.on('end', () => {
    console.log('elasticsearch_proxy end');
  });

  elasticsearch_proxy.on('elasticsearch_proxy close code: %d', (code) => {
    console.log(code);
  });

}


barnyard_exec();
elastic_exec();

// exec("node elasticsearch_proxy.js", options, (err, stdout, stderr) => {
//     if (err) throw err;
//     console.log("stdout: ", stdout);
//     console.log("stderr: " + stderr);
// });
