# 模版设计模式

模板方法模式是一种只需要使用继承就可以实现的非常简单点的模式。

模板方法模式有两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现

一些公共方法以及封装子类中所有的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

## 泡咖啡
泡咖啡的步骤通常如下：

1. 把水煮沸
2. 用沸水冲泡咖啡
3. 把咖啡倒进杯子
4. 加糖和牛奶
```javascript
var Coffee = function() {};

Coffee.prototype.boilWater = function() {
    console.log('把水煮沸');
}
Coffee.prototype.brewCofffeeGriends = function() {
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addSugarAndMilk = function() {
    console.log('加糖和牛奶');
}

Coffee.prototype.init = function() {
    this.boilWater();
    this.brewCofffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
}

var coffee = new Coffee();
coffee.init();
```

## 泡茶
泡咖啡的步骤通常如下：

1. 把水煮沸
2. 用沸水冲泡茶叶
3. 把茶倒入杯子
4. 加糖和牛奶

```javascript
var Tea = function() {};

Tea.prototype.boilWater = function() {
    console.log('把水煮沸');
}
Tea.prototype.steepTeaBag = function() {
    console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourInCup = function() {
    console.log('把茶水倒进杯子');
}
Tea.prototype.addLemon = function() {
    console.log('加柠檬');
}

Tea.prototype.init = function() {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
}

var tea = new Tea();
tea.init();
```

## 分离共同点
对泡咖啡和泡茶的过程进行抽象，可以得到如下过程：现象→抽象→模型

1. 把水煮沸
2. 谁沸水冲泡饮料
3. 把饮料倒进杯子
4. 加调料

```javascript
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
```

## 创建子类
```javascript
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
coffee.init();
```
### 运行结果
```javascript
把水煮沸
用沸水冲泡咖啡
把咖啡倒进杯子
加糖和牛奶
```
