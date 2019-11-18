# **观察者模式**

**观察者模式又叫做发布—订阅模式，是我们最常用的设计模式之一。它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知和更新。观察者模式提供了一个订阅模型，其中对象订阅事件并在发生时得到通知，这种模式是事件驱动的编程基石，它有利益于良好的面向对象的设计**

## **观察者模式的使用场景**

### **DOM事件**
```javascript
document.body.addEventListener("click", function() {
    alert("Hello World")
}，false )
document.body.click() //模拟用户点击
```
### **EventEmitter**
```javascript
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
function listener(...args) {
    console.log(args);
     console.log('some_event 事件触发'); 
 }
event.on('some_event', listener); 
event.emit('some_event','arg1 参数', 'arg2 参数');   

event.removeListener('some_event',listener);
setTimeout(function() { 
    event.emit('some_event','arg1 参数', 'arg2 参数');   
}, 1000); 
```

### **Socket.io**
#### **client**
```javascript
<script src="/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  $(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });
</script>
```
#### **server**
```javascript
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
```

### **自定义事件**

```javascript
function Subject (){
  this.listeners = {}
}
Subject.prototype = {
  addListener:  function (eventname, callback) {
    if (typeof callback !== 'function'){
      throw new TypeError('"listener" argument must be a function')
    }
    if(this.listeners[eventname] === undefined){
      this.listeners[eventname] = [];
    }
    this.listeners[eventname].push(callback)
  },
  removeListener: function (eventName, callback){
    if(typeof callback !== 'function'){
         throw new TypeError('"listener" argument must be a function')
    }      
    if(Array.isArray(this.listeners[eventName]) && this.listeners[eventName].length !== 0) {
      var callbackList = this.listeners[eventName]
      for (var i = 0, len=callbackList.length; i < len; i++) {
                if(callbackList[i] === callback) {
                    this.listeners[eventName].splice(i,1)    
                }
            }
}
  },

 triggerEvent: function(eventName,...args) {
        if(this.listeners[eventName]) {
            for(var i=0, len=this.listeners[eventName].length; i<len; i++){
                this.listeners[eventName][i](...args);
            }
        }
    }
}

Subject.prototype.on = Subject.prototype.addListener;
Subject.prototype.emit = Subject.prototype.triggerEvent;

module.exports = exports = new Subject();

```

#### **发布和订阅**
```javascript
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
```