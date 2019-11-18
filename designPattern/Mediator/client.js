'use strict';
const { MusicDevice, BathDevice, CurtainDevice } = require('./device');
const SmartMediator = require('./mediator');

const md = new MusicDevice();
const bd = new BathDevice();
const cd = new CurtainDevice();

const sm = new SmartMediator(bd, md, cd);
cd.operateDevice('Open', sm);
bd.operateDevice('Close', sm);
