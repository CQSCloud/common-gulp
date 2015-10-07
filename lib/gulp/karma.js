'use strict';

var _ = require('lodash');
var path = require('path');
var karma = require('karma');

module.exports = function(done, options) {
  new karma.Server(
    _.merge({
      configFile: path.join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, options || {}), done).start();
};
