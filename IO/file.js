var path = require('path');
var fs = require('fs');

var str1 = "/home";
var str2 = "/git";
var str3 = "/NodeExploring";
//路径拼接
var dirPath = path.join(str1, str2, str3);
console.log(dirPath);

var str4 = "./IO";
//path.resolve将多个路径解析未一个规范的绝对路径
var dirPath2 = path.resolve(dirPath, str4);
console.log(dirPath2)

var str5 = "aaa";
var str6 = "./bbb";
//如过解析的路径不是绝对路径则将，将将当前路径加到前面构成绝对路径
var dirPath3 = path.resolve(str5, str6);
console.log(dirPath3);

var str7 = "/home/renlan/tem";
//计算一个路径到另一个路径的相对路径
var dirPath4 = path.relative(dirPath, str7);
console.log(dirPath4);

var str8 = "/home/renlan/tem.txt";
//获取文件所在目录
var dirPath5 = path.dirname(str8);
console.log(dirPath5);

//获取文件的扩展名
var extName = path.extname(str8);
console.log(extName);

//获取文件名,第二个参数未文件的扩展名
var fileName = path.basename(str8, extName);
console.log(fileName);

//获取系统路径的分隔符unix:'/', windows:'\\'
var sep=path.sep;
console.log(sep);
