'use strict';

var str1 = '12313131231231312312';
var str2 = '123131312312312312312';
var str3 = '123133333333333333333123';
var str4;

var time1 = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
  str4 = str1 + str2 + str3;
}

var time2 = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
  str4 = str1.concat(str2).concat(str3);
}

var time3 = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
  str4 = `${str1}${str2}${str3}`;
}
var time4 = new Date().getTime();
console.log(time2 - time1);
console.log(time3 - time2);
console.log(time4 - time3);
console.log(str4);

// console.log(id);
