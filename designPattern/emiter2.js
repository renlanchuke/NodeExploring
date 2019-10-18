const observer = require('./observer');

function listener(...args){
  console.log([...args].join('  ,'));
}

function listener2(params){
  console.log(params);
}

observer.addListener('test', listener);
observer.triggerEvent('test', 'hello', 'world');

observer.removeListener('test', listener);

setTimeout(()=>{
  observer.triggerEvent('test', 'hello', 'world', 'again');
},1000);

observer.on('hello', listener2);
observer.emit('hello', 'Hello world!');