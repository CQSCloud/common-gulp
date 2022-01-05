'use strict';

const path = require('path');
const exec = require('./exec-wrapper');

const task = (cb) => {
  const bin = path.join(__dirname, '../bin/github-master.sh');
  const cmd = ['bash', bin].join(' ');

  exec(cmd, cb);
};

module.exports = task;
