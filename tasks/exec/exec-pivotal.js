'use strict';

const path = require('path');
const exec = require('./exec-wrapper');

const task = (cb) => {
  var bin = path.join(__dirname, '../../bin/pivotal.sh');
  var cmd = ['bash', bin].join(' ');
  exec(cmd, cb);
};

module.exports = task;
