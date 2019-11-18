'use strict';

class Hello {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`helle ${this.name}`);
  }
}

Object.defineProperty(Hello.prototype, 'say', {
  value: function() {
    const oldSay = Hello.prototype.say;
    oldSay('孙悟空');
    console.log('目前，我只是个野猴子');
  },
  enumerable: false,
  configurable: true,
  writable: true
});

const hello = new Hello();
hello.say();
