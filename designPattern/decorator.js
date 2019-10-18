'use strict';
class tank_4 {
  // @shoot
  shoot(a, b) {
    console.log('shoot' + a + ' ' + b);
  }
}

// eslint-disable-next-line no-unused-vars
function shoot(target, name, descriptor) {
  // descriptor.value:表示tank_4对象的方法shoot(a,b)
  var oldValue = descriptor.value;

  console.log(descriptor.value);
  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}

new tank_4().shoot(1, 2);
