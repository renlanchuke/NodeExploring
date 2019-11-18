'use strict';
class Coffee {
  boilWater() {
    console.log('把水煮沸');
  }
  brewCofffeeGriends() {
    console.log('用沸水冲泡咖啡');
  }
  pourInCup() {
    console.log('把咖啡倒进杯子');
  }
  addSugarAndMilk() {
    console.log('加糖和牛奶');
  }
  init() {
    this.boilWater();
    this.brewCofffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
  }
}


const coffee = new Coffee();
console.log('开始煮咖啡。。。。');
coffee.init();

class Tea {
  boilWater() {
    console.log('把水煮沸');
  }
  steepTeaBag() {
    console.log('用沸水浸泡茶叶');
  }
  pourInCup() {
    console.log('把茶水倒进杯子');
  }
  addLemon() {
    console.log('加柠檬');
  }
  init() {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
  }
}


const tea = new Tea();

console.log('\n\n开始煮茶。。。。');
tea.init();
