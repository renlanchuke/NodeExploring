'use strict';
// 加载discriminant模块，用变量disc存储
var disc = require('./discriminant');

// 创建module对象，计算方程的根
module.exports = function(a, b, c, next) {
  if (a === 0)
    // 不是二次方程，抛出错误
    next(new Error('a 不应该为0'));
  else if (disc(a, b, c) < 0) {
    // 方程无解，抛出错误
    next(new Error('判别式小于0,方程没有实根'));
  } else {
    // 返回根
    return next(null, {
      root1: function() {
        return (-b - Math.sqrt(disc(a, b, c))) / (2 * a);
      },
      root2: function() {
        return (-b + Math.sqrt(disc(a, b, c))) / (2 * a);
      }
    });
  }
};
