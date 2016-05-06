var spawn=require('child_process').spawn;

var child =spawn('tail',['-f','./test']);
/***************
 * spawn创建了一个子进程，并返回一个进程描述符，即句柄
 * 进程句柄都有一个stdout属性，以流的形式输出进程的标准输出信息
 * 可以在这个输出流上绑定事件，监视每个输出
 * ****************/
child.stdout.on('data',function (data) {
    console.log('tail output: '+ data);
});