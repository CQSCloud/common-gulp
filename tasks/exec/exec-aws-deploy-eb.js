'use strict';

const path = require('path');
const argv = require('yargs').argv;
const exec = require('./exec-wrapper');

const task = (cb) => {
  const bin = path.join(__dirname, '../../bin/aws-deploy-eb.sh');
  const cmd = ['bash', bin, argv.env, argv.cname].join(' ');
  exec(cmd, cb);
};

module.exports = task;
