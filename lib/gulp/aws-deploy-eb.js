'use strict';

var path = require('path');
var argv = require('yargs').argv;

var exec = require('../helpers/exec');

module.exports = function(done) {
  var bin = path.join(__dirname, '../../bin/aws-deploy-eb.sh');
  var cmd = ['bash', bin, argv.env, argv.cname].join(' ');

  exec(cmd, done);
};
