'use strict';

// 恢复标准输入流
process.stdin.resume();
// 输入一个数字，加1再输出
process.stdin.on('data', (data) => {
  var number;
  try {
    number = parseInt(data.toString(), 10);
    number++;
    process.stdout.write(number + '\n');
  } catch (err) {
    process.stdout.write(err.message + '\n');
  }
});
