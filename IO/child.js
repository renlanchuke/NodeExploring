'use strict';

var number = process.env.number;
// 进程读取的所有环境变量值都是string
console.log(typeof (number));
number = parseInt(number, 10);
console.log(typeof (number));
