'use strict';

class Mediator {
  music() {}
  curtain() {}
  bath() {}
}

class SmartMediator extends Mediator {
  constructor(bd, md, cd) {
    super();
    this.bathDevice = bd;
    this.musicDevice = md;
    this.curtainDevice = cd;
  }

  curtain(instruction) {
    this.musicDevice.readyState(instruction);
    this.bathDevice.readyState(instruction);
  }

  music(instruction) {
    this.curtainDevice.readyState(instruction);
    this.bathDevice.readyState(instruction);
  }

  bath(instruction) {
    this.musicDevice.readyState(instruction);
    this.curtainDevice.readyState(instruction);
  }

}

module.exports = SmartMediator;
