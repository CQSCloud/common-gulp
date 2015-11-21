'use strict';

var path = require('path');
var exec = require('child_process').exec;
var argv = require('yargs').argv;

module.exports = function(done) {
  var bin = path.join(__dirname, '../../bin/aws-deploy-eb.sh');
  var cmd = ['bash', bin, argv.env, argv.cname].join(' ');

  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error) {
      console.error(error);
    }
    done();
  });
};
