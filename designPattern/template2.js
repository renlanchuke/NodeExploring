var Beverge = function() {};

Beverge.prototype.boilWater = function() {
    console.log('把水煮沸');
};
Beverge.prototype.brew = function() {};  //空方法，应该由子类重写

Beverge.prototype.pourInCup = function() {}; //空方法，应该由子类重写

Beverge.prototype.addCondiments = function() {}; //空方法，应该由子类重写

Beverge.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}

var Coffee = function() {};

Coffee.prototype = new Beverge();
//重写抽象父类中的一些方法
Coffee.prototype.brew = function() {
    console.log('用沸水冲泡咖啡');
}

Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
}

Coffee.prototype.addCondiments = function() {
    console.log('加糖和牛奶');
}

var coffee = new Coffee();
console.log('开始煮咖啡 ...');
coffee.init();