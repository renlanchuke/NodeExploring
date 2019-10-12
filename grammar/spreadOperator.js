'use strict';

function test(...params) {
  console.log(typeof params);
  // Const params_array= [...params]
  console.log(Array.isArray(params));
  test1(params);
  test1(...params);
}

function test1(params) {
  console.log('test1: ', params);
}

function test2(param1, param2) {
  console.log('param1: ', param1, 'param2: ', param2);
}
const params1 = {
  a: 1,
  b: 1
};

const params2 = {
  b: 1
};

const params3 = [params1, params2];

test(params1, params2);
test2(...params3);
