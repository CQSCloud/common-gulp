'use strict';

var path = require('path');
var karma = require('karma');

module.exports = function(done) {
  new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, done).start();
};
