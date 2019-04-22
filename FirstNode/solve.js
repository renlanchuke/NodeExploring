'use strict';

// 加载求方程根模块
var quad = require('./quadratic');
// prompt是由一个命令行提示工具
var prompt = require('prompt');

prompt.get(['a', 'b', 'c'], function(err, result) {
  if (err) { return Error(err); }

  console.log('变量被赋值为:');
  console.log('a: ' + result.a);
  console.log('b: ' + result.b);
  console.log('c:' + result.c);

  // 求根，输出结果
  quad(result.a, result.b, result.c, function(err, quadsolve) {
    if (err) {
      console.log(err);
    } else {
      console.log('方程根为 ' + quadsolve.root1() + '  ' + quadsolve.root2());
    }
  });


});
