var fs=require('fs');

var options={
    encoding:"utf8",  //发送的字符串编码格式
    fd:null,   //可以用一个文件描述符创建一个流，而不是路径
    bufferSize:null,  //每次读取的文件块大小，默认64k
    start:1,  //读取文件的起始字节
    end:5   // 读取文件的结束字节
}

var rs=fs.createReadStream('./test',options);

rs.on('data',(data)=>{
    console.log(data);
})

rs.on('end',function () {
    console.log('This stream has ended');
});

