'use strict';

var path = require('path');
var exec = require('child_process').exec;

module.exports = function(done) {
  var bin = path.join(__dirname, '../../bin/pivotal.sh');
  var cmd = ['bash', bin].join(' ');

  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error) {
      console.error(error);
    }
    done();
  });
};
