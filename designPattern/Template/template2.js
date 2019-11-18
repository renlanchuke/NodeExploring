'use strict';
class Beverge {
  boilWater() {
    console.log('把水煮沸');
  }
  brew() { }
  pourInCup() { }
  addCondiments() { }
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}


class Coffee extends Beverge {
  // 重写抽象父类中的一些方法
  brew() {
    console.log('用沸水冲泡咖啡');
  }
  pourInCup() {
    console.log('把咖啡倒进杯子');
  }
  Coffee() {
    console.log('加糖和牛奶');
  }
}


const coffee = new Coffee();
console.log('开始煮咖啡 ...');
coffee.init();
