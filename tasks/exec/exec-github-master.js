'use strict';

const path = require('path');
const exec = require('./exec-wrapper');

const task = (cb) => {
  const bin = path.join(__dirname, '../bin/github-master.sh');
  const cmd = ['bash', bin].join(' ');

  exec(cmd, cb);
};

task.displayName = 'github-master';
task.description = 'Execute bin/github-master.sh';

module.exports = task;
