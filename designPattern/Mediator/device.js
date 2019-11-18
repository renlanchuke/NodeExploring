'use strict';
class Device {
  readyState() {}
  operateDevice() {}
}

class CurtainDevice extends Device {
  operateDevice(instruction, mediator) {
    console.log('窗帘已' + instruction);// 通过传入指令，打开或关闭窗帘
    mediator.curtain(instruction);// 窗帘通过中介者唤醒音乐设备和洗浴设备
  }

  readyState(instruction) {
    // 如果其他设备开启则调用此方法，唤醒窗帘
    console.log('窗帘设备准备' + instruction);
  }
}

class MusicDevice extends Device {
  operateDevice(instruction, mediator) {
    console.log('播放器已' + instruction);// 通过传入指令，打开或关闭窗帘
    mediator.music(instruction);// 窗帘通过中介者唤醒窗帘设备和洗浴设备
  }
  readyState(instruction) {
    // 如果其他设备开启则调用此方法，唤醒播放器
    console.log('播放器设备准备' + instruction);
  }
}

class BathDevice extends Device {
  operateDevice(instruction, mediator) {
    console.log('洗浴设备已' + instruction);// 通过传入指令，打开或关闭洗浴设备
    mediator.bath(instruction);// 窗帘通过中介者唤醒窗帘设备和音乐设备
  }
  readyState(instruction) {
    // 如果其他设备开启则调用此方法，唤醒播放器
    console.log('洗浴设备准备' + instruction);
  }
}


module.exports = {
  CurtainDevice,
  MusicDevice,
  BathDevice
};
