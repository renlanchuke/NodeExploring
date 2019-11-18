'use strict';
class Monkey {
  say() { console.log('目前我只是个野猴子'); }
}
class TensionMonkey extends Monkey {
  constructor(monkey) {
    super();
    this.monkey = monkey;
  }
  say() {
    this.monkey.say();
    console.log('带上紧箍咒，我就要忘记世间烦恼!');
  }
}
const monkey = new TensionMonkey(new Monkey());
monkey.say();
