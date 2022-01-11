'use strict';

/* eslint no-console:0 */

const { exec } = require('child_process');

const _nonewline = (str) => {
  return str.replace(/\n/, '').replace(/\r/, '');
};

const task = (cmd, cb) => {
  var proc = exec(cmd, (error) => {
    if (error) {
      console.error(error);
    }
    cb(error);
  });

  proc.stdout.on('data', (data) => {
    console.log(_nonewline(data));
  });

  proc.stderr.on('data', (data) => {
    console.error(_nonewline(data));
  });
};

module.exports = task;
