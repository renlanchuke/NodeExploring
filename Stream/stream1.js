/******************
 * node.js中流是一个抽象的概念，在一个对象上如果我们可以连续的获取数据，
 * 可以把它看做可读流；如过可以连续写入数据可以看做可写流。例如，文件读写，
 * 进程的标准的输入输出，TCP套接字都是流
 * ********************/
var fs=require('fs');

//设置可选参数
var options={
    encoding:"utf8",  //发送的字符串编码格式 
    fd:null,   //可以用一个文件描述符创建一个流，而不必路径
    bufferSize:null,  //每次读取的文件块大小，默认64k
    start:1,  //读取文件的起始字节
    end:5   // 读取文件的结束字节
}

//创建可读流
var rs=fs.createReadStream('./test',options);

//监听data事件
rs.on('data',(data)=>{
    console.log(data);
});

//监听end事件
rs.on('end',function () {
    console.log('This stream has ended');
});

jiu