'use strict';
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
function listener(...args) {
  console.log(args);
  console.log('some_event 事件触发');
}
event.on('some_event', listener);
event.emit('some_event', 'arg1 参数', 'arg2 参数');

event.removeListener('some_event', listener);
setTimeout(function() {
  event.emit('some_event', 'arg1 参数', 'arg2 参数');
}, 1000);
