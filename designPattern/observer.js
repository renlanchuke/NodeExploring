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
