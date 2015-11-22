'use strict';

/* eslint no-console:0 */

var exec = require('child_process').exec;

var _nonewline = function(str) {
  return str.replace(/\n/, '').replace(/\r/, '');
};

module.exports = function(cmd, done) {
  var proc = exec(cmd, function(error) {
    if (error) {
      console.error(error);
    }
    done(error);
  });

  proc.stdout.on('data', function(data) {
    console.log(_nonewline(data));
  });

  proc.stderr.on('data', function(data) {
    console.error(_nonewline(data));
  });
};
