'use strict';

var path = require('path');
var exec = require('child_process').exec;

module.exports = function(done) {
  var lcov = path.join(process.cwd(), 'coverage', 'lcov.info');
  var bin = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'codeclimate-test-reporter');

  exec(bin + ' < ' + lcov, function(error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error) {
      console.error(error);
    }
    done();
  });
};
