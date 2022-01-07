'use strict';

const path = require('path');
const exec = require('../exec/exec-wrapper');

const task = (done) => {
  const lcov = path.join(process.cwd(), 'coverage/lcov.info');
  const bin = path.join(process.cwd(), 'node_modules/.bin/coveralls');
  const cmd = [bin, '<', lcov].join(' ');
  exec(cmd, done);
};

module.exports = task;
