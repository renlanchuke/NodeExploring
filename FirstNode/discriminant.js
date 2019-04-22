'use strict';

// 判别式module对象，用于判断方程是否有解
module.exports = function(a, b, c) {
  return (b * b - 4 * a * c);
};
