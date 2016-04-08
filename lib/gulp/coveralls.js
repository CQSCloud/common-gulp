'use strict';

var path = require('path');

var exec = require('../helpers/exec');

module.exports = function(done) {
  var lcov = path.join(process.cwd(), 'coverage/lcov.info');
  var bin = path.join(process.cwd(), 'node_modules/.bin/coveralls');
  var cmd = [bin, '<', lcov].join(' ');

  exec(cmd, done);
};
