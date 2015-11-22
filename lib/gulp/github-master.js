'use strict';

var path = require('path');

var exec = require('../helpers/exec');

module.exports = function(done) {
  var bin = path.join(__dirname, '../../bin/github-master.sh');
  var cmd = ['bash', bin].join(' ');

  exec(cmd, done);
};
